import firebase from 'firebase'

// Firebase can work with both ReactJS and React native if we want to switch to mobile.
const config={
    apiKey: "AIzaSyB3VnCt6wUdVTPLNoIpbdLmXX3CcVyPPRE",
    authDomain: "earthcbr-ad762.firebaseapp.com",
    projectId: "earthcbr-ad762",
    storageBucket: "earthcbr-ad762.appspot.com",
    messagingSenderId: "926980593194",
    appId: "1:926980593194:web:caf773b49740035e5cd553"
}
firebase.initializeApp(config);
export default firebase;
