import Input from '@/components/ui/Input'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <div>
        <div className='flex justify-between'>
          <div className=''>
            <Input placeholder='Search Documents' className='w-[450px]' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
