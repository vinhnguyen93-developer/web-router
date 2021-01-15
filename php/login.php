<?php
require_once("server.php");
$event = $_POST['event'];

switch ($event) {
    case "login":
        $email = $_POST['email'];
        $passwordUser = md5($_POST['password']);
        
		$sql = mysqli_query($conn, "select email, nameUser from users where email='".$email."' and passwordUser='".$passwordUser."'"); 

        $t = '';

		while($rows = mysqli_fetch_array($sql))
        {
            
            $userTemp['email'] = $rows['email'];
            $userTemp['nameUser'] = $rows['nameUser'];

            $t=$rows['email'];
        }

		if($t != '') {
			$jsonData["event"] = 1;
			$jsonData["items"] = $userTemp;
		
			echo json_encode($jsonData);
		} else {
			$jsonData["event"] = 0;
		
			echo json_encode($jsonData);
        }
        
		mysqli_close($conn);
        break;
}
?>