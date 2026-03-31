// Explains XAI reasoning behind recovery decisions
export const generateXAIExplanation = (symptoms, recoveryScore, riskLevel, adherence) => {
  const { pain, temperature, fatigue, medicationTaken } = symptoms;
  
  let explanation = [];
  let contributions = {
    pain: 0,
    temperature: 0,
    fatigue: 0,
    medication: 0,
    adherence: 0,
  };
  
  // Calculate contributions (percentages)
  const totalImpact = Math.abs(pain) + Math.abs(temperature - 37) + Math.abs(fatigue);
  
  if (totalImpact > 0) {
    contributions.pain = Math.round((pain / totalImpact) * 100);
    contributions.temperature = Math.round(((temperature - 37) / totalImpact) * 100);
    contributions.fatigue = Math.round((fatigue / totalImpact) * 100);
  }
  
  contributions.medication = medicationTaken ? -15 : 15; // Negative means helpful
  contributions.adherence = Math.round((adherence / 100) * 20);
  
  // Build explanation narrative
  if (pain > 7) {
    explanation.push(`High pain level (${pain}/10) is a major factor reducing your recovery score.`);
  }
  
  if (temperature > 37.5) {
    explanation.push(`Elevated temperature (${temperature}°C) indicates possible inflammation or infection.`);
  }
  
  if (fatigue > 7) {
    explanation.push(`Severe fatigue (${fatigue}/10) suggests your body needs more recovery time.`);
  }
  
  if (medicationTaken) {
    explanation.push('Taking medication as prescribed has a positive impact on recovery.');
  } else {
    explanation.push('Missed medication significantly impacts your recovery trajectory.');
  }
  
  if (adherence > 70) {
    explanation.push(`Your excellent adherence (${adherence}%) is accelerating recovery.`);
  } else if (adherence < 40) {
    explanation.push(`Low adherence (${adherence}%) is hindering your recovery progress.`);
  }
  
  if (riskLevel === 'HIGH') {
    explanation.push('Multiple risk factors are present. Immediate medical consultation recommended.');
  } else if (riskLevel === 'MEDIUM') {
    explanation.push('Several concerning factors detected. Schedule a consultation with your provider.');
  }
  
  return {
    mainNarrative: explanation.join(' '),
    details: explanation,
    contributions,
    summary: `Recovery Score: ${recoveryScore}/100 | Risk Level: ${riskLevel} | Adherence: ${adherence}%`,
  };
};

export const explainRiskFactors = (riskLevel, riskFactors) => {
  const explanations = {
    'Critical fever': 'Fever above 39.5°C requires immediate medical attention',
    'High fever': 'Fever above 39°C should be monitored closely',
    'Fever present': 'Elevated temperature may indicate infection',
    'Severe pain': 'Pain above 8/10 needs pain management intervention',
    'Moderate pain': 'Pain between 6-8 should be managed with prescribed medication',
    'Severe fatigue': 'Fatigue level suggests insufficient rest and recovery',
    'High fatigue': 'Fatigue is normal during recovery but monitor intensity',
    'Missed medication': 'Not taking prescribed medication increases complications risk',
    'Low adherence': 'Poor adherence to recovery protocol affects outcomes',
  };
  
  return riskFactors.map(factor => ({
    factor,
    explanation: explanations[factor] || 'Monitor this factor closely',
  }));
};
