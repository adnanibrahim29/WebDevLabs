<!DOCTYPE html>
<html lang="en">

<head>

<?php
    include ('connection.php');
    include ('submit_user.php');
    include ('delete_user.php');
    include ('update_users.php');
?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Store</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
     <!-- Adding user to database -->
<section class="form-section">
        <h2>Add User to Database</h2>
        <form id="addUserForm" action="submit_user.php" method="POST">
            <!-- Title -->
            <div class="form-group">
                <label for="title">Title:</label>
                <select name="title" id="title">
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <!-- First Name -->
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required>
            </div>
            <!-- Surname -->
            <div class="form-group">
                <label for="surname">Surname:</label>
                <input type="text" id="surname" name="surname" required>
            </div>
            <!-- Mobile -->
            <div class="form-group">
                <label for="mobile">Mobile:</label>
                <input type="tel" id="mobile" name="mobile" required>
            </div>
            <!-- Email -->
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <!-- Address Line 1 -->
            <div class="form-group">
                <label for="addressLine1">Home Address Line 1:</label>
                <input type="text" id="addressLine1" name="addressLine1" required>
            </div>
            <!-- Address Line 2 -->
            <div class="form-group">
                <label for="addressLine2">Home Address Line 2:</label>
                <input type="text" id="addressLine2" name="addressLine2">
            </div>
            <!-- town -->
            <div class="form-group">
                <label for="town">Town:</label>
                <input type="text" id="town" name="town" required>
            </div>
             <!-- county -->
             <div class="form-group">
                <label for="countycity">County/City:</label>
                <input type="text" id="countycity" name="countycity" required>
            </div>
              <!-- eircode  -->
              <div class="form-group">
                <label for="eircode">Eircode:</label>
                <input type="text" id="eircode" name="eircode">
            </div>
            <!-- Submit Button -->
            <input type="submit" value="Submit" name = "Submit" id="submitFormBtn">
        </form>
    </section>

     <!-- Deleting  a user from the database -->
    <section class="form-section">
        <h2>Delete a User</h2>
        <form id="deleteUserForm" action="delete_user.php" method="POST">
            <!-- First Name -->
            <div class="form-group">
                <label for="deleteFirstName">First Name:</label>
                <input type="text" id="deleteFirstName" name="firstName" required>
            </div>
            <!-- Surname -->
            <div class="form-group">
                <label for="deleteSurname">Surname:</label>
                <input type="text" id="deleteSurname" name="surname" required>
            </div>
            <!-- Email -->
            <div class="form-group">
                <label for="deleteEmail">Email:</label>
                <input type="email" id="deleteEmail" name="email" required>
            </div>
            <!-- Mobile -->
            <div class="form-group">
                <label for="deleteMobile">Mobile:</label>
                <input type="tel" id="deleteMobile" name="mobile" required>
            </div>
            <!-- Submit Button -->
            <input type="submit" value="Delete Matching User(s)">
        </form>
    </section>

     <!-- Updating user data -->
    <section class="form-section">
        <h2>Update Shipping Address</h2>
        <form id="updateUserForm" action="update_users.php" method="POST">
            <!-- First Name -->
            <div class="form-group">
                <label for="updateFirstName">First Name:</label>
                <input type="text" id="updateFirstName" name="firstName" required>
            </div>
            <!-- Surname -->
            <div class="form-group">
                <label for="updateSurname">Surname:</label>
                <input type="text" id="updateSurname" name="surname" required>
            </div>
            <!-- Mobile -->
            <div class="form-group">
                <label for="updateMobile">Mobile:</label>
                <input type="tel" id="updateMobile" name="mobile" required>
            </div>
            <!-- Shipping Address Line 1 -->
            <div class="form-group">
                <label for="updateAddressLine1">Shipping Address Line 1:</label>
                <input type="text" id="updateAddressLine1" name="addressLine1" required>
            </div>
            <!-- Shipping Address Line 2 -->
            <div class="form-group">
                <label for="updateAddressLine2">Shipping Address Line 2:</label>
                <input type="text" id="updateAddressLine2" name="addressLine2">
            </div>
            <!-- Shipping town -->
            <div class="form-group">
                <label for="updateTown">Town:</label>
                <input type="text" id="updateTown" name="town" required>
            </div>
            <!-- Shipping County City -->
            <div class="form-group">
                <label for="updateCountyCity">County/City:</label>
                <input type="text" id="updateCountyCity" name="countycity" required>
            </div>
            <!-- Shipping Eircode -->
            <div class="form-group">
                <label for="updateEircode">Eircode:</label>
                <input type="text" id="updateEircode" name="eircode">
            </div>
            <!-- Submit Button -->
            <input type="submit" value="Update" name="update">
        </form>
    </section>

     <!-- Showing Database -->
    <section class="form-section" action="show_users.php" method="POST">
        <h2>Show Database</h2>
        <button id="showDatabase">Show Users</button>
        <div id="databaseDisplay"></div>
    </section>
    <script src="script.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</body>

</html>