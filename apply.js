```javascript
/* ==========================================
   FRATAM JUNIOR SCHOOL
   ADMISSION APPLICATION + EMAILJS
========================================== */


/* ==========================================
   EMAILJS CONFIGURATION
========================================== */

const EMAILJS_PUBLIC_KEY = "e0n54GWwX9gXxtSWs";
const EMAILJS_SERVICE_ID = "service_ms66hyq";
const EMAILJS_TEMPLATE_ID = "template_6cqjh1n";

let emailJSReady = false;


/* ==========================================
   LOAD EMAILJS
========================================== */

(function loadEmailJS() {

    const script = document.createElement("script");

    script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

    script.onload = function () {

        try {

            emailjs.init({
                publicKey: EMAILJS_PUBLIC_KEY
            });

            emailJSReady = true;

            console.log(
                "✅ EmailJS initialized successfully."
            );

        } catch (error) {

            console.error(
                "❌ EmailJS initialization failed:",
                error
            );

        }

    };

    script.onerror = function () {

        console.error(
            "❌ Could not load EmailJS."
        );

    };

    document.head.appendChild(script);

})();


/* ==========================================
   PAGE READY
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ==========================================
           MOBILE NAVIGATION
        ========================================== */

        const menuBtn =
            document.getElementById("menuBtn");

        const navMenu =
            document.getElementById("navMenu");


        if (menuBtn && navMenu) {

            menuBtn.addEventListener(
                "click",
                function () {

                    navMenu.classList.toggle("show");

                }
            );

        }


        /* ==========================================
           APPLICATION FORM
        ========================================== */

        const form =
            document.getElementById("applyForm");

        const result =
            document.getElementById("result");


        if (!form) {

            console.error(
                "❌ #applyForm was not found."
            );

            return;

        }


        /* ==========================================
           FORM SUBMISSION
        ========================================== */

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* ==========================================
                   CHECK EMAILJS
                ========================================== */

                if (
                    !emailJSReady ||
                    typeof emailjs === "undefined"
                ) {

                    if (result) {

                        result.textContent =
                            "❌ Email service is still loading. Please wait a few seconds and try again.";

                        result.style.color =
                            "#dc2626";

                    }

                    console.error(
                        "❌ EmailJS is not ready."
                    );

                    return;

                }


                /* ==========================================
                   GET FORM FIELDS
                ========================================== */

                const studentNameField =
                    document.getElementById("studentName");

                const dobField =
                    document.getElementById("dob");

                const genderField =
                    document.getElementById("gender");

                const classApplyField =
                    document.getElementById("classApply");

                const parentNameField =
                    document.getElementById("parentName");

                const phoneField =
                    document.getElementById("phone");

                const emailField =
                    document.getElementById("email");

                const addressField =
                    document.getElementById("address");

                const messageField =
                    document.getElementById("message");


                /* ==========================================
                   CHECK REQUIRED FORM ELEMENTS
                ========================================== */

                if (
                    !studentNameField ||
                    !dobField ||
                    !genderField ||
                    !classApplyField ||
                    !parentNameField ||
                    !phoneField ||
                    !emailField ||
                    !addressField
                ) {

                    if (result) {

                        result.textContent =
                            "❌ Some required form fields are missing.";

                        result.style.color =
                            "#dc2626";

                    }

                    console.error(
                        "❌ One or more required fields were not found."
                    );

                    return;

                }


                /* ==========================================
                   GET FORM VALUES
                ========================================== */

                const studentName =
                    studentNameField.value.trim();

                const dob =
                    dobField.value;

                const gender =
                    genderField.value;

                const classApply =
                    classApplyField.value;

                const parentName =
                    parentNameField.value.trim();

                const phone =
                    phoneField.value.trim();

                const email =
                    emailField.value.trim();

                const address =
                    addressField.value.trim();

                const message =
                    messageField
                        ? messageField.value.trim()
                        : "";


                /* ==========================================
                   REQUIRED FIELD VALIDATION
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

                    if (result) {

                        result.textContent =
                            "⚠️ Please complete all required fields.";

                        result.style.color =
                            "#dc2626";

                    }

                    return;

                }


                /* ==========================================
                   EMAIL VALIDATION
                ========================================== */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    if (result) {

                        result.textContent =
                            "⚠️ Please enter a valid email address.";

                        result.style.color =
                            "#dc2626";

                    }

                    return;

                }


                /* ==========================================
                   SUBMIT BUTTON
                ========================================== */

                const submitButton =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                let originalButtonText = "";


                if (submitButton) {

                    originalButtonText =
                        submitButton.innerHTML;

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        "Sending Application...";

                }


                /* ==========================================
                   SHOW SENDING MESSAGE
                ========================================== */

                if (result) {

                    result.textContent =
                        "⏳ Sending your application...";

                    result.style.color =
                        "#0b57d0";

                }


                /* ==========================================
                   EMAILJS TEMPLATE PARAMETERS
                ========================================== */

                const templateParams = {

                    studentName:
                        studentName,

                    dob:
                        dob,

                    gender:
                        gender,

                    classApply:
                        classApply,

                    parentName:
                        parentName,

                    phone:
                        phone,

                    email:
                        email,

                    address:
                        address,

                    message:
                        message,

                    date:
                        new Date().toLocaleString(),

                    school:
                        "FRATAM JUNIOR SCHOOL"

                };


                /* ==========================================
                   DEBUG INFORMATION
                ========================================== */

                console.log(
                    "📧 Sending FRATAM Junior School application..."
                );

                console.log(
                    "Service ID:",
                    EMAILJS_SERVICE_ID
                );

                console.log(
                    "Template ID:",
                    EMAILJS_TEMPLATE_ID
                );


                /* ==========================================
                   SEND APPLICATION WITH EMAILJS
                ========================================== */

                try {

                    const response =
                        await emailjs.send(
                            EMAILJS_SERVICE_ID,
                            EMAILJS_TEMPLATE_ID,
                            templateParams
                        );


                    /* ==========================================
                       SUCCESS
                    ========================================== */

                    console.log(
                        "✅ Application sent successfully."
                    );

                    console.log(
                        "EmailJS response:",
                        response
                    );


                    if (result) {

                        result.textContent =
                            "✅ Application submitted successfully! We shall contact you soon.";

                        result.style.color =
                            "#16a34a";

                    }


                    /* ==========================================
                       CLEAR FORM AFTER SUCCESS
                    ========================================== */

                    form.reset();


                } catch (error) {


                    /* ==========================================
                       EMAILJS ERROR
                    ========================================== */

                    console.error(
                        "❌ EmailJS Error:",
                        error
                    );

                    console.error(
                        "Status:",
                        error && error.status
                    );

                    console.error(
                        "Message:",
                        error && error.text
                    );


                    if (result) {

                        result.textContent =
                            "❌ Application could not be sent. Please try again.";

                        result.style.color =
                            "#dc2626";

                    }

                }


                /* ==========================================
                   RESTORE SUBMIT BUTTON
                ========================================== */

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalButtonText;

                }

            }
        );

    }
);
```
