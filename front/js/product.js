//récupérer les infos panier dans le localStorage
let cartStorage = [];
if (JSON.parse(localStorage.getItem("cartLists")) !== null )
{
  cartStorage = JSON.parse(localStorage.getItem("cartLists"));
}
console.log(cartStorage);
//afficher le nombre d'éléments dans le panier sur barre de navigation
document.getElementById("countItems").insertAdjacentHTML("beforeend",`<sup>${cartStorage.length}</sup>`);
document.getElementById("countItems").querySelector("sup").style.backgroundColor = "brown";

//obtenir l'ID du produit dans l'URL de la page
let urlActive = (new URL(document.location)).searchParams;//sélectionne l'url de la page
let urlID = urlActive.get('id'); // dans l'url de la page, obtient la chaine de caractère après id=.

//definition des variables qui seront intégrées dans l'OBJECT objectProduct
let articleName = 0;
let articlePrice = 0;
let articleImg = 0;
let articleVarnish = 0;
let articleQuantity = 0;

function getDataArray()//fonction appel des données serveur
{
  return fetch("http://localhost:3000/api/furniture/" + urlID)//va chercher les informations sur le serveur pour l'ID produit
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {
    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
}

getDataArray()//fonction appel des données serveur
  .then(function(response)//puis traite l'array
  {
    //affiche le produit dans la page
    document.querySelector("form").insertAdjacentHTML("beforebegin",
    `
    <img class=”card-img-top” src="${response.imageUrl}" alt=”image du produit sélectionné, description imprévisible”>
    <div class="card-body">
      <h4 class="card-title">${response.name}</h4>
      <h5 class="card-text">${response.price/100} €</h5>
      <p class="card-text" >${response.description}</p>
    `
    );
    document.querySelector("form").insertAdjacentHTML("afterend","</div>");

    //affiche les options dans la carte du produit
    response.varnish.forEach(element => 
    {
      document.getElementById("optionSelect").innerHTML += `<option label="${element}" value="${element}"></option>`
    });

    //modification des variables pour l'objet objectProduct
    articleName = response.name;
    articlePrice = response.price/100;
    articleImg = response.imageUrl;

    //Enregistrement des informations au clic
    document.getElementById("addCartButton").addEventListener("click", getValues);
    
    //fonction pour obtenir et conserver les valeurs du produit à ajouter au panier
    function getValues()
    {
      //modification des variables pour l'objet objectProduct
      articleVarnish = document.getElementById("optionSelect").value;
      articleQuantity = document.getElementById("quantity").value;

      //creation d'un objet objectProduct à ajouter dans l'array cartStorage
      let objectProduct = 
      {
        img: articleImg,
        productName: articleName,
        price: articlePrice,
        varnish: articleVarnish,
        quantity: articleQuantity,
        ID: urlID
      };
      //enregistrement de l'objet dans l'array, dans le localStorage
      cartStorage.push(objectProduct);//ajoute l'objet objectProduct sélectionné dans l'array cartStorage
      localStorage.setItem("cartLists", JSON.stringify(cartStorage));//enregistre le tableau cartStorage dans le localStorage
      alert("article ajouté");//affiche le bon fonctionnement de la fonction
    }
  })
  .catch(function(error)//catch errors
  {
    alert(error);
  })


