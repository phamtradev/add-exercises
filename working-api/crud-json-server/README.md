# CRUD với JSON Server

Project này demo CRUD operations sử dụng cả Fetch API (async/await) và Axios với JSON Server (local).

## Cài đặt

```bash
npm install
```

## Cách chạy

### Bước 1: Chạy JSON Server

Mở terminal thứ nhất và chạy:

```bash
npm run server
```

JSON Server sẽ chạy tại: `http://localhost:3001`

### Bước 2: Chạy React App

Mở terminal thứ hai và chạy:

```bash
npm run dev
```

React App sẽ chạy tại: `http://localhost:5173`

## Cấu trúc

- `db.json`: File database cho JSON Server
- `src/App.jsx`: Component CRUD chính
- API URL: `http://localhost:3001/users`

## Các chức năng

- **CREATE**: Tạo user mới (có cả Fetch và Axios)
- **READ**: Đọc danh sách users (có cả Fetch và Axios)
- **UPDATE**: Cập nhật user (có cả Fetch và Axios)
- **DELETE**: Xóa user (có cả Fetch và Axios)

## Lưu ý

- Phải chạy JSON Server trước khi sử dụng app
- Dữ liệu được lưu trong file `db.json`
- JSON Server tự động tạo ID cho item mới
- Có thể chỉnh sửa `db.json` trực tiếp để thêm dữ liệu mẫu
