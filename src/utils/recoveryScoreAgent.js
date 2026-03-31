// Calculates recovery score based on multiple factors
export const calculateRecoveryScore = (symptoms, adherence, daysInRecovery, condition) => {
  // Base score
  let score = 100;
  
  const { pain, temperature, fatigue, medicationTaken } = symptoms;
  
  // Pain impact (0-30 points deduction)
  if (pain > 8) score -= 30;
  else if (pain > 6) score -= 20;
  else if (pain > 4) score -= 10;
  else if (pain > 2) score -= 5;
  
  // Temperature impact (0-25 points deduction)
  if (temperature > 39) score -= 25;
  else if (temperature > 38.5) score -= 18;
  else if (temperature > 38) score -= 12;
  else if (temperature > 37.5) score -= 5;
  
  // Fatigue impact (0-20 points deduction)
  if (fatigue > 8) score -= 20;
  else if (fatigue > 6) score -= 12;
  else if (fatigue > 4) score -= 6;
  
  // Adherence bonus (0-20 points)
  score += (adherence / 100) * 20;
  
  // Medication bonus (0-10 points)
  if (medicationTaken) score += 10;
  
  // Time in recovery bonus (0-15 points)
  const timeBonus = Math.min((daysInRecovery / 30) * 15, 15);
  score += timeBonus;
  
  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score));
  
  return Math.round(score);
};

export const getRecoveryPhase = (daysInRecovery) => {
  if (daysInRecovery <= 7) return 'Early Recovery';
  if (daysInRecovery <= 14) return 'Active Recovery';
  if (daysInRecovery <= 30) return 'Mid Recovery';
  return 'Late Recovery';
};
