// Calculates adherence based on checklist completion and medication adherence
export const calculateAdherence = (checklistItems, medicationTaken) => {
  if (!checklistItems || checklistItems.length === 0) {
    return 0;
  }
  
  const completedCount = checklistItems.filter(item => item.completed).length;
  const checklistScore = (completedCount / checklistItems.length) * 80;
  const medicationScore = medicationTaken ? 20 : 0;
  
  return Math.round(checklistScore + medicationScore);
};

export const getAdherenceLabel = (adherence) => {
  if (adherence >= 80) return 'Excellent';
  if (adherence >= 60) return 'Good';
  if (adherence >= 40) return 'Fair';
  return 'Poor';
};

export const getAdherenceColor = (adherence) => {
  if (adherence >= 80) return '#10B981'; // Green
  if (adherence >= 60) return '#3B82F6'; // Blue
  if (adherence >= 40) return '#F59E0B'; // Amber
  return '#EF4444'; // Red
};
