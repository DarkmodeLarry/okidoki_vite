import { AddDocument, CheckIfDocumentIsSubmitted, UpdateDocument } from '@/apicalls/documents'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { ShowLoader } from '@/redux/loaderSlice'
import { Form, Select, Space, Button, Col, Input, Row } from 'antd'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from 'antd'
import { Divider } from 'antd'
import { Typography } from 'antd'
import { message } from 'antd'

function UserForm() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [documentSubmitted, setDocumentSubmitted] = useState(false)
  const [documentApproved, setDocumentApproved] = useState(false)
  const [days, setDays] = useState([])

  const initialValues = {
    spouseFirstName: 'N/A',
    spouseLastName: 'N/A'
  }

  const onFinish = async (values) => {
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

  const { Option } = Select
  return (
    <div className='w-full p-6 m-6 bg-gray-300 rounded-lg'>
      {(!documentSubmitted || documentApproved) && (
        <>
          {' '}
          <h3 className='my-1 uppercase'>{documentApproved ? 'Update your information' : 'Complete the form below'}</h3>
          <hr />
          <Form style={{ width: 500 }} onFinish={onFinish} form={form} autoComplete='off' layout='vertical'>
            {/* personal information */}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h4 className='uppercase'>
                  <b>Personal Information</b>
                </h4>
              </Col>
              <Col span={12}>
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
                  <Input placeholder='First name' />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                  <Input placeholder='Middle name' />
                </Form.Item>
              </Col>
              <Col span={24}>
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
                  <Input placeholder='Last name' />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label='Phone Number'
                  name='phoneNumber'
                  rules={[
                    {
                      required: true,
                      message: 'Required'
                    }
                  ]}
                >
                  <Input placeholder='Phone number' />
                </Form.Item>
              </Col>

              <Col span={12}>
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
                  <Input placeholder='Email' />
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
                  <Input placeholder='Date of birth' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name='sex' label='Sex' rules={[{ required: true, message: 'Please select sex' }]}>
                  <Select placeholder='select your sex'>
                    <Option value='male'>Male</Option>
                    <Option value='female'>Female</Option>
                  </Select>
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
                  <Input placeholder='Property Address' />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation='left' orientationMargin={20}>
              <Typography.Title level={5}>Spouse Information</Typography.Title>
            </Divider>
            <Col span={24}>
              <Form.List
                name={['spouse']}
                initialValue={[
                  {
                    spouse_name: '',
                    spouse_dob: ''
                  }
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row gutter={16} key={key} align='middle'>
                        <Col md={12} xs={18} lg={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'spouse_name']}
                            rules={[{ required: true, message: 'Spouse name is required.' }]}
                            label='Spouse Name'
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col md={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'spouse_dob']}
                            rules={[{ required: true, message: 'Spouse date of birth is required.' }]}
                            label='Date of birth'
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={3}>
                          <Button
                            onClick={() => remove(name)}
                            style={{
                              cursor: 'pointer',
                              display: 'flex',
                              marginTop: 20,
                              flexDirection: 'column',
                              width: '100%',
                              height: '100%',
                              border: '1px solid #ccc',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            X
                          </Button>
                        </Col>
                      </Row>
                    ))}

                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        icon='+'
                        block
                        size='large'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        Add Spouse
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Divider orientation='left' orientationMargin={20}>
              <Typography.Title level={5}>Children Information</Typography.Title>
            </Divider>
            <Form.List
              name={['children']}
              initialValue={[
                {
                  child_fullname: '',
                  child_dob: ''
                }
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={10} key={key} align='middle'>
                      <Col md={14} xs={18}>
                        <Form.Item
                          {...restField}
                          name={[name, 'child_fullname']}
                          rules={[{ required: true, message: 'Child name is required.' }]}
                          label='Child name'
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col md={14}>
                        <Form.Item
                          {...restField}
                          name={[name, 'child_dob']}
                          rules={[{ required: true, message: "Child's date of birth is required." }]}
                          label='Date of birth'
                        >
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col xs={3}>
                        <Button
                          onClick={() => remove(name)}
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            marginTop: 20,
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            border: '1px solid #ccc',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          X
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => add()}
                      icon='+'
                      block
                      size='large'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      Add another child
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}

      {documentSubmitted && !documentApproved && (
        <div className='flex flex-col items-center gap-2'>
          <h3 className='text-gray-800'>
            You have already submitted this document, please wait for the admin to approve your request.
          </h3>
        </div>
      )}
    </div>
  )
}

export default UserForm
