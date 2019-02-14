import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyDjW8vOG7ZCYaXDN1ixALzX-vukN-nGVao",
    authDomain: "auth-app-a1a30.firebaseapp.com",
    databaseURL: "https://auth-app-a1a30.firebaseio.com",
    projectId: "auth-app-a1a30",
    messagingSenderId: "273353911781"

}
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser


// firebase collections
const notesCollection = db.collection('notes')

export default {
    db,
    auth,
    currentUser,
    notesCollection

}