import React, { useState, useEffect } from 'react';

const MealPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(() => {
    const weekday = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return weekday;
  });
  
  const [mealData, setMealData] = useState(() => {
    const saved = localStorage.getItem('mealData');
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

  useEffect(() => {
    localStorage.setItem('mealData', JSON.stringify(mealData));
  }, [mealData]);

  useEffect(() => {
    localStorage.setItem('mealComments', JSON.stringify(mealComments));
  }, [mealComments]);

  const getDateKey = (date) => date.toISOString().split('T')[0];

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

  const calculateStats = () => {
    const today = getDateKey(currentDate);
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekStats = {
      total: 0,
      completed: 0
    };

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateKey = getDateKey(date);
      
      const dayMeals = Object.keys(mealData).filter(key => key.startsWith(dateKey));
      weekStats.total += dayMeals.length;
      weekStats.completed += dayMeals.filter(key => mealData[key]?.completed).length;
    }

    return {
      weeklyPercentage: (weekStats.completed / weekStats.total) * 100 || 0,
      todayPercentage: calculateDayPercentage(today)
    };
  };

  const calculateDayPercentage = (dateKey) => {
    const dayMeals = Object.keys(mealData).filter(key => key.startsWith(dateKey));
    const completed = dayMeals.filter(key => mealData[key]?.completed).length;
    return (completed / dayMeals.length) * 100 || 0;
  };

  const Dashboard = () => {
    const stats = calculateStats();
    return (
      <div className="dashboard">
        <h2>Progress Dashboard</h2>
        <div className="stats">
          <div className="stat-item">
            <h3>Today's Progress</h3>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${stats.todayPercentage}%` }}
              />
            </div>
            <span>{Math.round(stats.todayPercentage)}% Complete</span>
          </div>
          <div className="stat-item">
            <h3>Weekly Progress</h3>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${stats.weeklyPercentage}%` }}
              />
            </div>
            <span>{Math.round(stats.weeklyPercentage)}% Complete</span>
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

  const mealPlanData = {
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
            { name: 'Coffee + Coconut Oil', portion: '1 tbsp coconut oil', calories: 120 }
          ]
        },
        {
          time: 'Meal 1 (~11 AM)',
          items: [
            { name: 'Beef (or Chicken) + Butter', portion: '8-10 oz + 1 tbsp butter', calories: 600 },
            { name: 'Avocado', portion: '½ medium', calories: 120 },
            { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
          ]
        },
        {
          time: 'Meal 2 (~4 PM)',
          items: [
            { name: 'Mahi Mahi OR Tuna', portion: '8-10 oz', calories: 400 },
            { name: 'Eggs', portion: '2 eggs', calories: 160 }
          ]
        },
        {
          time: 'Meal 3 (~8 PM)',
          items: [
            { name: 'Beef Liver', portion: '4-6 oz', calories: 350 },
            { name: 'Avocado', portion: '½ medium', calories: 120 },
            { name: 'Chamomile OR Lemon Balm Tea', portion: '1 cup', calories: 0 }
          ]
        }
      ]
    },
    tuesday: {
      type: 'Strict Keto Day (With Honey)',
      goals: ['Continue fat-burning', 'Small honey boost for energy'],
      totalCarbs: '30-40g',
      totalCalories: '2000-2200',
      liver: '4 oz chicken liver',
      meals: [
        {
          time: 'Pre-Walk (~10 AM)',
          items: [
            { name: 'Honey', portion: '1 tsp', calories: 20 }
          ]
        },
        {
          time: 'Meal 1 (~12 PM)',
          items: [
            { name: 'Eggs + Butter', portion: '3 eggs + 1 tbsp butter', calories: 400 },
            { name: 'Fresh Fish', portion: '8 oz', calories: 350 }
          ]
        },
        {
          time: 'Meal 2 (~4 PM)',
          items: [
            { name: 'Beef + Avocado', portion: '8 oz + ½ avocado', calories: 600 },
            { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
          ]
        },
        {
          time: 'Meal 3 (~8 PM)',
          items: [
            { name: 'Chicken Liver', portion: '4 oz', calories: 300 }
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
            { name: 'Honey + Banana', portion: '1 tbsp honey + ½ banana', calories: 100 }
          ]
        },
        {
          time: 'Meal 1 (~12 PM)',
          items: [
            { name: 'Beef + Sweet Potato', portion: '8 oz + ½ cup', calories: 550 },
            { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
          ]
        },
        {
          time: 'Meal 2 (~4 PM)',
          items: [
            { name: 'Beef/Chicken + Rice', portion: '8 oz + ½ cup rice', calories: 550 },
            { name: 'Banana/Pineapple', portion: '½ fruit', calories: 50 }
          ]
        },
        {
          time: 'Meal 3 (~8 PM)',
          items: [
            { name: 'Fish + Avocado', portion: '6 oz + ½ avocado', calories: 450 }
          ]
        }
      ]
    },
    thursday: {
      type: 'Strict Keto Day',
      goals: ['Return to ketosis', 'Maintain stable energy'],
      totalCarbs: '30-40g',
      totalCalories: '2000-2200',
      liver: '6 oz beef liver',
      meals: [
        {
          time: 'Meal 1 (~12 PM)',
          items: [
            { name: 'Eggs + Fish', portion: '3 eggs + 8 oz fish', calories: 500 }
          ]
        },
        {
          time: 'Meal 2 (~4 PM)',
          items: [
            { name: 'Beef + Butter + Sauerkraut', portion: '8 oz + 1 tbsp butter', calories: 550 }
          ]
        },
        {
          time: 'Meal 3 (~8 PM)',
          items: [
            { name: 'Beef Liver', portion: '6 oz', calories: 450 }
          ]
        }
      ]
    },
    friday: {
      type: 'Strict Keto Day',
      goals: ['Deep fat-burning', 'Satiety', 'Nutrient rebalancing'],
      totalCarbs: '30-40g',
      totalCalories: '2000-2200',
      liver: '4-6 oz beef liver',
      meals: [
        {
          time: 'Meal 1 (~12 PM)',
          items: [
            { name: 'Eggs + Fish', portion: '3 eggs + 8 oz fish', calories: 500 }
          ]
        },
        {
          time: 'Meal 2 (~4 PM)',
          items: [
            { name: 'Beef + Butter', portion: '8 oz + 1 tbsp butter', calories: 550 },
            { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
          ]
        },
        {
          time: 'Meal 3 (~8 PM)',
          items: [
            { name: 'Beef Liver', portion: '4-6 oz', calories: 450 }
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
            { name: 'Honey + Banana', portion: '1 tbsp honey + ½ banana', calories: 100 }
          ]
        },
        {
          time: 'Meal 1 (~12 PM)',
          items: [
            { name: 'Beef + Sweet Potato', portion: '8 oz + ½ cup', calories: 550 },
            { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
          ]
        },
        {
          time: 'Meal 2 (~4 PM)',
          items: [
            { name: 'Beef/Chicken + Rice', portion: '8 oz + ½ cup rice', calories: 550 },
            { name: 'Banana/Pineapple', portion: '½ fruit', calories: 50 }
          ]
        }
      ]
    },
    sunday: {
      type: 'Strict Keto Day',
      goals: ['Fat adaptation', 'Recovery'],
      totalCarbs: '30-40g',
      totalCalories: '2000-2200',
      liver: 'None',
      meals: [
        {
          time: 'Meal 1 (~12 PM)',
          items: [
            { name: 'Eggs + Fish', portion: '3 eggs + 8 oz fish', calories: 500 }
          ]
        },
        {
          time: 'Meal 2 (~4 PM)',
          items: [
            { name: 'Beef + Butter', portion: '8 oz + 1 tbsp butter', calories: 550 },
            { name: 'Sauerkraut', portion: '¼ cup', calories: 10 }
          ]
        },
        {
          time: 'Meal 3 (~8 PM)',
          items: [
            { name: 'Chicken + Avocado', portion: '8 oz + ½ avocado', calories: 450 }
          ]
        }
      ]
    }
  };

  const isMealCompleted = (mealTime) => {
    const mealKey = `${currentDate.toISOString().split('T')[0]}-${mealTime}`;
    return mealData[mealKey]?.completed || false;
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="meal-planner">
      <Dashboard />
      
      <div className="date-navigation">
        <button onClick={() => setCurrentDate(prev => {
          const newDate = new Date(prev);
          newDate.setDate(prev.getDate() - 1);
          return newDate;
        })}>Previous Day</button>
        
        <h2>{currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</h2>
        
        <button onClick={() => setCurrentDate(prev => {
          const newDate = new Date(prev);
          newDate.setDate(prev.getDate() + 1);
          return newDate;
        })}>Next Day</button>
      </div>

      <div className="meal-plan">
        {mealPlanData[selectedDay]?.meals.map((meal, index) => (
          <div key={index} className="meal-item">
            <div className="meal-header">
              <h3>{meal.time}</h3>
              <div className="meal-actions">
                <button 
                  onClick={() => handleCommentOpen(meal.time)}
                  className="comment-button"
                >
                  💭 Comment
                </button>
                <input
                  type="checkbox"
                  checked={isMealCompleted(meal.time)}
                  onChange={() => toggleMealCompletion(meal.time)}
                />
              </div>
            </div>
            {mealComments[`${getDateKey(currentDate)}-${meal.time}`] && (
              <div className="meal-comment">
                📝 {mealComments[`${getDateKey(currentDate)}-${meal.time}`]}
              </div>
            )}
            <div className="meal-items">
              {meal.items.map((item, itemIndex) => (
                <div key={itemIndex} className="meal-item-detail">
                  {item.name} - {item.portion} ({item.calories} cal)
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <CommentModal />
    </div>
  );
};

export default MealPlanner;