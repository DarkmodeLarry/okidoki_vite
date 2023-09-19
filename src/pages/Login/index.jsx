import { Button, buttonVariants } from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Form, message } from 'antd'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/libs/utils'
import { useNavigate, Link } from 'react-router-dom'
import { LoginUser } from '@/apicalls/users'
import { useDispatch } from 'react-redux'
import { ShowLoader } from '@/redux/loaderSlice'
import { useEffect } from 'react'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinsh = async (values) => {
    try {
      dispatch(ShowLoader(true))
      const response = await LoginUser(values)
      dispatch(ShowLoader(false))
      if (response.success) {
        message.success(response.message)
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...response.data,
            password: ''
          })
        )
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      navigate('/profile')
    }
  })

  return (
    <div className='flex items-center justify-center h-screen'>
      <Link
        href='/'
        className={cn(buttonVariants({ variant: 'default' }), 'absolute left-4 top-4 md:left-8 md:top-20 p-3')}
      >
        <>
          <ChevronLeft className=' w-4 w-full h-4 mr-2' />
          Back
        </>
      </Link>
      <Form layout='vertical' className='w-450 p-6 text-gray-200 bg-gray-800 rounded-lg' onFinish={onFinsh}>
        <h2 className='my-1 uppercase'>
          <strong>OkiDoki Login</strong>
        </h2>
        <hr />

        <Form.Item name='email'>
          <Input autoComplete={Form.getItem} type='email' placeholder='Email' className='bg-gray-200' />
        </Form.Item>
        <Form.Item name='password'>
          <Input type='password' placeholder='Password' className='bg-gray-200' />
        </Form.Item>

        <Button className='contained-btn w-full my-1' type='submit'>
          Login
        </Button>

        <Link className='underline' to='/register'>
          Dont have an account? <strong>Sign Up</strong>
        </Link>
      </Form>
    </div>
  )
}

export default Login
