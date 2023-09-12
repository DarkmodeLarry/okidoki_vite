import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Spinner from '@/components/Spinner'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserForm from './pages/UserForm'

function App() {
  const { loading } = useSelector((state) => state.loader)
  return (
    <div className='App'>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/userform'
            element={
              <ProtectedRoute>
                <UserForm />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
