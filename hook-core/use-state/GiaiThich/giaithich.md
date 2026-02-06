Giải thích useState Hook

useState là một Hook trong React dùng để lưu trữ và quản lý dữ liệu (state) trong component.

Cách sử dụng

const [soLuong, setSoLuong] = useState(0)

soLuong: biến chứa giá trị hiện tại (bắt đầu từ 0)
setSoLuong: hàm dùng để thay đổi giá trị của soLuong
useState(0): giá trị ban đầu là 0

Ví dụ trong code

1. Khai báo state
const [soLuong, setSoLuong] = useState(0)
Tạo biến soLuong với giá trị ban đầu là 0.

2. Hiển thị giá trị
<h1>Đếm số: {soLuong}</h1>
Hiển thị giá trị hiện tại của soLuong trên màn hình.

3. Thay đổi giá trị

Tăng số:
onClick={() => setSoLuong(soLuong + 1)}
Khi click, tăng soLuong lên 1.

Giảm số:
onClick={() => setSoLuong(soLuong - 1)}
Khi click, giảm soLuong xuống 1.

Đặt lại:
onClick={() => setSoLuong(0)}
Khi click, đặt soLuong về 0.

Khi state thay đổi, React sẽ tự động cập nhật lại giao diện
Phải dùng hàm setSoLuong để thay đổi giá trị, không được thay đổi trực tiếp
Mỗi lần state thay đổi, component sẽ render lại
