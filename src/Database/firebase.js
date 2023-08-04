import {initializeApp} from 'firebase/app'
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPAOFX7pXhBaJ1cJIB-gbZLju5PRK6jMw",
    authDomain: "kanban-board-8ea95.firebaseapp.com",
    projectId: "kanban-board-8ea95",
    storageBucket: "kanban-board-8ea95.appspot.com",
    messagingSenderId: "376391099571",
    appId: "1:376391099571:web:b0833dfd0593d217eabcc6"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const boardsCollection = collection(db, 'boards')
