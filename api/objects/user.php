<?php
class User{
	private $conn;

	//constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	function add($id){
		$query = "INSERT INTO `user` (`user_id`) VALUES ('"  . $id . "')";
		$stmt = $this->conn->prepare($query);
		return $stmt->execute();
	}

	function addInsurance($userid, $insuranceid, $claims, $finalprice){
		$query = "INSERT INTO `user-car_insurance` (`user_id`, `car_incurance_id`, `claims_no`, `final_price`)
							VALUES ('" . $userid . "' , '" . $insuranceid . "' , '" . $claims . "' , '" . $finalprice . "')";
		$stmt = $this->conn->prepare($query);
		return $stmt->execute();
	}

	function readInsurances($userid){
		$query = "SELECT car_insurance_id id, name, logo, final_price FROM
							(SELECT id car_insurance_id,company_id,final_price FROM car_insurance ci
							JOIN `user-car_insurance` uc ON ci.id=uc.car_incurance_id
							WHERE user_id=?) temp
							JOIN company c
							WHERE temp.company_id=c.id";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(1,$userid);
		$stmt->execute();
		return $stmt;
	}

	function addCarInsurances($arr){
		$query = "INSERT INTO `user_car_details` (`id`, `reg_no`, `make`, `model`, `color`, `type`, `cc`, `year`, `passengers`,
																							`est_value`, `acc`, `own`, `health_prob`, `have`, `accident`, `criminal`, `user_id`)
				  		VALUES (NULL, '" . $arr["reg_no"] . "' , '" . $arr["make"] . "' , '" . $arr["model"] . "' , '" . $arr["color"] . "' , '" . $arr["type"]
							. "' , '" . $arr["cc"] . "' , '" . $arr["year"] . "' , '" . $arr["passengers"] . "' , '" . $arr["est_value"] . "' , '" . $arr["acc"]
							 . "' , '" . $arr["own"] . "' , '" . $arr["health_prob"] . "' , '" . $arr["have"] . "' , '" . $arr["accident"]
							  . "' , '" . $arr["criminal"] . "' , '" . $arr["user_id"]  . "')";
		$stmt = $this->conn->prepare($query);
		if ($stmt->execute()!=NULL){
			$query = "SELECT max(id) id FROM user_car_details WHERE user_id = " . $arr["user_id"];
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$id = $row["id"];
			return $id;
		}
		return NULL;
	}

	function readCarInsurances($userid){
		$query = "SELECT * FROM user_car_details WHERE user_id = ?";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(1,$userid);
		$stmt->execute();
		return $stmt;
	}

}
?>
