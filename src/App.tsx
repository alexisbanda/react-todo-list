// @ts-ignore
import { useState } from 'react'
// @ts-ignore
import reactLogo from './assets/react.svg'
// @ts-ignore
import viteLogo from '/vite.svg'
import './App.css'
// @ts-ignore
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0)
    const goToTodos = () => {
        navigate('/todos');
    };
    const goRegister = () => {
        navigate('/register');
    };
    const goLogin = () => {
        navigate('/login');
    };
  return (
      <>
          <div>
              <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo"/>
              </a>
              <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
              </button>
              <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
              </p>
          </div>
          <p className="read-the-docs">
              Click on the Vite and React logos to learn more
          </p>
          <button onClick={goToTodos}>Ir a la lista de tareas</button>
          <button onClick={goRegister}>Registrar</button>
          <button onClick={goLogin}>Login</button>
      </>
  )
}

export default App
