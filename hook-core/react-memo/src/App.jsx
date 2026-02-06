import { useState } from 'react'
import { memo } from 'react'

const ChildKhongMemo = ({ ten }) => {
  const renderTime = new Date().toLocaleTimeString()

  return (
    <div className="child-box">
      <h3>Child Không Có Memo</h3>
      <p>Tên: {ten}</p>
      <p className="render-time">Lần render cuối: {renderTime}</p>
      <p className="note">Component này re-render mỗi lần component cha re-render</p>
    </div>
  )
}

const ChildCoMemo = memo(({ ten }) => {
  const renderTime = new Date().toLocaleTimeString()

  return (
    <div className="child-box">
      <h3>Child Có Memo</h3>
      <p>Tên: {ten}</p>
      <p className="render-time">Lần render cuối: {renderTime}</p>
      <p className="note">Component này chỉ re-render khi props (ten) thay đổi</p>
    </div>
  )
})

function App() {
  const [counter, setCounter] = useState(0)
  const [ten, setTen] = useState('Nguyễn Văn A')

  return (
    <div className="container">
      <h1>React.memo Demo</h1>
      <div className="control-section">
        <div className="counter-section">
          <h2>Counter: {counter}</h2>
          <button onClick={() => setCounter(counter + 1)} className="btn">
            Tăng Counter
          </button>
        </div>

        <div className="name-section">
          <h2>Thay đổi Tên</h2>
          <input
            type="text"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            className="input-field"
            placeholder="Nhập tên"
          />
        </div>
      </div>

      <div className="children-section">
        <ChildKhongMemo ten={ten} />
        <ChildCoMemo ten={ten} />
      </div>
    </div>
  )
}

export default App
