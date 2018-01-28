<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/connect_db.php";
include_once "../objects/user_car_details.php";

$database = new Database();
$db = $database->connect();

// initialize object
$user_car_details = new UserCarDetails($db);

$data = json_decode(file_get_contents("php://input"));

$arr = array();
$arr["reg_no"] = $data->reg_no;
$arr["make"] = $data->make;
$arr["model"] = $data->model;
$arr["color"] = $data->color;
$arr["type"] = $data->type;
$arr["cc"] = $data->cc;
$arr["year"] = $data->year;
$arr["passengers"] = $data->passengers;
$arr["est_value"] = $data->est_value;
$arr["acc"] = $data->acc;
$arr["own"] = $data->own;
$arr["health_prob"] = $data->health_prob;
$arr["have"] = $data->have;
$arr["accident"] = $data->accident;
$arr["criminal"] = $data->criminal;
$arr["user_id"] = $data->user_id;

$stmt = $user_car_details->add($arr);

if ($stmt!=NULL){
	echo json_encode(array("message" => "0", "user_car_details" => $stmt));
}
else{
	echo json_encode(array("message" => "1"));
}

?>
