<?php
    header("Content-Type: application/json ");
    include "connection.php";

    $resp = $conexao->query("SELECT * FROM tarefas");

    $tarefas = [];

    while($row = $resp->fetch_assoc()){
        $id = $row["id"];
        $tarefas[$id] = [
            "id" => $id,
            "nome" => $row["nome"],
            "categoria" => $row["categoria"],
            "importancia" => $row["importancia"],
            "pronto" => $row["pronto"]
        ];
    }

    echo json_encode($tarefas, JSON_PRETTY_PRINT);
?>