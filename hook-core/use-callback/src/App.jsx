import { useState, useCallback, memo } from 'react'

const ChildComponent = memo(({ onIncrement, ten }) => {
  console.log('ChildComponent render')
  return (
    <div className="child-box">
      <p>Xin chào: {ten}</p>
      <button onClick={onIncrement}>Tăng từ child</button>
    </div>
  )
})

function App() {
  const [soLuong, setSoLuong] = useState(0)
  const [ten, setTen] = useState('')

  const handleIncrementKhongCallback = () => {
    setSoLuong(soLuong + 1)
  }

  const handleIncrementCoCallback = useCallback(() => {
    setSoLuong(prev => prev + 1)
  }, [])

  return (
    <div className="container">
      
      <div className="section">
        <h2>Đếm số: {soLuong}</h2>
        <input
          type="text"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          placeholder="Nhập tên..."
          className="input-field"
        />
      </div>

      <div className="section">
        <h2>Không dùng useCallback</h2>
        <ChildComponent 
          onIncrement={handleIncrementKhongCallback}
          ten={ten}
        />
        <p className="note">ChildComponent render lại mỗi lần đổi tên</p>
      </div>

      <div className="section">
        <h2>Dùng useCallback</h2>
        <ChildComponent 
          onIncrement={handleIncrementCoCallback}
          ten={ten}
        />
        <p className="note">ChildComponent không render lại khi chỉ đổi tên</p>
      </div>
    </div>
  )
}

export default App
