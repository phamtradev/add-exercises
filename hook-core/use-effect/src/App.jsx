import { useState, useEffect } from 'react'

function App() {
  const [thoiGian, setThoiGian] = useState(0)
  const [hienThi, setHienThi] = useState(true)

  useEffect(() => {
    console.log('component đã được render')
  })

  useEffect(() => {
    console.log('ccomponent đã mount lần đầu')
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setThoiGian(thoiGian => thoiGian + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    console.log('Thời gian đã thay đổi:', thoiGian)
  }, [thoiGian])

  return (
    <div className="container">
      <h1>Đồng hồ đếm: {thoiGian} giây</h1>
      
      <button onClick={() => setHienThi(!hienThi)}>
        {hienThi ? 'Ẩn' : 'Hiện'} thông báo
      </button>

      {hienThi && (
        <div className="message">
          hello 
        </div>
      )}
    </div>
  )
}

export default App
