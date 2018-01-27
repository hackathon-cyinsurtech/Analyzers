<?php
class CarInsurance{
	private $conn;

	//constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	function add($companyid, $price, $age_range, $cc, $typeofcar){
		$query = "INSERT INTO `car_insurance` (`id`, `company_id`, `price`, `age_range`, `cc`, `typeofcar`)
				  		VALUES (NULL, '" . $companyid . "' , '" . $price . "' , '" . $age_range . "' , '" . $cc . "' , '" . $typeofcar . "')";
		$stmt = $this->conn->prepare($query);
		if ($stmt->execute()!=NULL){
			$query = "SELECT max(id) id FROM car_insurance WHERE company_id = " . $companyid;
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$id = $row["id"];
			return $id;
		}
		return NULL;
	}

	function read(){
		$query = "SELECT * FROM car_insurance";
		$stmt = $this->conn->prepare($query);
		$stmt->execute();
		return $stmt;
	}


}
?>
