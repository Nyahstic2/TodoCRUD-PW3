<?php
    include "connection.php";

    $id = $_GET["id"];
    
    $resp = $conexao->prepare("SELECT * FROM tarefas WHERE id=?");
    $resp->bind_param("i", $id);
    $resp->execute();
    
    $row = $resp->get_result()->fetch_assoc();

    if ($row['pronto'] == 1){
        echo "nao ta pronta";
        $query = $conexao->prepare("UPDATE tarefas SET pronto=FALSE WHERE id=?");
    }
    else{
        echo "ta pronta";
        $query = $conexao->prepare("UPDATE tarefas SET pronto=TRUE WHERE id=?");
    }

    $query->bind_param("i", $id);
    $query->execute();

    header("Location: ../index.html");

?>