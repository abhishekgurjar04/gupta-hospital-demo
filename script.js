const API_BASE_URL = "http://localhost:8080/api";

const form = document.getElementById("appointmentForm");
const messageBox = document.getElementById("messageBox");

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    });
});

// Prevent past dates
document.getElementById("date").min = new Date().toISOString().split("T")[0];

// Department cards preselect the department in the form
document.querySelectorAll("[data-dept]").forEach(card => {
    card.addEventListener("click", () => {
        document.getElementById("department").value = card.dataset.dept;
    });
});

function showMessage(text, type){
    messageBox.className = type || "";
    messageBox.textContent = text;
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {
        patientName: document.getElementById("name").value,
        age: document.getElementById("age").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        date: document.getElementById("date").value,
        reason: document.getElementById("reason").value
    };

    showMessage("Submitting...");

    try {

        const response = await fetch(
            `${API_BASE_URL}/appointments`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
            }
        );

        if(!response.ok){
            throw new Error();
        }

        showMessage("Appointment request submitted successfully.", "success");

        form.reset();

    } catch(error){

        showMessage("Online booking is being set up. Please call +91 8949903217 or WhatsApp us to confirm your appointment.", "demo");
    }
});
