/*=========================================
FRATAM JUNIOR SCHOOL
CONTACT PAGE JAVASCRIPT
=========================================*/


// =============================
// MOBILE MENU TOGGLE
// =============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle && navLinks){

menuToggle.addEventListener("click", ()=>{

    navLinks.classList.toggle("active");

    menuToggle.classList.toggle("open");

});

}


// =============================
// CLOSE MENU AFTER CLICK
// =============================

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click", ()=>{

    navLinks.classList.remove("active");
    menuToggle.classList.remove("open");

});

});


// =============================
// STICKY HEADER EFFECT
// =============================

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY > 50){

    header.classList.add("sticky");

}

else{

    header.classList.remove("sticky");

}

});


// =============================
// CONTACT FORM
// =============================

const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you for contacting FRATAM Junior School. We shall get back to you soon.");

form.reset();

});

}


// =============================
// BACK TO TOP BUTTON
// =============================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY > 400){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});
