let currentStep = 1;
const totalSteps = 9;

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form submitted successfully!');
});

function nextStep() {
    if (currentStep < totalSteps) {
        if (validateStep(currentStep)) {
            animateTransitionOut(currentStep);
            currentStep++;
            animateTransitionIn(currentStep);
            updateNavigationButtons();
            updateBackgroundColor(currentStep);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        animateTransitionOut(currentStep);
        currentStep--;
        animateTransitionIn(currentStep);
        updateNavigationButtons();
        updateBackgroundColor(currentStep);
    }
}

function validateStep(step) {
    if (step === 5) { // Password step
        const password = document.getElementById('password').value;
        const strongPasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        if (!strongPasswordPattern.test(password)) {
            alert('Password must contain at least one number, one uppercase and lowercase letter, one special character, and be at least 8 characters long');
            return false;
        }
    }
    return true;
}

function animateTransitionOut(step) {
    const formGroup = document.querySelector(`.form-group[data-step="${step}"]`);
    gsap.to(formGroup, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => formGroup.classList.remove('active')
    });
}

function animateTransitionIn(step) {
    const formGroup = document.querySelector(`.form-group[data-step="${step}"]`);
    formGroup.classList.add('active');
    gsap.fromTo(formGroup, {
        opacity: 0,
        y: -20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5
    });
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = currentStep === totalSteps ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = currentStep === totalSteps ? 'inline-block' : 'none';
}

function updateBackgroundColor(step) {
    document.body.className = `step-${step}`;
}

document.addEventListener('DOMContentLoaded', () => {
    animateTransitionIn(currentStep);
    updateNavigationButtons();
    updateBackgroundColor(currentStep);
});





// let currentStep = 1;

// function showAirplane() {
//     const airplane = document.getElementById('airplane');
//     airplane.style.display = 'block';
//     airplane.style.animation = 'airplaneFly 2s forwards';
// }

// function updateStep(step) {
//     const formGroups = document.querySelectorAll('.form-group');
//     formGroups.forEach(group => group.classList.remove('active'));
//     document.querySelector(`.form-group[data-step="${step}"]`).classList.add('active');

//     document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'inline-block';
//     document.getElementById('nextBtn').style.display = step === formGroups.length ? 'none' : 'inline-block';
//     document.getElementById('submitBtn').style.display = step === formGroups.length ? 'inline-block' : 'none';
// }

// function nextStep() {
//     const inputs = document.querySelectorAll(`.form-group[data-step="${currentStep}"] input, .form-group[data-step="${currentStep}"] select, .form-group[data-step="${currentStep}"] textarea`);
//     let allFilled = true;
//     inputs.forEach(input => {
//         if (input.value === '' && !input.hasAttribute('optional')) {
//             allFilled = false;
//         }
//     });

//     if (allFilled) {
//         currentStep++;
//         updateStep(currentStep);
//         showAirplane();
//     } else {
//         alert('Please fill in all required fields.');
//     }
// }

// function prevStep() {
//     currentStep--;
//     updateStep(currentStep);
// }

// document.querySelectorAll('.form-group input').forEach(input => {
//     input.addEventListener('input', () => {
//         if (input.value.length > 0) {
//             showAirplane();
//         }
//     });
// });

// updateStep(currentStep);
