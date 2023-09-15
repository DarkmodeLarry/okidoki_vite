import React from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import UserForm from '../UserForm'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='border-slate-300 p-6 mt-6 border-2 rounded-lg'>
      <Tabs>
        <Tabs.TabPane tab='Account' key='1'>
          {user && (
            <div className='flex flex-col gap-6 p-6 my-1 bg-white'>
              <div className=' flex gap-2'>
                <h4>
                  <b>Name : {user.firstName}</b>
                </h4>
              </div>
              <div className='flex gap-2'>
                <h4>
                  <b>Email : {user.email}</b>
                </h4>
              </div>
              <div className='flex gap-2'>
                <h4>
                  <b>Created On : {moment(user?.createdAt).format('DD-MM-YYYY hh:mm A')}</b>
                </h4>
              </div>
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab='Profile' key='2'>
          {user.role === 'user' && <UserForm />}
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
