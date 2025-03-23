import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from "react-router-dom";

import Page1 from './page1';


function App() {
  const [count, setCount] = useState(0)

  const handleRedirect = () => { window.open("https://www.google.com", "_blank"); };
  return (
    <>
    
    <button onClick={handleRedirect}>Go to Target Page</button>
    <Page1 />

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
