import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'

export const AddNotary = async (payload) => {
  try {
    await setDoc(doc(db, 'notarys', payload.userId), payload)

    // update user role
    await updateDoc(doc(db, 'users', payload.userId), {
      role: 'notary'
    })
    return {
      success: true,
      message: 'notary added successfully , please wait for approval'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const CheckIfNotaryAccountIsApplied = async (id) => {
  try {
    const notarys = await getDocs(query(collection(db, 'notarys'), where('userId', '==', id)))
    if (notarys.size > 0) {
      return {
        success: true,
        message: 'notary account already applied',
        data: notarys.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })[0]
      }
    }
    return {
      success: false,
      message: 'notary account not applied'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const GetAllNotarys = async () => {
  try {
    const notarys = await getDocs(collection(db, 'notarys'))
    return {
      success: true,
      data: notarys.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const UpdateNotary = async (payload) => {
  try {
    await setDoc(doc(db, 'notarys', payload.id), payload)
    return {
      success: true,
      message: 'notary updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const GetNotaryById = async (id) => {
  try {
    const notary = await getDoc(doc(db, 'notarys', id))
    return {
      success: true,
      data: notary.data()
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
