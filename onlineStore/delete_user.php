<?php
// Include your database connection script
include('connection.php');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect POST data from form
    $firstName = $_POST['firstName'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];

    // Create SQL to delete a user
    // Using prepared statements for security
    $stmt = $conn->prepare("DELETE FROM users WHERE firstName = ? AND surname = ? AND email = ? AND mobile = ?");
    $stmt->bind_param("ssss", $firstName, $surname, $email, $mobile);

    // Execute the query
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