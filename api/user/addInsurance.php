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

$userid = $data->userid;
$insuranceid = $data->insuranceid;
$claims = $data->claims;
$price = $data->price;
$finalprice = $price;
for ($i=0; $i<$claims; $i++){
	$finalprice += 0.05 * $finalprice;
}
$stmt = $user->addInsurance($userid, $insuranceid, $claims, $finalprice);

if ($stmt!=NULL){
	echo json_encode(array("message" => "0"));
}
else{
	echo json_encode(array("message" => "1"));
}

?>
