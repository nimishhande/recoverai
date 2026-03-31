// Detects and determines risk level based on symptoms and adherence
export const detectRiskLevel = (symptoms, adherence, daysInRecovery) => {
  const { pain, temperature, fatigue, medicationTaken } = symptoms;
  
  let riskFactors = [];
  let riskScore = 0;
  
  // Temperature risk (0-35 points)
  if (temperature > 39.5) {
    riskScore += 35;
    riskFactors.push('Critical fever');
  } else if (temperature > 39) {
    riskScore += 25;
    riskFactors.push('High fever');
  } else if (temperature > 38) {
    riskScore += 15;
    riskFactors.push('Fever present');
  }
  
  // Pain risk (0-25 points)
  if (pain > 8) {
    riskScore += 25;
    riskFactors.push('Severe pain');
  } else if (pain > 6) {
    riskScore += 15;
    riskFactors.push('Moderate pain');
  }
  
  // Fatigue risk (0-15 points)
  if (fatigue > 8) {
    riskScore += 15;
    riskFactors.push('Severe fatigue');
  } else if (fatigue > 6) {
    riskScore += 8;
    riskFactors.push('High fatigue');
  }
  
  // Medication adherence risk (0-20 points)
  if (!medicationTaken) {
    riskScore += 20;
    riskFactors.push('Missed medication');
  }
  
  // Low adherence risk (0-10 points)
  if (adherence < 50) {
    riskScore += 10;
    riskFactors.push('Low adherence');
  }
  
  let level = 'LOW';
  let recommendation = 'Continue current treatment plan';
  
  if (riskScore >= 50) {
    level = 'HIGH';
    recommendation = 'Consult with healthcare provider immediately';
  } else if (riskScore >= 30) {
    level = 'MEDIUM';
    recommendation = 'Schedule healthcare provider consultation within 24 hours';
  }
  
  return {
    level,
    score: riskScore,
    factors: riskFactors,
    recommendation,
  };
};
