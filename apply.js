```javascript
"use strict";

const EMAILJS_PUBLIC_KEY = "e0n54GWwX9gXxtSWs";
const EMAILJS_SERVICE_ID = "service_ms66hyq";
const EMAILJS_TEMPLATE_ID = "template_6cqjh1n";

let emailJSReady = false;


/* ==========================================
   LOAD EMAILJS
   ========================================== */

function loadEmailJS() {

    return new Promise(function (resolve, reject) {

        if (typeof window.emailjs !== "undefined") {

            try {

                window.emailjs.init({
                    publicKey: EMAILJS_PUBLIC_KEY
                });

                emailJSReady = true;

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


        const script = document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

        script.async = true;


        script.onload = function () {

            try {

                if (typeof window.emailjs === "undefined") {

                    throw new Error(
                        "EmailJS library could not be loaded."
                    );
                }


                window.emailjs.init({
                    publicKey: EMAILJS_PUBLIC_KEY
                });


                emailJSReady = true;

                console.log(
                    "FRATAM: EmailJS loaded successfully."
                );


                resolve();

            } catch (error) {

                emailJSReady = false;

                reject(error);
            }
        };


        script.onerror = function () {

            emailJSReady = false;

            reject(
                new Error(
                    "Could not load EmailJS."
                )
            );
        };


        document.head.appendChild(script);

    });
}


/* ==========================================
   SHOW RESULT
   ========================================== */

function showResult(message, type) {

    const result =
        document.getElementById("result");


    if (!result) {

        console.log(message);

        return;
    }


    result.textContent = message;

    result.style.display = "block";

    result.style.padding = "14px";

    result.style.marginTop = "20px";

    result.style.borderRadius = "10px";

    result.style.textAlign = "center";

    result.style.fontWeight = "600";


    if (type === "success") {

        result.style.color = "#166534";

        result.style.backgroundColor = "#dcfce7";

        result.style.border =
            "1px solid #86efac";

    } else if (type === "error") {

        result.style.color = "#991b1b";

        result.style.backgroundColor = "#fee2e2";

        result.style.border =
            "1px solid #fca5a5";

    } else {

        result.style.color = "#1e40af";

        result.style.backgroundColor = "#dbeafe";

        result.style.border =
            "1px solid #93c5fd";
    }
}


/* ==========================================
   GET FORM VALUE
   ========================================== */

function getValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {

        return "";
    }


    return element.value.trim();
}


/* ==========================================
   MOBILE MENU
   ========================================== */

function setupNavigation() {

    const menuBtn =
        document.getElementById("menuBtn");

    const navMenu =
        document.getElementById("navMenu");


    if (!menuBtn || !navMenu) {

        return;
    }


    menuBtn.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("show");


            const open =
                navMenu.classList.contains("show");


            menuBtn.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

        }
    );


    const links =
        navMenu.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navMenu.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });
}


/* ==========================================
   APPLICATION FORM
   ========================================== */

function setupApplicationForm() {

    const form =
        document.getElementById("applyForm");


    if (!form) {

        console.error(
            "FRATAM: applyForm not found."
        );

        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            event.stopPropagation();


            if (
                form.dataset.submitting === "true"
            ) {

                return;
            }


            form.dataset.submitting = "true";


            const submitButton =
                document.getElementById(
                    "submitButton"
                );


            const originalButton =
                submitButton
                    ? submitButton.innerHTML
                    : "Submit Application";


            try {

                /* ==========================================
                   GET VALUES
                   ========================================== */

                const studentName =
                    getValue("studentName");

                const dob =
                    getValue("dob");

                const gender =
                    getValue("gender");

                const classApply =
                    getValue("classApply");

                const parentName =
                    getValue("parentName");

                const phone =
                    getValue("phone");

                const email =
                    getValue("email");

                const address =
                    getValue("address");

                const message =
                    getValue("message");


                /* ==========================================
                   REQUIRED FIELD CHECK
                   ========================================== */

                if (
                    !studentName ||
                    !dob ||
                    !gender ||
                    !classApply ||
                    !parentName ||
                    !phone ||
                    !email ||
                    !address
                ) {

                    showResult(
                        "NOT SENT — Please complete all required fields.",
                        "error"
                    );

                    return;
                }


                /* ==========================================
                   EMAIL CHECK
                   ========================================== */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    showResult(
                        "NOT SENT — Please enter a valid email address.",
                        "error"
                    );

                    return;
                }


                /* ==========================================
                   PHONE CHECK
                   ========================================== */

                const cleanPhone =
                    phone.replace(
                        /[\s()-]/g,
                        ""
                    );


                if (
                    cleanPhone.length < 7
                ) {

                    showResult(
                        "NOT SENT — Please enter a valid phone number.",
                        "error"
                    );

                    return;
                }


                /* ==========================================
                   EMAILJS
                   ========================================== */

                if (!emailJSReady) {

                    showResult(
                        "Connecting to the application service...",
                        "info"
                    );


                    await loadEmailJS();
                }


                if (
                    !emailJSReady ||
                    typeof window.emailjs === "undefined"
                ) {

                    throw new Error(
                        "Email service is unavailable."
                    );
                }


                /* ==========================================
                   BUTTON
                   ========================================== */

                if (submitButton) {

                    submitButton.disabled = true;


                    submitButton.innerHTML =
                        '<i class="fas fa-spinner fa-spin"></i> Sending...';
                }


                showResult(
                    "Sending your application...",
                    "info"
                );


                /* ==========================================
                   EMAILJS PARAMETERS
                   ========================================== */

                const templateParams = {

                    studentName: studentName,

                    dob: dob,

                    gender: gender,

                    classApply: classApply,

                    parentName: parentName,

                    phone: phone,

                    email: email,

                    address: address,

                    message: message,

                    date:
                        new Date().toLocaleString(),

                    school:
                        "FRATAM JUNIOR SCHOOL"
                };


                console.log(
                    "FRATAM application:",
                    templateParams
                );


                /* ==========================================
                   SEND EMAIL
                   ========================================== */

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


                /* ==========================================
                   SUCCESS
                   ========================================== */

                if (
                    response &&
                    Number(response.status) === 200
                ) {

                    showResult(
                        "SENT — Application submitted successfully! We shall contact you soon.",
                        "success"
                    );


                    form.reset();

                } else {

                    throw new Error(
                        "EmailJS did not confirm the message."
                    );
                }


            } catch (error) {

                console.error(
                    "FRATAM application error:",
                    error
                );


                let errorMessage =
                    "NOT SENT — Your application could not be sent.";


                if (error && error.text) {

                    errorMessage +=
                        " " + error.text;

                } else if (
                    error &&
                    error.message
                ) {

                    errorMessage +=
                        " " + error.message;
                }


                showResult(
                    errorMessage,
                    "error"
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalButton;
                }


                form.dataset.submitting =
                    "false";
            }

        }
    );
}


/* ==========================================
   START
   ========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "FRATAM Apply page loaded."
        );


        setupNavigation();

        setupApplicationForm();


        loadEmailJS()
            .then(function () {

                console.log(
                    "FRATAM application system ready."
                );

            })
            .catch(function (error) {

                console.error(
                    "FRATAM EmailJS startup error:",
                    error
                );

            });

    }
);
```
