import { useState } from 'react'
import axios from 'axios'

const API_URL = 'https://my.api.mockaroo.com/users'

function App() {
  const [users, setUsers] = useState([])
  const [ten, setTen] = useState('')
  const [email, setEmail] = useState('')
  const [dangSua, setDangSua] = useState(null)
  const [taiTrang, setTaiTrang] = useState(false)
  const [loi, setLoi] = useState(null)

  const docDuLieuFetch = async () => {
    setTaiTrang(true)
    setLoi(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('404: Resource chưa được tạo trên Mockaro. Vui lòng kiểm tra lại URL!')
        }
        throw new Error(`Lỗi ${response.status}: Không thể tải dữ liệu`)
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      if (error.message === 'Failed to fetch' || error.message.includes('fetch')) {
        setLoi('Lỗi kết nối: Không thể kết nối đến API. Kiểm tra URL hoặc kết nối mạng.')
      } else {
        setLoi(error.message)
      }
    } finally {
      setTaiTrang(false)
    }
  }

  const docDuLieuAxios = async () => {
    setTaiTrang(true)
    setLoi(null)
    try {
      const response = await axios.get(API_URL)
      setUsers(response.data)
    } catch (error) {
      if (error.response?.status === 404) {
        setLoi('404: Resource chưa được tạo trên Mockaro. Vui lòng kiểm tra lại URL!')
      } else if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
        setLoi('Lỗi kết nối: Không thể kết nối đến API. Kiểm tra URL hoặc kết nối mạng.')
      } else {
        setLoi(error.message)
      }
    } finally {
      setTaiTrang(false)
    }
  }

  const taoMoiFetch = async () => {
    if (!ten || !email) {
      setLoi('Vui lòng nhập đầy đủ thông tin')
      return
    }
    setTaiTrang(true)
    setLoi(null)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ten, email })
      })
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('404: Resource chưa được tạo. Vui lòng kiểm tra lại URL!')
        }
        throw new Error(`Lỗi ${response.status}: Không thể tạo mới`)
      }
      const data = await response.json()
      setUsers([...users, data])
      setTen('')
      setEmail('')
    } catch (error) {
      if (error.message === 'Failed to fetch' || error.message.includes('ERR_NAME_NOT_RESOLVED')) {
        setLoi('Lỗi: Không thể kết nối đến API. Kiểm tra lại URL hoặc domain có tồn tại không.')
      } else {
        setLoi(error.message)
      }
    } finally {
      setTaiTrang(false)
    }
  }

  const taoMoiAxios = async () => {
    if (!ten || !email) {
      setLoi('Vui lòng nhập đầy đủ thông tin')
      return
    }
    setTaiTrang(true)
    setLoi(null)
    try {
      const response = await axios.post(API_URL, { name: ten, email })
      setUsers([...users, response.data])
      setTen('')
      setEmail('')
    } catch (error) {
      if (error.response?.status === 404) {
        setLoi('404: Resource chưa được tạo. Vui lòng kiểm tra lại URL!')
      } else if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK' || error.code === 'ERR_NAME_NOT_RESOLVED') {
        setLoi('Lỗi: Không thể kết nối đến API. Kiểm tra lại URL hoặc domain có tồn tại không.')
      } else {
        setLoi(error.message)
      }
    } finally {
      setTaiTrang(false)
    }
  }

  const capNhatFetch = async () => {
    if (!ten || !email || !dangSua) return
    setTaiTrang(true)
    setLoi(null)
    try {
      const response = await fetch(`${API_URL}/${dangSua.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ten, email })
      })
      if (!response.ok) throw new Error('Không thể cập nhật')
      const data = await response.json()
      setUsers(users.map(u => u.id === dangSua.id ? data : u))
      setTen('')
      setEmail('')
      setDangSua(null)
    } catch (error) {
      setLoi(error.message)
    } finally {
      setTaiTrang(false)
    }
  }

  const capNhatAxios = async () => {
    if (!ten || !email || !dangSua) return
    setTaiTrang(true)
    setLoi(null)
    try {
      const response = await axios.put(`${API_URL}/${dangSua.id}`, { name: ten, email })
      setUsers(users.map(u => u.id === dangSua.id ? response.data : u))
      setTen('')
      setEmail('')
      setDangSua(null)
    } catch (error) {
      setLoi(error.message)
    } finally {
      setTaiTrang(false)
    }
  }

  const xoaFetch = async (id) => {
    setTaiTrang(true)
    setLoi(null)
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Không thể xóa')
      setUsers(users.filter(u => u.id !== id))
    } catch (error) {
      setLoi(error.message)
    } finally {
      setTaiTrang(false)
    }
  }

  const xoaAxios = async (id) => {
    setTaiTrang(true)
    setLoi(null)
    try {
      await axios.delete(`${API_URL}/${id}`)
      setUsers(users.filter(u => u.id !== id))
    } catch (error) {
      setLoi(error.message)
    } finally {
      setTaiTrang(false)
    }
  }

  const batDauSua = (user) => {
    setTen(user.name)
    setEmail(user.email)
    setDangSua(user)
  }

  const huySua = () => {
    setTen('')
    setEmail('')
    setDangSua(null)
  }

  return (
    <div className="container">
      <h1>CRUD với Mockaro</h1>

      <div className="form-section">
        <h2>{dangSua ? 'Cập nhật' : 'Tạo mới'} User</h2>
        <input
          type="text"
          placeholder="Tên"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <div className="button-group">
          {dangSua ? (
            <>
              <button onClick={capNhatFetch} disabled={taiTrang} className="btn-fetch">
                Cập nhật (Fetch)
              </button>
              <button onClick={capNhatAxios} disabled={taiTrang} className="btn-axios">
                Cập nhật (Axios)
              </button>
              <button onClick={huySua} className="btn-cancel">Hủy</button>
            </>
          ) : (
            <>
              <button onClick={taoMoiFetch} disabled={taiTrang} className="btn-fetch">
                Tạo mới (Fetch)
              </button>
              <button onClick={taoMoiAxios} disabled={taiTrang} className="btn-axios">
                Tạo mới (Axios)
              </button>
            </>
          )}
        </div>
      </div>

      <div className="read-section">
        <h2>Đọc dữ liệu</h2>
        <div className="button-group">
          <button onClick={docDuLieuFetch} disabled={taiTrang} className="btn-fetch">
            Đọc (Fetch)
          </button>
          <button onClick={docDuLieuAxios} disabled={taiTrang} className="btn-axios">
            Đọc (Axios)
          </button>
        </div>
      </div>

      {taiTrang && <p className="loading">Đang xử lý...</p>}
      {loi && <div className="error">Lỗi: {loi}</div>}

      <div className="list-section">
        <h2>Danh sách Users ({users.length})</h2>
        {users.length === 0 ? (
          <p className="empty">Chưa có dữ liệu. Nhấn "Đọc" để tải dữ liệu.</p>
        ) : (
          <div className="user-list">
            {users.map(user => (
              <div key={user.id} className="user-item">
                <div className="user-info">
                  <p><strong>Tên:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                </div>
                <div className="user-actions">
                  <button onClick={() => batDauSua(user)} className="btn-edit">Sửa</button>
                  <button onClick={() => xoaFetch(user.id)} disabled={taiTrang} className="btn-fetch">
                    Xóa (Fetch)
                  </button>
                  <button onClick={() => xoaAxios(user.id)} disabled={taiTrang} className="btn-axios">
                    Xóa (Axios)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
