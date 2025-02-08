import React, { useState, useEffect } from 'react';

const MealPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(() => {
    const weekday = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return weekday;
  });
  
  const [completedMeals, setCompletedMeals] = useState(() => {
    const saved = localStorage.getItem('completedMeals');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('completedMeals', JSON.stringify(completedMeals));
  }, [completedMeals]);

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

  const toggleMealCompletion = (mealTime) => {
    const mealKey = `${currentDate.toISOString().split('T')[0]}-${mealTime}`;
    setCompletedMeals(prev => ({
      ...prev,
      [mealKey]: !prev[mealKey]
    }));
  };

  const isMealCompleted = (mealTime) => {
    const mealKey = `${currentDate.toISOString().split('T')[0]}-${mealTime}`;
    return completedMeals[mealKey] || false;
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Keto-Cycling Meal Plan</h1>
      
      {/* Date Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '15px',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <button 
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() - 1);
            setCurrentDate(newDate);
          }}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          Previous
        </button>
        <div style={{ 
          fontWeight: 'bold',
          padding: '8px 16px',
          minWidth: '150px',
          textAlign: 'center'
        }}>
          {currentDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
        <button 
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + 1);
            setCurrentDate(newDate);
          }}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          Next
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{
              padding: '10px',
              backgroundColor: selectedDay === day ? '#e0e0e0' : 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {day.charAt(0).toUpperCase() + day.slice(1, 3)}
          </button>
        ))}
      </div>

      {mealPlanData[selectedDay] && (
        <div>
          <h2>{mealPlanData[selectedDay].type}</h2>
          <div style={{ marginBottom: '20px' }}>
            {mealPlanData[selectedDay].goals.map((goal, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  padding: '5px 10px',
                  margin: '5px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '15px'
                }}
              >
                {goal}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div><strong>Total Carbs:</strong> {mealPlanData[selectedDay].totalCarbs}</div>
            <div><strong>Total Calories:</strong> {mealPlanData[selectedDay].totalCalories}</div>
            <div><strong>Liver Intake:</strong> {mealPlanData[selectedDay].liver}</div>
          </div>

          {mealPlanData[selectedDay].meals.map((meal, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{meal.time}</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={isMealCompleted(meal.time)}
                    onChange={() => toggleMealCompletion(meal.time)}
                  />
                  Complete
                </label>
              </div>
              <table style={{ width: '100%', marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Food</th>
                    <th style={{ textAlign: 'left' }}>Portion</th>
                    <th style={{ textAlign: 'right' }}>Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {meal.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.name}</td>
                      <td>{item.portion}</td>
                      <td style={{ textAlign: 'right' }}>{item.calories} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealPlanner;