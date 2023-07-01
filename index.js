const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mqtt = require("mqtt");
const { initializeApp } = require("firebase/app");
const cors = require("cors");
const ejs = require("ejs");
const axios = require("axios");
const NewsAPI = require("newsapi");

// const newsapi = new NewsAPI('1f499fbc4dad4dd5bebf0ee2cd3e387d');
// const serverless = require("serverless-http")
// const router = express.Router();

const mime = require("mime");
mime.define({ "text/javascript": ["jsm"] });

//environment variables
require("dotenv").config();

//require environment variables for firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

module.exports.firebaseConfig = firebaseConfig;

const {
  getDatabase,
  ref,
  set,
  child,
  get,
  once,
  update,
  query,
  orderByValue,
  orderByChild,
  startAt,
  endAt,
} = require("firebase/database");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("firebase/auth");
const { Module } = require("module");

//express setup for accessing the express resources
const app = express();

// to include the css and other files use static method
app.use(express.static(path.join(__dirname, "/client")));
app.use(express.static(path.join(__dirname, "/client/public")));
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDay", "PUT", "PATCH"],
  })
);

//body-parser initialization
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//initialize the firebase with configuration
const firebaseApp = initializeApp(firebaseConfig);
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

app.get("*.ejs", function (req, res) {
  res.setHeader("content-type", "text/ejs");
});

// ---------------------GET METHODS START HERE --------------------

//homepge
app.get("/", (req, res) => {
  return res.render(path.join(__dirname, "/client/public/index.ejs"));
});

//signup page
app.get("/Signup", (req, res) => {
  return res.sendFile(path.join(__dirname, "/client/public/SignUp.html"));
});

// login page
app.get("/LoginPage", (req, res) => {
  return res.sendFile(path.join(__dirname, "/client/public/LoginPage.html"));
});

app.get("/recaptcha", (req, res) => {
  return res.sendFile(path.join(__dirname, "/client/public/recaptcha.html"));
});

app.get("/User-Dashboard", (req, res) => {
  // console.log(process.env.password)
  return res.sendFile(
    path.join(__dirname, "/client/public/User_Dashboard.html")
  );
});

app.get("/TimeTable", (req, res) => {
  get(ref(db, "/IoT-Dashboard/TimeTable/"))
    .then((snapshot) => {
      console.log(snapshot.exists());
      if (!snapshot.exists()) {
        set(ref(db, '/IoT-Dashboard/TimeTable/1'), {
          
          id:"1",
          Day:"Monday",
          Firstcol: "Hello world!",
          Secondcol: "Hello world",
          Thirdcol: "Hello world",
          Fourthcol: "Hello world",
          Fifthcol: "Hello world",
          Sixthcol: "Hello world",
          Seventhcol: "Hello world",
          Eighthcol: "Hello world",
          Ninethcol: "Hello world",
        });

        set(ref(db, `/IoT-Dashboard/TimeTable/2`), {
          id:"2",
          Day:"Tuesday",
          Firstcol: "Hello world!",
          Secondcol: "Hello world",
          Thirdcol: "Hello world",
          Fourthcol: "Hello world",
          Fifthcol: "Hello world",
          Sixthcol: "Hello world",
          Seventhcol: "Hello world",
          Eighthcol: "Hello world",
          Ninethcol: "Hello world",
        });
        set(ref(db, `/IoT-Dashboard/TimeTable/3`), {
          id:"3",
          Day:"Wednesday",
          Firstcol: "Hello world!",
          Secondcol: "Hello world",
          Thirdcol: "Hello world",
          Fourthcol: "Hello world",
          Fifthcol: "Hello world",
          Sixthcol: "Hello world",
          Seventhcol: "Hello world",
          Eighthcol: "Hello world",
          Ninethcol: "Hello world",
        });
        set(ref(db, `/IoT-Dashboard/TimeTable/4`), {
          id:"4",
          Day:"Thursday",
          Firstcol: "Hello world!",
          Secondcol: "Hello world",
          Thirdcol: "Hello world",
          Fourthcol: "Hello world",
          Fifthcol: "Hello world",
          Sixthcol: "Hello world",
          Seventhcol: "Hello world",
          Eighthcol: "Hello world",
          Ninethcol: "Hello world",
        });
        set(ref(db, `/IoT-Dashboard/TimeTable/5`), {
          id:"5",
          Day:"Friday",
          Firstcol: "Hello world!",
          Secondcol: "Hello world",
          Thirdcol: "Hello world",
          Fourthcol: "Hello world",
          Fifthcol: "Hello world",
          Sixthcol: "Hello world",
          Seventhcol: "Hello world",
          Eighthcol: "Hello world",
          Ninethcol: "Hello world",
        });
        set(ref(db, `/IoT-Dashboard/TimeTable/6`), {
          id:"6",
          Day:"Saturday",
          Firstcol: "Hello world!",
          Secondcol: "Hello world",
          Thirdcol: "Hello world",
          Fourthcol: "Hello world",
          Fifthcol: "Hello world",
          Sixthcol: "Hello world",
          Seventhcol: "Hello world",
          Eighthcol: "Hello world",
          Ninethcol: "Hello world",
        });
        return res.render(path.join(__dirname, "/client/public/TimeTable.ejs"));
      } else {
        var jsonArray = [];
        var data;
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            data = childSnapshot.val();
            jsonArray.push(data);
          });
          return res.render(
            path.join(__dirname, "/client/public/TimeTable.ejs"),
            { TableData: jsonArray }
          );
        }
      }
    })
    .catch((error) => {
      console.log("get method for time table error!");
      console.log(error);
    });
});

