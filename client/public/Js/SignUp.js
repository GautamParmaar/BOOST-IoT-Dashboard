 // static javascript for form validation 
 const form = document.getElementById('form');
 const username = document.getElementById('username');
 const email = document.getElementById('email');
 const password = document.getElementById('password');
 const phoneNumber = document.getElementById("phone");
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
     return true;
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
       return true;
     }
   });
 }
 
 // Check input length
 function checkLength(input, min, max) {
   if (input.value.length < min) {
     showError(
       input,
       `${getFieldName(input)} must be at least ${min} characters`
     );
   } else if (input.value.length > max) {
     showError(
       input,
       `${getFieldName(input)} must be less than ${max} characters`
     );
     // alert("Enter Valid length!")
   } else {
     showSuccess(input);
     return true;
   }
 }
 
 
 // Get fieldname
 function getFieldName(input) {
   return input.id.charAt(0).toUpperCase() + input.id.slice(1);
 }
 
 // Event listeners
 form.addEventListener('submit', function(e) {
   // e.preventDefault();
   console.log("clicked successfully!")
   checkRequired([username, email, password,phoneNumber]);
   checkLength(username, 3, 15);
   checkLength(password, 6, 25);
   checkEmail(email);
   console.log("submitted form");
   if(checkEmail(email) && checkLength(username,3,15) && checkLength(password,6,25)){
     alert("email verification link is sent to your email address!");
   }
 });
 
 
 // strong password checking
 var myInput = document.getElementById("psw");
 var letter = document.getElementById("letter");
 var capital = document.getElementById("capital");
 var number = document.getElementById("number");
 var length = document.getElementById("length");
 
 // When the user clicks on the password field, show the message box
 myInput.onfocus = function() {
   document.getElementById("message").style.display = "block";
 }
 
 // When the user clicks outside of the password field, hide the message box
 myInput.onblur = function() {
   document.getElementById("message").style.display = "none";
 }
 
 // When the user starts to type something inside the password field
 myInput.onkeyup = function() {
   // Validate lowercase letters
   var lowerCaseLetters = /[a-z]/g;
   if(myInput.value.match(lowerCaseLetters)) {
     letter.classList.remove("invalid");
     letter.classList.add("valid");
   } else {
     letter.classList.remove("valid");
     letter.classList.add("invalid");
 }
 
   // Validate capital letters
   var upperCaseLetters = /[A-Z]/g;
   if(myInput.value.match(upperCaseLetters)) {
     capital.classList.remove("invalid");
     capital.classList.add("valid");
   } else {
     capital.classList.remove("valid");
     capital.classList.add("invalid");
   }
 
   // Validate numbers
   var numbers = /[0-9]/g;
   if(myInput.value.match(numbers)) {
     number.classList.remove("invalid");
     number.classList.add("valid");
   } else {
     number.classList.remove("valid");
     number.classList.add("invalid");
   }
 
   // Validate length --
   if(myInput.value.length >= 8) {
     length.classList.remove("invalid");
     length.classList.add("valid");
   } else {
     length.classList.remove("valid");
     length.classList.add("invalid");
   }
 }