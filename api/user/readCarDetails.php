<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";
include_once "../objects/user.php";

$database = new Database();
$db = $database->connect();

// initialize object
$user = new User($db);

$id = isset($_GET["id"]) ? $_GET["id"] : die();
$stmt = $user->readCarInsurances($id);
$num = $stmt->rowCount();

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
