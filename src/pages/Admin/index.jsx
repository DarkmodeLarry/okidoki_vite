import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { message, Tabs } from 'antd'
import { GetUserById } from '@/apicalls/users'
import { ShowLoader } from '@/redux/loaderSlice'
import UsersList from './UsersList'
import DocumentsList from './DocumentsList'
import Review from './Review'

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()

  const checkIsAdmin = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetUserById(user.id)
      dispatch(ShowLoader(false))
      if (response.success && response.data.role === 'admin') {
        setIsAdmin(true)
      } else {
        throw new Error('You are not authorized to access this page')
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    checkIsAdmin()
  }, [])

  return (
    isAdmin && (
      <div className='p-1 bg-white'>
        <Tabs>
          <Tabs.TabPane tab='Users' key='1'>
            <UsersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Documents' key='2'>
            <DocumentsList />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Review' key='3'>
            <Review />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  )
}

export default Admin
