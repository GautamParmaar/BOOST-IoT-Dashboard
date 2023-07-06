// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

console.log("working");

const closebtn = document.getElementById("close-btn");
closebtn.addEventListener("click", (e) => {
    e.preventDefault();
})

const savebtn = document.getElementById("save-change-btn");
savebtn.addEventListener("click", (e) => {
    alert("your record is updated successfully")
    setTimeout(() => {
        location.reload();
        e.preventDefault();
    }, 2000);
     
})

const timeslot = document.getElementById("Time-slot");
const dropdown = document.getElementById("dropdown");
const dropdown1 = document.getElementById("dropdown-1");
const dropdown2 = document.getElementById("dropdown-2");
const dropdown3 = document.getElementById("dropdown-3");
const dropdown4 = document.getElementById("dropdown-4");
const dropdown5 = document.getElementById("dropdown-5");
const dropdown6 = document.getElementById("dropdown-6");
const dropdown7 = document.getElementById("dropdown-7");
const dropdown8 = document.getElementById("dropdown-8");


dropdown1.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.marginLeft = "18rem";
    timeslot.innerText = "Time Slot: " + dropdown1.innerText;
    const value1 = dropdown1.innerText;
    fetch('/TimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value1 })
    })
})
dropdown2.addEventListener("click", (e) => {

    e.preventDefault();
    dropdown.style.marginLeft = "18rem";
    timeslot.innerText = "Time Slot: " + dropdown2.innerText;
    const value = dropdown2.innerText;
    fetch('/TimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
})
dropdown3.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.marginLeft = "18rem";
    timeslot.innerText = "Time Slot: " + dropdown3.innerText;
    const value = dropdown3.innerText;
    fetch('/TimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
})
dropdown4.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.marginLeft = "18rem";
    timeslot.innerText = "Time Slot: " + dropdown4.innerText;
    const value = dropdown4.innerText;
    fetch('/TimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
})
dropdown5.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.marginLeft = "18rem";
    timeslot.innerText = "Time Slot: " + dropdown5.innerText;
    const value = dropdown5.innerText;
    fetch('/TimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
})
dropdown6.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.marginLeft = "18rem";
    timeslot.innerText = "Time Slot: " + dropdown6.innerText;
    const value = dropdown6.innerText;
    fetch('/TimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
})
dropdown7.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.marginLeft = "18rem";
    timeslot.innerText = "Time Slot: " + dropdown7.innerText;
    const value = dropdown7.innerText;
    fetch('/TimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
})
dropdown8.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.marginLeft = "18rem";
    timeslot.innerText = "Time Slot: " + dropdown8.innerText;
    const value = dropdown8.innerText;
    fetch('/TimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value })
    })
})


