import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'

import { db } from '@/firebase/firebaseConfig'

export const AddDocument = async (payload) => {
  try {
    await setDoc(doc(db, 'documents', payload.userId), payload)

    // update document status
    await updateDoc(doc(db, 'users', payload.userId), {
      status: 'pending'
    })
    return {
      success: true,
      message: 'Document added successfully , please wait for approval'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const CheckIfDocumentIsSubmitted = async (id) => {
  try {
    const documents = await getDocs(query(collection(db, 'documents'), where('userId', '==', id)))
    if (documents.size > 0) {
      return {
        success: true,
        message: 'Document has already been submitted, pending approval.',
        data: documents.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })[0]
      }
    }
    return {
      success: false,
      message: 'Document has not been submitted yet.'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const GetAllDocuments = async () => {
  try {
    const documents = await getDocs(collection(db, 'documents'))
    return {
      success: true,
      data: documents.docs.map((doc) => {
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

export const UpdateDocument = async (payload) => {
  try {
    await setDoc(doc(db, 'documents', payload.id), payload)
    return {
      success: true,
      message: 'Document updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const GetDocumentById = async (id) => {
  try {
    const document = await getDoc(doc(db, 'documents', id))
    return {
      success: true,
      data: document.data()
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
