<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";
include_once "../objects/car_insurance.php";

$database = new Database();
$db = $database->connect();

// initialize object
$car_insurance = new CarInsurance($db);

$stmt = $car_insurance->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  $car_insurances=array();
	$car_insurances["insurances"]=array();
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	    extract($row);
	    $item=array("id" => $id, "company_id" => $company_id,"price" => $price,"age_range" => $age_range,"cc" => $cc, "typeofcar" => $typeofcar);
      array_push($car_insurances["insurances"], $item);
  }
  echo json_encode($car_insurances);
}
else{
	echo json_encode(array("message" => "Car isurances not found."));
}
?>
