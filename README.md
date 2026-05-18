# 🗺️ URL Shortener Service

<p align="center">
  <strong>🗺️ URL Shortener Service</strong><br><br>
  <strong>TypeScript • Node.js • Express • PostgreSQL • Docker • Swagger</strong>
</p>

Este projeto é uma API REST de um **Serviço de Encurtamento de URLs** com contagem automatizada de estatísticas de acesso. Desenvolvido como teste técnico para a **SizeBay**.

---

## 🚀 Funcionalidades Principais

* 🔗 **Encurtamento de links** com geração de códigos únicos.
* 📊 **Rastreamento estatístico** de cliques por link encurtado.
* 🐳 **Ambiente conteinerizado** pronto para rodar com comando único.
* 📖 **Documentação interativa** para testes rápidos dos endpoints.

---

## 🛠️ Tecnologias Utilizadas

O ecossistema do projeto foi construído utilizando as seguintes ferramentas:

* **Linguagem:** [TypeScript](https://typescriptlang.org) (Tipagem estática segura)
* **Runtime:** [Node.js](https://nodejs.org) com Framework [Express](https://expressjs.com)
* **Banco de Dados:** [PostgreSQL](https://postgresql.org) (Armazenamento relacional e integridade de chaves)
* **Documentação:** [Swagger UI](https://swagger.io) (Interface visual de contratos de API)
* **Orquestração:** [Docker & Docker Compose](https://docker.com) (Padronização de ambiente)

---

## 📦 Como Executar o Projeto

Certifique-se de ter o [Docker](https://docker.com) instalado na sua máquina antes de iniciar.

### 1. Clonar o Repositório
```bash
git clone git@github.com:20100000/api_typescript_test.git
cd api_typescript_test
```

### 2. Iniciar os Containers (Aplicação + Banco)
Execute o comando abaixo para baixar as imagens necessárias, compilar o código TypeScript e iniciar os serviços:
```bash
docker-compose up --build
```

### 3. Verificar o Status
Em um novo terminal, você pode validar se os ambientes estão saudáveis com o comando:
```bash
docker ps
```

---

## 🗄️ Estrutura e Inicialização do Banco de Dados

Os serviços estão configurados para operar nas seguintes portas locais por padrão:
* 🖥️ **Back-end Node.js:** `http://localhost:3000`
* 🐘 **Banco PostgreSQL:** `localhost:5432`

### Inicialização Manual (Opcional)
Por padrão, o arquivo `docker-compose.yml` mapeia o script `init.sql` para criar o banco de dados automaticamente. Caso precise rodar manualmente via ferramentas como o **DBeaver**, utilize os dados de acesso abaixo:

* **Host:** `localhost`
* **Porta:** `5432`
* **Usuário:** `tiago`
* **Senha:** `tiago@123`
* **Banco:** `sizeBay`

#### Scripts DDL para Criação de Tabelas:
```sql
CREATE TABLE IF NOT EXISTS shortenURLs (
    id SERIAL PRIMARY KEY,
    url VARCHAR(150) UNIQUE NOT NULL,
    shortCode VARCHAR(150) NOT NULL UNIQUE,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS statistics (
    id SERIAL PRIMARY KEY,
    shortCode VARCHAR(150) NOT NULL UNIQUE,
    accessCount INT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    CONSTRAINT fk_code FOREIGN KEY (shortCode) REFERENCES shortenURLs (shortCode)
);
```

---

## 📖 Documentação da API (Swagger)

Com a aplicação rodando, você pode acessar de forma transparente a documentação interativa de rotas, payloads de envio e exemplos de respostas diretamente pelo navegador:

🔗 **Acesse:** [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

---

## ✉️ Contato

Desenvolvido por **Tiago Honorio**  
📬 Email para contato: [tiago_honorio2010@hotmail.com](mailto:tiago_honorio2010@hotmail.com)
