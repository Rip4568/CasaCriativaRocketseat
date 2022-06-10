function onOff() {
    document.querySelector("#modal")
    .classList.toggle("hide")

    document.querySelector("body#page-ideas")
    .classList.toggle("hideScroll")

    document.querySelector("#modal")
    .classList.toggle("addScroll")
}

/* document.querySelector("button. no-fat")
.addEventListener('click',onOff) */

function isURL(url) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(url);
}

function information() {
    alert("https://www.flaticon.com/packs/science-fiction-avatars-24")
}

/* make a function with login */
function login() {
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    if (username == "admin" && password == "admin") {
        document.querySelector("#login").classList.add("hide");
        document.querySelector("#logout").classList.remove("hide");
        document.querySelector("#username").value = "";
        document.querySelector("#password").value = "";
    } else {
        alert("Invalid username or password");
    }
}