<?php
    $host = "localhost";
    $user = "root";
    $pass = ""; 
    $base = "tarefas";

    $conexao = new mysqli($host, $user, $pass, $base);

    if($conexao->connect_error){
        die("Erro de conexão: ".connect_error);
    }else{
    }

?>
