const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket:process.env.storageBucket,
  messagingSenderId:process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};
        import { initializeApp} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
        import { getAuth,signInWithPopup, GoogleAuthProvider,signInWithRedirect,getRedirectResult } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
    
      const app=initializeApp(firebaseConfig);
      const provider = new GoogleAuthProvider(app);
      const auth = getAuth(app);
    
        const form = document.getElementById('form');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const google_login = document.getElementById("sign-in-google")
    
      // Show input error message
      function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
      }
      
      // Show success outline
      function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
      }
      
      // Check email is valid
      function checkEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
          showSuccess(input);
        } else {
          showError(input, 'Email is not valid');
        }
      }
      
      // Check required fields
      function checkRequired(inputArr) {
        inputArr.forEach(function(input) {
          if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
          } else {
            showSuccess(input);
          }
        });
      }
      
      // Get fieldname
      function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
      }
      // Event listeners
      form.addEventListener('submit', function(e) {
        // e.preventDefault();
  
        console.log("clicked successfully!")
        checkRequired([email,password]);
        checkEmail(email);
      });
  
      google_login.addEventListener('click',(e)=>{
        // e.preventDefault();
        console.log("clicked successfully")
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          return window.location.href = "../public/User_Dashboard.html";
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
      })