Giải thích Fetch API

Fetch API là một cách hiện đại để gửi HTTP requests và nhận responses trong JavaScript. Nó thay thế XMLHttpRequest và dễ sử dụng hơn.

Cách sử dụng cơ bản

const response = await fetch(url)
const data = await response.json()

fetch: hàm gửi request đến URL
response: object chứa thông tin response
response.json(): chuyển đổi response thành JSON

Ví dụ trong code

1. Tạo state để quản lý dữ liệu
const [duLieu, setDuLieu] = useState(null)
const [taiTrang, setTaiTrang] = useState(false)
const [loi, setLoi] = useState(null)
duLieu: lưu dữ liệu từ API
taiTrang: trạng thái đang tải
loi: lưu thông báo lỗi nếu có

2. Tạo hàm async để gọi API
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
async/await: xử lý bất đồng bộ
fetch: gửi request đến API
response.ok: kiểm tra response thành công
response.json(): chuyển đổi sang JSON
try/catch: xử lý lỗi
finally: luôn chạy dù có lỗi hay không

3. Kiểm tra response
if (!response.ok) {
  throw new Error('Không thể tải dữ liệu')
}
Kiểm tra xem response có thành công không (status 200-299).

4. Chuyển đổi sang JSON
const data = await response.json()
Chuyển đổi response body thành object JavaScript.

5. Xử lý lỗi
catch (error) {
  setLoi(error.message)
}
Bắt và hiển thị lỗi nếu có.

6. Hiển thị dữ liệu
{duLieu && (
  <div className="data-box">
    <h2>Thông tin người dùng</h2>
    <p><strong>Tên:</strong> {duLieu.name}</p>
    ...
  </div>
)}
Hiển thị dữ liệu khi có.

Các phương thức HTTP

GET: lấy dữ liệu (mặc định)
fetch('https://api.example.com/data')

POST: gửi dữ liệu mới
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})

PUT: cập nhật dữ liệu
fetch('https://api.example.com/data/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jane' })
})

DELETE: xóa dữ liệu
fetch('https://api.example.com/data/1', {
  method: 'DELETE'
})

- fetch trả về Promise, nên phải dùng await hoặc .then()
- response.json() cũng trả về Promise, phải dùng await
- Luôn kiểm tra response.ok trước khi dùng dữ liệu
- Dùng try/catch để xử lý lỗi
- finally block luôn chạy, dùng để cleanup (như setTaiTrang(false))
- fetch không tự động throw error khi HTTP status không phải 200, phải kiểm tra response.ok
