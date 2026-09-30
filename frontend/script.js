/* ========================================
   HEALTHCARE+
   JAVASCRIPT
   ======================================== */

"use strict";


/* ========================================
   TOAST MESSAGE
   ======================================== */

const toast =
    document.getElementById("toast");


function showMessage(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        window.toastTimer
    );

    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);
}


/* ========================================
   SCROLL
   ======================================== */

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ========================================
   EMERGENCY
   ======================================== */

function emergencyCall() {

    const confirmed =
        confirm(
            "Emergency support selected.\n\n" +
            "For a genuine emergency, call your local emergency service.\n\n" +
            "Do you want to call emergency services?"
        );

    if (confirmed) {

        window.location.href =
            "tel:112";
    }
}


/* ========================================
   APPOINTMENT
   ======================================== */

function bookAppointment() {

    scrollToSection("appointment");

    showMessage(
        "Please fill in the appointment form."
    );
}


/* ========================================
   FIND DOCTOR
   ======================================== */

function findDoctor() {

    scrollToSection("doctors");

    showMessage(
        "Choose a doctor from our doctors section."
    );
}


/* ========================================
   BOOK SPECIFIC DOCTOR
   ======================================== */

function bookDoctor(doctorName) {

    scrollToSection("appointment");

    const department =
        document.getElementById(
            "department"
        );


    if (
        doctorName.includes("Rahul")
    ) {

        department.value =
            "General Medicine";

    }

    else if (
        doctorName.includes("Priya")
    ) {

        department.value =
            "Cardiology";

    }

    else if (
        doctorName.includes("Amit")
    ) {

        department.value =
            "Dermatology";
    }


    showMessage(
        `${doctorName} selected. Complete the appointment form.`
    );
}


/* ========================================
   MEDICINE AVAILABILITY
   ======================================== */

function checkMedicine() {

    const medicine =
        prompt(
            "Enter the medicine name:"
        );


    if (!medicine) {

        return;
    }


    showMessage(
        `Availability request received for ${medicine}.`
    );
}


/* ========================================
   MEDICINE INFORMATION
   ======================================== */

function medicineInformation() {

    const medicine =
        prompt(
            "Enter the medicine name:"
        );


    if (!medicine) {

        return;
    }


    showMessage(
        `Basic information requested for ${medicine}.`
    );
}


/* ========================================
   MEDICINE REMINDER
   ======================================== */

function medicineReminder() {

    const medicine =
        prompt(
            "Enter medicine name:"
        );


    if (!medicine) {

        return;
    }


    const time =
        prompt(
            "Enter reminder time (example: 8:00 PM):"
        );


    if (!time) {

        return;
    }


    showMessage(
        `Reminder set for ${medicine} at ${time}.`
    );
}


/* ========================================
   PRESCRIPTION UPLOAD
   ======================================== */

function uploadPrescription(input) {

    if (
        !input.files ||
        input.files.length === 0
    ) {

        return;
    }


    const file =
        input.files[0];


    showMessage(
        `Prescription selected: ${file.name}`
    );
}


/* ========================================
   FIND PHARMACY
   ======================================== */

function findPharmacy() {

    showMessage(
        "Pharmacy search feature selected."
    );
}


/* ========================================
   VIDEO CONSULTATION
   ======================================== */

function videoConsultation() {

    showMessage(
        "Video consultation selected. A secure video service can be connected here."
    );
}


/* ========================================
   MOBILE MENU
   ======================================== */

function toggleMenu() {

    const nav =
        document.querySelector(".nav");

    nav.classList.toggle("open");
}


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .querySelector(".nav")
                    .classList
                    .remove("open");

            }
        );

    });


/* ========================================
   APPOINTMENT FORM
   ======================================== */

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


appointmentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "patientName"
                )
                .value
                .trim();


        const department =
            document
                .getElementById(
                    "department"
                )
                .value;


        const date =
            document
                .getElementById(
                    "appointmentDate"
                )
                .value;


        if (
            !name ||
            !department ||
            !date
        ) {

            showMessage(
                "Please complete all appointment fields."
            );

            return;
        }


        showMessage(
            `Appointment request submitted for ${name} in ${department}.`
        );


        appointmentForm.reset();

    }
);


/* ========================================
   DATE RESTRICTION
   Prevent selecting past dates
   ======================================== */

const appointmentDate =
    document.getElementById(
        "appointmentDate"
    );


const today =
    new Date()
        .toISOString()
        .split("T")[0];


appointmentDate.min = today;