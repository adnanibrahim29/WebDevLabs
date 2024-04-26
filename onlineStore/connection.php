<?php

// Database connection for LocalHost 
    // $dbhost = "localhost";
    // $dbuser = "root";
    // $dbpass = "";
    // $db = "cs230_u230408";

// Database connection for Maynooth
    $dbhost = "webcourse.cs.nuim.ie";
    $dbuser = "u230408";
    $dbpass = "Ieg8ahdahcieviin";
    $db = "cs230_u230408";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);  // Create a connection to the database

    if ($conn->connect_error) {  // Check if the connection was successful
        echo "Connection failed:";
    }
?>