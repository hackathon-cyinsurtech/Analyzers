<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/connect_db.php";
include_once "../objects/user.php";

$database = new Database();
$db = $database->connect();

// initialize object
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$stmt = $user->add($id);

if ($stmt!=NULL){
	echo json_encode(array("message" => "0"));
}
else{
	echo json_encode(array("message" => "1"));
}

?>
