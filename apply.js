/* ==========================================
   FRATAM JUNIOR SCHOOL
   APPLICATION + EMAILJS SCRIPT
========================================== */

// ================================
// EMAILJS CONFIGURATION
// ================================

const EMAILJS_PUBLIC_KEY = "e0n54GWwX9gXxtSWs";
const EMAILJS_SERVICE_ID = "service_ms66hyq";
const EMAILJS_TEMPLATE_ID = "template_70fmwwt";


// ================================
// EMAILJS LOADING
// ================================

let emailJSReady = false;

const emailjsScript = document.createElement("script");

emailjsScript.src =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

emailjsScript.onload = function () {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

    emailJSReady = true;

    console.log("✅ EmailJS initialized successfully.");

};

emailjsScript.onerror = function () {

    console.error("❌ Failed to load EmailJS.");

};

document.head.appendChild(emailjsScript);


// ==========================================
// MOBILE MENU
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("show");

        });

    }


    // ==========================================
    // APPLICATION FORM
    // ==========================================

    const form = document.getElementById("applyForm");
    const result = document.getElementById("result");

    if (!form) {

        console.warn("⚠️ Application form #applyForm was not found.");

        return;

    }


    form.addEventListener("submit", async function (e) {

        e.preventDefault();


        // ==========================================
        // CHECK EMAILJS
        // ==========================================

        if (!emailJSReady || typeof emailjs === "undefined") {

            result.innerHTML =
                "❌ Email service is still loading. Please wait a few seconds and try again.";

            result.style.color = "#dc2626";

            console.error(
                "EmailJS is not ready."
            );

            return;

        }


        // ==========================================
        // GET FORM ELEMENTS
        // ==========================================

        const studentNameElement =
            document.getElementById("studentName");

        const dobElement =
            document.getElementById("dob");

        const genderElement =
            document.getElementById("gender");

        const classApplyElement =
            document.getElementById("classApply");

        const parentNameElement =
            document.getElementById("parentName");

        const phoneElement =
            document.getElementById("phone");

        const emailElement =
            document.getElementById("email");

        const addressElement =
            document.getElementById("address");

        const messageElement =
            document.getElementById("message");


        // ==========================================
        // CHECK FORM ELEMENTS
        // ==========================================

        if (
            !studentNameElement ||
            !dobElement ||
            !genderElement ||
            !classApplyElement ||
            !parentNameElement ||
            !phoneElement ||
            !emailElement ||
            !addressElement
        ) {

            result.innerHTML =
                "❌ Some required form fields are missing.";

            result.style.color = "#dc2626";

            console.error(
                "One or more form fields were not found."
            );

            return;

        }


        // ==========================================
        // GET VALUES
        // ==========================================

        const studentName =
            studentNameElement.value.trim();

        const dob =
            dobElement.value;

        const gender =
            genderElement.value;

        const classApply =
            classApplyElement.value;

        const parentName =
            parentNameElement.value.trim();

        const phone =
            phoneElement.value.trim();

        const email =
            emailElement.value.trim();

        const address =
            addressElement.value.trim();

        const message =
            messageElement
                ? messageElement.value.trim()
                : "";


        // ==========================================
        // VALIDATE REQUIRED FIELDS
        // ==========================================

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

            result.innerHTML =
                "⚠️ Please complete all required fields.";

            result.style.color = "#dc2626";

            return;

        }


        // ==========================================
        // BASIC EMAIL VALIDATION
        // ==========================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            result.innerHTML =
                "⚠️ Please enter a valid email address.";

            result.style.color = "#dc2626";

            return;

        }


        // ==========================================
        // SUBMIT BUTTON
        // ==========================================

        const submitButton =
            form.querySelector('button[type="submit"]');

        let originalButtonText = "";

        if (submitButton) {

            originalButtonText =
                submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending Application...';

        }


        // ==========================================
        // SHOW SENDING MESSAGE
        // ==========================================

        result.innerHTML =
            "⏳ Sending your application...";

        result.style.color = "#0b57d0";


        // ==========================================
        // EMAILJS TEMPLATE PARAMETERS
        // ==========================================

        const templateParams = {

            student: studentName,

            studentName: studentName,

            dob: dob,

            gender: gender,

            class: classApply,

            classApply: classApply,

            parent: parentName,

            parentName: parentName,

            phone: phone,

            email: email,

            address: address,

            message: message,

            date: new Date().toLocaleString(),

            school: "FRATAM JUNIOR SCHOOL"

        };


        console.log(
            "📧 Sending application through EmailJS..."
        );

        console.log(
            "Template:",
            EMAILJS_TEMPLATE_ID
        );


        // ==========================================
        // SEND EMAIL
        // ==========================================

        try {

            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );


            // ==========================================
            // SUCCESS
            // ==========================================

            console.log(
                "✅ EmailJS response:",
                response
            );

            result.innerHTML =
                "✅ Application submitted successfully! We shall contact you soon.";

            result.style.color = "#16a34a";


            // Clear form ONLY after successful email

            form.reset();


        } catch (error) {

            // ==========================================
            // EMAIL ERROR
            // ==========================================

            console.error(
                "❌ EmailJS Error:",
                error
            );

            console.error(
                "EmailJS Status:",
                error?.status
            );

            console.error(
                "EmailJS Message:",
                error?.text
            );


            result.innerHTML =
                "❌ Application could not be sent. Please try again.";

            result.style.color = "#dc2626";

        }


        // ==========================================
        // RESTORE BUTTON
        // ==========================================

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonText;

        }

    });

});
