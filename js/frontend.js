
const main = document.getElementById("taskAreas"); // Área onde as tarefas são exibidas
const catnew = document.getElementById("catnew"); // Checkbox para nova categoria
const existentcategory = document.getElementById("catexistent"); // Select de categorias existentes
const txtcategoria = document.getElementById("txtcategoria"); // Input para nova categoria
const form = document.getElementById("formid"); // Formulário principal
const formedit = document.getElementById("formedit"); // Formulário de edição
const editDialog = document.getElementById("editTarefa");
const editCatnew = document.getElementById("edit-catnew");
const editNome = document.getElementById("edit-nome");
const editCategoria = document.getElementById("edit-categoria");
const editCatexistent = document.getElementById("edit-catexistent");
const editImportancia = document.getElementById("edit-importancia");
const cancelarEdicao = document.getElementById("cancelar-edicao");
const importancia = document.getElementById("importancia"); // Input de importância
let categorias = [];
let queryDaLista = {};


catnew.addEventListener("change", useExistingCategories);


form.addEventListener('submit', (e) => {
  if (!validateNewTask()) {
    e.preventDefault(); // Impede envio se não for válido
  }
});

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


function useExistingCategories() {
  if (catnew.checked) {
    // Usar categoria existente
    txtcategoria.removeAttribute("required");
    txtcategoria.style.display = "none";
    txtcategoria.disabled = true;

    existentcategory.setAttribute("required", "");
    existentcategory.attributes.required = true;
    existentcategory.style.display = "block";
    existentcategory.disabled = false;

    existentcategory.name = "categoria";
    txtcategoria.name = "";

  } else {
    // Criar nova categoria
    txtcategoria.setAttribute("required", "");
    txtcategoria.attributes.required = true;
    txtcategoria.style.display = "block";
    txtcategoria.disabled = false;

    existentcategory.removeAttribute("required");
    existentcategory.attributes.required = false;
    existentcategory.style.display = "none";
    existentcategory.disabled = true;

    txtcategoria.name = "categoria";
    existentcategory.name = "";
  }
}
// Alterna entre mostrar campo de categoria existente ou nova


function test() {
  console.log(existentcategory.value);
}


function validateEditTask() {
  if (editCatnew.checked) {
    // Categoria existente deve ser selecionada
    if (editCatexistent.value === "" || editCatexistent.value === "invalid") {
      alert("Por favor, selecione uma categoria existente.");
      return false;
    }
  } else {
    // Nova categoria não pode ser vazia
    if (editCategoria.value.trim() === "") {
      alert("Por favor, insira uma nova categoria.");
      return false;
    }
  }
  return true;
}

function validateNewTask() {
  if (catnew.checked) {
    // Categoria existente deve ser selecionada
    if (existentcategory.value === "" || existentcategory.value === "invalid") {
      alert("Por favor, selecione uma categoria existente.");
      return false;
    }
  } else {
    // Nova categoria não pode ser vazia
    if (txtcategoria.value.trim() === "") {
      alert("Por favor, insira uma nova categoria.");
      return false;
    }
  }
  return true;
}
// Valida se o campo de categoria está preenchido corretamente

function pegarTarefas() {
  categorias = [];
  main.innerHTML = "";
  fetch("php/list.php")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Falha ao carregar dados');
    })
    .then((data) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const task = data[key];
          queryDaLista[task.id] = task; // Armazena tarefa no objeto de consulta

          // Cria categoria se ainda não existe
          if (categorias.indexOf(task.categoria) < 0) {
            criarNovaCategoria(task);
          }

          let taPronta = task.pronto == 1;

          // Seleciona o container da categoria
          const taskCat = document.querySelector(`div[data-category="${task.categoria}"]`);

          // Cria container da tarefa
          const taskContainer = document.createElement("div");
          taskContainer.classList.add("task");
          if (taPronta) taskContainer.classList.add("task-done");
          taskContainer.style.backgroundColor = getColorImportance(task.importancia);

          // Nome da tarefa
          const taskName = document.createElement("p");
          taskName.textContent = task.nome;

          let id = task.id;
          // Botão para marcar como pronto/em andamento
          const completeButton = document.createElement("button");
          completeButton.textContent = !taPronta ? "Marcar como pronto" : "Marcar como em andamento";
          completeButton.onclick = () => marcarPronto(id);
          completeButton.classList.add("marcarPronto");

          // Botão para deletar tarefa
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Remover";
          deleteButton.onclick = () => deletar(id);
          deleteButton.classList.add("deletar");

          // Botão para editar tarefa
          const editarButton = document.createElement("button");
          editarButton.textContent = "Editar";
          editarButton.onclick = () => editar(id);
          editarButton.classList.add("editar");

          // Adiciona elementos ao container da tarefa
          taskContainer.appendChild(taskName);
          taskContainer.appendChild(completeButton);
          taskContainer.appendChild(deleteButton);
          taskContainer.appendChild(editarButton);

          // Adiciona tarefa à categoria
          taskCat.appendChild(taskContainer);
          console.log(id);
        }
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}
// Monta visualmente as tarefas e categorias, e associa botões de ação



function criarNovaCategoria(task) {
  categorias.push(task.categoria);
  let cat = document.createElement("div");
  let title = document.createElement("h1");
  cat.setAttribute("data-category", task.categoria);
  title.innerText = task.categoria;
  cat.appendChild(title);
  main.appendChild(cat);

  // Adiciona opção ao select de categorias existentes
  const option = document.createElement("option");
  option.value = task.categoria;
  option.textContent = task.categoria;
  existentcategory.appendChild(option);
}
// Cria visualmente uma nova categoria e adiciona ao select


function marcarPronto(id) {
  window.location = "php/markdone.php?id=" + id;
}
// Marca tarefa como pronta ou em andamento


function deletar(id) {
  if(confirm("Tem certeza que deseja deletar essa tarefa?")){
    fetch("php/delete.php?id=" + id);
    window.location.reload();
  }
  else{
    alert("Ação cancelada.");
  }
}
// Remove tarefa



function editar(id) {
  const task = queryDaLista[id];
  if (!task) {
    alert("Tarefa não encontrada para edição.");
    return;
  }
  window.location = "./php/editar.php?id=" + id;
}



useExistingCategories();
pegarTarefas();
// Inicializa campos e carrega tarefas ao abrir página