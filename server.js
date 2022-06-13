const db = require("./db");
const express = require("express");
const server = express();

//carregue o banco de dados sqlite3 instalado pelo modulo npm i  sqlite3

//server.use(express.json())
/* const ideias = [
    {
        img:"https://cdn-icons-png.flaticon.com/512/6974/6974905.png",
        title: "Curso de Programação",
        category: "Estudo",
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Eaque cumque magni saepe maxime tempore debitis at asperiores praesentium veritatis ipsam, voluptate harum quas et, beatae omnis libero voluptatem reprehenderit repellendus.`,
        url: "https://rocketseat.com.br",
    },
    {
        img:"https://cdn-icons-png.flaticon.com/512/6974/6974901.png",
        title: "Musculação",
        category: "Exercio",
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Eaque cumque magni saepe maxime tempore debitis at asperiores praesentium veritatis ipsam, voluptate harum quas et, beatae omnis libero voluptatem reprehenderit repellendus.`,
        url: "https://rocketseat.com.br",
    },
    {
        img:"https://cdn-icons-png.flaticon.com/512/6974/6974903.png",
        title: "Meditação",
        category: "Mentalidade",
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Eaque cumque magni saepe maxime tempore debitis at asperiores praesentium veritatis ipsam, voluptate harum quas et, beatae omnis libero voluptatem reprehenderit repellendus.`,
        url: "https://rocketseat.com.br",
    },
    {
        img:"https://cdn-icons-png.flaticon.com/512/6974/6974898.png",
        title: "Karaokê",
        category: "Diversão em familia",
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Eaque cumque magni saepe maxime tempore debitis at asperiores praesentium veritatis ipsam, voluptate harum quas et, beatae omnis libero voluptatem reprehenderit repellendus.`,
        url: "https://rocketseat.com.br",
    },
    {
        img:"https://cdn-icons.flaticon.com/png/512/412/premium/412620.png?token=exp=1654702474~hmac=4fd4550655b70d9667e96bf18a60269c",
        title: "Fazer Ciclismo",
        category: "Exercicio",
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Eaque cumque magni saepe maxime tempore debitis at asperiores praesentium veritatis ipsam, voluptate harum quas et, beatae omnis libero voluptatem reprehenderit repellendus.`,
        url: "https://rocketseat.com.br",
    },
    {
        img:"https://cdn-icons.flaticon.com/png/512/412/premium/412595.png?token=exp=1654702474~hmac=9e6f405e9cf26d3ff01b2d00bb2f5b96",
        title: "Plantar frutas e flores",
        category: "Plantio",
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Eaque cumque magni saepe maxime tempore debitis at asperiores praesentium veritatis ipsam, voluptate harum quas et, beatae omnis libero voluptatem reprehenderit repellendus.`,
        url: "https://rocketseat.com.br",
    },
] */

//configurar arquivos estaticos (imagem,video,css,JavaScript,...)
server.use(express.static("src"));

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

//configuração do nunjucks - npm i nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src", {
  express: server,
  noCache: true,
});

function pegarUltimasIdeias(quantidadeDeIdeias) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) return `ERRO AO PROCESAR O COMANDO, ${err}`;
    const ideiasReversed = [...rows].reverse();
    const lastIdeias = [];
    for (const iterator of ideiasReversed) {
      if (lastIdeias.length < quantidadeDeIdeias && quantidadeDeIdeias > 0) {
        /*  && quantidadeDeIdeias <= ideias.length */
        lastIdeias.push(iterator);
      } else {
        return lastIdeias;
      }
    }
    return lastIdeias;
  });
}

function quantidadeTotalIdeias() {
  db.all(`SELECT count(*) from ideas`, function (err, rows) {
    if (err) return `ERRO AO PROCESSAR O COMANDO ${err}`; //caso apresente erro, sair da função apresentando o erro

    const todasAsIdeias = rows.length;
    variavel_global = todasAsIdeias;
    console.log(`Valor retornado dentro da consulta SQL : ${todasAsIdeias}`);

    return todasAsIdeias;
  });
}

server.get("/", function (req, res) {
  //raiz do projeto
  /* data = new Date()
    horasAtuais = `${data.getHours()} : ${data.getMinutes()}`
    console.log(`Servidor iniciado e rodando! ${horasAtuais}`) */

  /* return res.sendFile(__dirname + "/index.html") */

  const quantidadeDeIdeias = 2; // selecionar a quantidade de ideas a ser mostrada na pagina index
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(res);
      return res.send(`ERRO AO PROCESSAR O COMANDO SQL
            <br>\n${err}`);
    }

    const todasAsIdeiasReverse = [...rows].reverse();
    const ultimasIdeias = [];
    for (const iterator of todasAsIdeiasReverse) {
      if (ultimasIdeias.length < quantidadeDeIdeias) {
        ultimasIdeias.push(iterator);
      }
    }
    return res.render("index.html", { ideias: ultimasIdeias });
  });

  /* const last_ideias = pegarUltimasIdeias(2)//selecionada 2 por opção do editor
    return res.render("index.html", {ideias:last_ideias}) */
});

server.get("/ideas.html", function (req, res) {
  console.log(req.query);
  //selecionar todas as ideias
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(res);
      return res.send(`ERRO AO PROCESSAR O COMANDO SQL
            <br>\n${err}`);
    }
    const todasAsIdeiasReverse = [...rows].reverse();
    return res.render("ideas.html", { ideias: todasAsIdeiasReverse });
  });
  /* return res.render("ideas.html", {ideias:quantidadeTotalIdeias()}) */
});

//receber os dados via POST
server.post("/", function (req, res) {
  const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        url
        ) VALUES (?,?,?,?,?)
    `;

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.url,
  ];

  db.run(query, values, function (err) {
    if (err) {
      console.log(res);
      return res.send(`ERRO AO PROCESSAR O COMANDO SQL
        <br>\n${err}`);
    }
    return res.redirect("/ideas.html");
  });
});

//servidor ligado na porta 8000
server.listen("8000");
