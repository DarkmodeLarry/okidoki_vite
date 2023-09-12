import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCtZE1LDr7ib3KwrhHfo6rx18o-DVo1JMY',
  authDomain: 'okidoki-c6e06.firebaseapp.com',
  projectId: 'okidoki-c6e06',
  storageBucket: 'okidoki-c6e06.appspot.com',
  messagingSenderId: '735836616817',
  appId: '1:735836616817:web:4fd13b41b087e82b2183d0'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }

export default app
