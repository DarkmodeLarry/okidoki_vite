import { GetAllDocuments } from '@/apicalls/documents'

import { ShowLoader } from '@/redux/loaderSlice'
import { message, Col, Row } from 'antd'
import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const [documents = [], setDocuments] = useState([])

  const getData = async () => {
    try {
      useDispatch(ShowLoader(true))
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
    <div className='container h-screen'>
      <div className='flex'>
        <button className='border-slate-600 p-2 border-2 rounded-lg' onClick={() => navigate('/apply-doctor')}>
          Schedule Notary Appointment
        </button>
      </div>
    </div>
  )
}

export default Home
