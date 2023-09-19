import { message } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ShowLoader } from '@/redux/loaderSlice'
import moment from 'moment'
import { GetDocumentById } from '@/apicalls/documents'

function DocumentReview() {
  const [document, setDocument] = useState(null)

  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetDocumentById(id)
      if (response.success) {
        setDocument(response.data)
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
  }, [id])

  return (
    document && (
      <div className='p-2 bg-white'>
        <div className=''>
          <h1 className='my-1 uppercase'>
            <b>First Name : {document?.firstName}</b>
          </h1>
        </div>
        <hr />

        <div className='w-half flex flex-col gap-1 my-1'>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Speciality : </b>
            </h4>
            <h4>{document.speciality}</h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Experience : </b>
            </h4>

            <h4>
              {document.experience}
              Years
            </h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Email : </b>
            </h4>
            <h4>{document.email}</h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Phone : </b>
            </h4>
            <h4>{document.phone}</h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Address : </b>
            </h4>
            <h4>{document.address}</h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Fee : </b>
            </h4>
            <h4>{document.fee}/- Per Session</h4>
          </div>
        </div>

        <hr />
      </div>
    )
  )
}

export default DocumentReview
