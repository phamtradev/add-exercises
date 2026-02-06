Giải thích CRUD với MockAPI

Project này demo CRUD operations (Create, Read, Update, Delete) sử dụng cả Fetch API (async/await) và Axios với MockAPI.

Cấu trúc code

1. Import và khai báo
import { useState } from 'react'
import axios from 'axios'

const API_URL = 'https://698549c96964f10bf252c6a9.mockapi.io/api/v1/users/users'
Import useState để quản lý state, axios để gọi API. API_URL là endpoint từ MockAPI.

2. State management
const [users, setUsers] = useState([])
const [ten, setTen] = useState('')
const [email, setEmail] = useState('')
const [dangSua, setDangSua] = useState(null)
const [taiTrang, setTaiTrang] = useState(false)
const [loi, setLoi] = useState(null)
users: danh sách users từ API
ten, email: giá trị form input
dangSua: user đang được sửa (null nếu không có)
taiTrang: trạng thái đang tải
loi: thông báo lỗi nếu có

READ - Đọc dữ liệu

1. Dùng Fetch API
const docDuLieuFetch = async () => {
  setTaiTrang(true)
  setLoi(null)
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404: Resource "users" chưa được tạo trên MockAPI. Vui lòng kiểm tra lại!')
      }
      throw new Error(`Lỗi ${response.status}: Không thể tải dữ liệu`)
    }
    const data = await response.json()
    setUsers(data)
  } catch (error) {
    setLoi(error.message)
  } finally {
    setTaiTrang(false)
  }
}
fetch(API_URL): gửi GET request
response.ok: kiểm tra response thành công
response.json(): chuyển đổi sang JSON
setUsers(data): cập nhật state với dữ liệu mới

2. Dùng Axios
const docDuLieuAxios = async () => {
  setTaiTrang(true)
  setLoi(null)
  try {
    const response = await axios.get(API_URL)
    setUsers(response.data)
  } catch (error) {
    if (error.response?.status === 404) {
      setLoi('404: Resource "users" chưa được tạo trên MockAPI. Vui lòng kiểm tra lại!')
    } else {
      setLoi(error.message)
    }
  } finally {
    setTaiTrang(false)
  }
}
axios.get(API_URL): gửi GET request
response.data: dữ liệu đã được parse tự động
error.response?.status: kiểm tra status code lỗi

CREATE - Tạo mới

1. Dùng Fetch API
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
        throw new Error('404: Resource "users" chưa được tạo trên MockAPI. Vui lòng kiểm tra lại!')
      }
      throw new Error(`Lỗi ${response.status}: Không thể tạo mới`)
    }
    const data = await response.json()
    setUsers([...users, data])
    setTen('')
    setEmail('')
  } catch (error) {
    setLoi(error.message)
  } finally {
    setTaiTrang(false)
  }
}
method: 'POST': gửi POST request
headers: định nghĩa Content-Type
body: JSON.stringify(): chuyển đổi object thành JSON string
setUsers([...users, data]): thêm user mới vào danh sách

2. Dùng Axios
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
      setLoi('404: Resource "users" chưa được tạo trên MockAPI. Vui lòng kiểm tra lại!')
    } else {
      setLoi(error.message)
    }
  } finally {
    setTaiTrang(false)
  }
}
axios.post(API_URL, data): gửi POST request với data
Axios tự động chuyển đổi object thành JSON
Không cần JSON.stringify() như Fetch

UPDATE - Cập nhật

1. Dùng Fetch API
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
${API_URL}/${dangSua.id}: URL với ID của user cần cập nhật
method: 'PUT': gửi PUT request
users.map(): cập nhật user trong danh sách
setDangSua(null): thoát chế độ sửa

2. Dùng Axios
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
axios.put(): gửi PUT request
Tương tự như Fetch nhưng cú pháp ngắn gọn hơn

DELETE - Xóa

1. Dùng Fetch API
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
method: 'DELETE': gửi DELETE request
users.filter(): xóa user khỏi danh sách

2. Dùng Axios
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
axios.delete(): gửi DELETE request
Cú pháp đơn giản hơn Fetch

Các hàm hỗ trợ

1. batDauSua
const batDauSua = (user) => {
  setTen(user.name)
  setEmail(user.email)
  setDangSua(user)
}
Điền form với dữ liệu user cần sửa
setDangSua(user): đánh dấu đang ở chế độ sửa

2. huySua
const huySua = () => {
  setTen('')
  setEmail('')
  setDangSua(null)
}
Xóa form và thoát chế độ sửa

So sánh Fetch và Axios

Fetch API:
- Cần kiểm tra response.ok
- Cần gọi response.json()
- Cần JSON.stringify() cho POST/PUT
- Cú pháp dài hơn
- Built-in trong browser

Axios:
- Tự động parse JSON
- Tự động throw error khi status không phải 200-299
- Tự động stringify object
- Cú pháp ngắn gọn hơn
- Cần cài đặt package

- Luôn dùng try/catch để xử lý lỗi
- Luôn set taiTrang = false trong finally block
- Kiểm tra response.ok với Fetch, kiểm tra error.response?.status với Axios
- Dùng spread operator (...) để cập nhật state không mutate
- MockAPI có giới hạn số request miễn phí
- URL API phải đúng format từ MockAPI dashboard
