//carregar o banco de dados
const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./ws.db")


db.serialize(function () {
  //criar tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      alt TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      url TEXT
    );
  `)

  //inserir dados
  const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    url
    ) VALUES (?,?,?,?,?)
  `

  /* const values = [
    "https://cdn-icons-png.flaticon.com/512/6974/6974905.png",
    "Curso de Programação",
    "Estudo",
    `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
    Eaque cumque magni saepe maxime tempore debitis at asperiores praesentium veritatis ipsam, voluptate harum quas et, beatae omnis libero voluptatem reprehenderit repellendus.`,
    "https://rocketseat.com.br",
  ] */
  
  /* db.run(query,values,function(err){
    if (err) return console.log(`Aconteceu algum erro durante a processagem de dadso \n ${err}`)

    console.log(this)
  }) */

  //(DESAFIO) Deletar dados da tabela
  /* db.run(`DELETE FROM ideas WHERE id = ?`,[1],function(err){
    if (err) return console.log(err)

    console.log("DELETEI",this)
  }) */

  //consultar dados da tabela
  /* db.all(`SELECT * FROM ideas`,function(err,rows){
    if (err) return console.log(err);//se der erro, pare o codigo e mostre o error
    //caso contrario, continue
    console.log(rows);
  }) */
})

//exportar o modulo ao carregar
module.exports = db //não seria melhor fazer module.exports = this ?