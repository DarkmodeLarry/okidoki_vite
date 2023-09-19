import { message } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ShowLoader } from '@/redux/loaderSlice'
import { GetDocumentById } from '@/apicalls/documents'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tag } from 'antd'

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
        dispatch(ShowLoader(false))
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
  }, [id])

  const statusColors = (status) => {
    if (status === 'pending') {
      return 'blue'
    }
  }

  return (
    <div className='bg-slate-300 flex items-center justify-center h-screen border-4'>
      {document && (
        <Card className='p-2 bg-transparent shadow-xl rounded-lg border-4 w-[400px] text-sm'>
          <CardHeader className=''>
            <CardTitle className='w-full text-center capitalize'>
              {document?.firstName}_{document?.lastName} -{' '}
              <Tag color={statusColors(document.status)}>{document?.status}</Tag>
            </CardTitle>

            <hr />

            <CardContent className='w-half flex flex-col gap-1 my-1'>
              <h4 className='text-md text-center capitalize'>
                <b>Document Type: </b>
                {document?.documentType}
              </h4>
              <hr />
              <div className=' flex flex-col p-3 m-3 space-y-6 border rounded-l shadow-md'>
                <div className='flex justify-between w-full border-b'>
                  <b>First Name: </b>
                  <h4 className='capitalize'>{document.firstName}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Middle Name: </b>
                  <h4 className='capitalize'>{document?.middleName}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Last Name: </b>
                  <h4 className='capitalize'>{document?.lastName}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Full Name:</b>
                  <h4 classname='capitalize'>{`${document.firstName} ${document.middleName} ${document.lastName}`}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Role: </b>
                  <h4 className='capitalize'>{document.role}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Phone Number: </b>
                  <h4 className='capitalize'>{document.phoneNumber}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Email: </b>
                  <h4 className='capitalize'>{document.email}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Date of birth: </b>
                  <h4 className='capitalize'>{document.dob}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Sex: </b>
                  <h4 className='capitalize'>{document.sex}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Property Address: </b>
                  <h4 className='capitalize'>{document.address}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Spouse Name: </b>
                  <h4 className='capitalize'>{document.spouse[0].spouse_name}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Spouse Date of birth: </b>
                  <h4 className='capitalize'>{document.spouse[0].spouse_dob}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Child Name: </b>
                  <h4 className='capitalize'>{document.children[0].child_fullname}</h4>
                </div>
                <div className='flex justify-between w-full border-b'>
                  <b>Child Date of birth: </b>
                  <h4 className='capitalize'>{document.children[0].child_dob}</h4>
                </div>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}

export default DocumentReview
