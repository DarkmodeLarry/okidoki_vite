import React from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tabs } from 'antd'
import moment from 'moment'
import UserForm from '../UserForm'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='mx-6'>
      <Tabs>
        <Tabs.TabPane tab='Profile' key='1'>
          {user.role === 'user' && (
            <div className=' flex flex-col gap-6 m-6 bg-white'>
              <div className='flex'>
                <h4>
                  Name:
                  <b className='mx-3 font-semibold capitalize'>
                    {user.firstName} {user.lastName}
                  </b>
                </h4>
              </div>
              <div className='flex'>
                <h4>
                  <b>Email : {user.email}</b>
                </h4>
              </div>
              <div className='flex'>
                <h4>
                  <b>Created On : {moment(user?.createdAt).format('MMMM do YYYY')}</b>
                </h4>
              </div>
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab='User Form' key='2'>
          {user.role === 'user' && <UserForm user={user} />}
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
