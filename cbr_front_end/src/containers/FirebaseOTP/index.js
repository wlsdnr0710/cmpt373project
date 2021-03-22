import firebase from 'firebase'

//TODO: hide with JWT
const config={
    apiKey: "AIzaSyB9F8v83MFpL8SCgKnpo_IaDqGQ_e1njMU",
    authDomain: "earthcbr-73580.firebaseapp.com",
    projectId: "earthcbr-73580",
    storageBucket: "earthcbr-73580.appspot.com",
    messagingSenderId: "343378546721",
    appId: "1:343378546721:web:b70d44813755ac1196d360"
}
firebase.initializeApp(config);
export default firebase;

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
        <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js"></script>

        <!-- TODO: Add SDKs for Firebase products that you want to use
        https://firebase.google.com/docs/web/setup#available-libraries -->

        <script>
            // Your web app's Firebase configuration
            var firebaseConfig = {
                apiKey: "AIzaSyB9F8v83MFpL8SCgKnpo_IaDqGQ_e1njMU",
                authDomain: "earthcbr-73580.firebaseapp.com",
                projectId: "earthcbr-73580",
                storageBucket: "earthcbr-73580.appspot.com",
                messagingSenderId: "343378546721",
                appId: "1:343378546721:web:b70d44813755ac1196d360"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
        </script>
*/