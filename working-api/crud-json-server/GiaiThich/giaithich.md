Giải thích CRUD với JSON Server

JSON Server là một fake REST API chạy trên localhost, dùng file JSON làm database. Rất hữu ích cho development và testing mà không cần backend thật.

Cài đặt và chạy

1. Cài đặt json-server
npm install json-server

2. Tạo file db.json với dữ liệu mẫu
{
  "users": [
    { "id": 1, "name": "Nguyễn Văn A", "email": "nguyenvana@example.com" }
  ]
}

3. Chạy JSON Server
npm run server
Server chạy tại: http://localhost:3001

4. Chạy React App (terminal khác)
npm run dev
App chạy tại: http://localhost:5173

Cấu trúc code

const API_URL = 'http://localhost:3001/users'
Import useState để quản lý state, axios để gọi API. API_URL là endpoint local từ JSON Server.

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
      throw new Error(`Lỗi ${response.status}: Không thể tải dữ liệu`)
    }
    const data = await response.json()
    setUsers(data)
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      setLoi('Lỗi: Không thể kết nối đến JSON Server. Đảm bảo đã chạy "npm run server"!')
    } else {
      setLoi(error.message)
    }
  } finally {
    setTaiTrang(false)
  }
}
fetch(API_URL): gửi GET request đến localhost:3001/users
response.ok: kiểm tra response thành công
response.json(): chuyển đổi sang JSON
Xử lý lỗi: kiểm tra "Failed to fetch" để nhắc user chạy JSON Server

2. Dùng Axios
const docDuLieuAxios = async () => {
  setTaiTrang(true)
  setLoi(null)
  try {
    const response = await axios.get(API_URL)
    setUsers(response.data)
  } catch (error) {
    if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
      setLoi('Lỗi: Không thể kết nối đến JSON Server. Đảm bảo đã chạy "npm run server"!')
    } else {
      setLoi(error.message)
    }
  } finally {
    setTaiTrang(false)
  }
}
axios.get(API_URL): gửi GET request
response.data: dữ liệu đã được parse tự động
Xử lý lỗi network: kiểm tra ERR_NETWORK

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
      throw new Error(`Lỗi ${response.status}: Không thể tạo mới`)
    }
    const data = await response.json()
    setUsers([...users, data])
    setTen('')
    setEmail('')
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      setLoi('Lỗi: Không thể kết nối đến JSON Server. Đảm bảo đã chạy "npm run server"!')
    } else {
      setLoi(error.message)
    }
  } finally {
    setTaiTrang(false)
  }
}
method: 'POST': gửi POST request
JSON Server tự động tạo ID cho item mới
Dữ liệu được lưu vào file db.json

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
    if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
      setLoi('Lỗi: Không thể kết nối đến JSON Server. Đảm bảo đã chạy "npm run server"!')
    } else {
      setLoi(error.message)
    }
  } finally {
    setTaiTrang(false)
  }
}
axios.post(API_URL, data): gửi POST request với data
Axios tự động chuyển đổi object thành JSON
JSON Server tự động thêm ID vào response.data

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
    if (error.message === 'Failed to fetch') {
      setLoi('Lỗi: Không thể kết nối đến JSON Server. Đảm bảo đã chạy "npm run server"!')
    } else {
      setLoi(error.message)
    }
  } finally {
    setTaiTrang(false)
  }
}
${API_URL}/${dangSua.id}: URL với ID của user cần cập nhật
method: 'PUT': gửi PUT request
JSON Server cập nhật dữ liệu trong db.json

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
    if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
      setLoi('Lỗi: Không thể kết nối đến JSON Server. Đảm bảo đã chạy "npm run server"!')
    } else {
      setLoi(error.message)
    }
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
    if (error.message === 'Failed to fetch') {
      setLoi('Lỗi: Không thể kết nối đến JSON Server. Đảm bảo đã chạy "npm run server"!')
    } else {
      setLoi(error.message)
    }
  } finally {
    setTaiTrang(false)
  }
}
method: 'DELETE': gửi DELETE request
JSON Server xóa item khỏi db.json
users.filter(): xóa user khỏi danh sách

2. Dùng Axios
const xoaAxios = async (id) => {
  setTaiTrang(true)
  setLoi(null)
  try {
    await axios.delete(`${API_URL}/${id}`)
    setUsers(users.filter(u => u.id !== id))
  } catch (error) {
    if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
      setLoi('Lỗi: Không thể kết nối đến JSON Server. Đảm bảo đã chạy "npm run server"!')
    } else {
      setLoi(error.message)
    }
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
- Lỗi network: "Failed to fetch"

Axios:
- Tự động parse JSON
- Tự động throw error khi status không phải 200-299
- Tự động stringify object
- Cú pháp ngắn gọn hơn
- Cần cài đặt package
- Lỗi network: ERR_NETWORK

Ưu điểm của JSON Server

- Chạy local, không cần internet
- Dữ liệu lưu trong file db.json, dễ chỉnh sửa
- Tự động tạo ID cho item mới
- Hỗ trợ đầy đủ CRUD operations
- Không cần đăng ký tài khoản
- Miễn phí và mã nguồn mở
- Phù hợp cho development và testing

- Phải chạy JSON Server trước khi sử dụng app (npm run server)
- Dữ liệu được lưu trong file db.json, có thể chỉnh sửa trực tiếp
- JSON Server tự động tạo ID cho item mới nếu không có
- Luôn dùng try/catch để xử lý lỗi
- Luôn set taiTrang = false trong finally block
- Kiểm tra "Failed to fetch" để nhắc user chạy JSON Server
- Dùng spread operator (...) để cập nhật state không mutate
- JSON Server chạy trên port 3001, có thể thay đổi trong package.json
