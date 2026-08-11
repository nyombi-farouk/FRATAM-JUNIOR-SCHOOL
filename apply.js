```javascript
"use strict";

/* =========================================================
   FRATAM JUNIOR SCHOOL
   ADMISSION APPLICATION SYSTEM
   EmailJS + Mobile Navigation
   ========================================================= */


/* =========================================================
   EMAILJS SETTINGS
   ========================================================= */

const EMAILJS_PUBLIC_KEY = "e0n54GWwX9gXxtSWs";
const EMAILJS_SERVICE_ID = "service_ms66hyq";
const EMAILJS_TEMPLATE_ID = "template_6cqjh1n";

let emailJSReady = false;


/* =========================================================
   LOAD EMAILJS
   ========================================================= */

function initializeEmailJS() {

    return new Promise(function (resolve, reject) {

        /* EmailJS already loaded */
        if (typeof window.emailjs !== "undefined") {

            try {

                window.emailjs.init({
                    publicKey: EMAILJS_PUBLIC_KEY
                });

                emailJSReady = true;

                console.log("EmailJS initialized.");

                resolve();

            } catch (error) {

                console.error(
                    "EmailJS initialization error:",
                    error
                );

                reject(error);
            }

            return;
        }


        /* Load EmailJS library */
        const script = document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

        script.async = true;


        script.onload = function () {

            try {

                if (typeof window.emailjs === "undefined") {

                    throw new Error(
                        "EmailJS library was not loaded."
                    );
                }


                window.emailjs.init({
                    publicKey: EMAILJS_PUBLIC_KEY
                });


                emailJSReady = true;

                console.log(
                    "EmailJS loaded and initialized successfully."
                );


                resolve();

            } catch (error) {

                emailJSReady = false;

                console.error(
                    "EmailJS initialization failed:",
                    error
                );

                reject(error);
            }
        };


        script.onerror = function () {

            emailJSReady = false;

            const error = new Error(
                "Could not load EmailJS from the CDN."
            );

            console.error(error);

            reject(error);
        };


        document.head.appendChild(script);
    });
}


/* =========================================================
   RESULT MESSAGE
   ========================================================= */

function displayResult(message, type) {

    const result =
        document.getElementById("result");


    if (!result) {

        console.log(message);

        return;
    }


    result.textContent = message;

    result.style.display = "block";

    result.style.padding = "14px 16px";

    result.style.marginTop = "20px";

    result.style.borderRadius = "10px";

    result.style.textAlign = "center";

    result.style.fontWeight = "600";

    result.style.lineHeight = "1.5";


    /* SUCCESS */

    if (type === "success") {

        result.style.color = "#166534";

        result.style.backgroundColor = "#dcfce7";

        result.style.border = "1px solid #86efac";

    }


    /* ERROR */

    else if (type === "error") {

        result.style.color = "#991b1b";

        result.style.backgroundColor = "#fee2e2";

        result.style.border = "1px solid #fca5a5";

    }


    /* LOADING */

    else {

        result.style.color = "#1e40af";

        result.style.backgroundColor = "#dbeafe";

        result.style.border = "1px solid #93c5fd";
    }
}


/* =========================================================
   PAGE LOADED
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           MOBILE NAVIGATION
           ===================================================== */

        const menuButton =
            document.getElementById("menuBtn");

        const navigation =
            document.getElementById("navMenu");


        if (menuButton && navigation) {


            menuButton.addEventListener(
                "click",
                function () {

                    navigation.classList.toggle("show");


                    const menuIsOpen =
                        navigation.classList.contains("show");


                    menuButton.setAttribute(
                        "aria-expanded",
                        menuIsOpen
                            ? "true"
                            : "false"
                    );
                }
            );


            /* Close menu after selecting a link */

            const links =
                navigation.querySelectorAll("a");


            links.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            navigation.classList.remove(
                                "show"
                            );


                            menuButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }
                    );
                }
            );
        }


        /* =====================================================
           FIND APPLICATION FORM
           ===================================================== */

        const applicationForm =
            document.getElementById("applyForm");


        if (!applicationForm) {

            console.error(
                "FRATAM ERROR: #applyForm was not found."
            );

            return;
        }


        /* =====================================================
           FORM INPUTS
           ===================================================== */

        const studentName =
            document.getElementById("studentName");


        const dateOfBirth =
            document.getElementById("dob");


        const gender =
            document.getElementById("gender");


        const classApplying =
            document.getElementById("classApply");


        const parentName =
            document.getElementById("parentName");


        const phone =
            document.getElementById("phone");


        const email =
            document.getElementById("email");


        const address =
            document.getElementById("address");


        const additionalMessage =
            document.getElementById("message");


        /* =====================================================
           VERIFY REQUIRED ELEMENTS
           ===================================================== */

        const requiredElements = [
            studentName,
            dateOfBirth,
            gender,
            classApplying,
            parentName,
            phone,
            email,
            address
        ];


        const missingElement =
            requiredElements.find(
                function (element) {
                    return !element;
                }
            );


        if (missingElement) {

            console.error(
                "FRATAM ERROR: A required form element is missing."
            );

            return;
        }


        /* =====================================================
           FORM SUBMISSION
           ===================================================== */

        applicationForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* Prevent duplicate submissions */

                if (
                    applicationForm.dataset.sending ===
                    "true"
                ) {

                    return;
                }


                applicationForm.dataset.sending =
                    "true";


                /* =================================================
                   SUBMIT BUTTON
                   ================================================= */

                const submitButton =
                    applicationForm.querySelector(
                        'button[type="submit"]'
                    );


                const originalButtonText =
                    submitButton
                        ? submitButton.innerHTML
                        : "";


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    submitButton.innerHTML =
                        '<i class="fas fa-spinner fa-spin"></i> Sending...';
                }


                try {


                    /* =================================================
                       MAKE SURE EMAILJS IS READY
                       ================================================= */

                    if (
                        !emailJSReady ||
                        typeof window.emailjs ===
                        "undefined"
                    ) {

                        await initializeEmailJS();
                    }


                    if (
                        !emailJSReady ||
                        typeof window.emailjs ===
                        "undefined"
                    ) {

                        throw new Error(
                            "Email service is unavailable."
                        );
                    }


                    /* =================================================
                       READ FORM VALUES
                       ================================================= */

                    const studentNameValue =
                        studentName.value.trim();


                    const dobValue =
                        dateOfBirth.value.trim();


                    const genderValue =
                        gender.value.trim();


                    const classValue =
                        classApplying.value.trim();


                    const parentNameValue =
                        parentName.value.trim();


                    const phoneValue =
                        phone.value.trim();


                    const emailValue =
                        email.value.trim();


                    const addressValue =
                        address.value.trim();


                    const messageValue =
                        additionalMessage
                            ? additionalMessage.value.trim()
                            : "";


                    /* =================================================
                       VALIDATE REQUIRED FIELDS
                       ================================================= */

                    if (
                        !studentNameValue ||
                        !dobValue ||
                        !genderValue ||
                        !classValue ||
                        !parentNameValue ||
                        !phoneValue ||
                        !emailValue ||
                        !addressValue
                    ) {

                        throw new Error(
                            "Please complete all required fields."
                        );
                    }


                    /* =================================================
                       VALIDATE EMAIL
                       ================================================= */

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailPattern.test(emailValue)
                    ) {

                        throw new Error(
                            "Please enter a valid email address."
                        );
                    }


                    /* =================================================
                       VALIDATE PHONE
                       ================================================= */

                    if (
                        phoneValue.length < 7
                    ) {

                        throw new Error(
                            "Please enter a valid phone number."
                        );
                    }


                    /* =================================================
                       SHOW SENDING MESSAGE
                       ================================================= */

                    displayResult(
                        "Sending your application...",
                        "loading"
                    );


                    /* =================================================
                       EMAILJS TEMPLATE PARAMETERS
                       ================================================= */

                    const templateParams = {

                        studentName:
                            studentNameValue,

                        dob:
                            dobValue,

                        gender:
                            genderValue,

                        classApply:
                            classValue,

                        parentName:
                            parentNameValue,

                        phone:
                            phoneValue,

                        email:
                            emailValue,

                        address:
                            addressValue,

                        message:
                            messageValue,

                        date:
                            new Date().toLocaleString(),

                        school:
                            "FRATAM JUNIOR SCHOOL"
                    };


                    console.log(
                        "FRATAM application data:",
                        templateParams
                    );


                    /* =================================================
                       SEND APPLICATION
                       ================================================= */

                    const response =
                        await window.emailjs.send(
                            EMAILJS_SERVICE_ID,
                            EMAILJS_TEMPLATE_ID,
                            templateParams
                        );


                    console.log(
                        "EmailJS response:",
                        response
                    );


                    /* =================================================
                       SUCCESS
                       ================================================= */

                    if (
                        response &&
                        Number(response.status) === 200
                    ) {

                        displayResult(
                            "SENT — Application submitted successfully! We shall contact you soon.",
                            "success"
                        );


                        /* Clear form after successful sending */

                        applicationForm.reset();


                    } else {

                        throw new Error(
                            "The email service did not confirm the application."
                        );
                    }


                } catch (error) {


                    /* =================================================
                       ERROR
                       ================================================= */

                    console.error(
                        "FRATAM APPLICATION ERROR:",
                        error
                    );


                    let errorMessage =
                        "NOT SENT — Your application could not be sent.";


                    if (
                        error &&
                        error.text
                    ) {

                        errorMessage +=
                            " " +
                            error.text;

                    } else if (
                        error &&
                        error.message
                    ) {

                        errorMessage +=
                            " " +
                            error.message;
                    }


                    displayResult(
                        errorMessage,
                        "error"
                    );


                } finally {


                    /* =================================================
                       RESTORE BUTTON
                       ================================================= */

                    if (submitButton) {

                        submitButton.disabled =
                            false;


                        submitButton.innerHTML =
                            originalButtonText;
                    }


                    applicationForm.dataset.sending =
                        "false";
                }

            }
        );


        /* =====================================================
           INITIALIZE EMAILJS
           ===================================================== */

        initializeEmailJS()
            .then(
                function () {

                    console.log(
                        "FRATAM application system is ready."
                    );
                }
            )
            .catch(
                function (error) {

                    console.error(
                        "EmailJS startup error:",
                        error
                    );
                }
            );

    }
);
```
