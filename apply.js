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

            console.log("✅ EmailJS initialized successfully.");

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

document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
       MOBILE NAVIGATION
       ========================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navMenu =
        document.getElementById("navMenu");


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("show");

            // Update accessibility state
            const isOpen =
                navMenu.classList.contains("show");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

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
       HELPER: SHOW RESULT
       ========================================== */

    function showResult(message, type) {

        if (!result) return;

        result.textContent = message;

        if (type === "success") {

            result.style.color = "#16a34a";
            result.style.backgroundColor = "#dcfce7";
            result.style.border = "1px solid #86efac";

        } else if (type === "error") {

            result.style.color = "#dc2626";
            result.style.backgroundColor = "#fee2e2";
            result.style.border = "1px solid #fca5a5";

        } else {

            result.style.color = "#0b57d0";
            result.style.backgroundColor = "#dbeafe";
            result.style.border = "1px solid #93c5fd";

        }

        result.style.padding = "12px 15px";
        result.style.borderRadius = "8px";
        result.style.marginTop = "15px";
        result.style.fontWeight = "600";

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

                showResult(
                    "❌ NOT SENT — Email service is not ready. Please wait a few seconds and try again.",
                    "error"
                );

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

                showResult(
                    "❌ NOT SENT — Some required form fields are missing.",
                    "error"
                );

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

                showResult(
                    "⚠️ NOT SENT — Please complete all required fields.",
                    "error"
                );

                return;

            }


            /* ==========================================
               EMAIL VALIDATION
               ========================================== */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showResult(
                    "⚠️ NOT SENT — Please enter a valid email address.",
                    "error"
                );

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

            showResult(
                "⏳ Sending your application...",
                "loading"
            );


            /* ==========================================
               EMAILJS TEMPLATE PARAMETERS
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

                date: new Date().toLocaleString(),

                school: "FRATAM JUNIOR SCHOOL"

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

            console.log(
                "Template Parameters:",
                templateParams
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
                   VERIFY EMAILJS RESPONSE
                   ========================================== */

                console.log(
                    "EmailJS response:",
                    response
                );


                if (
                    response &&
                    (
                        response.status === 200 ||
                        response.text === "OK"
                    )
                ) {

                    /* ==========================================
                       SUCCESS
                       ========================================== */

                    console.log(
                        "✅ Application sent successfully."
                    );

                    showResult(
                        "✅ SENT — Application submitted successfully! We shall contact you soon.",
                        "success"
                    );


                    /* ==========================================
                       CLEAR FORM AFTER SUCCESS
                       ========================================== */

                    form.reset();

                } else {

                    /*
                       EmailJS returned an unexpected response.
                       Treat it as NOT SENT instead of showing
                       a false success message.
                    */

                    console.error(
                        "❌ Unexpected EmailJS response:",
                        response
                    );

                    showResult(
                        "❌ NOT SENT — The email service returned an unexpected response. Please try again.",
                        "error"
                    );

                }


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


                /* ==========================================
                   BUILD USEFUL ERROR MESSAGE
                   ========================================== */

                let errorMessage =
                    "❌ NOT SENT — Your application could not be sent.";

                if (error && error.text) {

                    errorMessage +=
                        " EmailJS: " + error.text;

                } else if (error && error.message) {

                    errorMessage +=
                        " " + error.message;

                }


                showResult(
                    errorMessage,
                    "error"
                );

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

});
```
