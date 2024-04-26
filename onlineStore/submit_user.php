<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);


include('connection.php');

// Check if the form data is submitted
if(isset($_POST['Submit'])){
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (title, firstName, surname, mobile, email, addressLine1, addressLine2, town, countycity, eircode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssss", $title, $firstName, $surname, $mobile, $email, $addressLine1, $addressLine2, $town, $countycity, $eircode);

    // Set parameters and execute
    $title = $_POST['title']; 
    $firstName = $_POST['firstName'];
    $surname = $_POST['surname'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    $addressLine1 = $_POST['addressLine1'];
    $addressLine2 = $_POST['addressLine2'];
    $town = $_POST['town'];
    $countycity = $_POST['countycity'];
    $eircode = $_POST['eircode'];

    if ($stmt->execute()) {
        // Process success
        header("Location: assignment-04.php?success=1"); // Redirect back to index.php
        exit();
    } else {
        // Handle error
        header("Location: assignment-04.php?error=" . urlencode($conn->error)); // Optional: Pass error message
        exit();
    }
    
    $stmt->close();
    $conn->close();
}
?>