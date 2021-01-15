<?php
require_once("server.php");
$event = $_POST['event'];

switch ($event) {
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
    default:
        # code...
        break;
}
?>