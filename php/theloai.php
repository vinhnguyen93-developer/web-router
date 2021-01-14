<?php
    require_once("server.php");
    $event = $_POST['event'];

    switch ($event) {
        case "insert":
            $nameCategory = $_POST['nameCategory'];   

            $sql = "INSERT INTO `categories` (nameCategory) VALUES('".$nameCategory."')";
        
            if(mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
        case "delete":
            $idCategory = $_POST['idCategory'];

            $sql = "DELETE FROM `categories` WHERE idCategory='".$idCategory."'";

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
            $idCategory = $_POST['idCategory'];
            $nameCategory = $_POST['nameCategory'];

            $sql="UPDATE  `categories` SET nameCategory='".$nameCategory."' WHERE idCategory='".$idCategory."'";
        
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
        case "getListCategory":
            
            $arr = array();
        
            $record = $_POST['record'];
            $page = $_POST['page'];
        
            $vt = $page * $record;
            $limit = 'limit '.$vt.' , '.$record;
            $sql = mysqli_query($conn, "select * from categories ".$limit); 

            while($rows = mysqli_fetch_array($sql))
            {
                $id = $rows['idCategory'];
                $userTemp['idCategory'] = $rows['idCategory'];
                $userTemp['nameCategory'] = $rows['nameCategory'];
                
                $arr[$id] = $userTemp;
            }

            $rs = mysqli_query($conn,"select COUNT(*) as 'total' from categories");
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