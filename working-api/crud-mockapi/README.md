# CRUD với MockAPI

Project này demo CRUD operations sử dụng cả Fetch API (async/await) và Axios với MockAPI.

## Cách sử dụng MockAPI

### Bước 1: Tạo tài khoản MockAPI
1. Truy cập: https://mockapi.io/
2. Đăng ký tài khoản miễn phí (có thể dùng Google/GitHub)

### Bước 2: Tạo Project
1. Sau khi đăng nhập, click **"New Project"**
2. Đặt tên project (ví dụ: "react-crud")
3. Click **"Create"**

### Bước 3: Tạo Resource
1. Trong project vừa tạo, click **"New Resource"**
2. Đặt tên resource: **"users"**
3. Thêm 2 field:
   - **name** (Type: String)
   - **email** (Type: String)
4. Click **"Create"**

### Bước 4: Copy URL
1. Sau khi tạo resource, bạn sẽ thấy URL
2. Format: `https://[YOUR-PROJECT-ID].mockapi.io/api/v1/users`
3. Copy URL này

### Bước 5: Cập nhật code
1. Mở file `src/App.jsx`
2. Tìm dòng: `const API_URL = 'https://YOUR-PROJECT-ID.mockapi.io/api/v1/users'`
3. Thay thế `YOUR-PROJECT-ID` bằng Project ID của bạn
4. Lưu file

## Cài đặt và chạy

```bash
npm install
npm run dev
```

## Các chức năng

- **CREATE**: Tạo user mới (có cả Fetch và Axios)
- **READ**: Đọc danh sách users (có cả Fetch và Axios)
- **UPDATE**: Cập nhật user (có cả Fetch và Axios)
- **DELETE**: Xóa user (có cả Fetch và Axios)

## Lưu ý

- MockAPI miễn phí có giới hạn số request
- Dữ liệu sẽ được lưu trên server của MockAPI
- Mỗi project có thể tạo nhiều resource khác nhau
