// Descomentar para usar sass
// import "./style.scss";

const text_container = document.querySelector("#text-cont");
const btn_encriptar = document.querySelector("#encriptar");
const btn_desencriptar = document.querySelector("#desencriptar");
const btn_copiar = document.querySelector("#copiar-texto");
const text_camp = document.querySelector("#render-text");
const btn_clean = document.querySelector("#limpiar-input");

// Activar texto
const textOfCopy = document.querySelector("#text-inactive");
const textActivate = document.querySelector(".encrypted-text-container");

let texto_capturado;
let text_encrypt;
let arrayCadena = [];

const toggleActive = () => {
  const isActive = textOfCopy.classList.contains("inactive");
  if (!isActive) {
    textOfCopy.classList.add("inactive");
    textActivate.classList.remove("inactive");
  }
};

const encriptarTexto = (event) => {
  event.preventDefault();
  let newText = capturarInput();
  let mayus = /[A-Z]/.test(newText);
  let caract = /[^a-zA-Z\s]/.test(newText);

  if (mayus === true || caract === true) {
    alert("No se permiten caracteres especiales ni mayusculas");
    text_container.value = "";
    return;
  } else {
    toggleActive();
  }

  arrayCadena = newText.split("");
  console.log(arrayCadena);

  for (let i = 0; i < newText.length; i++) {
    switch (arrayCadena[i]) {
      case "a":
        arrayCadena[i] = "ai";
        break;
      case "e":
        arrayCadena[i] = "enter";
        break;
      case "i":
        arrayCadena[i] = "imes";
        break;
      case "o":
        arrayCadena[i] = "ober";
        break;
      case "u":
        arrayCadena[i] = "ufat";
        break;
    }
  }
  text_encrypt = arrayCadena.toString().replace(/,/g, "");
  console.log(text_encrypt);
  console.log(arrayCadena);

  cleanHTML();

  const renderText = document.createElement("p");
  renderText.innerText = text_encrypt;
  text_camp.appendChild(renderText);
};

const desencriptar = (event) => {
  let text_to_decrypt = capturarInput();
  let texto_desencriptado = text_to_decrypt;

  let mayus = /[A-Z]/.test(texto_desencriptado);
  let caract = /[^a-zA-Z\s]/.test(texto_desencriptado);

  if (mayus === true || caract === true) {
    alert("No se permiten caracteres especiales ni mayusculas");
    text_container.value = "";
    return;
  } else {
    toggleActive();
  }
  event.preventDefault();

  texto_desencriptado = texto_desencriptado.replaceAll("ai", "a");
  texto_desencriptado = texto_desencriptado.replaceAll("enter", "e");
  texto_desencriptado = texto_desencriptado.replaceAll("imes", "i");
  texto_desencriptado = texto_desencriptado.replaceAll("ober", "o");
  texto_desencriptado = texto_desencriptado.replaceAll("ufat", "u");
  console.log(texto_desencriptado);

  cleanHTML();

  const renderText = document.createElement("p");
  renderText.innerText = texto_desencriptado;
  text_camp.appendChild(renderText);
};

async function copy_text(event) {
  let text = text_encrypt;
  event.preventDefault();

  try {
    await navigator.clipboard.writeText(text);
    console.log("Texto copiado al portapapeles");
  } catch (err) {
    console.error("Error al copiar al portapapeles:", err);
  }
}

const cleanHTML = () => {
  // Aqui tengo que eliminar los elementos del array
  while (text_camp.childNodes[1]) {
    text_camp.removeChild(text_camp.childNodes[1]);
  }
};

const clean_input = () => {
  text_container.value = "";
  textOfCopy.classList.remove("inactive");
  textActivate.classList.add("inactive");
  cleanHTML();
};

const capturarInput = () => {
  texto_capturado = text_container.value;
  return texto_capturado;
  // console.log(texto_capturado);
};

const renderContent = () => {
  btn_encriptar.addEventListener("click", encriptarTexto);
  btn_desencriptar.addEventListener("click", desencriptar);
  btn_copiar.addEventListener("click", copy_text);
  btn_clean.addEventListener("click", clean_input);
};

renderContent();
