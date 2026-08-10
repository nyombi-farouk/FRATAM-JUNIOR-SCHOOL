/* ==========================================
   FRATAM JUNIOR SCHOOL
   APPLICATION + EMAILJS SCRIPT
   ========================================== */

// ================================
// EMAILJS CONFIGURATION
// ================================

const EMAILJS_PUBLIC_KEY = "e0n54GWwX9gXxtSWs";
const EMAILJS_SERVICE_ID = "service_ms66hyq";
const EMAILJS_TEMPLATE_ID = "template_bb3yaho";

// Load EmailJS automatically
const emailjsScript = document.createElement("script");

emailjsScript.src =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

emailjsScript.onload = function () {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

    console.log("EmailJS initialized successfully.");
};

emailjsScript.onerror = function () {
    console.error("Failed to load EmailJS.");
};

document.head.appendChild(emailjsScript);


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

}


// ==========================================
// APPLICATION FORM
// ==========================================

const form = document.getElementById("applyForm");
const result = document.getElementById("result");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        // Get form values
        const studentName =
            document.getElementById("studentName").value.trim();

        const dob =
            document.getElementById("dob").value;

        const gender =
            document.getElementById("gender").value;

        const classApply =
            document.getElementById("classApply").value;

        const parentName =
            document.getElementById("parentName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const message =
            document.getElementById("message").value.trim();


        // ==========================================
        // CHECK REQUIRED INFORMATION
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
        // APPLICATION OBJECT
        // ==========================================

        const application = {

            student: studentName,

            dob: dob,

            gender: gender,

            class: classApply,

            parent: parentName,

            phone: phone,

            email: email,

            address: address,

            message: message,

            date: new Date().toLocaleString()

        };


        // ==========================================
        // SAVE APPLICATION TO LOCAL STORAGE
        // ==========================================

        let applications =
            JSON.parse(localStorage.getItem("applications")) || [];

        applications.push(application);

        localStorage.setItem(
            "applications",
            JSON.stringify(applications)
        );


        // ==========================================
        // SHOW SENDING MESSAGE
        // ==========================================

        const submitButton =
            form.querySelector('button[type="submit"]');

        const originalButtonText =
            submitButton.innerHTML;

        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending Application...';

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


        try {

            // ==========================================
            // SEND APPLICATION THROUGH EMAILJS
            // ==========================================

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );


            // ==========================================
            // SUCCESS
            // ==========================================

            result.innerHTML =
                "✅ Application submitted successfully! We shall contact you soon.";

            result.style.color = "#16a34a";

            form.reset();


            console.log(
                "Application sent successfully."
            );


        } catch (error) {

            // ==========================================
            // ERROR
            // ==========================================

            console.error(
                "EmailJS Error:",
                error
            );

            result.innerHTML =
                "❌ Application saved, but the email could not be sent. Please try again.";

            result.style.color = "#dc2626";

        }


        // ==========================================
        // RESTORE BUTTON
        // ==========================================

        submitButton.disabled = false;

        submitButton.innerHTML =
            originalButtonText;

    });

}