app.get("/News", async (req, res) => {
  console.log("Get News API");
  var api_url =
    "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=1f499fbc4dad4dd5bebf0ee2cd3e387d";
  const news_get = await axios.get(api_url);
  // console.log(news_get.data.articles);
  // console.log(news_get.data.articles[1].source.name)
  return res.render(path.join(__dirname, "/client/public/News.ejs"), {
    employee: news_get.data.articles,
  });
});

// -----------------GET METHODS ENDS HERE ----------------
// -=-------------POST METHODS -----------------------------

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
          set(ref(db, "/IoT-Dashboard/user/users" + user.uid), {
            uid: user.uid,
            username: name,
            email: emailId,
            mobile: mobileNo,
          })
            .then(() => {
              res.redirect("/recaptcha");
              console.log(`${user.username} is signed up successfully`);
            })
            .catch((error) => {
              console.log(error.message + "error occurred");
            });
          clearInterval(IntervalId);
        }
        user.reload();
      }, 1000);
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
  console.log(emailId);

  get(ref(db, "/IoT-Dashboard/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const uid = childSnapshot.key;
          var data = childSnapshot.val();
          var username = data.username;
          signInWithEmailAndPassword(auth, emailId, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(
                `${username} is logged in successfully! with user id: ${user.uid}`
              );
              return res.redirect("/recaptcha");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("password is incorrect , try correct password");
              console.log("not signed in ! " + uid + " " + errorMessage);
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
  return res.sendFile(__dirname + "/client/public/ForgotPassword");
});

app.post("/ForgotPass", (req, res) => {
  const emailId = req.body.useremail;
  sendPasswordResetEmail(auth, emailId)
    .then((result) => {
      console.log(
        "email has been sent successfully, go and reset your password"
      );
      return res.redirect("/LoginPage");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + "email is not valid");
    });
});


