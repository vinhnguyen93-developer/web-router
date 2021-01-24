<?php
require_once("server.php");
$event = $_POST['event'];

switch ($event) {
	case "insert":
        $nameRouter = $_POST['nameRouter'];
        $yearRouter = $_POST['yearRouter'];
        $addressRouter = $_POST['addressRouter'];
        $maLoaiRouter = $_POST['maLoaiRouter'];
        $maNsxRouter = $_POST['maNsxRouter'];
        $infoRouter = $_POST['infoRouter'];
        $userPost = $_POST['userPost'];
        $dayPost = $_POST['dayPost'];

        $sql = "INSERT INTO `products` (nameRouter, yearRouter, addressRouter, maLoaiRouter, maNsxRouter, infoRouter, emailUser, dayPost) 
                VALUES('".$nameRouter."', '".$yearRouter."', '".$addressRouter."','".$maLoaiRouter."', '".$maNsxRouter."', '".$infoRouter."', '".$userPost."', '".$dayPost."')";
       
        if(mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "delete":
        $idRouter = $_POST['idRouter'];

        $sql = "DELETE FROM `products` WHERE idRouter='".$idRouter."'";

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
        $idRouter = $_POST['idRouter'];
        $nameRouter = $_POST['nameRouter'];
        $yearRouter = $_POST['yearRouter'];
        $addressRouter = $_POST['addressRouter'];
        $maLoaiRouter = $_POST['maLoaiRouter'];
        $maNsxRouter = $_POST['maNsxRouter'];
        $infoRouter = $_POST['infoRouter'];

        $sql =  "UPDATE  `products` 
                SET nameRouter='".$nameRouter."', yearRouter='".$yearRouter."', addressRouter='".$addressRouter."', maLoaiRouter='".$maLoaiRouter."', maNsxRouter='".$maNsxRouter."', infoRouter='".$infoRouter."'
                WHERE idRouter='".$idRouter."'";
       
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "getListRouter":
		
		$arr = array();
      
        $record = $_POST['record'];
        $page = $_POST['page'];
      
		$vt = $page * $record;
        $limit = 'limit '.$vt.' , '.$record;
        $sql = mysqli_query($conn, 
            "select products.*, categories.nameCategory, producers.nameProducer from products, categories, producers where products.maLoaiRouter = categories.idCategory and products.maNsxRouter = producers.idProducer ".$limit); 

		while($rows = mysqli_fetch_array($sql))
        {
            $id = $rows['idRouter'];
            $userTemp['idRouter'] = $rows['idRouter'];
            $userTemp['nameRouter'] = $rows['nameRouter'];
            $userTemp['yearRouter'] = $rows['yearRouter'];
            $userTemp['addressRouter'] = $rows['addressRouter'];
            $userTemp['maLoaiRouter'] = $rows['maLoaiRouter'];
            $userTemp['maNsxRouter'] = $rows['maNsxRouter'];
            $userTemp['infoRouter'] = $rows['infoRouter'];
            $userTemp['emailUser'] = $rows['emailUser'];
            $userTemp['dayPost'] = $rows['dayPost'];
            $userTemp['nameCategory'] = $rows['nameCategory'];
            $userTemp['nameProducer'] = $rows['nameProducer'];
            
            $arr[$id] = $userTemp;
        }

        $rs = mysqli_query($conn,"select COUNT(*) as 'total' from products");
        $row = mysqli_fetch_array($rs);

        $jsonData['total'] = (int)$row['total'];
		$jsonData['totalPage'] = ceil($row['total']/$record);
	    $jsonData['page'] = (int)$page;
        $jsonData['items'] = $arr;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;
    case "getListRouterCustomer":
    
        $arr = array();
        
        $record = $_POST['record'];
        $page = $_POST['page'];
        $user = $_POST['user'];
        
        $vt = $page * $record;
        $limit = 'limit '.$vt.' , '.$record;
        $sql = mysqli_query($conn, 
            "select products.*, categories.nameCategory, producers.nameProducer from products, categories, producers where products.maLoaiRouter = categories.idCategory and products.maNsxRouter = producers.idProducer and products.emailUser='".$user."' ".$limit); 

        while($rows = mysqli_fetch_array($sql))
        {
            $id = $rows['idRouter'];
            $userTemp['idRouter'] = $rows['idRouter'];
            $userTemp['nameRouter'] = $rows['nameRouter'];
            $userTemp['yearRouter'] = $rows['yearRouter'];
            $userTemp['addressRouter'] = $rows['addressRouter'];
            $userTemp['maLoaiRouter'] = $rows['maLoaiRouter'];
            $userTemp['maNsxRouter'] = $rows['maNsxRouter'];
            $userTemp['infoRouter'] = $rows['infoRouter'];
            $userTemp['emailUser'] = $rows['emailUser'];
            $userTemp['dayPost'] = $rows['dayPost'];
            $userTemp['nameCategory'] = $rows['nameCategory'];
            $userTemp['nameProducer'] = $rows['nameProducer'];
            
            $arr[$id] = $userTemp;
        }

        $rs = mysqli_query($conn,"select COUNT(*) as 'total' from products");
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