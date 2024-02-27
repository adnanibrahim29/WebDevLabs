
/**
 * Changes the number displayed in the viewer element by the specified increment.
 * If the new number is less than 0, it will be set to 0.
 *
 * @param {HTMLElement} viewer - The element displaying the number.
 * @param {number} increment - The amount by which to increment the number.
 * @returns {void}
 */

function changeNumber(viewer, increment) {
    var currentNumber = parseInt(viewer.textContent, 10);
    var newNumber = currentNumber + increment;

    if (newNumber < 0) {
        newNumber = 0;
    }

    viewer.textContent = newNumber;
}

/**
 * Adds event listeners to the circle buttons and updates the viewer elements accordingly.
 *
 * @returns {void}
 */

document.querySelectorAll('.circle-button').forEach(function(button) {
    button.addEventListener('click', function() {
        var target = this.dataset.target;
        var viewer = document.querySelector(`[data-viewer="${target}"]`);
        var increment = this.classList.contains('increase') ? 1 : -1;
        changeNumber(viewer, increment);
    });
});

/**
 * Submits the form data and resets the viewer elements to '0'.
 * Displays an alert if the date input is empty.
 *
 * @returns {void}
 */

function submit() {
    const inputDate = document.getElementById("date");
    const userDate = inputDate.value;

    if(userDate === "") {
        alert("Please Enter a valid Date!");
        return;
    }

    document.getElementById("date").value='';
    // Select all elements with the 'circle-viewer' class
    var viewers = document.querySelectorAll('.circle-viewer');
        
    // Iterate over the NodeList and reset their content to '0'
    viewers.forEach(function(viewer) {
        viewer.textContent = '0';
    });

    alert("Data Recorded!");
}
