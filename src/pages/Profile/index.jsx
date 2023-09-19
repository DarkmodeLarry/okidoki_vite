import React from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import UserForm from '@/pages/UserForm'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))

  const items = [
    {
      key: '1',
      label: 'Account'
    }
  ]
  return (
    <div className='border-slate-300 p-6 mt-6 border-2 rounded-lg'>
      <Tabs defaultActiveKey='1' className='ml-6'>
        <Tabs.TabPane tab='Account' key='1'>
          {user && (
            <div className='flex flex-col gap-6 my-3 bg-white'>
              <div className=' flex gap-2'>
                <h4>
                  <b className='capitalize'>
                    Name : {user.firstName} {user.lastName}
                  </b>
                </h4>
              </div>
              <div className='flex gap-2'>
                <h4>
                  <b className='capitalize'>Email : {user.email}</b>
                </h4>
              </div>
              <div className='flex gap-2'>
                <h4>
                  <b>Created On : {moment(user?.createdAt).format('MM-DD-YYYY hh:mm A')}</b>
                </h4>
              </div>
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab='Profile Form' key='2'>
          <UserForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
