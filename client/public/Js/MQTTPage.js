   // static javascript for form validation 
   const form = document.getElementById('form');
   const username = document.getElementById('username');
   const password = document.getElementById('password');
   const brokerURL = document.getElementById("brokerURL");
   const topic = document.getElementById("Topic");
   const msg = document.getElementById("message");
   const boardMsg = document.getElementById("board-msg");
   
   // Message on the board
   form.addEventListener("submit", function(event){
     event.preventDefault();
     boardMsg.innerHTML = msg.value;
     boardMsg.style.color = "red";
     boardMsg.style.fontSize = "50px";
   })
   
   
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
     } else {
       showSuccess(input);
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
     checkRequired([username, password, brokerURL, topic, msg]);
     checkLength(username, 3, 15);
     checkLength(password, 6, 25);
     console.log("submitted form");
     alert("Message is sent to the Smart Notice Board");
   });