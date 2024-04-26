<?php
include 'connection.php'; // Connect to your database

// Check if the form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract data from POST
    $firstName = $_POST['firstName'];
    $surname = $_POST['surname'];
    $mobile = $_POST['mobile'];
    $addressLine1 = $_POST['addressLine1'];
    $addressLine2 = $_POST['addressLine2'];
    $town = $_POST['town'];
    $countycity = $_POST['countycity'];
    $eircode = $_POST['eircode'];

    // SQL query to update the user's shipping address
    // Note: Ensure your table and column names match your database schema
    $sql = "UPDATE users SET addressLine1=?, addressLine2=?, town=?, countycity=?, eircode=? WHERE mobile=?";

    // Prepare statement
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die("Error preparing the SQL statement: " . $conn->error);
    }

    // Bind parameters and execute
    $stmt->bind_param("ssssss", $addressLine1, $addressLine2, $town, $countycity, $eircode, $mobile);
    if ($stmt->execute()) {
        // Process success
        header("Location: index.php?success=1"); // Redirect back to index.php
        exit();
    } else {
        // Handle error
        header("Location: index.php?error=" . urlencode($conn->error)); // Optional: Pass error message
        exit();
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>