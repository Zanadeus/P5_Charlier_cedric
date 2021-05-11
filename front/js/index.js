//récupérer les infos panier dans le localStorage
let products = [];
if (JSON.parse(localStorage.getItem("cartLists")) !== null )
{
  products = JSON.parse(localStorage.getItem("cartLists"));
}
console.log(products);
//afficher le nombre d'éléments dans le panier sur barre de navigation
document.getElementById("countItems").insertAdjacentHTML("beforeend",`<sup>${products.length}</sup>`);
document.getElementById("countItems").querySelector("sup").style.backgroundColor = "brown";

function getDataArray()//fonction appel des données serveur
{
  return fetch("http://localhost:3000/api/furniture")//va chercher les informations sur le serveur
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {
    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    console.log(response);
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
}

getDataArray()//fonction appel des données serveur
.then(function(response)//puis traite l'array
{
  response.forEach(product => 
  {
    document.querySelector("article").innerHTML += 
      `
        <a href="product.html?id=${product._id}" class="card col-md-5">
        <img class=”card-img-top” src=${product.imageUrl} alt=”...”>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text" >${product.description}</p>
        </div>
        </a>
      ` ;
  });
})
.catch(function(error)//catch errors
{
  alert(error);
})
