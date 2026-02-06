Giải thích useCallback Hook

useCallback là một Hook trong React dùng để memoize (ghi nhớ) một function, trả về function đã được cache. Chỉ tạo function mới khi dependency thay đổi.

Cách sử dụng

const memoizedCallback = useCallback(() => {
  // function body
}, [dependency])

memoizedCallback: function đã được memoize
dependency: mảng các giá trị phụ thuộc

Ví dụ trong code

1. Tạo ChildComponent với memo
const ChildComponent = memo(({ onIncrement, ten }) => {
  console.log('ChildComponent render')
  return (
    <div className="child-box">
      <p>Xin chào: {ten}</p>
      <button onClick={onIncrement}>Tăng từ child</button>
    </div>
  )
})
memo() giúp component chỉ render lại khi props thay đổi.

2. Function không dùng useCallback
const handleIncrementKhongCallback = () => {
  setSoLuong(soLuong + 1)
}
Tạo function mới mỗi lần component render. Khi truyền vào ChildComponent, ChildComponent sẽ render lại vì props thay đổi.

3. Function dùng useCallback
const handleIncrementCoCallback = useCallback(() => {
  setSoLuong(prev => prev + 1)
}, [])
Memoize function, chỉ tạo mới khi dependency thay đổi. Khi truyền vào ChildComponent, ChildComponent không render lại nếu props khác không đổi.

So sánh

Không dùng useCallback:
- Tạo function mới mỗi lần render
- ChildComponent render lại mỗi lần parent render
- Mất hiệu suất không cần thiết

Dùng useCallback:
- Dùng function đã cache khi dependency không đổi
- ChildComponent không render lại nếu props không đổi
- Tối ưu hiệu suất

Khi nào dùng useCallback

1. Truyền function vào component con được wrap bằng memo()
2. Function là dependency của useEffect, useMemo, hoặc useCallback khác
3. Component con render tốn kém và cần tối ưu
4. Function được truyền qua nhiều cấp component

- useCallback không tối ưu function tự nó, chỉ giúp component con không render lại
- Phải dùng memo() với component con để useCallback có hiệu quả
- Dependency array phải chứa tất cả giá trị được sử dụng trong function
- useCallback trả về function, không phải giá trị
- Nếu dependency thay đổi, sẽ tạo function mới và cache nó
