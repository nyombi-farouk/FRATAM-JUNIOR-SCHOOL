/*====================================================
    FRATAM JUNIOR SCHOOL
    GLOBAL WEBSITE JAVASCRIPT
=====================================================*/


// =====================================
// MOBILE MENU TOGGLE
// =====================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


if(menuBtn && navMenu){


    menuBtn.addEventListener("click",()=>{


        navMenu.classList.toggle("show");


        menuBtn.classList.toggle("open");


    });


}




// =====================================
// CLOSE MOBILE MENU WHEN LINK CLICKED
// =====================================


const navItems = document.querySelectorAll("#navMenu a");


navItems.forEach(link=>{


    link.addEventListener("click",()=>{


        if(navMenu){

            navMenu.classList.remove("show");

        }


        if(menuBtn){

            menuBtn.classList.remove("open");

        }


    });


});




// =====================================
// STICKY HEADER
// =====================================


const header = document.querySelector("header");


if(header){


window.addEventListener("scroll",()=>{


    if(window.scrollY > 60){


        header.classList.add("sticky");


    }

    else{


        header.classList.remove("sticky");


    }


});


}




// =====================================
// CONTACT FORM VALIDATION
// =====================================


const contactForm = document.getElementById("contactForm");


if(contactForm){


contactForm.addEventListener("submit",(event)=>{


event.preventDefault();



let name = document.getElementById("name")?.value.trim();

let email = document.getElementById("email")?.value.trim();

let message = document.getElementById("message")?.value.trim();




if(name==="" || email==="" || message===""){


alert("Please fill in all required fields.");

return;


}




alert(
"Thank you "+name+"! FRATAM Junior School will contact you soon."
);



contactForm.reset();



});


}




// =====================================
// BACK TO TOP BUTTON
// =====================================


const backTop = document.createElement("button");


backTop.innerHTML="↑";


backTop.id="topBtn";


document.body.appendChild(backTop);



window.addEventListener("scroll",()=>{


if(window.scrollY > 400){


    backTop.classList.add("show");


}

else{


    backTop.classList.remove("show");


}


});




backTop.addEventListener("click",()=>{


window.scrollTo({

    top:0,

    behavior:"smooth"

});


});




// =====================================
// SMOOTH SCROLL LINKS
// =====================================


document.querySelectorAll('a[href^="#"]').forEach(anchor=>{


anchor.addEventListener("click",function(e){


let target=document.querySelector(this.getAttribute("href"));


if(target){


e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


}


});


});





// =====================================
// SCROLL REVEAL ANIMATION
// =====================================


const revealElements=document.querySelectorAll(
".stat-box, .philosophy-card, .level-card, .subject, .approach-box div"
);



function reveal(){


revealElements.forEach(element=>{


let position=element.getBoundingClientRect().top;


let screenHeight=window.innerHeight;



if(position < screenHeight - 100){


element.classList.add("active");


}



});


}



window.addEventListener("scroll",reveal);


reveal();





// =====================================
// YEAR AUTO UPDATE FOOTER
// =====================================


const year=document.querySelector(".copyright");


if(year){


year.innerHTML =
"© "+new Date().getFullYear()+
" FRATAM Junior School. All Rights Reserved.";


}
