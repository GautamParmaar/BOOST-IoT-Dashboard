import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";


console.log("working");


var Date;
var Time;
var Subject;
var Faculty;
var Status;
var Edit;
var Delete;
const flag = false;

for(var i=1;i<=6;i++){

     Date = document.getElementById(`Date${i}`);
     Time = document.getElementById(`Time${i}`);
     Subject = document.getElementById(`Subject${i}`);
     Faculty = document.getElementById(`Faculty${i}`);
     Status = document.getElementById(`Status${i}`);
     Edit = document.getElementById(`edit-btn${i}`);
     Delete = document.getElementById(`delete-btn${i}`);

     

Edit.addEventListener("click",(e)=>{
    flag = true;
    e.preventDefault();
    console.log("clicked edit button");
    Edit.innerText = "Update"
    Date.innerHTML = '<input id="date" type="text" placeholder="Enter Day" style = "border:none">'
    Time.innerHTML = '<input id="time" type="text" placeholder="Enter Time" style = "border:none">'
    Subject.innerHTML = '<input id="subject" type="text" placeholder="Enter Subject" style = "border:none">'
    Faculty.innerHTML = '<input id="faculty" type="text" placeholder="Enter Faculty" style = "border:none">'
    
    //Date
    
    var date = document.getElementById("date");
        var datevalue;
        date.addEventListener("change", async function(e){
            datevalue = await e.target.value;
        })
        

    // Time
    var time = document.getElementById("time");
    var timevalue;
        time.addEventListener("change", function(e){
            timevalue =  e.target.value;
        })


    //Subject
    var subject = document.getElementById("subject");
    var subjectvalue;
        subject.addEventListener("change", function(e){
            subjectvalue = e.target.value;
        })


    //Faculty
    var faculty = document.getElementById("faculty");
    var facultyValue ;
        faculty.addEventListener("change", function(e){
            facultyValue = e.target.value;
        })

    //Update the value in the table
    Edit.setAttribute("id","Update");
    const Updatebtn = document.getElementById("Update");
    Updatebtn.addEventListener('click', function(e){

        Date.innerHTML = datevalue;
        Time.innerHTML = timevalue;
        Subject.innerHTML = subjectvalue;
        Faculty.innerHTML = facultyValue;
        Updatebtn.innerText = "Edit";
        Updatebtn.setAttribute("id","edit-btn1");


        // set the value in the database
        // set(ref(db,"/IoT-Dashboard/TimeTable" + col1),{
        // })
        // location.reload();


    })
})
if(flag === true){
    break;
}
}












