import React, { useState } from 'react';
import './App.css';
import MealPlanner from './MealPlanner';
import SupplementPlanner from './SupplementPlanner';

function App() {
  const [mode, setMode] = useState('meals'); // 'meals' or 'supplements'

  return (
    <div className="App">
      <div className="mode-toggle">
        <button 
          className={`mode-button ${mode === 'meals' ? 'active' : ''}`}
          onClick={() => setMode('meals')}
        >
          Meals
        </button>
        <button 
          className={`mode-button ${mode === 'supplements' ? 'active' : ''}`}
          onClick={() => setMode('supplements')}
        >
          Supplements
        </button>
      </div>
      {mode === 'meals' ? <MealPlanner /> : <SupplementPlanner />}
    </div>
  );
}

export default App;