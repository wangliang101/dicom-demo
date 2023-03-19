import { useReducer, createContext } from 'react';
import { reducer, initialAppOption, APPContext } from '../src/state';
import Routers from './route';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialAppOption);
  console.log('state', state);
  return (
    <APPContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Routers />
      </div>
    </APPContext.Provider>
  );
}

export default App;
