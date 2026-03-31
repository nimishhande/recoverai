// Analyzes symptom severity based on pain, temperature, and fatigue
export const analyzeSymptoms = (symptoms) => {
  const { pain, temperature, fatigue } = symptoms;
  
  let severity = 'LOW';
  let score = 0;
  
  // Pain severity (0-10 -> 0-40 points)
  if (pain > 8) score += 40;
  else if (pain > 6) score += 30;
  else if (pain > 4) score += 20;
  else if (pain > 2) score += 10;
  
  // Temperature severity (0-50 points)
  if (temperature > 39) score += 50;
  else if (temperature > 38.5) score += 40;
  else if (temperature > 38) score += 30;
  else if (temperature > 37.5) score += 15;
  
  // Fatigue severity (0-10 -> 0-30 points)
  if (fatigue > 8) score += 30;
  else if (fatigue > 6) score += 20;
  else if (fatigue > 4) score += 10;
  
  if (score > 80) severity = 'CRITICAL';
  else if (score > 50) severity = 'HIGH';
  else if (score > 30) severity = 'MEDIUM';
  else severity = 'LOW';
  
  return { severity, score, details: `Based on pain (${pain}/10), temperature (${temperature}°C), and fatigue (${fatigue}/10)` };
};
