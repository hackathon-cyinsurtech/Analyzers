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

$stmt = $user->readInsurances($id);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  $insurances=array();
	$insurances["insurances"]=array();
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	    extract($row);
	    $item=array("id" => $id, "name" => $name, "logo" => $logo, "final_price" => $final_price);
      array_push($insurances["insurances"], $item);
  }
  echo json_encode($insurances);
}
else{
	echo json_encode(array("message" => "You have no insurances."));
}
?>
