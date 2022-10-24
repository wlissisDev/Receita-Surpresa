const info = document.querySelector("#info");
const listaIngrediente = document.querySelector(".lista-ingredientes");
const preparo = document.querySelector(".modo-preparo");
const btnBuscar = document.querySelector("#btn");

//info-receita
const imageRecipe = document.querySelector("#imageReiceita");
const nomeReceita = document.querySelector("#nome-receita");
const categoriaReceita = document.querySelector("#categoria-receita");

//criando lista de <li/> ingrediente
const arrayLi = [];

for (let i = 1; i <= 20; i++) {
  const li = document.createElement("li");
  li.classList.add("item");

  arrayLi.push(li);
}

//preparo
const p = document.querySelector("#modo-preparo");
const linkVideo = document.querySelector("#link-video");

//chamada de API e salvanado no localStorage
async function getRecipe() {
  try {
    const result = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await result.json();
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify(data));
    addElements();

  } catch (error) {
    console.log(error);
  }
}

//add informações básica
function createElementInfoRecipe(recipe) {
  imageRecipe.setAttribute("src", `${recipe.meals[0].strMealThumb}`);
  nomeReceita.innerHTML = `${recipe.meals[0].strMeal}`;
  categoriaReceita.innerHTML = `${recipe.meals[0].strCategory}`;
}

//cria lista de igredientes
function createElementIgredientes(recipe) {
  arrayLi.map((item, index) => {
    //limpa todos os item antes de criar os novos
    item.innerHTML = ""

    //percorre o array colocando novos valores nos itens da lista que possuem 
    //adc somente valores  diferente de "" da API  para a lista nao ficar com itens vazios
    if (recipe.meals[0][`strIngredient${index+1}`] != "") {
      item.innerHTML = `${recipe.meals[0][`strIngredient${index+1}`]}`;
      listaIngrediente.appendChild(item);
    }
  });
}

//adc modo de preparo e link do vídeo de referencia
function modoDePreparo(recipe) {
  p.innerHTML = `${recipe.meals[0]["strInstructions"]}`;
  linkVideo.setAttribute("href", `${recipe.meals[0]["strYoutube"]}`);

}

function addElements() {
  //busca elementos do localStorage e tanforma em JSON
  let data = JSON.parse(localStorage.getItem("data"));

  //add elementos
  createElementInfoRecipe(data);
  createElementIgredientes(data);
  modoDePreparo(data);
}

addElements()

btnBuscar.addEventListener("click", () => {
  getRecipe();
});

