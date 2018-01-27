<?php
class Company{
	private $conn;

	//constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	function add($name, $address, $city, $country, $telephone, $email, $logo, $website){
		$query = "INSERT INTO `company` (`id`, `name`, `address`, `telephone`, `email`, `city`, `country`, `logo`, `website`)
				  		VALUES (NULL, '" . $name . "' , '" . $address . "' , '" . $telephone . "' , '" . $email . "' , '" . $city
							. "' , '" . $country . "' , '" . $logo . "' , '" . $website . "')";
		$stmt = $this->conn->prepare($query);
		if ($stmt->execute()!=NULL){
			$query = "SELECT max(id) id FROM company WHERE name = '" . $name . "'";
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$id = $row["id"];
			return $id;
		}
		return NULL;
	}

}
?>
