import { useRef, useState } from 'react'

function App() {
  const inputRef = useRef(null)
  const countRef = useRef(0)
  const [renderCount, setRenderCount] = useState(0)

  const handleFocus = () => {
    inputRef.current.focus()
  }

  const handleIncrement = () => {
    countRef.current = countRef.current + 1
    console.log('Giá trị countRef:', countRef.current)
    setRenderCount(renderCount + 1)
  }

  return (
    <div className="container">
      <div className="section">
        <h2>1. Focus Input</h2>
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Nhập text..."
          className="input-field"
        />
        <button onClick={handleFocus}>
          Focus vào input
        </button>
      </div>

      <div className="section">
        <h2>2. Đếm không re-render</h2>
        <p>Số lần render: {renderCount}</p>
        <button onClick={handleIncrement}>
          Tăng countRef
        </button>
      </div>
    </div>
  )
}

export default App
