import React from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import UserForm from '../UserForm'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className=''>
      <Tabs>
        <Tabs.TabPane tab='Appointments' key='1'>
          Appointments
        </Tabs.TabPane>
        <Tabs.TabPan tab='Profile' key='2'>
          {user.role === 'user' && <UserForm user={user} />}
          {user.role === 'user' && (
            <div className=' flex flex-col gap-6 m-6 bg-white'>
              <div className='flex'>
                <h4>
                  <b>Name : {user.name}</b>
                </h4>
              </div>
              <div className='flex'>
                <h4>
                  <b>Email : {user.email}</b>
                </h4>
              </div>
              <div className='flex'>
                <h4>
                  <b>Created On : {moment(user?.createdAt).format('DD-MM-YYYY hh:mm A')}</b>
                </h4>
              </div>
            </div>
          )}
        </Tabs.TabPan>
      </Tabs>
    </div>
  )
}

export default Profile
