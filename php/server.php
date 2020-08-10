<?php

    include "db.php";
    include "Item.php";

    $item = new Item($pdo);


    if(count($_GET)==0&&count($_POST)==0){
        echo $item->getItems();
    }


    if(isset($_GET['filter'])){
        $date = $_GET['filter'];
        echo $item->filterDate($date);
    }
    if(isset($_POST['add'])){
        $newItem = [$_POST['item'],$_POST['extra'],$_POST['price'],$_POST['date_time']];
        $item->addNew($newItem);
    }

    if (isset($_POST['edit'])){
        $editItem = [$_POST['item'],$_POST['extra'],$_POST['price'],$_POST['date_time'],$_POST['edit']];
        $item->edit($editItem);
    }

    if(isset($_POST['delete'])){
        $id = $_POST['id'];
        $item->delete($id);
    }
