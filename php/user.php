<?php
require_once("server.php");
$event = $_POST['event'];

switch ($event) {
	case "insert":
        $email = $_POST['email'];
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $password = md5($_POST['password']);
        $gender = $_POST['gender'];

        $sql = "INSERT INTO `users` (email, nameUser, phone, passwordUser, gender) 
                VALUES('".$email."', '".$name."', '".$phone."', '".$password."', '".$gender."')";
       
        if(mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "delete":
        $email = $_POST['email'];

        $sql = "DELETE FROM `users` WHERE email='".$email."'";

        mysqli_query($conn, $sql);

        if (mysqli_affected_rows($conn)) {
            $res[$event] = true;
        } else {
            $res[$event] = false;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "update":
        $email = $_POST['email'];
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $password = md5($_POST['password']);

        $sql = "UPDATE `users` 
                SET nameUser='".$name."', phone='".$phone."', passwordUser='".$password."'
                WHERE email='".$email."'";

        mysqli_query($conn, $sql);
       
        if (mysqli_affected_rows($conn) > 0) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "updateByAdmin":
        $email = $_POST['email'];
        $name = $_POST['name'];
        $phone = $_POST['phone'];

        $sql = "UPDATE `users` 
                SET nameUser='".$name."', phone='".$phone."'
                WHERE email='".$email."'";

        mysqli_query($conn, $sql);
        
        if (mysqli_affected_rows($conn) > 0) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "getListUser":
		
		$arr = array();
      
        $record = $_POST['record'];
        $page = $_POST['page'];
      
		$vt = $page * $record;
        $limit = 'limit '.$vt.' , '.$record;
        $sql = mysqli_query($conn, "select email, nameUser, phone, gender from users ".$limit); 

		while($rows = mysqli_fetch_array($sql))
        {
            $id = $rows['email'];
            $userTemp['email'] = $rows['email'];
            $userTemp['nameUser'] = $rows['nameUser'];
            $userTemp['phone'] = $rows['phone'];
            $userTemp['gender'] = $rows['gender'];
            
            $arr[$id] = $userTemp;
        }

        $rs = mysqli_query($conn,"select COUNT(*) as 'total' from users");
        $row = mysqli_fetch_array($rs);

        $jsonData['total'] = (int)$row['total'];
		$jsonData['totalPage'] = ceil($row['total']/$record);
	    $jsonData['page'] = (int)$page;
        $jsonData['items'] = $arr;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;
    case "getUserLocal":
        $email = $_POST['email'];
    
        $arr = array();
        $sql = mysqli_query($conn, "select email, nameUser, phone, gender from users where email= '".$email."'"); 

        while($rows = mysqli_fetch_array($sql))
        {
            $id = $rows['email'];
            $userTemp['email'] = $rows['email'];
            $userTemp['nameUser'] = $rows['nameUser'];
            $userTemp['phone'] = $rows['phone'];
            $userTemp['gender'] = $rows['gender'];
            
            $arr[$id] = $userTemp;
        }
        $jsonData['items'] = $arr;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;
    default:
        # code...
        break;
}
?>