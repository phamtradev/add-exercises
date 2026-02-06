Giải thích useEffect Hook

useEffect là một Hook trong React dùng để thực hiện các side effects như gọi API, cập nhật DOM, hoặc thiết lập timer.

Cách sử dụng

useEffect(() => {
  // Code thực thi
}, [dependencies])

Có 3 trường hợp sử dụng useEffect:

1. useEffect không có dependency array
useEffect(() => {
  console.log('component đã được render')
})
Chạy mỗi lần component render (cả lần đầu và mỗi lần update).

2. useEffect với dependency array rỗng
useEffect(() => {
  console.log('component đã mount lần đầu')
}, [])
Chỉ chạy 1 lần duy nhất khi component mount lần đầu tiên.

3. useEffect với dependency array có giá trị
useEffect(() => {
  console.log('Thời gian đã thay đổi:', thoiGian)
}, [thoiGian])
Chạy mỗi khi giá trị trong dependency array thay đổi. Ở đây sẽ chạy mỗi khi thoiGian thay đổi.

4. useEffect với cleanup function
useEffect(() => {
  const timer = setInterval(() => {
    setThoiGian(thoiGian => thoiGian + 1)
  }, 1000)

  return () => {
    clearInterval(timer)
  }
}, [])
Cleanup function (hàm return) sẽ chạy khi component unmount hoặc trước khi effect chạy lại. Ở đây dùng để dọn dẹp timer.

Ví dụ trong code

1. Tạo state
const [thoiGian, setThoiGian] = useState(0)
const [hienThi, setHienThi] = useState(true)
Tạo 2 state: thoiGian để đếm giây, hienThi để hiển thị/ẩn thông báo.

2. useEffect chạy mỗi lần render
useEffect(() => {
  console.log('component đã được render')
})
In ra console mỗi lần component render.

3. useEffect chạy 1 lần khi mount
useEffect(() => {
  console.log('component đã mount lần đầu')
}, [])
In ra console chỉ 1 lần khi component được mount.

4. useEffect với timer và cleanup
useEffect(() => {
  const timer = setInterval(() => {
    setThoiGian(thoiGian => thoiGian + 1)
  }, 1000)

  return () => {
    clearInterval(timer)
  }
}, [])
Tạo timer đếm giây mỗi 1 giây. Cleanup function sẽ xóa timer khi component unmount.

5. useEffect theo dõi thay đổi của state
useEffect(() => {
  console.log('Thời gian đã thay đổi:', thoiGian)
}, [thoiGian])
In ra console mỗi khi thoiGian thay đổi.

Lưu ý quan trọng

- useEffect chạy sau khi render xong
- Luôn cleanup các timer, subscription khi component unmount
- Dependency array rỗng [] nghĩa là chỉ chạy 1 lần
- Không có dependency array nghĩa là chạy mỗi lần render
- Có dependency array nghĩa là chạy khi dependency thay đổi
