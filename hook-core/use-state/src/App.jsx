import { useState } from 'react'

function App() {
  const [soLuong, setSoLuong] = useState(0)

  return (
    <div className="container">
      <h1>Đếm số: {soLuong}</h1>
      
      <div className="button-group">
        <button onClick={() => setSoLuong(soLuong - 1)}>
          Giảm
        </button>
        <button onClick={() => setSoLuong(0)}>
          Đặt lại
        </button>
        <button onClick={() => setSoLuong(soLuong + 1)}>
          Tăng
        </button>
      </div>
    </div>
  )
}

export default App
