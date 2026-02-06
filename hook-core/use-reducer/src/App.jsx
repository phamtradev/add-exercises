import { useReducer } from 'react'

const initialState = { soLuong: 0 }

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="container">
      <h1>Đếm số: {state.soLuong}</h1>
      
      <div className="button-group">
        <button onClick={() => dispatch({ type: 'giam' })}>
          Giảm
        </button>
        <button onClick={() => dispatch({ type: 'datLai' })}>
          Đặt lại
        </button>
        <button onClick={() => dispatch({ type: 'tang' })}>
          Tăng
        </button>
        <button onClick={() => dispatch({ type: 'cong', giaTri: 5 })}>
          Cộng 5
        </button>
      </div>
    </div>
  )
}

export default App
