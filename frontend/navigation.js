function goToStep(step) {
    console.log("goToStep called with step:", step);

    // Update the current step
    for (let i = 1; i <= 3; i++) {
        const stepElement = document.querySelector(`.progress-step:nth-child(${i})`);
        if (stepElement) {
            stepElement.classList.remove('active');
        } else {
            console.log(`Step element not found for step ${i}`);
        }
    }

    const currentStep = document.querySelector(`.progress-step:nth-child(${step})`);
    if (currentStep) {
        currentStep.classList.add('active');
    } else {
        console.log(`Current step element not found for step ${step}`);
    }

    // Navigate to the right page depending on stage
    switch (step) {
        case 1:
            console.log("Navigating to booking.html");
            window.location.href = 'booking.html';
            break;
        case 2:
            const therapyType = getTherapyType();
            console.log("Therapy type:", therapyType);
            const nextPage = (therapyType === 'hypercalendar') ? 'hypercalendar.html' : 'normcalendar.html';
            console.log("Navigating to", nextPage);
            window.location.href = nextPage;
            break;
        case 3:
            console.log("Navigating to bookingform.html");
            window.location.href = 'bookingform.html';
            break;
        default:
            console.log("Invalid step", step);
            break;
    }
}

// Function to retrieve the therapy type from local storage
function getTherapyType() {
    return localStorage.getItem('therapyType');
}
// Function to set the therapy type in local storage
function selectTherapyType(therapyType) {
    localStorage.setItem('therapyType', therapyType);
}


// Call prefillDateTime when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', prefillDateTime);


