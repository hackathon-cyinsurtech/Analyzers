<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";
include_once "../objects/user_car_details.php";

$database = new Database();
$db = $database->connect();

// initialize object
$user_car_details = new UserCarDetails($db);

$id = isset($_GET["id"]) ? $_GET["id"] : die();
$stmt = $user_car_details->read($id);
$num = $stmt->rowCount();

`id`, `reg_no`, `make`, `model`, `color`, `type`, `cc`, `year`, `passengers`,
`est_value`, `acc`, `own`, `health_prob`, `have`, `accident`, `criminal`, `user_id`

// check if more than 0 record found
if($num>0){
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	    extract($row);
	    $details=array("id" => $id, "reg_no" => $reg_no,"make" => $make,"model" => $model,"color" => $color, "type" => $type
      , "cc" => $cc, "year" => $year, "passengers" => $passengers, "est_value" => $est_value, "acc" => $acc, "own" => $own
      , "health_prob" => $health_prob, "have" => $have, "accident" => $accident, "criminal" => $criminal);
  }
  echo json_encode($details);
}
else{
	echo json_encode(array("message" => "No saved details for this user."));
}
?>
