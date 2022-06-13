function onOff() {
  document.querySelector("#modal").classList.toggle("hide");

  document.querySelector("body#page-ideas").classList.toggle("hideScroll");

  document.querySelector("#modal").classList.toggle("addScroll");
}

function checkFields(event) {
  const valuesToCheck = ["title", "image", "description", "category", "url"];

  const isEmpty = valuesToCheck.find(function (value) {
    const checkIfIsString = typeof event.target[value].value === "string";
    const checkIfIsEmpty = !event.target[value].value.trim();
    if (checkIfIsString && checkIfIsEmpty) {
      return true;
    }
  });

  if (isEmpty) {
    event.preventDefault(); /* //não deixe que faça o comportamento padrão
         logo ele não ira executar nenhuma ação até que o usuario preencha todos o campos necessarios */
    alert("Por favor, preenchar todos os campos");
  }
}

/* document.querySelector("button. no-fat")
.addEventListener('click',onOff) */

function isURL(url) {
  var regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(url);
}

function information() {
  alert("https://www.flaticon.com/packs/science-fiction-avatars-24");
}
