import { GetAllUsers } from '@/apicalls/users'

import { ShowLoader } from '@/redux/loaderSlice'
import { Table, message } from 'antd'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

function UsersList() {
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()
  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetAllUsers()
      dispatch(ShowLoader(false))
      if (response.success) {
        setUsers(response.data)
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => role.toUpperCase(0)
    }
  ]
  return (
    <div classname='bg-slate-300 m-6'>
      <Table columns={columns} dataSource={users} />
    </div>
  )
}

export default UsersList
