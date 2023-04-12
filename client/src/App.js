import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    async function getServerData() {
      const resp = await fetch('/api/hello');
      const data = await resp.json();

      console.log('Data from server:', data);

      setServerData(data.message);
    }

    getServerData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{serverData}</h1>
      </header>
    </div>
  );
}

export default App;
