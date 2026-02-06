Giải thích Async/Await

Async/Await là cú pháp trong JavaScript dùng để xử lý Promise một cách dễ đọc và dễ viết hơn. Thay vì dùng .then() và .catch(), ta có thể dùng async/await để code trông giống code đồng bộ.

Cách sử dụng cơ bản

async function tenHam() {
  const ketQua = await promise
  return ketQua
}

async: khai báo hàm là asynchronous
await: đợi Promise resolve trước khi tiếp tục
await chỉ dùng được trong hàm async

Ví dụ trong code

1. Tạo Promise
const taoPromise = (ten, thoiGian) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Hoàn thành ${ten} sau ${thoiGian}ms`)
    }, thoiGian)
  })
}
Tạo Promise mô phỏng công việc bất đồng bộ.

2. Dùng .then() (cách cũ)
const dungThen = () => {
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
Cách cũ dùng .then() và .catch(), code dài và khó đọc.

3. Dùng async/await (cách mới)
const dungAsyncAwait = async () => {
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
async: khai báo hàm là async
await: đợi Promise resolve
try/catch: xử lý lỗi giống code đồng bộ
finally: luôn chạy dù có lỗi hay không

4. Dùng Promise.all() với async/await
const dungPromiseAll = async () => {
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
Promise.all(): chạy nhiều Promise cùng lúc, đợi tất cả hoàn thành
Destructuring: lấy kết quả từ mảng

So sánh .then() và async/await

Dùng .then():
- Code dài và khó đọc
- Nhiều .then() lồng nhau (callback hell)
- Khó xử lý lỗi

Dùng async/await:
- Code ngắn gọn và dễ đọc
- Trông giống code đồng bộ
- Dễ xử lý lỗi với try/catch
- Dễ debug hơn

- await chỉ dùng được trong hàm async
- await đợi Promise resolve, code sau await sẽ không chạy cho đến khi Promise resolve
- Nếu Promise reject, sẽ throw error, phải dùng try/catch để bắt
- Promise.all() chạy nhiều Promise song song, nhanh hơn await tuần tự
- Promise.all() sẽ reject nếu có bất kỳ Promise nào reject
- finally block luôn chạy, dùng để cleanup
