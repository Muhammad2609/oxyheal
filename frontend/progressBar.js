

function selectTherapyType(therapyType) {
    localStorage.setItem('therapyType', therapyType);
}

// Function to dynamically load the progress bar
function loadProgressBar() {
    const progressBarContainer = document.getElementById('progressBarContainer');

    // Create an AJAX request to fetch the content from progressBar.html 
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            progressBarContainer.innerHTML = xhr.responseText;

            const script = document.createElement('script');
            script.src = 'script.js'; // Include the script file
            progressBarContainer.appendChild(script);
        }
    };

    xhr.open('GET', 'progressBar.html', true);
    xhr.send();
}

// Load the progress bar when the page is loaded
window.onload = loadProgressBar;