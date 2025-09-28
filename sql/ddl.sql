DROP DATABASE IF EXISTS tarefas; -- "Resetador" de dados
CREATE DATABASE IF NOT EXISTS tarefas;

USE tarefas;

CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    importancia INT,
    pronto INT -- não queria usar INT, mas não entendo exatamente como bool funciona no DB
);