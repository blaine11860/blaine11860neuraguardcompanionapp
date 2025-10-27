from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from datetime import datetime
import json
import logging
from dataclasses import dataclass
from typing import Dict, List, Optional

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

@dataclass
class PatientData:
    plet_variation: float
    microvascular_flow: float
    optic_nerve_diameter: float
    bis_index: float
    spo2: float
    map_bp: float
    hb: float
    temperature: float
    emboli_count: int
    timestamp: datetime

class OpticRiskScoreCalculator:
    def __init__(self):
        self.weights = {
            'microvascular_flow': 0.20,
            'plet_variation': 0.16,
            'emboli_count': 0.12,
            'optic_nerve_diameter': 0.12,
            'bis_index': 0.11,
            'spo2': 0.09,
            'map_bp': 0.07,
            'hb': 0.07,
            'temperature': 0.06
        }
        
        self.thresholds = {
            'microvascular_flow_critical': 15,
            'plet_variation_critical': 25,
            'emboli_count_critical': 10,
            'onsd_critical': 5.7,
            'map_critical': 55,
            'hb_critical': 7.5,
            'bis_critical_low': 40,
            'spo2_critical': 90,
            'temperature_critical_low': 35.0,
            'temperature_critical_high': 38.0
        }
    
    def calculate_cmro2_do2_ratio(self, data: PatientData) -> float:
        cmro2 = data.bis_index * 0.3
        do2 = (data.hb * 1.34 * data.spo2 / 100) * data.microvascular_flow
        return cmro2 / do2 if do2 > 0 else 1.0
    
    def calculate_ors(self, data: PatientData) -> Dict:
        try:
            flow_score = max(0, 1 - (data.microvascular_flow / 30))
            plet_score = min(1, data.plet_variation / 40)
            emboli_score = min(1, data.emboli_count / 20)
            onsd_score = min(1, max(0, (data.optic_nerve_diameter - 4.5) / 2))
            map_score = max(0, 1 - (data.map_bp / 80))
            hb_score = max(0, 1 - (data.hb / 10))
            
            bis_score = max(0, 1 - (data.bis_index / 100))
            spo2_score = max(0, 1 - (data.spo2 / 100))
            
            temp_deviation = abs(data.temperature - 37.0)
            temperature_score = min(1, temp_deviation / 3.0)
            
            component_scores = {
                'microvascular_flow': flow_score * 100,
                'plet_variation': plet_score * 100,
                'emboli_count': emboli_score * 100,
                'optic_nerve_diameter': onsd_score * 100,
                'bis_index': bis_score * 100,
                'spo2': spo2_score * 100,
                'map_bp': map_score * 100,
                'hb': hb_score * 100,
                'temperature': temperature_score * 100
            }
            
            weighted_score = (
                flow_score * self.weights['microvascular_flow'] +
                plet_score * self.weights['plet_variation'] +
                emboli_score * self.weights['emboli_count'] +
                onsd_score * self.weights['optic_nerve_diameter'] +
                bis_score * self.weights['bis_index'] +
                spo2_score * self.weights['spo2'] +
                map_score * self.weights['map_bp'] +
                hb_score * self.weights['hb'] +
                temperature_score * self.weights['temperature']
            )
            
            ors = weighted_score * 100
            cmro2_do2 = self.calculate_cmro2_do2_ratio(data)
            
            if ors < 30:
                risk_level = "LOW"
                alert = False
            elif ors < 60:
                risk_level = "MODERATE" 
                alert = False
            else:
                risk_level = "HIGH"
                alert = True
            
            return {
                'ors_score': round(ors, 1),
                'risk_level': risk_level,
                'alert': alert,
                'component_scores': component_scores,
                'cmro2_do2_ratio': round(cmro2_do2, 3),
                'timestamp': data.timestamp.isoformat()
            }
            
        except Exception as e:
            logging.error(f"ORS calculation error: {e}")
            return {'error': str(e)}

class ConflictResolutionEngine:
    def detect_conflicts(self, data: PatientData, ors_result: Dict) -> List[Dict]:
        conflicts = []
        
        if data.bis_index > 60 and ors_result['component_scores']['microvascular_flow'] > 70:
            conflicts.append({
                'type': 'NEUROVASCULAR_DECOUPLING',
                'message': 'Adequate anesthesia depth but poor optic nerve perfusion',
                'severity': 'HIGH',
                'suggestions': [
                    'Check head positioning',
                    'Verify ultrasound probe placement',
                    'Consider MAP optimization'
                ]
            })
        
        if data.spo2 > 95 and ors_result['component_scores']['microvascular_flow'] > 60:
            conflicts.append({
                'type': 'MICROVASCULAR_COMPROMISE',
                'message': 'Adequate systemic oxygenation but impaired local perfusion',
                'severity': 'MEDIUM',
                'suggestions': [
                    'Assess for venous congestion',
                    'Check intraocular pressure',
                    'Review positioning'
                ]
            })
        
        return conflicts

ors_calculator = OpticRiskScoreCalculator()
conflict_engine = ConflictResolutionEngine()

@app.route('/api/calculate-ors', methods=['POST'])
def calculate_ors():
    try:
        data = request.json
        patient_data = PatientData(
            plet_variation=float(data['plet_variation']),
            microvascular_flow=float(data['microvascular_flow']),
            optic_nerve_diameter=float(data['optic_nerve_diameter']),
            bis_index=float(data['bis_index']),
            spo2=float(data['spo2']),
            map_bp=float(data['map_bp']),
            hb=float(data['hb']),
            temperature=float(data['temperature']),
            emboli_count=int(data['emboli_count']),
            timestamp=datetime.now()
        )
        
        ors_result = ors_calculator.calculate_ors(patient_data)
        
        if 'error' in ors_result:
            return jsonify(ors_result), 400
        
        conflicts = conflict_engine.detect_conflicts(patient_data, ors_result)
        ors_result['conflicts'] = conflicts
        
        log_research_data(patient_data, ors_result)
        
        return jsonify(ors_result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/research/cases', methods=['GET'])
def get_research_cases():
    return jsonify({
        'total_cases': 150,
        'recent_cases': get_recent_cases(),
        'collaborators': ['Mass Eye and Ear', 'Schepens Research']
    })

def log_research_data(patient_data: PatientData, ors_result: Dict):
    research_log = {
        'timestamp': datetime.now().isoformat(),
        'ors_score': ors_result['ors_score'],
        'risk_level': ors_result['risk_level'],
        'physio_parameters': {
            'plet_variation': patient_data.plet_variation,
            'microvascular_flow': patient_data.microvascular_flow,
            'optic_nerve_diameter': patient_data.optic_nerve_diameter
        },
        'conflicts_detected': len(ors_result['conflicts'])
    }
    logging.info(f"Research data: {research_log}")

def get_recent_cases():
    return [
        {'case_id': 'CASE_001', 'ors_peak': 72.4, 'outcome': 'POVL_avoided', 'tags': ['emboli', 'hypotension']},
        {'case_id': 'CASE_002', 'ors_peak': 45.2, 'outcome': 'stable', 'tags': ['prolonged_prone']}
    ]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
