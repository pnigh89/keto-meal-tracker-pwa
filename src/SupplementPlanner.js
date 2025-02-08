
// Supplement Planner JS File

const supplementPlan = [
    {
        time: "Morning (Fasted)",
        supplements: [
            { name: "Coffee OR Yerba Mate + Coconut Oil", dose: "1 cup + 1 tbsp oil", notes: "Fasted OK, MCTs boost ketones & prevent jitters" },
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
        time: "First Meal (~11 AM - 1 PM, Breaking Fast)",
        supplements: [
            { name: "Food-Based Tyrosine (Eggs + Fresh Fish OR Beef)", dose: "-", notes: "With Food, Supports dopamine naturally" },
            { name: "Probiotic (Sauerkraut or Supplement)", dose: "-", notes: "With Food, Gut health, digestion" },
            { name: "Zinc", dose: "15-30 mg", notes: "With Food, Dopamine & immune support" },
            { name: "Boron", dose: "6-10 mg", notes: "With Food, Enhances absorption, supports testosterone" },
            { name: "Copper", dose: "1-2 mg", notes: "With Food, Take with zinc to maintain mineral balance" }
        ]
    },
    {
        time: "Afternoon (~3-4 PM, Prevent Dopamine Crash)",
        supplements: [
            { name: "Methylene Blue", dose: "0.5-1 mg/kg", notes: "Fasted OK, Mitochondrial support, cognitive clarity" },
            { name: "Creatine Monohydrate (Lifting Days Only)", dose: "5g", notes: "With Food, Supports ATP & cognitive function" },
            { name: "Nootropic Stack Capsule (Second Dose, If Needed)", dose: "1 Capsule (400mg)", notes: "Fasted OK, Must be taken 8 hours apart from first dose" }
        ]
    },
    {
        time: "Evening (~7-8 PM, Recovery & Sleep Optimization)",
        supplements: [
            { name: "Beef Liver OR Lightly Cooked Fish (Tuna, Mahi, Snapper)", dose: "-", notes: "With Food, High in B vitamins + Zinc for dopamine recovery" },
            { name: "Avocado", dose: "-", notes: "With Food, Healthy fats for brain function" },
            { name: "Glycine", dose: "1000 mg", notes: "With Food, Optional for Sleep, Calming neurotransmitter" },
            { name: "Taurine", dose: "500 mg", notes: "With Food, GABA support, reduces stress" },
            { name: "Magnesium", dose: "200 mg", notes: "With Food, Enhances sleep & muscle relaxation" }
        ]
    },
    {
        time: "Nighttime (~9-10 PM, Sleep Optimization)",
        supplements: [
            { name: "Chamomile OR Lemon Balm Tea", dose: "-", notes: "Fasted OK, Prepares body for sleep" },
            { name: "Inositol", dose: "500-1000 mg", notes: "Fasted OK, Reduces overactive thoughts & anxiety" },
            { name: "Glycine + Taurine + Magnesium (if not taken earlier)", dose: "-", notes: "Fasted OK, Supports deep sleep" }
        ]
    }
];

module.exports = supplementPlan;
