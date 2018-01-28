<?php
class UserCarDetails{
	private $conn;

	//constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	function add($arr){
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

	function read($userid){
		$query = "SELECT * FROM user_car_details WHERE user_id = ?";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(1,$userid);
		$stmt->execute();
		return $stmt;
	}


}
?>
