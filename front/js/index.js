//récupérer les infos panier dans le localStorage
let cartStorage = [];
let cartQuantity = 0;
if (localStorage.getItem("cartLists") !== null )
{
  cartStorage = JSON.parse(localStorage.getItem("cartLists"));
  cartStorage.forEach(element => 
  {
    cartQuantity += Number(element.quantity);
  });
}

//afficher le nombre d'éléments dans le panier sur barre de navigation
document.getElementById("countItems").insertAdjacentHTML("beforeend",`<sup>${cartQuantity}</sup>`);
document.getElementById("countItems").querySelector("sup").style.backgroundColor = "brown";

function getDataArray()//fonction appel des données serveur
{
  return fetch("http://localhost:3000/api/furniture")
  .then(function(httpBodyResponse)//puis récupère la réponse en json (format array)
  {
    const response = httpBodyResponse.json();
    console.log(response);
    return response;
  })
}

getDataArray()//fonction appel des données serveur
.then(function(response)//puis traite l'array
{
  console.log(response);
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
