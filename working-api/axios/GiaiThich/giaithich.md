Giải thích Axios

Axios là một thư viện JavaScript dùng để gửi HTTP requests. Nó dễ sử dụng hơn fetch API và có nhiều tính năng hữu ích như tự động chuyển đổi JSON, xử lý lỗi tốt hơn.

Cách cài đặt

npm install axios

Cách sử dụng cơ bản

import axios from 'axios'

const response = await axios.get(url)
const data = response.data

axios: thư viện HTTP client
response.data: dữ liệu đã được tự động chuyển đổi sang JSON
không cần gọi .json() như fetch

Ví dụ trong code

1. Import axios
import axios from 'axios'
Import thư viện axios vào component.

2. Tạo state để quản lý dữ liệu
const [duLieu, setDuLieu] = useState(null)
const [taiTrang, setTaiTrang] = useState(false)
const [loi, setLoi] = useState(null)
duLieu: lưu dữ liệu từ API
taiTrang: trạng thái đang tải
loi: lưu thông báo lỗi nếu có

3. Gọi API với axios.get
const layDuLieu = async () => {
  setTaiTrang(true)
  setLoi(null)
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
    setDuLieu(response.data)
  } catch (error) {
    setLoi(error.message)
  } finally {
    setTaiTrang(false)
  }
}
axios.get: gửi GET request
response.data: dữ liệu đã được parse tự động
không cần kiểm tra response.ok như fetch
tự động throw error nếu status không phải 200-299

4. Truy cập dữ liệu
setDuLieu(response.data)
Dữ liệu nằm trong response.data, không cần gọi .json().

5. Xử lý lỗi
catch (error) {
  setLoi(error.message)
}
Axios tự động throw error khi có lỗi HTTP, dễ xử lý hơn fetch.

So sánh với Fetch API

Fetch API:
- Phải kiểm tra response.ok
- Phải gọi response.json()
- Không tự động throw error
- Cú pháp dài hơn

Axios:
- Tự động parse JSON
- Tự động throw error khi status không phải 200-299
- Dữ liệu nằm trong response.data
- Cú pháp ngắn gọn hơn

Các phương thức HTTP

GET: lấy dữ liệu
const response = await axios.get('https://api.example.com/data')

POST: gửi dữ liệu mới
const response = await axios.post('https://api.example.com/data', {
  name: 'John',
  email: 'john@example.com'
})

PUT: cập nhật dữ liệu
const response = await axios.put('https://api.example.com/data/1', {
  name: 'Jane'
})

DELETE: xóa dữ liệu
const response = await axios.delete('https://api.example.com/data/1')

PATCH: cập nhật một phần dữ liệu
const response = await axios.patch('https://api.example.com/data/1', {
  name: 'Bob'
})

- Axios tự động parse JSON, không cần gọi .json()
- Axios tự động throw error khi HTTP status không phải 200-299
- Dữ liệu nằm trong response.data
- Có thể cấu hình axios instance để dùng chung baseURL, headers
- Hỗ trợ interceptors để xử lý request/response trước và sau
- Hỗ trợ cancel request với AbortController
- Có thể dùng axios.all() để gửi nhiều request cùng lúc
