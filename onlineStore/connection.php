<?php

// Database connection 
// add your database details here
    $dbhost = "";
    $dbuser = "";
    $dbpass = "";
    $db = "";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);  // Create a connection to the database

    if ($conn->connect_error) {  // Check if the connection was successful
        echo "Connection failed:";
    }
?>