<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/connect_db.php";
include_once "../objects/company.php";

$database = new Database();
$db = $database->connect();

// initialize object
$company = new Company($db);

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$address = $data->address;
$city = $data->city;
$country = $data->country;
$telephone = $data->telephone;
$email = $data->email;
$logo = $data->logo;
$website = $data->website;

$stmt = $company->add($name, $address, $city, $country, $telephone, $email, $logo, $website);

if ($stmt!=NULL){
	echo json_encode(array("message" => "0", "company_id" => $stmt));
}
else{
	echo json_encode(array("message" => "1"));
}

?>
