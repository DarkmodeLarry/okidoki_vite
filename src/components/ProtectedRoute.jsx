import { Button } from '@/components/ui/Button'
import { CgPokemon } from 'react-icons/cg'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/assets/logo_od.png'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate('/')
    }
  })

  return (
    <div className='layout shadow-gray-800 p-1 m-3 border-4 border-gray-500 rounded-lg shadow-lg'>
      <div className='header flex items-center justify-between p-2 bg-white'>
        <div className='flex'>
          <h2 className='flex cursor-pointer' onClick={() => navigate('/')}>
            <img src={Logo} alt='logo' className='w-9 h-6' />
            OkiDoki Dashboard
          </h2>
        </div>

        {user && (
          <div className='flex items-center gap-3'>
            <div className='text-slate-700 flex flex-col items-center p-2 font-bold bg-gray-300 rounded-lg'>
              <h4
                className='shadow-gray-700 flex items-center gap-2 p-2 capitalize rounded-lg shadow-md cursor-pointer'
                onClick={() => {
                  if (user.role === 'admin') navigate('/admin')
                  else navigate('/profile')
                }}
              >
                <CgPokemon className='w-6 h-6 text-purple-500' />
                <span>Hey, {user.firstName}!</span>
              </h4>

              <span className='text-red-600'>
                <small>Admin's can click here to access the Admin Dashboard</small>
              </span>
            </div>

            <Button
              className='p-2'
              onClick={() => {
                localStorage.removeItem('user')
                navigate('/login')
              }}
            >
              Signout
            </Button>
          </div>
        )}
      </div>
      <div className='content my-1'>{children}</div>
    </div>
  )
}

export default ProtectedRoute
