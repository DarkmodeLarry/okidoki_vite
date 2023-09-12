import { Button } from '@/components/ui/Button'
import { Cookie } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/assets/logo_od.png'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate('/login')
    }
  })

  return (
    <div className='layout shadow-gray-800 p-1 border border-black rounded-lg shadow-lg'>
      <div className='header flex items-center justify-between p-2 bg-white'>
        <div className='flex'>
          <h2 className='flex cursor-pointer' onClick={() => navigate('/')}>
            <img src={Logo} alt='logo' className='w-9 h-6' />
          </h2>
        </div>

        {user && (
          <div className='flex items-center gap-3'>
            <div className='bg-slate-400 flex items-center gap-1 p-2 rounded-lg'>
              <h4
                className='flex items-center gap-3 underline uppercase cursor-pointer'
                onClick={() => {
                  if (user.role === 'admin') navigate('/admin')
                  else navigate('/profile')
                  navigate('/profile')
                }}
              >
                <Cookie className='text-amber-700 w-5 h-5' />
                <span>{user.email}</span>
              </h4>
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
