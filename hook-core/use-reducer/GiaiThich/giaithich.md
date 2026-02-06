Giải thích useReducer Hook

useReducer là một Hook trong React dùng để quản lý state phức tạp, tương tự như useState nhưng phù hợp hơn khi có nhiều logic cập nhật state.

Cách sử dụng

const [state, dispatch] = useReducer(reducer, initialState)

state: giá trị state hiện tại
dispatch: hàm dùng để gửi action để cập nhật state
reducer: hàm xử lý logic cập nhật state dựa trên action
initialState: giá trị state ban đầu

Các thành phần

1. Initial State
const initialState = { soLuong: 0 }
Định nghĩa giá trị state ban đầu.

2. Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case 'tang':
      return { soLuong: state.soLuong + 1 }
    case 'giam':
      return { soLuong: state.soLuong - 1 }
    case 'datLai':
      return { soLuong: 0 }
    case 'cong':
      return { soLuong: state.soLuong + action.giaTri }
    default:
      return state
  }
}
Reducer nhận state hiện tại và action, sau đó trả về state mới dựa trên action.type.

3. Dispatch Action
dispatch({ type: 'tang' })
dispatch({ type: 'cong', giaTri: 5 })
Gửi action để cập nhật state. Action là object có type (bắt buộc) và có thể có thêm dữ liệu khác.

Ví dụ trong code

1. Khai báo initial state
const initialState = { soLuong: 0 }
Tạo state ban đầu với soLuong = 0.

2. Tạo reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'tang':
      return { soLuong: state.soLuong + 1 }
    ...
  }
}
Xử lý các action khác nhau để cập nhật state.

3. Sử dụng useReducer
const [state, dispatch] = useReducer(reducer, initialState)
Khởi tạo useReducer với reducer function và initial state.

4. Hiển thị state
<h1>Đếm số: {state.soLuong}</h1>
Hiển thị giá trị state hiện tại.

5. Dispatch actions
onClick={() => dispatch({ type: 'tang' })}
onClick={() => dispatch({ type: 'cong', giaTri: 5 })}
Gửi action để cập nhật state khi click button.

Các loại action

1. Action đơn giản
dispatch({ type: 'tang' })
Chỉ có type, không có dữ liệu thêm.

2. Action có payload
dispatch({ type: 'cong', giaTri: 5 })
Có type và dữ liệu bổ sung (giaTri).

So sánh với useState

useState phù hợp cho state đơn giản
useReducer phù hợp cho state phức tạp, có nhiều logic cập nhật

- Reducer phải là pure function (không thay đổi state cũ, trả về state mới)
- Luôn return state mới, không được mutate state cũ
- Action phải có type
- Default case trong switch nên return state hiện tại
- useReducer giúp code dễ quản lý hơn khi có nhiều logic cập nhật state
