Giải thích useMemo Hook

useMemo là một Hook trong React dùng để tối ưu hiệu suất bằng cách memoize (ghi nhớ) kết quả của một phép tính phức tạp. Chỉ tính toán lại khi dependency thay đổi.

Cách sử dụng

const memoizedValue = useMemo(() => {
  return expensiveCalculation()
}, [dependency])

memoizedValue: giá trị đã được memoize
expensiveCalculation: hàm tính toán phức tạp
dependency: mảng các giá trị phụ thuộc

Ví dụ trong code

1. Tạo hàm tính toán phức tạp
const tinhToanPhucTap = (n) => {
  console.log('Đang tính toán...')
  let ketQua = 0
  for (let i = 0; i < n * 1000000; i++) {
    ketQua += i
  }
  return ketQua
}
Hàm này mất nhiều thời gian để tính toán.

2. Tính toán không dùng useMemo
const ketQuaKhongMemo = tinhToanPhucTap(soLuong)
Tính toán lại mỗi lần component render, kể cả khi chỉ thay đổi state khác (như ten).

3. Tính toán dùng useMemo
const ketQuaCoMemo = useMemo(() => {
  return tinhToanPhucTap(soLuong)
}, [soLuong])
Chỉ tính toán lại khi soLuong thay đổi. Nếu chỉ thay đổi ten, sẽ dùng kết quả đã cache.

So sánh

Không dùng useMemo:
- Tính toán lại mỗi lần render
- Mất thời gian không cần thiết
- Ảnh hưởng đến hiệu suất

Dùng useMemo:
- Chỉ tính toán khi dependency thay đổi
- Dùng kết quả đã cache khi dependency không đổi
- Tối ưu hiệu suất

Khi nào dùng useMemo

1. Tính toán phức tạp, tốn nhiều thời gian
2. Kết quả phụ thuộc vào một số giá trị cụ thể
3. Component render thường xuyên nhưng dependency ít thay đổi
4. Cần tối ưu hiệu suất ứng dụng

- useMemo không đảm bảo sẽ không tính toán lại, chỉ tối ưu khi dependency không đổi
- Không nên dùng useMemo cho mọi tính toán, chỉ dùng khi thực sự cần thiết
- Dependency array phải chứa tất cả giá trị được sử dụng trong hàm tính toán
- useMemo trả về giá trị, không phải function
- Nếu dependency thay đổi, sẽ tính toán lại và cache kết quả mới
