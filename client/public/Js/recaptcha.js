const getUserbtn = document.getElementById("getUser")
const form_control = document.getElementById("OTP-Label");
const sendbtn = document.getElementById("send");
const codeId = document.getElementById("code");
form_control.style.display = "none";


document.addEventListener("DOMContentLoaded",function(e){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha');
    window.recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
        e.preventDefault();
})
sendbtn.addEventListener("click",(e)=>{
    var recaptchaResponse = window.grecaptcha.getResponse(window.recaptchaWidgetId);
        console.log(recaptchaResponse)
        // using recaptchaResponse you can block user from taking any action untill valid captcha is returneds
        var phoneNumber = $("#phoneNo").val();
        console.log(phoneNumber);
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                codeId.style.display = "inline"
                getUserbtn.style.display = "inline";
                form_control.style.display = "inline"

                console.log("ok")
            }).catch(function (error) {
                window.recaptchaVerifier.render().then(function(widgetId) {
                   return window.grecaptcha.reset(widgetId);
                });
            });
})

getUserbtn.addEventListener("click",(e)=>{
    const code = $("#code").val();
        window.confirmationResult.confirm(code).then(function (result) {
            var user = result.user;
            console.log(result, user);
            return window.location.href = "../public/User_Dashboard.html";
        }).catch(function (error) {
            alert("Error Happend");
            console.log(error);
        });
});
});