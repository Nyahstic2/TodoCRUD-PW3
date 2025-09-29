<?php
include "connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// Atualiza tarefa    
	$id = 0;
	$nome = "Tarefa sem Nome";
	$categoria = "Tarefa sem Categoria";
	$importancia = 0;
	
	if (isset($_POST['id']) && is_numeric($_POST['id'])){
        $id = $_POST['id'];
    }
	
    if (isset($_POST['nome']) && is_string($_POST['nome'])){
        $nome = $_POST['nome'];
    }

    if (isset($_POST['categoria']) && is_string($_POST['categoria'])){
        $categoria = $_POST['categoria'];
    }

    if (isset($_POST['importancia']) && is_numeric($_POST['importancia'])){
        $importancia = $_POST['importancia'];
    }

	if ($id !== '') {
		$stmt = $conexao->prepare("UPDATE tarefas SET nome=?, categoria=?, importancia=? WHERE id=?");
		$stmt->bind_param("ssii", $nome, $categoria, $importancia, $id);
		$stmt->execute();
		$stmt->close();
	}
	header("Location: ../index.html");
	exit();
}

// GET: Exibe formulário
$id = '';

if (isset($_POST['id']) && is_numeric($_POST['id'])){
	$id = $_POST['id'];
}

if ($id === '') {
	echo "<p>ID da tarefa não informado.</p>";
	exit();
}
$stmt = $conexao->prepare("SELECT nome, categoria, importancia FROM tarefas WHERE id=?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($nome, $categoria, $importancia);
$stmt->fetch();
$stmt->close();

?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Tarefa</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <form action="editar.php" method="post">
        <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">
        <label for="nome">Nome da Tarefa</label>
        <input type="text" name="nome" id="txtnome" value="<?= htmlspecialchars($nome) ?>" required autocomplete="off">
        <br>
        <label for="categoria">Categoria</label>
        <input type="text" name="categoria" id="txtcategoria" value="<?= htmlspecialchars($categoria) ?>" autocomplete="off">
        <br>
        <label for="importancia">Importância</label>
        <input type="number" name="importancia" id="importancia" value="<?= htmlspecialchars($importancia) ?>" min="0"
            max="100">
        <br>
        <input type="submit" value="Salvar Alterações">
        <button onclick="window.location.href='../index.html'">Cancelar</button>
    </form>
    <script src="../js/colorgradient-by-ai.js"></script>
    <script>

        function atualizarCorDeImportancia() {
            importancia.style.backgroundColor = getColorImportance(importancia.value);
            requestAnimationFrame(atualizarCorDeImportancia);
        }
        requestAnimationFrame(() => {
            atualizarCorDeImportancia();
        });


        function getColorImportance(importance) {
            return interpolateColor(hexToRgb("#d6ed91"), hexToRgb("#f53500"), (importance / 100));
        }

    </script>
</body>


</html>
