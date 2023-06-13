const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mqtt = require("mqtt");
const { initializeApp } = require("firebase/app");
const cors = require("cors");
const ejs = require("ejs");
const axios = require("axios");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1f499fbc4dad4dd5bebf0ee2cd3e387d');
const serverless = require("serverless-http")
const router = express.Router();


//environment variables
require('dotenv').config();

//require environment variables for firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbNE2JegNzLfgIjJVr6562V-RpJbvKMV4",
  authDomain: "boost-iot-club-project.firebaseapp.com",
  databaseURL: "https://boost-iot-club-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "boost-iot-club-project",
  storageBucket: "boost-iot-club-project.appspot.com",
  messagingSenderId: "72693946292",
  appId: "1:72693946292:web:18f76a0022464bda00c4e1",
  measurementId: "G-LGW5GH3X6Z"
};

const {
  getDatabase,
  ref,
  set,
  child,
  get,
  once,
} = require("firebase/database");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} = require("firebase/auth");
const { Module } = require("module");

//express setup for accessing the express resources
const app = express();

// to include the css and other files use static method
app.use(express.static(path.join(__dirname, "/client")));
app.use(express.static(path.join(__dirname, "/client/public")));
app.use(cors({
  origin: '*'
}));
app.use("/.netlify/functions/api/", router);

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

//body-parser initialization
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//initialize the firebase with configuration
const firebaseApp = initializeApp(firebaseConfig);
// module.exports = firebaseConfig;
// module.exports.firebaseConfig = firebaseConfig;
// create the database and its reference at location of the collection "IoT-Dashboard"
const db = getDatabase(firebaseApp);
// firebase authentication setup
const auth = getAuth(firebaseApp);

// Set the "Content-Type" header for JavaScript files
app.get("*.js", function (req, res) {
  res.setHeader("Content-Type", "text/js");
});

// Set the "Content-Type" header for CSS files
app.get("*.css", function (req, res) {
  res.setHeader("Content-Type", "text/css");
});

app.get("*.html", function (req, res) {
  res.setHeader("Content-Type", "text/html");
});

app.get("*.ejs",function(req,res){
  res.setHeader("content-type", "text/ejs");
})

//homepge
app.get("/",(req,res)=>{
  return res.sendFile(path.join(__dirname,"../dist/index.html"));
})

//signup page
app.get("/Signup", (req, res) => {      
  
  return res.sendFile(path.join(__dirname,"/client/public/SignUp.html"));
});


// login page
app.get("/LoginPage", (req, res) => {
   return res.sendFile(path.join(__dirname,"/client/public/LoginPage.html"));
});

app.get("/recaptcha",(req,res)=>{
  return res.sendFile(path.join(__dirname,"/client/public/recaptcha.html"));
})

app.get("/User-Dashboard",(req,res)=>{
console.log(process.env.password)
  return res.sendFile(path.join(__dirname,"/client/public/User_Dashboard.html"));
})

app.post("/Signup", (req, res) => {
  console.log("post is working");
  const name = req.body.username;
  const emailId = req.body.useremail;
  const password = req.body.password;
  const mobileNo = req.body.phone;


  createUserWithEmailAndPassword(auth, emailId, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          sendEmailVerification(user);

          //this intervals runs after every five seconds and when the emailVerified returns true then it ends
          const IntervalId = setInterval(() => {
            console.log(user.emailVerified);
            if (user.emailVerified) {
              // if the email is verified then add the record in the database
              set(ref(db, "/IoT-Dashboard/users" + user.uid), {
                uid: user.uid,
                username: name,
                email: emailId,
                mobile: mobileNo,
              })
                .then(() => {

                  res.redirect("/recaptcha")
                  console.log(`${user.username} is signed up successfully`)
                })
                .catch((error) => {
                  console.log(error.message + "error occurred");
                });
              clearInterval(IntervalId);
            }
            user.reload();
          }, 5000);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });        

});

// user login form
app.post("/LoginPage", (req, res) => {
  const emailId = req.body.useremail;
  const password = req.body.password;
  console.log(emailId)

 get(ref(db, "/IoT-Dashboard/"))
    .then((snapshot) => {
      if (snapshot.exists()) {

        snapshot.forEach((childSnapshot)=>{
          const uid = childSnapshot.key;
          var data = childSnapshot.val();
          var username = data.username;
              signInWithEmailAndPassword(auth, emailId, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(`${username} is logged in successfully! with user id: ${user.uid}`);
                return res.redirect("/recaptcha")
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("password is incorrect , try correct password");
                console.log("not signed in ! " + uid+" " + errorMessage);
              });
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.log(error + "cant read");
      console.log(error.message);
    });

});



//Forgot password
app.get("/ForgotPass", (req, res) => {

  return res.sendFile(__dirname+"/client/public/ForgotPassword")
})

app.post("/ForgotPass", (req, res) => {
  const emailId = req.body.useremail;
    sendPasswordResetEmail(auth, emailId)
  .then((result) => {
    console.log("email has been sent successfully, go and reset your password");
    return res.redirect("/LoginPage");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage + "email is not valid");
  });
})

// ----------------------MQTT Post and Get Method --------------------

app.get("/MQTTPage",(req,res)=>{
  return res.sendFile(path.join(__dirname,"/client/public/MQTTPage.html"))
})

app.post("/MQTTPage",(req,res)=>{

  const username =  process.env.username;
  const password =  process.env.password;
  const brokerUrl =  process.env.brokerUrl;
  const port = process.env.port;
  const topic = req.body.Topic;
  const message = req.body.message;

// ----------------------MQTT connection --------------------

const client = mqtt.connect(brokerUrl, {
  username:username,
  password: password,
  port: port,
  protocol: 'mqtts',
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  // Subscribe to a topic
  client.subscribe(topic);
  // Publish a message
  client.publish(topic,message);
});

client.on('message', (topic, message) => {
  console.log('Received message:', message.toString());
});

// Event listener for authentication failure
client.on('error', function (error) {
  if (error.code === 4) {
    console.log('Incorrect username or password');
  } else {
    console.log('Error:', error);
  }
});


// if(client.disconnected = true){
//   console.log('MQTT disconnected');
// }

// ----------------------MQTT Connection Ends Here--------------------


// _--------------------NewsAPI------------------------
let responseNews;


    // return res.render(path.join(__dirname,"../client/public/News",));
  })

  app.get('/News',async(req,res)=>{
  
    console.log("Get News API");
    var api_url="https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=1f499fbc4dad4dd5bebf0ee2cd3e387d"
    const news_get= await axios.get(api_url);
    console.log(news_get.data.articles);
    console.log(news_get.data.articles[1].source.name)
            return res.render(path.join(__dirname,"/client/public/News.ejs",),{employee:news_get.data.articles});
  })  

const port1 = process.env.port1;

app.listen(3000, function () {
  console.log(`server is running on the port ${port1}!`);
});

// module.exports.handler = serverless(app);
