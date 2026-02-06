import { useState } from 'react'

function App() {
  const [duLieu, setDuLieu] = useState(null)
  const [taiTrang, setTaiTrang] = useState(false)
  const [loi, setLoi] = useState(null)

  const layDuLieu = async () => {
    setTaiTrang(true)
    setLoi(null)
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
      
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu')
      }
      
      const data = await response.json()
      setDuLieu(data)
    } catch (error) {
      setLoi(error.message)
    } finally {
      setTaiTrang(false)
    }
  }

  const xoaDuLieu = () => {
    setDuLieu(null)
    setLoi(null)
  }

  return (
    <div className="container">
      
      <div className="button-group">
        <button onClick={layDuLieu} disabled={taiTrang}>
          {taiTrang ? 'Đang tải...' : 'Lấy dữ liệu'}
        </button>
        <button onClick={xoaDuLieu} disabled={!duLieu}>
          Xóa dữ liệu
        </button>
      </div>

      {taiTrang && <p className="loading">Đang tải dữ liệu...</p>}

      {loi && (
        <div className="error">
          <p>Lỗi: {loi}</p>
        </div>
      )}

      {duLieu && (
        <div className="data-box">
          <h2>Thông tin người dùng</h2>
          <p><strong>Tên:</strong> {duLieu.name}</p>
          <p><strong>Email:</strong> {duLieu.email}</p>
          <p><strong>Điện thoại:</strong> {duLieu.phone}</p>
          <p><strong>Website:</strong> {duLieu.website}</p>
          <p><strong>Thành phố:</strong> {duLieu.address.city}</p>
        </div>
      )}
    </div>
  )
}

export default App
