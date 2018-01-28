<?php
class Database{
	private $host = "insureinstance.c4xol0h4vnwv.eu-central-1.rds.amazonaws.com";
	private $db_name = "insuredb";
	private $username = "earist07";
	private $password = "ap40090-";
	public $conn;

	public function connect(){
		$this->conn = null;
		try{
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
			$this->conn->exec("set names utf8");
		}catch(PDOException $e){
			echo "Connection error: " . $e->getMessage();
		}
		return $this->conn;
	}
}
?>
