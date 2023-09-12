import { Col, Form, message, Row } from 'antd'
import React, { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddDocument, CheckIfDocumentIsSubmitted, UpdateDocument } from '@/apicalls/documents'
import { ShowLoader } from '@/redux/loaderSlice'

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
        role: 'user'
      }
      let response = null
      if (documentSubmitted) {
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
                  label='Last Name'
                  name='lastName'
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
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <input type='email' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Phone'
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Website'
                  name='website'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <input type='text' />
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

              {/* professional information */}
              <Col span={24}>
                <h4 className='uppercase'>
                  <b>Professional Information</b>
                </h4>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Speciality'
                  name='speciality'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <select>
                    <option value='dermetologist'>Dermetologist</option>
                    <option value='cardiologist'>Cardiologist</option>
                    <option value='gynecologist'>Gynecologist</option>
                    <option value='neurologist'>Neurologist</option>
                    <option value='orthopedic'>Orthopedic</option>
                    <option value='pediatrician'>Pediatrician</option>
                    <option value='psychiatrist'>Psychiatrist</option>
                    <option value='surgeon'>Surgeon</option>
                    <option value='urologist'>Urologist</option>
                  </select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label='Experience'
                  name='experience'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <input type='number' />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label='Qualification'
                  name='qualification'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <select>
                    <option value='MBBS'>MBBS</option>
                    <option value='MD'>MD</option>
                    <option value='MS'>MS</option>
                    <option value='MDS'>MDS</option>
                  </select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <hr />
              </Col>

              <Col span={24}>
                <h4 className='uppercase'>
                  <b>Work Hours</b>
                </h4>
              </Col>
              {/* work hours */}
              <Col span={8}>
                <Form.Item
                  label='Start Time'
                  name='startTime'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <input type='time' />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label='End Time'
                  name='endTime'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <input type='time' />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label='Fee'
                  name='fee'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <input type='number' />
                </Form.Item>
              </Col>

              <Col span={24}>
                <div className='flex gap-2'>
                  {[
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                  ].map((day, index) => (
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        key={index}
                        checked={days.includes(day)}
                        value={day}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDays([...days, e.target.value])
                          } else {
                            setDays(days.filter((item) => item !== e.target.value))
                          }
                        }}
                      />
                      <label>{day}</label>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            <div className='flex justify-end gap-2'>
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
          <h3 className='text-secondary'>
            You have already submitted this document for approval, please wait for the admin to
            approve your request
          </h3>
        </div>
      )}
    </div>
  )
}

export default UserForm
