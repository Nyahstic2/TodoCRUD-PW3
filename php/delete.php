<?php
    include "connection.php";

    $id = $_GET['id'];
    $conexao->query("DELETE FROM tarefas WHERE ID = $id");

    header("Location: ../index.html");
?>