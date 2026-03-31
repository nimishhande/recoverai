export const conditionData = {
  'knee-surgery': {
    name: 'Knee Surgery Recovery',
    duration: '30-60 days',
    actions: [
      'Perform prescribed physical therapy exercises daily',
      'Elevate leg when resting',
      'Apply ice for 15-20 minutes several times daily',
      'Wear compression bandage as directed',
      'Gradually increase weight-bearing activities',
    ],
    precautions: [
      'Avoid high-impact activities and sports',
      'Do not bear full weight without medical clearance',
      'Avoid twisting or pivoting on injured knee',
      'Do not sit with legs dependent for extended periods',
      'Avoid stairs until approved by therapist',
    ],
    foods: {
      recommended: [
        'Lean proteins (chicken, fish, eggs)',
        'Vegetables rich in vitamin C (broccoli, bell peppers)',
        'Omega-3 sources (salmon, walnuts)',
        'Berries and citrus fruits',
        'Whole grains and legumes',
      ],
      avoid: [
        'Inflammatory foods (processed meat, sugary drinks)',
        'Excess salt (increases swelling)',
        'Alcohol (impairs healing)',
        'High-fat foods',
        'Excessive caffeine',
      ],
    },
  },
  'cardiac-recovery': {
    name: 'Cardiac Recovery',
    duration: '30-90 days',
    actions: [
      'Follow prescribed cardiac rehabilitation program',
      'Monitor heart rate and blood pressure regularly',
      'Take all cardiac medications as prescribed',
      'Engage in mild aerobic activity (walking)',
      'Manage stress through relaxation techniques',
    ],
    precautions: [
      'Avoid strenuous exercise without clearance',
      'Do not lift heavy objects',
      'Avoid sudden temperature changes',
      'Limit sodium intake strictly',
      'Avoid smoking and secondhand smoke',
    ],
    foods: {
      recommended: [
        'Fatty fish (salmon, mackerel, sardines)',
        'Olive oil and avocados',
        'Low-sodium vegetables',
        'Whole grains',
        'Low-fat dairy products',
      ],
      avoid: [
        'High-sodium processed foods',
        'Saturated fats and trans fats',
        'Red meat and full-fat dairy',
        'Sugary beverages and foods',
        'Fried foods',
      ],
    },
  },
  'infection-recovery': {
    name: 'Infection Recovery',
    duration: '7-21 days',
    actions: [
      'Complete full course of antibiotics',
      'Keep wound clean and dry',
      'Watch for signs of worsening infection',
      'Stay hydrated with plenty of water',
      'Get adequate rest (8-10 hours daily)',
    ],
    precautions: [
      'Avoid touching or scratch the affected area',
      'Do not expose wound to contaminated water',
      'Avoid strenuous activity',
      'Do not stop antibiotics early',
      'Avoid close contact with immunocompromised individuals',
    ],
    foods: {
      recommended: [
        'Protein-rich foods (support immune system)',
        'Vitamin C sources (boosts immunity)',
        'Zinc-rich foods (oysters, beef, pumpkin seeds)',
        'Garlic and ginger (antimicrobial)',
        'Probiotic foods (yogurt, kefir)',
      ],
      avoid: [
        'Sugar (suppresses immune response)',
        'Alcohol (impairs immunity)',
        'Processed foods',
        'Food allergens',
        'Excessive caffeine',
      ],
    },
  },
  'general': {
    name: 'General Recovery',
    duration: '14-30 days',
    actions: [
      'Take prescribed medications regularly',
      'Rest adequately',
      'Stay hydrated',
      'Follow up with healthcare provider as scheduled',
      'Monitor for any complications',
    ],
    precautions: [
      'Avoid strenuous activity',
      'Do not skip medications',
      'Avoid smoking',
      'Limit alcohol consumption',
      'Get support from family and friends',
    ],
    foods: {
      recommended: [
        'Lean proteins',
        'Fruits and vegetables',
        'Whole grains',
        'Healthy fats',
        'Plenty of water',
      ],
      avoid: [
        'Processed foods',
        'Sugary drinks',
        'Alcohol',
        'High-fat foods',
        'Excess caffeine',
      ],
    },
  },
};

export const defaultConditions = [
  { value: 'knee-surgery', label: 'Knee Surgery' },
  { value: 'cardiac-recovery', label: 'Cardiac Recovery' },
  { value: 'infection-recovery', label: 'Infection Recovery' },
  { value: 'general', label: 'General Recovery' },
];

export const recoveryPhases = [
  { phase: 'Early Recovery', days: '1-7', description: 'Initial healing phase' },
  { phase: 'Active Recovery', days: '8-14', description: 'Progressive rehabilitation' },
  { phase: 'Mid Recovery', days: '15-30', description: 'Functional improvement' },
  { phase: 'Late Recovery', days: '30+', description: 'Return to normal activities' },
];
