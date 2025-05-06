import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'prismjs/themes/prism-tomorrow.css'
import './App.css'
import prism from "prismjs"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <div className="left">
          <div className="code"></div>
          <div className="review"></div>
        </div>
        <div className="right"></div>
      </main>
    </>
  )
}

export default App
