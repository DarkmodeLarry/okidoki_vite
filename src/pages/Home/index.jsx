import { GetAllDocuments } from '@/apicalls/documents'
import { Button } from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LuUserSquare } from 'react-icons/lu'
import { PiStampLight } from 'react-icons/pi'
import { FcDocument } from 'react-icons/fc'
import { ShowLoader } from '@/redux/loaderSlice'
import { Tag } from 'antd'

import { message } from 'antd'
import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const [documents = [], setDocuments] = useState([])

  const statusColor = (status) => {
    if (status === 'pending') {
      return 'blue'
    }
    if (status === 'approved') {
      return 'green'
    }
    if (status === 'rejected') {
      return 'red'
    }
  }

  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetAllDocuments()
      if (response.success) {
        setDocuments(response.data)
      } else {
        message.error(response.message)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    user && (
      <div className='container h-full'>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='analytics'></TabsTrigger>
            <TabsTrigger value='reports'>Reports</TabsTrigger>
            <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='md:grid-cols-2 lg:grid-cols-4 grid gap-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                  <CardTitle className='text-sm font-medium'>Pending Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  {documents.map(
                    (document, index) =>
                      document.status === 'pending' && (
                        <Card key={index} className='m-3'>
                          <CardHeader className=' pb-2'>
                            <CardTitle className=' text-sm capitalize'>
                              <div className='flex items-center justify-between w-full h-full'>
                                <FcDocument className='ml-3 text-lg' />
                                {document.documentType}
                                <Separator className='w-1/3 mx-3' />
                                <Tag color={statusColor(document.status)}>{document.status}</Tag>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className=''>
                            <ul className=''>
                              <li className='flex items-center capitalize'>
                                <span className='mr-3 text-xs font-bold uppercase'>
                                  <LuUserSquare className='text-lg' />
                                </span>{' '}
                                {document.firstName}, {document.lastName}
                              </li>
                              <li className='flex items-center'>
                                <PiStampLight className='flex mr-3 text-lg' />
                                <span className='text-sm font-bold'>Submitted on: {document.createdAt}</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      )
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                  <CardTitle className='text-sm font-medium'>What to do?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex m-6'>
                    <Button
                      className='border-slate-600 p-2 border-2 rounded-lg'
                      onClick={() => navigate('/bookappointment')}
                    >
                      Schedule Notary Appointment
                    </Button>
                  </div>
                  <div className='flex m-6'>
                    <Input placeholder='Search Document' className='w-[300px]' />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                  <CardTitle className='text-sm font-medium'>Approved Documents</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                  <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
            <div className='md:grid-cols-2 lg:grid-cols-7 grid gap-4'>
              <Card className='col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'></CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  )
}

export default Home
