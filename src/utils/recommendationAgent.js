import { conditionData } from '../data/conditionData.js';

// Generates recommendations based on symptoms and condition
export const generateRecommendations = (symptoms, condition) => {
  const { pain, temperature, fatigue, medicationTaken } = symptoms;
  
  const conditionInfo = conditionData[condition] || conditionData.general;
  
  let actions = [...conditionInfo.actions];
  let precautions = [...conditionInfo.precautions];
  let consultationNeeded = false;
  
  // Add dynamic recommendations based on symptoms
  if (temperature > 38.5) {
    actions.unshift('Monitor temperature every 4 hours');
    consultationNeeded = temperature > 39.5;
  }
  
  if (pain > 8) {
    actions.unshift('Rest in a comfortable position');
    consultationNeeded = pain > 9;
  }
  
  if (!medicationTaken && condition !== 'general') {
    actions.unshift('Take prescribed medication immediately');
  }
  
  if (fatigue > 7) {
    actions.unshift('Get adequate rest (8-10 hours)');
  }
  
  return {
    whatToDo: actions.slice(0, 5),
    whatToAvoid: precautions.slice(0, 5),
    recommendedFoods: conditionInfo.foods.recommended.slice(0, 5),
    foodsToAvoid: conditionInfo.foods.avoid.slice(0, 5),
    consultDoctor: consultationNeeded ? 'Contact your healthcare provider immediately' 
                   : temperature > 38.5 || pain > 7 ? 'Contact your healthcare provider if symptoms worsen'
                   : 'Contact your healthcare provider if needed',
    priority: consultationNeeded ? 'URGENT' : temperature > 38 || pain > 7 ? 'HIGH' : 'MEDIUM',
  };
};
