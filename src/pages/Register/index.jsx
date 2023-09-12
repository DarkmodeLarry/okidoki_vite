import React from 'react'

import { Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { CreateUser } from '@/apicalls/users'
import { ShowLoader } from '@/redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Input from '@/components/ui/Input'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinsh = async (values) => {
    try {
      dispatch(ShowLoader(true))
      const response = await CreateUser({
        ...values,
        role: 'user'
      })
      dispatch(ShowLoader(false))
      if (response.success) {
        message.success(response.message)
        navigate('/login')
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
    if (user) navigate('/')
  })

  return (
    <div className='flex items-center justify-center h-screen'>
      <Form
        layout='vertical'
        className='w-450 p-6 text-gray-200 bg-gray-800 rounded-lg'
        onFinish={onFinsh}
      >
        <h2 className='my-1 uppercase'>
          <strong>OkiDoki Register</strong>
        </h2>
        <hr />
        <Form.Item name='email'>
          <Input autoComplete='true' type='email' placeholder='Email' className=' bg-gray-600' />
        </Form.Item>

        <Form.Item name='password'>
          <Input
            autoComplete='true'
            suggested='current-password'
            type='password'
            placeholder='Password'
            className='bg-gray-600 border border-gray-300'
          />
        </Form.Item>

        <Button className='contained-btn w-full my-1' type='submit'>
          REGISTER
        </Button>

        <Link className='underline' to='/login'>
          Already have an account? <strong>Sign In</strong>
        </Link>
      </Form>
    </div>
  )
}

export default Register
