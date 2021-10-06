  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDU18oKq0-KUp5Bj2aJtUzGkwTwGJQ4jt0",
    authDomain: "ventagasolinamstic.firebaseapp.com",
    projectId: "ventagasolinamstic",
    storageBucket: "ventagasolinamstic.appspot.com",
    messagingSenderId: "606293734557",
    appId: "1:606293734557:web:ee303187d7fa1d4ccb5074",
    measurementId: "G-HNKHCZ4N9Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);