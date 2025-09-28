<?php
    // Eu inverto a verificação para o código ficar mais fácil de ler
    // Com o bonus que qualquer pré-requisitos desse código é colocado no começo do código
    if($_SERVER['REQUEST_METHOD'] != 'POST'){
        die("<h1>Este endpoint requer o método HTTP POST");
    }

    // Agora o código realmente começa
    include "connection.php";

    $nome = "Tarefa sem Nome";
    $categoria = "Sem categoria";
    $importancia = 0;

    if (isset($_POST['nome']) && is_string($_POST['nome'])){
        $nome = $_POST['nome'];
    }

    if (isset($_POST['categoria']) && is_string($_POST['categoria'])){
        $categoria = $_POST['categoria'];
    }

    if (isset($_POST['importancia']) && is_numeric($_POST['importancia'])){
        $importancia = $_POST['importancia'];
    }

    $query = $conexao->prepare("INSERT INTO tarefas (nome, categoria, importancia, pronto) VALUES (?, ?, ?, 0)");

    // Faz a ligação dos parâmetros aos ?
    // Nesse caso são duas strings (nome e categoria) com um int (importancia) com um boolean (pronto)
    $query->bind_param("ssi", $nome, $categoria, $importancia);

    // Executa a instrução SQL, inserindo os dados no banco
    $query->execute();

    header("Location: ../index.html");
?>