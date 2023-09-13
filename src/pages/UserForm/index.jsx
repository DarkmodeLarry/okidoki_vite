import { Button, Col, Form, message, Row, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddDocument, CheckIfDocumentIsSubmitted, UpdateDocument } from '@/apicalls/documents'
import { ShowLoader } from '@/redux/loaderSlice'
import { Timestamp } from 'firebase/firestore'

function UserForm() {
  const [form] = Form.useForm()
  const [documentSubmitted, setDocumentSubmitted] = useState(false)
  const [documentApproved, setDocumentApproved] = useState(false)
  const [days, setDays] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinsh = async (values) => {
    try {
      dispatch(ShowLoader(true))
      const payload = {
        ...values,
        days,
        userId: JSON.parse(localStorage.getItem('user')).id,
        status: 'pending',
        role: 'user',
        createdAt: new date().toISOString()
      }
      let response = null
      if (documentApproved) {
        payload.id = JSON.parse(localStorage.getItem('user')).id
        payload.status = 'approved'
        response = await UpdateDocument(payload)
      } else {
        response = await AddDocument(payload)
      }

      if (response.success) {
        message.success(response.message)
        navigate('/profile')
      } else {
        message.error(response.message)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  const checkIfDocumentIsSubmitted = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await CheckIfDocumentIsSubmitted(JSON.parse(localStorage.getItem('user')).id)
      if (response.success) {
        setDocumentSubmitted(true)
        if (response.data.status === 'approved') {
          setDocumentApproved(true)
          form.setFieldsValue(response.data)
          setDays(response.data.days)
        }
      } else {
        setDocumentSubmitted(false)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    checkIfDocumentIsSubmitted()
  }, [])

  return (
    <div className='p-6 m-6 bg-gray-300 rounded-lg'>
      {(!documentSubmitted || documentApproved) && (
        <>
          {' '}
          <h3 className='my-1 uppercase'>
            {documentApproved ? 'Update your information' : 'Complete the form below'}
          </h3>
          <hr />
          <Form layout='vertical' className='my-1' onFinish={onFinsh} form={form}>
            <Row gutter={[16, 16]}>
              {/* personal information */}

              <Col span={24}>
                <h4 className='uppercase'>
                  <b>Personal Information</b>
                </h4>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='First Name'
                  name='firstName'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <Input type='text' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Middle Name (optional)'
                  name='middleName'
                  rules={[
                    {
                      required: false,
                      message: 'optional'
                    }
                  ]}
                >
                  <Input type='text' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Last Name'
                  name='lastName'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <Input type='email' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Phone Number'
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <Input type='email' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Date of Birth'
                  name='dob'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <Input type='dob' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label='Address'
                  name='address'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <textarea type='text' />
                </Form.Item>
              </Col>

              <Col span={24}>
                <hr />
              </Col>
              <hr />
              {/* family information */}
              <Form.List name='spouse'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='baseline'
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'spouseFirstName']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder='Spouse First Name' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'spouseMiddleName']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder='Spouse Middle Name' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'spouseLastName']}
                          rules={[{ required: true, message: 'Missing last name' }]}
                        >
                          <Input placeholder='Spouse Last Name' />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Spouse
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <hr />
              <br />
              <Form.List name='children'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='baseline'
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'childFirstName']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder='Child First Name' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'childMiddleName']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder='Child Middle Name' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'childLastName']}
                          rules={[{ required: true, message: 'Missing last name' }]}
                        >
                          <Input placeholder='Child Last Name' />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Child
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <hr />
            </Row>

            <div className='flex justify-end gap-6'>
              <button className='outlined-btn' type='button'>
                CANCEL
              </button>
              <button className='contained-btn' type='submit'>
                SUBMIT
              </button>
            </div>
          </Form>
        </>
      )}

      {documentSubmitted && !documentApproved && (
        <div className='flex flex-col items-center gap-2'>
          <h3 className='text-gray-800'>
            You have already submitted this document, please wait for the admin to approve your
            request.
          </h3>
        </div>
      )}
    </div>
  )
}

export default UserForm
