import React, { useState } from 'react';

// Supplement Planner JS File

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
        time: "First Meal (~11 AM - 1 PM)",
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
    const [completedSupplements, setCompletedSupplements] = useState({});

    const toggleSupplementCompletion = (timeIndex, supplementIndex) => {
        const key = `${timeIndex}-${supplementIndex}`;
        setCompletedSupplements(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="supplement-planner">
            {supplementPlan.map((timeSlot, timeIndex) => (
                <div key={timeIndex} className="supplement-time-slot">
                    <div className="time-slot-header">{timeSlot.time}</div>
                    <div className="supplements">
                        {timeSlot.supplements.map((supplement, supplementIndex) => {
                            const key = `${timeIndex}-${supplementIndex}`;
                            const isCompleted = completedSupplements[key];
                            
                            return (
                                <div 
                                    key={supplementIndex} 
                                    className={`supplement-item ${isCompleted ? 'completed' : ''}`}
                                    onClick={() => toggleSupplementCompletion(timeIndex, supplementIndex)}
                                >
                                    <div className="supplement-header">
                                        <div className="supplement-name">{supplement.name}</div>
                                        <div className="supplement-checkbox">
                                            <input 
                                                type="checkbox" 
                                                checked={isCompleted} 
                                                onChange={() => {}} // Handled by onClick on parent div
                                            />
                                        </div>
                                    </div>
                                    <div className="supplement-details">
                                        <div className="supplement-dose">{supplement.dose}</div>
                                        <div className="supplement-notes">{supplement.notes}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SupplementPlanner;
