<?php
// Retrieve the data sent from the Chrome extension
$data = json_decode(file_get_contents("php://input"), true);

// Connect to the MySQL database using InfinityFree's database credentials
$servername = "sql109.epizy.com";
$username = "*";
$password = "*";
$dbname = "epiz_34131223_adblocker_info";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Insert the data into the "data_table" table
$requestID = $data['requestID'];
$method = $data['method'];
$url= $data['url'];
$address = $data['address'];
$time = $data['time'];

$sql = "INSERT INTO data_table (requestID, method, url, address, time) VALUES ('$requestID', '$method', '$url', '$address', '$time')";

if ($conn->query($sql) === TRUE) {
  echo "Data added successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>