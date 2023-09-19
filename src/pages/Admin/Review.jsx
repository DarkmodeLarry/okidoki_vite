import { GetAllDocuments } from '@/apicalls/documents'
import { ShowLoader } from '@/redux/loaderSlice'
import { Tag } from 'antd'
import { Col, Row, message } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Review() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const [documents = [], setDocuments] = useState([])

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

  const statusColors = (status) => {
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

  return (
    user.role === 'admin' && (
      <div>
        <Row gutter={[16, 16]} className='my-1'>
          {documents.map((document) => {
            return (
              document?.status === 'pending' && (
                <Col span={8}>
                  <div
                    className='flex flex-col gap-1 p-1 bg-white border-2 rounded-md cursor-pointer'
                    onClick={() => navigate(`/documentreview/${document.id}`)}
                  >
                    <div className='flex justify-between w-full border rounded-md'>
                      <h2 className='uppercase'>
                        {document.firstName} {document.lastName}
                      </h2>
                    </div>
                    <hr />
                    <div className='flex justify-between w-full'>
                      <h4>
                        <b>Status : </b>
                      </h4>
                      <h4>
                        <Tag color={statusColors(document.status)}>{document.status}</Tag>
                      </h4>
                    </div>
                    <div className='flex justify-between w-full'>
                      <h4>
                        <b>Doc Type : </b>
                      </h4>
                      <h4>{document.documentType}</h4>
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
                  </div>
                </Col>
              )
            )
          })}
        </Row>
      </div>
    )
  )
}

export default Review
