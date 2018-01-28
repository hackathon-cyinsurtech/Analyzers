<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/connect_db.php";
include_once "../objects/car_insurance.php";

$database = new Database();
$db = $database->connect();

// initialize object
$car_insurance = new CarInsurance($db);

$data = json_decode(file_get_contents("php://input"));

$companyid = $data->companyid;
$price = $data->price;
$age_range = $data->agerange;
$cc = $data->cc;
$typeofcar = $data->typeofcar;

$stmt = $car_insurance->add($companyid, $price, $age_range, $cc, $typeofcar);

if ($stmt!=NULL){
	echo json_encode(array("message" => "0", "car_insurance_id" => $stmt));
}
else{
	echo json_encode(array("message" => "1"));
}

?>
