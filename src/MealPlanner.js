import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const initialMealPlanData = {
  monday: {
    type: 'Strict Keto Day',
    goals: ['Fat-burning', 'Low insulin response', 'High satiety'],
    totalCarbs: '30-40g',
    totalCalories: '2200-2400',
    liver: '4-6 oz beef liver',
    meals: [
      {
        time: 'Morning (Fasted) OR Coffee',
        items: [
          {
            name: 'Coffee + Coconut Oil',
            portions: {
              regular: { portion: '1 tbsp coconut oil', calories: 120 },
              large: { portion: '1.5 tbsp coconut oil', calories: 180 }
            }
          }
        ]
      },
      {
        time: 'Meal 1 (~11 AM)',
        items: [
          {
            name: 'Beef (or Chicken) + Butter',
            portions: {
              regular: { portion: '8-10 oz + 1 tbsp butter', calories: 600 },
              large: { portion: '10-12 oz + 1 tbsp butter', calories: 750 }
            }
          },
          {
            name: 'Avocado',
            portions: {
              regular: { portion: '½ medium', calories: 120 },
              large: { portion: '1 medium', calories: 240 }
            }
          },
          { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
        ]
      },
      {
        time: 'Meal 2 (~4 PM)',
        items: [
          {
            name: 'Mahi Mahi OR Tuna',
            portions: {
              regular: { portion: '8-10 oz', calories: 400 },
              large: { portion: '10-12 oz', calories: 500 }
            }
          },
          {
            name: 'Eggs + Butter',
            portions: {
              regular: { portion: '2 eggs + 1 tbsp butter', calories: 260 },
              large: { portion: '3 eggs + 1 tbsp butter', calories: 360 }
            }
          }
        ]
      },
      {
        time: 'Meal 3 (~8 PM)',
        items: [
          {
            name: 'Beef Liver',
            portions: {
              regular: { portion: '4 oz', calories: 350 },
              large: { portion: '6 oz', calories: 450 }
            }
          },
          {
            name: 'Avocado',
            portions: {
              regular: { portion: '½ medium', calories: 120 },
              large: { portion: '1 medium', calories: 240 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          { name: 'Chamomile OR Lemon Balm Tea', portion: '1 cup', calories: 0 }
        ]
      }
    ]
  },
  tuesday: {
    type: 'Strict Keto Day (With Honey)',
    goals: ['Continue fat-burning', 'Small honey boost for energy'],
    totalCarbs: '30-40g',
    totalCalories: '2200-2400',
    liver: '4 oz chicken liver',
    meals: [
      {
        time: 'Pre-Walk (~10 AM)',
        items: [
          { name: 'Honey', portion: '1 tsp', calories: 20 },
          {
            name: 'Coffee + Coconut Oil',
            portions: {
              regular: { portion: '1 tbsp coconut oil', calories: 120 },
              large: { portion: '1.5 tbsp coconut oil', calories: 180 }
            }
          }
        ]
      },
      {
        time: 'Meal 1 (~12 PM)',
        items: [
          {
            name: 'Eggs + Butter',
            portions: {
              regular: { portion: '3 eggs + 1 tbsp butter', calories: 400 },
              large: { portion: '4 eggs + 1.5 tbsp butter', calories: 550 }
            }
          },
          {
            name: 'Fresh Fish',
            portions: {
              regular: { portion: '8-10 oz', calories: 350 },
              large: { portion: '10-12 oz', calories: 450 }
            }
          }
        ]
      },
      {
        time: 'Meal 2 (~4 PM)',
        items: [
          {
            name: 'Beef + Avocado',
            portions: {
              regular: { portion: '8-10 oz + ½ avocado', calories: 600 },
              large: { portion: '10-12 oz + ½ avocado', calories: 750 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
        ]
      },
      {
        time: 'Meal 3 (~8 PM)',
        items: [
          {
            name: 'Chicken Liver',
            portions: {
              regular: { portion: '4 oz', calories: 300 },
              large: { portion: '6 oz', calories: 450 }
            }
          },
          {
            name: 'Avocado',
            portions: {
              regular: { portion: '½ medium', calories: 120 },
              large: { portion: '1 medium', calories: 240 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          }
        ]
      }
    ]
  },
  wednesday: {
    type: 'Carb Refeed Day',
    goals: ['Refuel glycogen', 'Metabolic reset', 'Hormone support'],
    totalCarbs: '100-120g',
    totalCalories: '2200-2400',
    liver: 'None (Refeed day)',
    meals: [
      {
        time: 'Pre-Workout (~10 AM)',
        items: [
          {
            name: 'Honey + Banana',
            portions: {
              regular: { portion: '1 tbsp honey + ½ banana', calories: 100 },
              large: { portion: '1.5 tbsp honey + 1 banana', calories: 150 }
            }
          },
          {
            name: 'Coffee + Coconut Oil',
            portions: {
              regular: { portion: '1 tbsp coconut oil', calories: 120 },
              large: { portion: '1.5 tbsp coconut oil', calories: 180 }
            }
          }
        ]
      },
      {
        time: 'Meal 1 (~12 PM)',
        items: [
          {
            name: 'Beef + Sweet Potato',
            portions: {
              regular: { portion: '8-10 oz + ½ cup', calories: 550 },
              large: { portion: '10-12 oz + ¾ cup', calories: 700 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
        ]
      },
      {
        time: 'Meal 2 (~4 PM)',
        items: [
          {
            name: 'Beef/Chicken + Rice',
            portions: {
              regular: { portion: '8-10 oz + ½ cup rice', calories: 550 },
              large: { portion: '10-12 oz + ¾ cup rice', calories: 700 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          {
            name: 'Banana/Pineapple',
            portions: {
              regular: { portion: '½ fruit', calories: 50 },
              large: { portion: '1 fruit', calories: 100 }
            }
          }
        ]
      },
      {
        time: 'Meal 3 (~8 PM)',
        items: [
          {
            name: 'Fish + Avocado',
            portions: {
              regular: { portion: '8-10 oz + ½ avocado', calories: 450 },
              large: { portion: '10-12 oz + ½ avocado', calories: 570 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          {
            name: 'Eggs',
            portions: {
              regular: { portion: '2 eggs', calories: 160 },
              large: { portion: '3 eggs', calories: 240 }
            }
          }
        ]
      }
    ]
  },
  thursday: {
    type: 'Strict Keto Day',
    goals: ['Return to ketosis', 'Maintain stable energy'],
    totalCarbs: '30-40g',
    totalCalories: '2200-2400',
    liver: '6 oz beef liver',
    meals: [
      {
        time: 'Morning (Fasted) OR Coffee',
        items: [
          {
            name: 'Coffee + Coconut Oil',
            portions: {
              regular: { portion: '1 tbsp coconut oil', calories: 120 },
              large: { portion: '1.5 tbsp coconut oil', calories: 180 }
            }
          }
        ]
      },
      {
        time: 'Meal 1 (~12 PM)',
        items: [
          {
            name: 'Eggs + Fish',
            portions: {
              regular: { portion: '3 eggs + 8-10 oz fish', calories: 500 },
              large: { portion: '3 eggs + 10-12 oz fish', calories: 650 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          }
        ]
      },
      {
        time: 'Meal 2 (~4 PM)',
        items: [
          {
            name: 'Beef + Butter + Sauerkraut',
            portions: {
              regular: { portion: '8-10 oz + 1 tbsp butter', calories: 600 },
              large: { portion: '10-12 oz + 1 tbsp butter', calories: 750 }
            }
          },
          {
            name: 'Avocado',
            portions: {
              regular: { portion: '½ medium', calories: 120 },
              large: { portion: '1 medium', calories: 240 }
            }
          }
        ]
      },
      {
        time: 'Meal 3 (~8 PM)',
        items: [
          {
            name: 'Beef Liver',
            portions: {
              regular: { portion: '4 oz', calories: 350 },
              large: { portion: '6 oz', calories: 450 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          {
            name: 'Avocado',
            portions: {
              regular: { portion: '½ medium', calories: 120 },
              large: { portion: '1 medium', calories: 240 }
            }
          }
        ]
      }
    ]
  },
  friday: {
    type: 'Strict Keto Day',
    goals: ['Deep fat-burning', 'Satiety', 'Nutrient rebalancing'],
    totalCarbs: '30-40g',
    totalCalories: '2200-2400',
    liver: '4-6 oz beef liver',
    meals: [
      {
        time: 'Morning (Fasted) OR Coffee',
        items: [
          {
            name: 'Coffee + Coconut Oil',
            portions: {
              regular: { portion: '1 tbsp coconut oil', calories: 120 },
              large: { portion: '1.5 tbsp coconut oil', calories: 180 }
            }
          }
        ]
      },
      {
        time: 'Meal 1 (~12 PM)',
        items: [
          {
            name: 'Eggs + Fish',
            portions: {
              regular: { portion: '3 eggs + 8-10 oz fish', calories: 500 },
              large: { portion: '3 eggs + 10-12 oz fish', calories: 650 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          }
        ]
      },
      {
        time: 'Meal 2 (~4 PM)',
        items: [
          {
            name: 'Beef + Butter',
            portions: {
              regular: { portion: '8-10 oz + 1 tbsp butter', calories: 600 },
              large: { portion: '10-12 oz + 1 tbsp butter', calories: 750 }
            }
          },
          {
            name: 'Avocado',
            portions: {
              regular: { portion: '½ medium', calories: 120 },
              large: { portion: '1 medium', calories: 240 }
            }
          },
          { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
        ]
      },
      {
        time: 'Meal 3 (~8 PM)',
        items: [
          {
            name: 'Beef Liver',
            portions: {
              regular: { portion: '4 oz', calories: 350 },
              large: { portion: '6 oz', calories: 450 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          {
            name: 'Avocado',
            portions: {
              regular: { portion: '½ medium', calories: 120 },
              large: { portion: '1 medium', calories: 240 }
            }
          }
        ]
      }
    ]
  },
  saturday: {
    type: 'Carb Refeed Day',
    goals: ['Glycogen replenishment', 'Performance support'],
    totalCarbs: '100-120g',
    totalCalories: '2200-2400',
    liver: 'None (Refeed day)',
    meals: [
      {
        time: 'Pre-Workout (~10 AM)',
        items: [
          {
            name: 'Honey + Banana',
            portions: {
              regular: { portion: '1 tbsp honey + ½ banana', calories: 100 },
              large: { portion: '1.5 tbsp honey + 1 banana', calories: 150 }
            }
          },
          {
            name: 'Coffee + Coconut Oil',
            portions: {
              regular: { portion: '1 tbsp coconut oil', calories: 120 },
              large: { portion: '1.5 tbsp coconut oil', calories: 180 }
            }
          }
        ]
      },
      {
        time: 'Meal 1 (~12 PM)',
        items: [
          {
            name: 'Beef + Sweet Potato',
            portions: {
              regular: { portion: '8-10 oz + ½ cup', calories: 550 },
              large: { portion: '10-12 oz + ¾ cup', calories: 700 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
        ]
      },
      {
        time: 'Meal 2 (~4 PM)',
        items: [
          {
            name: 'Beef/Chicken + Rice',
            portions: {
              regular: { portion: '8-10 oz + ½ cup rice', calories: 550 },
              large: { portion: '10-12 oz + ¾ cup rice', calories: 700 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          {
            name: 'Banana/Pineapple',
            portions: {
              regular: { portion: '½ fruit', calories: 50 },
              large: { portion: '1 fruit', calories: 100 }
            }
          }
        ]
      },
      {
        time: 'Meal 3 (~8 PM)',
        items: [
          {
            name: 'Fish + Avocado',
            portions: {
              regular: { portion: '8-10 oz + ½ avocado', calories: 450 },
              large: { portion: '10-12 oz + ½ avocado', calories: 570 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          {
            name: 'Eggs',
            portions: {
              regular: { portion: '2 eggs', calories: 160 },
              large: { portion: '3 eggs', calories: 240 }
            }
          }
        ]
      }
    ]
  },
  sunday: {
    type: 'Strict Keto Day',
    goals: ['Fat adaptation', 'Recovery'],
    totalCarbs: '30-40g',
    totalCalories: '2200-2400',
    liver: 'None',
    meals: [
      {
        time: 'Morning (Fasted) OR Coffee',
        items: [
          {
            name: 'Coffee + Coconut Oil',
            portions: {
              regular: { portion: '1 tbsp coconut oil', calories: 120 },
              large: { portion: '1.5 tbsp coconut oil', calories: 180 }
            }
          }
        ]
      },
      {
        time: 'Meal 1 (~12 PM)',
        items: [
          {
            name: 'Eggs + Fish',
            portions: {
              regular: { portion: '3 eggs + 8-10 oz fish', calories: 500 },
              large: { portion: '3 eggs + 10-12 oz fish', calories: 650 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          }
        ]
      },
      {
        time: 'Meal 2 (~4 PM)',
        items: [
          {
            name: 'Beef + Butter',
            portions: {
              regular: { portion: '8-10 oz + 1 tbsp butter', calories: 600 },
              large: { portion: '10-12 oz + 1 tbsp butter', calories: 750 }
            }
          },
          {
            name: 'Avocado',
            portions: {
              regular: { portion: '½ medium', calories: 120 },
              large: { portion: '1 medium', calories: 240 }
            }
          },
          { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
        ]
      },
      {
        time: 'Meal 3 (~8 PM)',
        items: [
          {
            name: 'Chicken + Avocado',
            portions: {
              regular: { portion: '8-10 oz + ½ avocado', calories: 450 },
              large: { portion: '10-12 oz + ½ avocado', calories: 570 }
            }
          },
          {
            name: 'Butter',
            portions: {
              regular: { portion: '1 tbsp', calories: 100 },
              large: { portion: '1.5 tbsp', calories: 150 }
            }
          },
          {
            name: 'Eggs',
            portions: {
              regular: { portion: '2 eggs', calories: 160 },
              large: { portion: '3 eggs', calories: 240 }
            }
          }
        ]
      }
    ]
  }
};

const MealPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(() => {
    const weekday = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return weekday;
  });
  
  const [mealPlanData, setMealPlanData] = useState(initialMealPlanData);
  const [mealData, setMealData] = useState(() => {
    const saved = localStorage.getItem('mealData');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [portionSizes, setPortionSizes] = useState(() => {
    const saved = localStorage.getItem('portionSizes');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [addedMeals, setAddedMeals] = useState(() => {
    const saved = localStorage.getItem('addedMeals');
    return saved ? JSON.parse(saved) : {};
  });

  const [mealComments, setMealComments] = useState(() => {
    const saved = localStorage.getItem('mealComments');
    return saved ? JSON.parse(saved) : {};
  });

  const [commentModal, setCommentModal] = useState({
    isOpen: false,
    mealKey: null,
    comment: ''
  });

  const [showExpandedStats, setShowExpandedStats] = useState(false);
  const [activeMealSwap, setActiveMealSwap] = useState(null);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMealTime, setNewMealTime] = useState('12:00 PM');
  const [selectedMealTemplate, setSelectedMealTemplate] = useState('');
  const timeOptions = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ];
  const swapMenuRef = useRef(null);
  const swapButtonRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('mealData', JSON.stringify(mealData));
  }, [mealData]);

  useEffect(() => {
    localStorage.setItem('mealComments', JSON.stringify(mealComments));
  }, [mealComments]);

  useEffect(() => {
    localStorage.setItem('portionSizes', JSON.stringify(portionSizes));
  }, [portionSizes]);

  useEffect(() => {
    localStorage.setItem('addedMeals', JSON.stringify(addedMeals));
  }, [addedMeals]);

  useEffect(() => {
    const weekday = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    setSelectedDay(weekday);
  }, [currentDate]);

  useEffect(() => {
    // Clean up any unwanted meals from localStorage
    const cleanupMealData = () => {
      const updatedMealData = { ...mealData };
      Object.keys(updatedMealData).forEach(key => {
        if (key.includes('2:00 PM')) {
          const [dateStr] = key.split('-');
          const date = new Date(dateStr);
          const day = date.getDay();
          if (day === 6) {
            delete updatedMealData[key];
          }
        }
      });
      setMealData(updatedMealData);
    };
    
    cleanupMealData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMealSwap !== null &&
          swapMenuRef.current &&
          !swapMenuRef.current.contains(event.target) &&
          swapButtonRef.current &&
          !swapButtonRef.current.contains(event.target)) {
        setActiveMealSwap(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMealSwap]);

  const getDateKey = (date) => date.toISOString().split('T')[0];

  const convertTo24Hour = (time12h) => {
    const timeMatch = time12h.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
    if (!timeMatch) return '00:00';
    
    let [_, hours, minutes = '00', modifier] = timeMatch;
    hours = parseInt(hours);
    
    if (hours === 12) {
      hours = modifier.toUpperCase() === 'PM' ? 12 : 0;
    } else if (modifier.toUpperCase() === 'PM') {
      hours = hours + 12;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  const isMealCompleted = useCallback((mealTime) => {
    const mealKey = `${currentDate.toISOString().split('T')[0]}-${mealTime}`;
    return mealData[mealKey]?.completed || false;
  }, [currentDate, mealData]);

  const getPortionSize = (mealTime) => {
    const dateKey = getDateKey(currentDate);
    const mealKey = `${dateKey}-${mealTime}`;
    return portionSizes[mealKey] || 'regular';
  };

  const togglePortionSize = (mealTime) => {
    const dateKey = getDateKey(currentDate);
    const mealKey = `${dateKey}-${mealTime}`;
    setPortionSizes(prev => ({
      ...prev,
      [mealKey]: prev[mealKey] === 'regular' ? 'large' : 'regular'
    }));
  };

  const getMealItemsWithPortionSize = (meal) => {
    const currentPortionSize = getPortionSize(meal.time);
    
    return meal.items.map(item => {
      if (item.portions) {
        return {
          ...item,
          portion: item.portions[currentPortionSize].portion,
          calories: item.portions[currentPortionSize].calories
        };
      }
      return item;
    });
  };

  const getMealsForCurrentDate = useCallback(() => {
    const dateKey = getDateKey(currentDate);
    const defaultMeals = mealPlanData[selectedDay]?.meals || [];
    const dateSpecificMeals = addedMeals[dateKey] || [];
    
    // Combine and sort all meals
    return [...defaultMeals, ...dateSpecificMeals].sort((a, b) => {
      const timeA = convertTo24Hour(a.time);
      const timeB = convertTo24Hour(b.time);
      return timeA.localeCompare(timeB);
    });
  }, [currentDate, selectedDay, mealPlanData, addedMeals]);

  const calculateStats = useCallback(() => {
    const todayMeals = getMealsForCurrentDate();
    const totalCaloriesTarget = parseInt(mealPlanData[selectedDay]?.totalCalories?.split('-')[1]) || 2400;
    
    const completedCalories = todayMeals.reduce((acc, meal) => {
      if (isMealCompleted(meal.time)) {
        const items = getMealItemsWithPortionSize(meal);
        return acc + items.reduce((sum, item) => sum + (item.calories || 0), 0);
      }
      return acc;
    }, 0);

    const percentage = Math.round((completedCalories / totalCaloriesTarget) * 100);
    
    return {
      completed: completedCalories,
      total: totalCaloriesTarget,
      percentage,
      overThreshold: completedCalories > totalCaloriesTarget,
      displayPercentage: Math.min(percentage, 100)
    };
  }, [selectedDay, isMealCompleted, getMealsForCurrentDate, getMealItemsWithPortionSize, mealPlanData]);

  const calculateMacros = () => {
    const weeklyCarbs = Object.values(mealPlanData).reduce((acc, day) => {
      const carbs = parseInt(day.totalCarbs) || 0;
      return acc + carbs;
    }, 0);
    
    const weeklyCalories = Object.values(mealPlanData).reduce((acc, day) => {
      const calories = parseInt(day.totalCalories) || 0;
      return acc + calories;
    }, 0);

    return {
      weeklyAvgCarbs: Math.round(weeklyCarbs / 7),
      weeklyAvgCalories: Math.round(weeklyCalories / 7),
      monthlyAvgCarbs: Math.round(weeklyCarbs / 7 * 30),
      monthlyAvgCalories: Math.round(weeklyCalories / 7 * 30)
    };
  };

  const handleMealSwap = (mealIndex, newMealDay, newMealIndex) => {
    const currentMeal = mealPlanData[selectedDay].meals[mealIndex];
    const newMeal = mealPlanData[newMealDay].meals[newMealIndex];
    
    if (newMeal) {
      const dateKey = getDateKey(currentDate);
      const mealKey = `${dateKey}-${currentMeal.time}`;
      const wasCompleted = mealData[mealKey]?.completed || false;
      
      setMealPlanData(prev => {
        const updatedData = { ...prev };
        const updatedMeals = [...prev[selectedDay].meals];
        updatedMeals[mealIndex] = {
          ...newMeal,
          time: currentMeal.time
        };
        updatedData[selectedDay] = {
          ...prev[selectedDay],
          meals: updatedMeals
        };
        return updatedData;
      });
      
      setMealData(prev => ({
        ...prev,
        [mealKey]: {
          ...prev[mealKey],
          completed: wasCompleted
        }
      }));
    }
    
    setActiveMealSwap(null);
  };

  const toggleMealCompletion = (mealTime) => {
    const dateKey = getDateKey(currentDate);
    const mealKey = `${dateKey}-${mealTime}`;
    setMealData(prev => ({
      ...prev,
      [mealKey]: {
        ...prev[mealKey],
        completed: !prev[mealKey]?.completed
      }
    }));
  };

  const handleCommentOpen = (mealTime) => {
    const dateKey = getDateKey(currentDate);
    const mealKey = `${dateKey}-${mealTime}`;
    setCommentModal({
      isOpen: true,
      mealKey,
      comment: mealComments[mealKey] || ''
    });
  };

  const handleCommentSave = () => {
    if (commentModal.mealKey) {
      setMealComments(prev => ({
        ...prev,
        [commentModal.mealKey]: commentModal.comment
      }));
      setCommentModal({ isOpen: false, mealKey: null, comment: '' });
    }
  };

  const getAllMealTemplates = useCallback(() => {
    const templates = [];
    Object.values(mealPlanData).forEach(day => {
      day.meals.forEach(meal => {
        if (!templates.some(t => 
          JSON.stringify(t.items) === JSON.stringify(meal.items)
        )) {
          templates.push({
            items: meal.items,
            description: meal.items.map(item => item.name).join(', ')
          });
        }
      });
    });
    return templates;
  }, [mealPlanData]);

  const handleAddMeal = () => {
    if (!newMealTime || !selectedMealTemplate) return;
    
    const selectedTemplate = getAllMealTemplates().find(t => 
      t.description === selectedMealTemplate
    );
    
    if (!selectedTemplate) return;

    const dateKey = getDateKey(currentDate);
    
    setAddedMeals(prev => ({
      ...prev,
      [dateKey]: [
        ...(prev[dateKey] || []),
        {
          time: newMealTime,
          items: selectedTemplate.items,
          isAdded: true
        }
      ].sort((a, b) => {
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      })
    }));
    
    setShowAddMeal(false);
    setNewMealTime('12:00 PM');
    setSelectedMealTemplate('');
  };

  const handleRemoveMeal = (index) => {
    const dateKey = getDateKey(currentDate);
    const allMeals = getMealsForCurrentDate();
    const mealToRemove = allMeals[index];
    
    // Only proceed if it's an added meal
    if (!mealToRemove.isAdded) return;
    
    setAddedMeals(prev => {
      const updatedDateMeals = (prev[dateKey] || []).filter(meal => 
        meal.time !== mealToRemove.time || 
        JSON.stringify(meal.items) !== JSON.stringify(mealToRemove.items)
      );
      
      const newAddedMeals = { ...prev };
      if (updatedDateMeals.length === 0) {
        delete newAddedMeals[dateKey];
      } else {
        newAddedMeals[dateKey] = updatedDateMeals;
      }
      
      return newAddedMeals;
    });
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const stats = calculateStats();

  const Dashboard = () => {
    const stats = calculateStats();
    const weekStats = useMemo(() => {
      // Get the start of the current week (Monday)
      const weekStart = new Date(currentDate);
      const day = weekStart.getDay();
      const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
      weekStart.setDate(diff);
      
      // Calculate stats for each day of the current week (Monday to Sunday)
      const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const dayKey = getDateKey(date);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        // Get all meals for this day
        const dayMeals = [...(mealPlanData[weekday]?.meals || [])];
        const dateSpecificMeals = addedMeals[dayKey] || [];
        const allMeals = [...dayMeals, ...dateSpecificMeals];

        // Calculate completed calories for this day
        const completedCalories = allMeals.reduce((acc, meal) => {
          const mealKey = `${dayKey}-${meal.time}`;
          if (mealData[mealKey]?.completed) {
            const items = getMealItemsWithPortionSize({ ...meal, time: meal.time });
            return acc + items.reduce((sum, item) => sum + (item.calories || 0), 0);
          }
          return acc;
        }, 0);

        // Get target calories for this day
        const targetCalories = parseInt(mealPlanData[weekday]?.totalCalories?.split('-')[1]) || 2400;
        
        return {
          completed: completedCalories,
          total: targetCalories,
          weekday
        };
      });
      
      // Sum up the totals
      return {
        ...weekDays.reduce((acc, day) => ({
          completed: acc.completed + day.completed,
          total: acc.total + day.total
        }), { completed: 0, total: 0 }),
        days: weekDays
      };
    }, [currentDate, mealData, mealPlanData, addedMeals, getMealItemsWithPortionSize]);

    const weekPercentage = weekStats.total > 0 
      ? Math.round((weekStats.completed / weekStats.total) * 100)
      : 0;
    
    const getProgressColor = (percentage) => {
      if (percentage <= 33) return '#ef4444';  // Red
      if (percentage <= 66) return '#f59e0b';  // Yellow/Orange
      return '#22c55e';  // Green
    };

    return (
      <div className="dashboard">
        <div className="stats-container">
          <div className="stats-section">
            <h3>Today's Progress</h3>
            <div className="progress-container">
              <div className="progress-label">
                <span>Calories</span>
                <span className={stats.overThreshold ? 'over-threshold' : ''}>
                  {stats.completed}/{stats.total} ({stats.percentage}%)
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${stats.overThreshold ? 'over-threshold' : ''}`}
                  style={{ 
                    width: `${stats.displayPercentage}%`,
                    backgroundColor: stats.overThreshold ? '#ef4444' : getProgressColor(stats.percentage),
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="stats-section">
            <h3>Weekly Progress (Mon-Sun)</h3>
            <div className="progress-container">
              <div className="progress-label">
                <span>Week Calories</span>
                <span>{weekStats.completed.toLocaleString()}/{weekStats.total.toLocaleString()} ({weekPercentage}%)</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${weekPercentage}%`,
                    backgroundColor: getProgressColor(weekPercentage)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CommentModal = () => {
    if (!commentModal.isOpen) return null;
    
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Add Comment</h3>
          <textarea
            value={commentModal.comment}
            onChange={(e) => setCommentModal(prev => ({
              ...prev,
              comment: e.target.value
            }))}
            placeholder="Enter your comment..."
          />
          <div className="modal-buttons">
            <button onClick={handleCommentSave}>Save</button>
            <button onClick={() => setCommentModal({ isOpen: false, mealKey: null, comment: '' })}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="meal-planner">
      <header className="header">
        <h1>Keto-Cycling Meal Plan</h1>
        
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

      <Dashboard />

      <div className="daily-overview">
        <h2 className="meal-type">{mealPlanData[selectedDay].type}</h2>
        
        <div className="meal-goals">
          {mealPlanData[selectedDay].goals.map((goal, index) => (
            <span key={index} className="goal-tag">{goal}</span>
          ))}
        </div>

        <div className="meal-stats">
          <div className="stat-item">
            <div className="stat-label">Total Carbs</div>
            <div className="stat-value">{mealPlanData[selectedDay].totalCarbs}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Total Calories</div>
            <div className="stat-value">{mealPlanData[selectedDay].totalCalories}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Liver Intake</div>
            <div className="stat-value">{mealPlanData[selectedDay].liver}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Completion</div>
            <div className="stat-value">{stats.percentage}%</div>
          </div>
        </div>
      </div>

      <div className="meal-list">
        {getMealsForCurrentDate().map((meal, index) => (
          <div key={index} className="meal-item">
            <div className="meal-header">
              <h3>{meal.time}</h3>
              <div className="meal-actions">
                {meal.isAdded && (
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveMeal(index)}
                  >
                    Remove
                  </button>
                )}
                <button
                  className="portion-toggle"
                  onClick={() => togglePortionSize(meal.time)}
                  data-active={getPortionSize(meal.time) === 'large'}
                >
                  <span className="toggle-label">Large Portion</span>
                  <div className="toggle-switch" />
                </button>
                <button 
                  ref={index === activeMealSwap ? swapButtonRef : null}
                  className="swap-button"
                  onClick={() => setActiveMealSwap(activeMealSwap === index ? null : index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                  </svg>
                  Swap
                </button>
                {activeMealSwap === index && (
                  <div ref={swapMenuRef} className="swap-menu">
                    <div className="swap-menu-header">
                      <h4>Swap Meal</h4>
                      <button 
                        className="close-button"
                        onClick={() => setActiveMealSwap(null)}
                      >
                        ×
                      </button>
                    </div>
                    {days
                      .filter(day => day !== selectedDay)
                      .map(day => (
                        <div key={day} className="swap-day-section">
                          <div className="swap-day-header">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                          {mealPlanData[day].meals.map((swapMeal, swapIndex) => (
                            <div 
                              key={`${day}-${swapIndex}`}
                              className="swap-menu-item"
                              onClick={() => handleMealSwap(index, day, swapIndex)}
                            >
                              <div className="swap-meal-info">
                                <div className="swap-meal-time">{swapMeal.time}</div>
                                <div className="swap-meal-items">
                                  {swapMeal.items.map(item => item.name).join(', ')}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                )}
                <input
                  type="checkbox"
                  className="meal-checkbox"
                  checked={isMealCompleted(meal.time)}
                  onChange={() => toggleMealCompletion(meal.time)}
                />
              </div>
            </div>
            <table className="meal-table">
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Portion</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {getMealItemsWithPortionSize(meal).map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.name}</td>
                    <td>{item.portion}</td>
                    <td>{item.calories} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <button 
          className="add-meal-button"
          onClick={() => setShowAddMeal(true)}
        >
          + Add Meal
        </button>
      </div>
      
      <CommentModal />
      
      {showAddMeal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Meal</h3>
            <div className="input-group">
              <label>Select Time</label>
              <select
                value={newMealTime}
                onChange={(e) => setNewMealTime(e.target.value)}
                className="time-select"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Select Meal</label>
              <select
                value={selectedMealTemplate}
                onChange={(e) => setSelectedMealTemplate(e.target.value)}
                className="meal-select"
              >
                <option value="">Select a meal...</option>
                {getAllMealTemplates().map((template, index) => (
                  <option key={index} value={template.description}>
                    {template.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-buttons">
              <button onClick={handleAddMeal}>Add Meal</button>
              <button onClick={() => {
                setShowAddMeal(false);
                setNewMealTime('12:00 PM');
                setSelectedMealTemplate('');
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;