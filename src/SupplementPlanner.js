import React, { useState, useEffect } from 'react';

const supplementPlan = [
    {
        time: "Morning (Fasted)",
        supplements: [
            { name: "L-Tyrosine", dose: "500-1000 mg", notes: "Fasted OK, Dopamine precursor, enhances focus" },
            { name: "Rhodiola Rosea", dose: "200-300 mg", notes: "Fasted OK, Adaptogen, stress control" },
            { name: "N-Acetylcysteine (NAC)", dose: "600 mg", notes: "Fasted OK, Glutamate detox, reduces cravings" },
            { name: "Magnesium (Glycinate or Malate)", dose: "200 mg", notes: "Fasted OK, Supports neurotransmitters, reduces cravings" },
            { name: "Vitamin B6 & B12", dose: "B6 (25 mg), B12 (1000 mcg)", notes: "Fasted OK, Boosts dopamine synthesis" },
            { name: "Boron", dose: "6-10 mg", notes: "Fasted OK, Supports testosterone, bone health, reduces inflammation" },
            { name: "Nootropic Stack Capsule", dose: "1 Capsule (400mg)", notes: "Fasted OK, Contains Adrafinil, Phenylpiracetam, Citicoline, Noopept" },
            { name: "Copper", dose: "1-2 mg", notes: "Fasted OK, Essential for zinc balance, energy production, and brain function" },
            { name: "Natto-Serra (Nattokinase + Serrapeptase)", dose: "1-2 Capsules", notes: "Fasted OK, Supports circulation, fibrin breakdown, and inflammation control" }
        ]
    },
    {
        time: "With First Meal (~11 AM - 1 PM)",
        supplements: [
            { name: "Zinc", dose: "15-30 mg", notes: "With Food, Dopamine & immune support" },
            { name: "Boron", dose: "6-10 mg", notes: "With Food, Enhances absorption, supports testosterone" },
            { name: "Copper", dose: "1-2 mg", notes: "With Food, Take with zinc to maintain mineral balance" }
        ]
    },
    {
        time: "Afternoon (~3-4 PM)",
        supplements: [
            { name: "Methylene Blue", dose: "0.5-1 mg/kg", notes: "Fasted OK, Mitochondrial support, cognitive clarity" },
            { name: "Creatine Monohydrate (Lifting Days Only)", dose: "5g", notes: "With Food, Supports ATP & cognitive function" },
            { name: "Nootropic Stack Capsule (Second Dose, If Needed)", dose: "1 Capsule (400mg)", notes: "Fasted OK, Must be taken 8 hours apart from first dose" }
        ]
    },
    {
        time: "Evening (~7-8 PM)",
        supplements: [
            { name: "Glycine", dose: "1000 mg", notes: "With Food, Optional for Sleep, Calming neurotransmitter" },
            { name: "Taurine", dose: "500 mg", notes: "With Food, GABA support, reduces stress" },
            { name: "Magnesium", dose: "200 mg", notes: "With Food, Enhances sleep & muscle relaxation" }
        ]
    },
    {
        time: "Nighttime (~9-10 PM)",
        supplements: [
            { name: "Inositol", dose: "500-1000 mg", notes: "Fasted OK, Reduces overactive thoughts & anxiety" },
            { name: "Glycine + Taurine + Magnesium (if not taken earlier)", dose: "-", notes: "Fasted OK, Supports deep sleep" }
        ]
    }
];

const SupplementPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [supplementData, setSupplementData] = useState(() => {
    const saved = localStorage.getItem('supplementData');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('supplementData', JSON.stringify(supplementData));
  }, [supplementData]);

  const getDateKey = (date) => date.toISOString().split('T')[0];

  const toggleSupplementCompletion = (timeIndex, supplementIndex) => {
    const dateKey = getDateKey(currentDate);
    const supplementKey = `${dateKey}-${timeIndex}-${supplementIndex}`;
    
    setSupplementData(prev => ({
      ...prev,
      [supplementKey]: !prev[supplementKey]
    }));
  };

  const isSupplementCompleted = (timeIndex, supplementIndex) => {
    const dateKey = getDateKey(currentDate);
    const supplementKey = `${dateKey}-${timeIndex}-${supplementIndex}`;
    return supplementData[supplementKey] || false;
  };

  const calculateCompletion = () => {
    const dateKey = getDateKey(currentDate);
    let completed = 0;
    let total = 0;

    supplementPlan.forEach((timeSlot, timeIndex) => {
      timeSlot.supplements.forEach((_, supplementIndex) => {
        const supplementKey = `${dateKey}-${timeIndex}-${supplementIndex}`;
        if (supplementData[supplementKey]) completed++;
        total++;
      });
    });

    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    };
  };

  return (
    <div className="supplement-planner">
      <header className="header">
        <h1>Supplement Tracker</h1>
        
        <div className="date-navigation">
          <button onClick={() => setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() - 1);
            return newDate;
          })}>
            Prev
          </button>
          
          <h2>{currentDate.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}</h2>
          
          <button onClick={() => setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + 1);
            return newDate;
          })}>
            Next
          </button>
        </div>
      </header>

      <div className="dashboard">
        <div className="stats-container">
          <div className="stats-section">
            <h3>Today's Progress</h3>
            <div className="progress-container">
              <div className="progress-label">
                <span>Supplements Taken</span>
                <span>{calculateCompletion().completed}/{calculateCompletion().total} ({calculateCompletion().percentage}%)</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${calculateCompletion().percentage}%`,
                    backgroundColor: calculateCompletion().percentage > 66 ? '#22c55e' : 
                                   calculateCompletion().percentage > 33 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="supplement-list">
        {supplementPlan.map((timeSlot, timeIndex) => (
          <div key={timeIndex} className="supplement-time-slot">
            <h3 className="time-slot-header">{timeSlot.time}</h3>
            <div className="supplements">
              {timeSlot.supplements.map((supplement, supplementIndex) => (
                <div 
                  key={supplementIndex} 
                  className={`supplement-item ${isSupplementCompleted(timeIndex, supplementIndex) ? 'completed' : ''}`}
                >
                  <div className="supplement-info">
                    <div className="supplement-header">
                      <span className="supplement-name">{supplement.name}</span>
                      <input
                        type="checkbox"
                        className="supplement-checkbox"
                        checked={isSupplementCompleted(timeIndex, supplementIndex)}
                        onChange={() => toggleSupplementCompletion(timeIndex, supplementIndex)}
                      />
                    </div>
                    <div className="supplement-details">
                      <span className="supplement-dose">Dose: {supplement.dose}</span>
                      <span className="supplement-notes">{supplement.notes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplementPlanner; 