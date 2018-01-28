<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";
include_once "../objects/company.php";

$database = new Database();
$db = $database->connect();
// initialize object
$company = new Company($db);
$stmt = $company->read();
$num = $stmt->rowCount();
// check if more than 0 record found

if($num>0){
  $companies=array();
	$companies["companiesArr"]=array();
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	    extract($row);
	    $item=array("id" => $id, "name" => $name,"address" => $address,"telephone" => $telephone,"email" => $email, "city" => $city, "country" => $country, "logo" => $logo, "website" => $website);
      array_push($companies["companiesArr"], $item);
  }
  echo json_encode($companies);
}
else{
	echo json_encode(array("message" => "Companies not found."));
}

?>
