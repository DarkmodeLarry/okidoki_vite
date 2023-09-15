import { GetAllDocuments, UpdateDocument } from '@/apicalls/documents'
import { ShowLoader } from '@/redux/loaderSlice'
import { Table, message, Tag } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

function DocumentsList() {
  const [documents, setDocuments] = useState([])
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetAllDocuments()
      dispatch(ShowLoader(false))
      if (response.success) {
        setDocuments(response.data)
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  const changeStatus = async (payload) => {
    try {
      dispatch(ShowLoader(true))
      const response = await UpdateDocument(payload)
      dispatch(ShowLoader(false))
      if (response.success) {
        message.success(response.message)
        getData()
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  useEffect(() => {
    getData()
  }, [])

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

  const columns = [
    {
      title: 'UserId',
      dataIndex: 'userId'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },

    {
      title: 'Document Type',
      dataIndex: 'documentType'
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => {
        return <Tag color={statusColor(record.status)}>{text.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        if (record.status === 'pending') {
          return (
            <div className='flex gap-1'>
              <span
                className='underline cursor-pointer'
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: 'rejected'
                  })
                }
              >
                <Tag color={statusColor()}>Reject</Tag>
              </span>
              <span
                className='underline cursor-pointer'
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: 'approved'
                  })
                }
              >
                <Tag color={statusColor(record.status)}>Approve</Tag>
              </span>
            </div>
          )
        }
        if (record.status === 'approved') {
          return (
            <div className='flex gap-1'>
              <span
                className='underline cursor-pointer'
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: 'blocked'
                  })
                }
              >
                Block
              </span>
            </div>
          )
        }

        if (record.status === 'blocked') {
          return (
            <div className='flex gap-1'>
              <span
                className='underline cursor-pointer'
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: 'approved'
                  })
                }
              >
                Unblock
              </span>
            </div>
          )
        }
      }
    }
  ]

  return (
    <div>
      <Table columns={columns} dataSource={documents} />
    </div>
  )
}

export default DocumentsList
