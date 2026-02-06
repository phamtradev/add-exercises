import { useState } from 'react'

function App() {
  const [ketQua1, setKetQua1] = useState('')
  const [ketQua2, setKetQua2] = useState('')
  const [ketQua3, setKetQua3] = useState('')
  const [taiTrang, setTaiTrang] = useState(false)

  const taoPromise = (ten, thoiGian) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Hoàn thành ${ten} sau ${thoiGian}ms`)
      }, thoiGian)
    })
  }

  const dungThen = () => {
    setKetQua1('Đang xử lý...')
    taoPromise('Task 1', 1000)
      .then((ketQua) => {
        setKetQua1(ketQua)
        return taoPromise('Task 2', 1000)
      })
      .then((ketQua) => {
        setKetQua1(ketQua)
      })
      .catch((loi) => {
        setKetQua1(`Lỗi: ${loi.message}`)
      })
  }

  const dungAsyncAwait = async () => {
    setKetQua2('Đang xử lý...')
    setTaiTrang(true)
    
    try {
      const ketQua1 = await taoPromise('Task 1', 1000)
      setKetQua2(ketQua1)
      
      const ketQua2 = await taoPromise('Task 2', 1000)
      setKetQua2(ketQua2)
    } catch (loi) {
      setKetQua2(`Lỗi: ${loi.message}`)
    } finally {
      setTaiTrang(false)
    }
  }

  const dungPromiseAll = async () => {
    setKetQua3('Đang xử lý...')
    
    try {
      const [ketQua1, ketQua2, ketQua3] = await Promise.all([
        taoPromise('Task 1', 1000),
        taoPromise('Task 2', 1500),
        taoPromise('Task 3', 2000)
      ])
      
      setKetQua3(`Tất cả hoàn thành:\n${ketQua1}\n${ketQua2}\n${ketQua3}`)
    } catch (loi) {
      setKetQua3(`Lỗi: ${loi.message}`)
    }
  }

  return (
    <div className="container">
      <div className="section">
        <h2>1. Dùng .then() (Promise)</h2>
        <button onClick={dungThen}>Chạy với .then()</button>
        <p className="result">{ketQua1 || 'Chưa chạy'}</p>
      </div>

      <div className="section">
        <h2>2. Dùng async/await</h2>
        <button onClick={dungAsyncAwait} disabled={taiTrang}>
          {taiTrang ? 'Đang xử lý...' : 'Chạy với async/await'}
        </button>
        <p className="result">{ketQua2 || 'Chưa chạy'}</p>
      </div>

      <div className="section">
        <h2>3. Dùng Promise.all() với async/await</h2>
        <button onClick={dungPromiseAll}>Chạy Promise.all()</button>
        <p className="result">{ketQua3 || 'Chưa chạy'}</p>
      </div>
    </div>
  )
}

export default App
