Giải thích useRef Hook

useRef là một Hook trong React dùng để tạo một reference (tham chiếu) đến một giá trị hoặc DOM element. Giá trị của ref không làm component re-render khi thay đổi.

Cách sử dụng

const ref = useRef(initialValue)

ref: object có thuộc tính current chứa giá trị
initialValue: giá trị ban đầu

Có 2 cách sử dụng useRef chính:

1. Tham chiếu đến DOM element
const inputRef = useRef(null)
<input ref={inputRef} />
Dùng để truy cập trực tiếp vào DOM element.

2. Lưu trữ giá trị không cần re-render
const countRef = useRef(0)
Dùng để lưu giá trị mà không làm component re-render khi thay đổi.

Ví dụ trong code

1. Tạo ref cho input
const inputRef = useRef(null)
Tạo ref để tham chiếu đến input element.

2. Gán ref cho input
<input ref={inputRef} />
Gán ref cho input element để có thể truy cập sau này.

3. Sử dụng ref để focus
const handleFocus = () => {
  inputRef.current.focus()
}
Truy cập DOM element qua ref.current và gọi method focus().

4. Tạo ref để lưu giá trị
const countRef = useRef(0)
Tạo ref với giá trị ban đầu là 0.

5. Thay đổi giá trị ref
const handleIncrement = () => {
  countRef.current = countRef.current + 1
  console.log('Giá trị countRef:', countRef.current)
  setRenderCount(renderCount + 1)
}
Thay đổi giá trị ref không làm component re-render. Phải dùng useState để trigger re-render nếu cần.

So sánh với useState

useState: khi thay đổi sẽ làm component re-render
useRef: khi thay đổi không làm component re-render

Khi nào dùng useRef

1. Truy cập DOM element trực tiếp (focus, scroll, đo kích thước)
2. Lưu giá trị không cần hiển thị trên UI
3. Lưu giá trị từ lần render trước
4. Lưu timer ID hoặc subscription

Lưu ý quan trọng

- ref.current có thể thay đổi mà không làm component re-render
- Không nên đọc ref.current trong quá trình render
- ref.current có thể là null nếu element chưa được mount
- useRef trả về cùng một object trong mọi lần render
- Dùng ref.current để truy cập giá trị hoặc DOM element
