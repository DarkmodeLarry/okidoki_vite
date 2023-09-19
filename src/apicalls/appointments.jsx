import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'

export const BookNotaryAppointment = async (payload) => {
  try {
    await addDoc(collection(db, 'appointments'), payload)
    return { success: true, message: 'Appointment booked successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const GetNotaryAppointmentsOnDate = async (notaryId, date) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'appointments'), where('notaryId', '==', notaryId), where('date', '==', date))
    )
    const data = []
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const GetNotaryAppointments = async (notaryId) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'appointments'), where('notaryId', '==', notaryId)))
    const data = []
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id
      })
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const GetUserAppointments = async (userId) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'appointments'), where('userId', '==', userId)))
    const data = []
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id
      })
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const UpdateAppointmentStatus = async (id, status) => {
  try {
    await updateDoc(doc(db, 'appointments', id), {
      status
    })
    return { success: true, message: 'Appointment status updated' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}