//----------------------- TimeTable POST METHOD----------------------
//  upDay the values in the firebase database when editing the data in the table
app.post("/TimeTable", async (req, res) => {
  const serial = await req.body.Serial;
  const subject = await req.body.Subject;
  const faculty = await req.body.Faculty;
  var timeslot = await req.body.value;
  const colDetails =  `${subject}(${faculty})`;
// console.log( " column ki details: "+colDetails)

if(timeslot){
    // console.log("Time slot sent to database")
    set(ref(db,`/IoT-Dashboard/TimeTable/Value`),{
      timeslot:timeslot
    })
}

get(ref(db,`/IoT-Dashboard/TimeTable/Value`))
.then((snapshot)=>{
  snapshot.forEach((value)=>{
    // console.log("time slot get method from database")
    const timedata = value.val();
    // console.log("timeslot from get method: " + timedata);
    if(timedata){
      // Perform the update operation
      try{
        if (timedata === "9:00AM-10:00AM") {
          // console.log("timeslot is working properly")
            // console.log("try block is working properly")
               update(ref(db, `/IoT-Dashboard/TimeTable/${serial}`), 
            {
              Firstcol: colDetails,
            }
            ) 
        }
        else if (timedata == "10:00AM-11:00AM") {
          // Perform the update operation
          return update(ref(db, `/IoT-Dashboard/TimeTable/${serial}`), 
          {
            Secondcol: colDetails,
          }
          )
        }
        else if (timedata == "11:00AM-12:00PM") {
          // Perform the update operation
          return update(ref(db, `/IoT-Dashboard/TimeTable/${serial}`), 
          {
            Thirdcol: colDetails,
          }
          )
        }
        else if (timedata == "12:00PM-01:00PM") {
          // Perform the update operation
          return update(ref(db, `/IoT-Dashboard/TimeTable/${serial}`), 
          {
            Fourthcol: colDetails,
          }
          )
        }
        else if (timedata == "01:30PM-02:30PM") {
          // Perform the update operation
          return update(ref(db, `/IoT-Dashboard/TimeTable/${serial}`), 
          {
            Sixthcol: colDetails,
          }
          )
        }
        else if (timedata == "02:30PM-03:30PM") {
          // Perform the update operation
          return update(ref(db, `/IoT-Dashboard/TimeTable/${serial}`), 
          {
            Seventhcol: colDetails,
          }
          )
        }
        else if (timedata == "03:30PM-04:30PM") {
          // Perform the update operation
          return update(ref(db, `/IoT-Dashboard/TimeTable/${serial}`), 
          {
            Eighthcol: colDetails,
          }
          )
        }
        else if (timedata == "04:30PM-05:30PM") {
          // Perform the update operation
          return update(ref(db, `/IoT-Dashboard/TimeTable/${serial}`), 
          {
            Ninethcol: colDetails,
          }
          )
        }
      }
    catch (error) {
      console.error("Error updating Firebase Realtime Database:", error);
    }
    }
  })
})

   
  });

// ----------------------MQTT Post and Get Method --------------------

app.get("/MQTTPage", (req, res) => {
  return res.sendFile(path.join(__dirname, "/client/public/MQTTPage.html"));
});

app.post("/MQTTPage", (req, res) => {
  const username = process.env.username;
  const password = process.env.password;
  const brokerUrl = process.env.brokerUrl;
  
  const port = process.env.port;
  const topic = req.body.Topic;
  const message = req.body.message;

  // ----------------------MQTT connection --------------------

  const client = mqtt.connect(brokerUrl, {
    username: username,
    password: password,
    port: port,
    protocol: "mqtts",
  });

  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    // Subscribe to a topic
    client.subscribe(topic);
    // Publish a message
    client.publish(topic, message);
  });

  client.on("message", (topic, message) => {
    console.log("Received message:", message.toString());
  });

  // Event listener for authentication failure
  client.on("error", function (error) {
    if (error.code === 4) {
      console.log("Incorrect username or password");
    } else {
      console.log("Error:", error);
    }
  });

  // if(client.disconnected = true){
  //   console.log('MQTT disconnected');
  // }

  // ----------------------MQTT Connection Ends Here--------------------
});

// _--------------------NewsAPI------------------------

const port1 = process.env.port1;

app.listen(1900, function () {
  console.log(`server is running on the port ${port1}!`);
});

// module.exports.handler = serverless(app);