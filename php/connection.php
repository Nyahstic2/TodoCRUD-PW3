<?php
    $host = "localhost";
    $user = "root";
    $pass = "usbw"; // Seria interessante mudar, mas por enquanto mantenha como usbw
    $base = "tarefas";

    $conexao = new mysqli($host, $user, $pass, $base);

    if($conexao->connect_error){
        die("Erro de conexão: ".connect_error);
    }else{
    }
?>