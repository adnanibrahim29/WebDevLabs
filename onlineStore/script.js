
// Fetching Data
document.getElementById('showDatabase').addEventListener('click', function() {
    fetch('show_users.php') // Fetch the data from the server
    .then(response => response.text()) 
    .then(html => {
        document.getElementById('databaseDisplay').innerHTML = html; // Display the HTML
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('databaseDisplay').innerHTML = 'Failed to load data.';
    });
});

// Adding Users
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addUserForm').addEventListener('submit', function(e) {
        
        const formData = new FormData(this);

        fetch('submit_user.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text()) // Convert the response to text
        .then(text => {
            alert("Success");
            this.reset();
            if(text.includes("Successfully")) {
                this.reset(); // Reset the form
            }
        })
        .catch(error => alert('An error occurred: ' + error));
    });
});

// Updating Users
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('updateUserForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent traditional form submission
        
        const formData = new FormData(this);

        fetch('update_users.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text()) // Convert the response to text
        .then(text => {
            alert("Data Updated!"); 
            this.reset();
            if(text.includes("Successfully")) {
                this.reset(); // Reset the form if successful
            }
        })
        .catch(error => alert('An error occurred: ' + error));
    });
});

// Deleting Users
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('deleteUserForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent traditional form submission
        
        const formData = new FormData(this);

        fetch('delete_user.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text()) // Convert the response to text
        .then(text => {
            alert("Data Deleted!"); 
            this.reset();
            if(text.includes("Successfully")) {
                this.reset(); // Reset the form if successful
            }
        })
        .catch(error => alert('An error occurred: ' + error));
    });
});




