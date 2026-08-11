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

    // Prevent loading EmailJS more than once
    if (window.emailjs) {

        try {

            window.emailjs.init({
                publicKey: EMAILJS_PUBLIC_KEY
            });

            emailJSReady = true;

            console.log("✅ EmailJS already loaded.");

        } catch (error) {

            console.error(
                "❌ EmailJS initialization failed:",
                error
            );

        }

        return;
    }


    const script = document.createElement("script");

    script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

    script.async = true;


    script.onload = function () {

        try {

            if (
                typeof window.emailjs === "undefined"
            ) {

                console.error(
                    "❌ EmailJS library loaded but emailjs is unavailable."
                );

                return;
            }


            window.emailjs.init({
                publicKey: EMAILJS_PUBLIC_KEY
            });


            emailJSReady = true;


            console.log(
                "✅ EmailJS initialized successfully."
            );


        } catch (error) {

            emailJSReady = false;

            console.error(
                "❌ EmailJS initialization failed:",
                error
            );

        }

    };


    script.onerror = function () {

        emailJSReady = false;

        console.error(
            "❌ Could not load EmailJS from CDN."
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


                    const menuOpen =
                        navMenu.classList.contains("show");


                    menuBtn.setAttribute(
                        "aria-expanded",
                        menuOpen ? "true" : "false"
                    );

                }
            );


            // Close menu when a navigation link is clicked

            const navLinks =
                navMenu.querySelectorAll("a");


            navLinks.forEach(function (link) {

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
           RESULT MESSAGE FUNCTION
           ========================================== */

        function showResult(
            message,
            type
        ) {

            if (!result) {

                console.log(message);

                return;

            }


            result.textContent =
                message;


            result.style.display =
                "block";


            result.style.padding =
                "12px 16px";


            result.style.marginTop =
                "15px";


            result.style.borderRadius =
                "8px";


            result.style.fontWeight =
                "600";


            result.style.lineHeight =
                "1.5";


            if (type === "success") {

                result.style.color =
                    "#166534";

                result.style.backgroundColor =
                    "#dcfce7";

                result.style.border =
                    "1px solid #86efac";

            }


            else if (type === "error") {

                result.style.color =
                    "#991b1b";

                result.style.backgroundColor =
                    "#fee2e2";

                result.style.border =
                    "1px solid #fca5a5";

            }


            else {

                result.style.color =
                    "#1e40af";

                result.style.backgroundColor =
                    "#dbeafe";

                result.style.border =
                    "1px solid #93c5fd";

            }

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
           CHECK FORM ELEMENTS
           ========================================== */

        const missingFields = [];


        if (!studentNameField) {
            missingFields.push("studentName");
        }

        if (!dobField) {
            missingFields.push("dob");
        }

        if (!genderField) {
            missingFields.push("gender");
        }

        if (!classApplyField) {
            missingFields.push("classApply");
        }

        if (!parentNameField) {
            missingFields.push("parentName");
        }

        if (!phoneField) {
            missingFields.push("phone");
        }

        if (!emailField) {
            missingFields.push("email");
        }

        if (!addressField) {
            missingFields.push("address");
        }


        if (missingFields.length > 0) {

            console.error(
                "❌ Missing form fields:",
                missingFields
            );

            showResult(
                "❌ NOT SENT — Some required form fields are missing.",
                "error"
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
                   PREVENT DOUBLE SUBMISSION
                   ========================================== */

                if (form.dataset.submitting === "true") {

                    return;

                }


                form.dataset.submitting =
                    "true";


                /* ==========================================
                   CHECK EMAILJS
                   ========================================== */

                if (
                    !emailJSReady ||
                    typeof window.emailjs === "undefined"
                ) {

                    showResult(
                        "❌ NOT SENT — Email service is not ready. Please wait a few seconds and try again.",
                        "error"
                    );


                    console.error(
                        "❌ EmailJS is not ready."
                    );


                    form.dataset.submitting =
                        "false";


                    return;

                }


                /* ==========================================
                   GET FORM VALUES
                   ========================================== */

                const studentName =
                    studentNameField.value.trim();


                const dob =
                    dobField.value.trim();


                const gender =
                    genderField.value.trim();


                const classApply =
                    classApplyField.value.trim();


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


                    form.dataset.submitting =
                        "false";


                    return;

                }


                /* ==========================================
                   EMAIL VALIDATION
                   ========================================== */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    showResult(
                        "⚠️ NOT SENT — Please enter a valid email address.",
                        "error"
                    );


                    form.dataset.submitting =
                        "false";


                    return;

                }


                /* ==========================================
                   PHONE VALIDATION
                   ========================================== */

                if (phone.length < 7) {

                    showResult(
                        "⚠️ NOT SENT — Please enter a valid phone number.",
                        "error"
                    );


                    form.dataset.submitting =
                        "false";


                    return;

                }


                /* ==========================================
                   SUBMIT BUTTON
                   ========================================== */

                const submitButton =
                    form.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );


                let originalButtonText =
                    "";


                if (submitButton) {

                    if (
                        submitButton.tagName ===
                        "BUTTON"
                    ) {

                        originalButtonText =
                            submitButton.innerHTML;


                        submitButton.innerHTML =
                            "Sending Application...";

                    } else {

                        originalButtonText =
                            submitButton.value;


                        submitButton.value =
                            "Sending Application...";

                    }


                    submitButton.disabled =
                        true;

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
                    "=========================================="
                );

                console.log(
                    "📧 FRATAM JUNIOR SCHOOL APPLICATION"
                );

                console.log(
                    "=========================================="
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
                    "Application:",
                    templateParams
                );


                /* ==========================================
                   SEND WITH EMAILJS
                   ========================================== */

                try {

                    const response =
                        await window.emailjs.send(
                            EMAILJS_SERVICE_ID,
                            EMAILJS_TEMPLATE_ID,
                            templateParams
                        );


                    /* ==========================================
                       EMAILJS RESPONSE
                       ========================================== */

                    console.log(
                        "📨 EmailJS response:",
                        response
                    );


                    /*
                       EmailJS normally returns:
                       status: 200
                       text: "OK"
                    */


                    if (
                        response &&
                        Number(response.status) === 200
                    ) {

                        console.log(
                            "✅ APPLICATION SENT SUCCESSFULLY"
                        );


                        showResult(
                            "✅ SENT — Application submitted successfully! We shall contact you soon.",
                            "success"
                        );


                        /* ==========================================
                           CLEAR FORM
                           ========================================== */

                        form.reset();


                    } else {

                        console.error(
                            "❌ EmailJS returned an unexpected response:",
                            response
                        );


                        showResult(
                            "❌ NOT SENT — Email service returned an unexpected response. Please try again.",
                            "error"
                        );

                    }


                } catch (error) {


                    /* ==========================================
                       EMAILJS ERROR
                       ========================================== */

                    console.error(
                        "=========================================="
                    );

                    console.error(
                        "❌ APPLICATION NOT SENT"
                    );

                    console.error(
                        "=========================================="
                    );

                    console.error(
                        "Full error:",
                        error
                    );

                    console.error(
                        "Error status:",
                        error
                            ? error.status
                            : "Unknown"
                    );

                    console.error(
                        "Error text:",
                        error
                            ? error.text
                            : "Unknown"
                    );


                    /* ==========================================
                       CREATE USER-FRIENDLY ERROR
                       ========================================== */

                    let errorMessage =
                        "❌ NOT SENT — Your application could not be sent.";


                    if (
                        error &&
                        error.text
                    ) {

                        errorMessage +=
                            " " + error.text;

                    }


                    else if (
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

                }


                finally {


                    /* ==========================================
                       RESTORE BUTTON
                       ========================================== */

                    if (submitButton) {

                        if (
                            submitButton.tagName ===
                            "BUTTON"
                        ) {

                            submitButton.innerHTML =
                                originalButtonText;

                        } else {

                            submitButton.value =
                                originalButtonText;

                        }


                        submitButton.disabled =
                            false;

                    }


                    form.dataset.submitting =
                        "false";

                }

            }
        );


        /* ==========================================
           INITIAL MESSAGE
           ========================================== */

        console.log(
            "✅ FRATAM Junior School application form loaded."
        );

        console.log(
            "📧 Waiting for EmailJS..."
        );


    }
);
```
