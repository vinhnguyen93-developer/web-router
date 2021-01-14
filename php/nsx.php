<?php
require_once("server.php");
$event = $_POST['event'];

switch ($event) {
	case "insert":
        $nameProducer = $_POST['nameProducer'];
        $phoneProducer = $_POST['phoneProducer'];
        $addressProducer = $_POST['addressProducer'];
        $yearProducer = $_POST['yearProducer'];
        

        $sql = "INSERT INTO `producers` (nameProducer, phoneProducer, addressProducer, yearProducer) 
                VALUES('".$nameProducer."', '".$phoneProducer."', '".$addressProducer."', '".$yearProducer."')";
        
        if(mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "delete":
        $idProducer = $_POST['idProducer'];

        $sql = "DELETE FROM `producers` WHERE idProducer='".$idProducer."'";

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
        $idProducer = $_POST['idProducer'];
        $nameProducer = $_POST['nameProducer'];
        $phoneProducer = $_POST['phoneProducer'];
        $addressProducer = $_POST['addressProducer'];
        $yearProducer = $_POST['yearProducer'];

        $sql = "UPDATE `producers` 
                SET nameProducer='".$nameProducer."', phoneProducer='".$phoneProducer."', addressProducer='".$addressProducer."', yearProducer='".$yearProducer."'
                WHERE idProducer='".$idProducer."'";
       
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "getListProducer":
		
		$arr = array();
      
        $record = $_POST['record'];
        $page = $_POST['page'];
      
		$vt = $page * $record;
        $limit = 'limit '.$vt.' , '.$record;
        $sql = mysqli_query($conn, "select * from producers ".$limit); 

		while($rows = mysqli_fetch_array($sql))
        {
            $id = $rows['idProducer'];
            $userTemp['idProducer'] = $rows['idProducer'];
            $userTemp['nameProducer'] = $rows['nameProducer'];
            $userTemp['phoneProducer'] = $rows['phoneProducer'];
            $userTemp['addressProducer'] = $rows['addressProducer'];
            $userTemp['yearProducer'] = $rows['yearProducer'];
            
            $arr[$id] = $userTemp;
        }

        $rs = mysqli_query($conn,"select COUNT(*) as 'total' from producers");
        $row = mysqli_fetch_array($rs);

        $jsonData['total'] = (int)$row['total'];
		$jsonData['totalPage'] = ceil($row['total']/$record);
	    $jsonData['page'] = (int)$page;
        $jsonData['items'] = $arr;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
    default:
        # code...
        break;
}
?>