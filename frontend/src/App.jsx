import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [tieneToken, setTieneToken] = useState(!!localStorage.getItem('token'));

  if (!tieneToken) {
    return (
      <div onClick={() => setTieneToken(!!localStorage.getItem('token'))}>
        <Login />
      </div>
    );
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;