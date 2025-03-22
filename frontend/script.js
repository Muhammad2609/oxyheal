document.addEventListener("DOMContentLoaded", function () {
  var navBar = document.querySelector('.navbar');

  var navBarOffset = navBar.offsetTop;

  // change colour of navbar based on scroll
  function toggleSticky() {
    if (window.pageYOffset > 0) {
      navBar.classList.add("sticky");
      navBar.style.background = "#00144d"; 
    } else {
      navBar.classList.remove("sticky");
      navBar.style.background = "transparent"; 
    }
  }

  window.addEventListener('scroll', toggleSticky);

  toggleSticky();

  var isLoggedIn = false;

  function updateLoginButtonText() {
    var profileDropdownButton = document.getElementById('profileDropdownButton');
    if (profileDropdownButton) {
      profileDropdownButton.textContent = isLoggedIn ? 'Logout' : 'Profile';
    }
  }

  function handleLoginLogout() {
    if (isLoggedIn) {
      isLoggedIn = false;
      alert('Logged out successfully');
    } else {
      window.location.href = 'login.html';
    }

    updateLoginButtonText();
  }

  var loginLogoutButton = document.getElementById('loginLogoutButton');
  if (loginLogoutButton) {
    loginLogoutButton.addEventListener('click', handleLoginLogout);
  }

  updateLoginButtonText();

  // intialise emailJS for our contact us form
  emailjs.init("JN0WOyi0Mze0n9wjA");

// template and service details 
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      emailjs.sendForm('service_fil0pir', 'template_mnlmw7e', this)
        .then(function () {
          alert("Your Message Has Been Sent!");
          contactForm.reset();
        })
        .catch(function (error) {
          alert("Failed to send the message, please try again.");
        });
    });
  }

  var registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      handleRegistration();
    });
  }
// check if passwords match
  function handleRegistration() {
    if (!validatePassword()) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    var formData = new FormData(registrationForm);

    // change form data to json object
    var object = {};
    var count = 0;

    formData.forEach((value, key) => {
      if (count <= 6) {
        object[key] = value;
        console.log(object[key]);
        count++;
      }
    });

    var json = JSON.stringify(object);
    console.log(json);


    // send the form data to the server using post request
    fetch('https://18.132.13.38:3001/newuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: json 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(data => {
        console.log(data);
        // handle the response based on its type
        if (typeof data === 'string' || data instanceof String) {
          alert(data); 
        } else {
          alert("User registered successfully!"); 
        }

        // reset the form after
        registrationForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert("There was an error registering the user.");
      });
  }

  function validatePassword() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    return password === confirmPassword;
  }

  function fetchData() {
    fetch('https://18.132.13.38:3001/newuser')
      .then(response => response.json())
      .then(data => {
        const resultElement = document.getElementById('result');
        resultElement.textContent = `API Response: ${data.message}`;
      })
      .catch(error => console.error('Error:', error));
  }
});


// progress bar


 // Function to navigate to the chosen section
 function goToStep(step) {
// redirects
  switch (step) {
      case 1:
          window.location.href = 'booking.html'; 
          break;
      case 2:
          window.location.href = 'bookingform.html'; 
          break;
      case 3:
          window.location.href = 'checkout.html';
          break;
      default:
          console.log('Invalid step');
  }
}
