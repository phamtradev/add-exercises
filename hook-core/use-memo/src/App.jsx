import { useState, useMemo } from 'react'

function App() {
  const [soLuong, setSoLuong] = useState(0)
  const [ten, setTen] = useState('')

  const tinhToanPhucTap = (n) => {
    console.log('Đang tính toán...')
    let ketQua = 0
    for (let i = 0; i < n * 1000000; i++) {
      ketQua += i
    }
    return ketQua
  }

  const ketQuaKhongMemo = tinhToanPhucTap(soLuong)

  const ketQuaCoMemo = useMemo(() => {
    return tinhToanPhucTap(soLuong)
  }, [soLuong])

  return (
    <div className="container">
      <h1>Bài tập useMemo</h1>
      
      <div className="section">
        <input
          type="text"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          placeholder="Nhập tên..."
          className="input-field"
        />
        <p>Xin chào: {ten}</p>
      </div>

      <div className="section">
        <h2>Đếm số: {soLuong}</h2>
        <div className="button-group">
          <button onClick={() => setSoLuong(soLuong - 1)}>
            Giảm
          </button>
          <button onClick={() => setSoLuong(soLuong + 1)}>
            Tăng
          </button>
        </div>
      </div>

      <div className="section">
        <h2>Kết quả không dùng useMemo</h2>
        <p>Giá trị: {ketQuaKhongMemo}</p>
        <p className="note">Tính toán lại mỗi lần render (kể cả khi chỉ đổi tên)</p>
      </div>

      <div className="section">
        <h2>Kết quả dùng useMemo</h2>
        <p>Giá trị: {ketQuaCoMemo}</p>
        <p className="note">Chỉ tính toán lại khi soLuong thay đổi</p>
      </div>
    </div>
  )
}

export default App
