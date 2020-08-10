<?php


class Item
{
    protected PDO $pdo;
    protected string $table = 'tbl_sales';
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function addNew(array $arr){
        $sql = "INSERT INTO $this->table(item,extra,price,date_time)
                                    VALUES (?,?,?,?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($arr);
        $this->check($stmt);
    }

    public function getItems(){
        $sql = "SELECT * FROM $this->table";
        $result = $this->pdo->query($sql);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);
    }

    public function delete(int $id){
        $sql = "DELETE FROM $this->table WHERE id = '$id'";
        $result = $this->pdo->query($sql);
        $this->check($result);
    }

    public function edit($arr){
        $sql = "UPDATE $this->table SET item = ?,extra = ?, price = ?, date_time = ?
                WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($arr);
        $this->check($stmt);
    }

    public function filterDate($date_time){
        $sql = "SELECT * from $this->table WHERE date_time BETWEEN '$date_time 00:00:00' AND '$date_time 23:59:59'";
        $result = $this->pdo->query($sql);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);
    }

    protected function check($result){
        if($result){
            echo "success";
        }else{
            echo "failed";
        }
    }
}