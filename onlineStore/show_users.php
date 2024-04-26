<?php
include 'connection.php';

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>Title</th><th>First Name</th><th>Last Name</th><th>Mobile</th><th>Email</th><th>Address Line 1</th><th>Address Line 2</th><th>Town</th><th>County/City</th><th>Eircode</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["title"]."</td><td>".$row["firstName"]."</td><td>".$row["surname"]."</td><td>".$row["mobile"]."</td><td>".$row["email"]."</td><td>".$row["addressLine1"]."</td><td>".$row["addressLine2"]."</td><td>".$row["town"]."</td><td>".$row["countycity"]."</td><td>".$row["eircode"]."</td></tr>";
    }
} else {
    echo "No users found.";
}

$conn->close();

?>
