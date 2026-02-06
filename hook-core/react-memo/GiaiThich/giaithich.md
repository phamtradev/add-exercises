Giải thích React.memo

React.memo là một Higher Order Component (HOC) giúp tối ưu performance của React component bằng cách memoize component. Component được wrap bằng React.memo sẽ chỉ re-render khi props của nó thay đổi.

Vấn đề React.memo giải quyết

Mặc định, khi component cha re-render, tất cả component con cũng sẽ re-render, ngay cả khi props của chúng không thay đổi. Điều này có thể gây lãng phí performance, đặc biệt với component phức tạp hoặc có nhiều component con.

Ví dụ: Component cha có state counter, mỗi lần counter thay đổi, component cha re-render. Nếu có component con nhận props là tên (không liên quan đến counter), component con vẫn sẽ re-render không cần thiết.

Cách sử dụng React.memo

1. Import memo từ react
import { memo } from 'react'

2. Wrap component bằng memo
const ChildCoMemo = memo(({ ten }) => {
  return <div>Tên: {ten}</div>
})

Hoặc với function declaration:
const ChildCoMemo = memo(function ChildCoMemo({ ten }) {
  return <div>Tên: {ten}</div>
})

3. So sánh với component không có memo
const ChildKhongMemo = ({ ten }) => {
  return <div>Tên: {ten}</div>
}

Code trong bài tập

1. Component không có memo
const ChildKhongMemo = ({ ten }) => {
  const renderTime = new Date().toLocaleTimeString()

  return (
    <div className="child-box">
      <h3>Child Không Có Memo</h3>
      <p>Tên: {ten}</p>
      <p className="render-time">Lần render cuối: {renderTime}</p>
      <p className="note">Component này re-render mỗi lần component cha re-render</p>
    </div>
  )
}
Component này sẽ re-render mỗi lần component cha re-render, bất kể props có thay đổi hay không.

2. Component có memo
const ChildCoMemo = memo(({ ten }) => {
  const renderTime = new Date().toLocaleTimeString()

  return (
    <div className="child-box">
      <h3>Child Có Memo</h3>
      <p>Tên: {ten}</p>
      <p className="render-time">Lần render cuối: {renderTime}</p>
      <p className="note">Component này chỉ re-render khi props (ten) thay đổi</p>
    </div>
  )
})
Component này chỉ re-render khi props ten thay đổi. Nếu component cha re-render nhưng props ten không đổi, component này sẽ không re-render.

3. Component cha
function App() {
  const [counter, setCounter] = useState(0)
  const [ten, setTen] = useState('Nguyễn Văn A')

  return (
    <div className="container">
      <h1>React.memo Demo</h1>
      
      <div className="control-section">
        <div className="counter-section">
          <h2>Counter: {counter}</h2>
          <button onClick={() => setCounter(counter + 1)} className="btn">
            Tăng Counter
          </button>
        </div>

        <div className="name-section">
          <h2>Thay đổi Tên</h2>
          <input
            type="text"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            className="input-field"
            placeholder="Nhập tên"
          />
        </div>
      </div>

      <div className="children-section">
        <ChildKhongMemo ten={ten} />
        <ChildCoMemo ten={ten} />
      </div>
    </div>
  )
}
Component cha có 2 state: counter và ten. Khi counter thay đổi, component cha re-render. Khi ten thay đổi, component cha cũng re-render.

Cách hoạt động

Khi nhấn "Tăng Counter":
- Component cha re-render vì counter thay đổi
- ChildKhongMemo re-render (timestamp thay đổi) dù props ten không đổi
- ChildCoMemo KHÔNG re-render (timestamp không đổi) vì props ten không đổi

Khi thay đổi tên trong input:
- Component cha re-render vì ten thay đổi
- ChildKhongMemo re-render (timestamp thay đổi) vì props ten thay đổi
- ChildCoMemo re-render (timestamp thay đổi) vì props ten thay đổi

Cách React.memo so sánh props

React.memo sử dụng shallow comparison (so sánh nông) để kiểm tra props có thay đổi không. Nó so sánh từng prop một cách nông (không so sánh sâu vào object hoặc array).

Ví dụ:
- Primitive values (string, number, boolean): So sánh giá trị
- Objects và Arrays: So sánh reference (địa chỉ bộ nhớ), không so sánh nội dung

const obj1 = { name: 'A' }
const obj2 = { name: 'A' }
obj1 === obj2  // false (khác reference)

Vì vậy, nếu truyền object hoặc array mới mỗi lần render, React.memo sẽ coi như props đã thay đổi.

Custom comparison function

React.memo có thể nhận thêm một function để custom cách so sánh props:

const ChildCoMemo = memo(({ ten, tuoi }) => {
  return <div>Tên: {ten}, Tuổi: {tuoi}</div>
}, (prevProps, nextProps) => {
  return prevProps.ten === nextProps.ten
})
Function này trả về true nếu props giống nhau (không cần re-render), false nếu khác nhau (cần re-render).

Trong ví dụ trên, component chỉ re-render khi ten thay đổi, bỏ qua tuoi.

Khi nào nên dùng React.memo

Nên dùng khi:
- Component render thường xuyên với cùng props
- Component có logic render phức tạp hoặc tốn kém
- Component có nhiều component con
- Component nhận props từ component cha thường xuyên re-render

Không nên dùng khi:
- Component luôn nhận props mới mỗi lần render (object/array mới)
- Component đơn giản, render nhanh
- Props thay đổi thường xuyên (memo sẽ không có tác dụng)

Lưu ý quan trọng

1. React.memo chỉ so sánh props, không so sánh state
Nếu component có state riêng, state thay đổi vẫn sẽ trigger re-render bình thường.

2. React.memo không ngăn re-render khi props là object/array mới
Nếu component cha tạo object/array mới mỗi lần render, React.memo sẽ coi như props đã thay đổi.

function App() {
  const [counter, setCounter] = useState(0)
  
  return <Child data={{ name: 'A' }} />
}
Mỗi lần App re-render, object { name: 'A' } là một object mới, nên Child vẫn sẽ re-render dù có memo.

3. React.memo chỉ tối ưu re-render, không tối ưu logic bên trong
Nếu component có logic phức tạp trong render, nên dùng useMemo để memoize kết quả tính toán.

4. Không nên dùng memo cho mọi component
Memo có overhead riêng (so sánh props), nên chỉ dùng khi thực sự cần thiết.

So sánh với các kỹ thuật tối ưu khác

React.memo: Tối ưu re-render của component
useMemo: Tối ưu kết quả tính toán trong component
useCallback: Tối ưu function reference để truyền vào component con

Thường kết hợp sử dụng:
- React.memo cho component con
- useCallback cho function props
- useMemo cho giá trị tính toán phức tạp

Ví dụ kết hợp:

const Child = memo(({ name, onUpdate }) => {
  const expensiveValue = useMemo(() => {
    return name.toUpperCase().repeat(1000)
  }, [name])

  return <div>{expensiveValue}</div>
})

function App() {
  const [name, setName] = useState('A')
  
  const handleUpdate = useCallback(() => {
    setName('B')
  }, [])

  return <Child name={name} onUpdate={handleUpdate} />
}

Kết luận

React.memo là công cụ mạnh mẽ để tối ưu performance, nhưng cần hiểu rõ cách hoạt động và khi nào nên dùng. Không nên dùng memo một cách mù quáng cho mọi component, mà nên phân tích và đo lường performance trước khi tối ưu.
