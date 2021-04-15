let urlActive = (new URL(document.location)).searchParams;
let urlID = urlActive.get('id'); // la chaine de caractère après id=.
//console.log(urlID);

let articleName = 0;
let articlePrice = 0;

let cartePanier = document.querySelector(".cart") ;

let cartProductData = [];
if (JSON.parse(localStorage.getItem("CartProductData")) !== null )
{
  cartProductData = JSON.parse(localStorage.getItem("CartProductData"));
}

let arrayStorage = cartProductData;


function getDataArray()//obtenir le json du produit
{
  //return fetch("https://ab-p5-api.herokuapp.com/api/furniture/" + urlID)
  return fetch("http://localhost:3000/api/furniture/" + urlID)//va chercher les informations sur le serveur
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {

    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
}

getDataArray()
  .then(function(response)//puis traite l'array
  {
    //affiche le produit dans la page
    document.querySelector("article").querySelector("h5").innerHTML = `${response.name}` ;//affiche le titre
    document.querySelector("article").querySelector("h4").innerHTML = `${response.price/100} €` ;//affiche le prix
    document.querySelector("article").querySelector("p").innerHTML = `${response.description}` ;//affiche la description
    document.querySelector("article").querySelector("img").setAttribute("src", response.imageUrl);//affiche l'image

    //affiche les options dans la carte du produit
    response.varnish.forEach(element => 
    {
      document.getElementById("optionSelect").innerHTML += `<option label="${element}" value="${element}"></option>`
    });

    //enregistrer les valeurs pour les pages suivantes
    articleName = response.name;
    articlePrice = response.price/100;

    document.getElementById("addCartButton").addEventListener("click", getValues);
    
    function getValues()
    {
      let vernis = document.getElementById("optionSelect").value;
      let productQuantity = document.getElementById("quantity").value;
      /*
      arrayStorage.push(articleName, articlePrice, vernis, productQuantity);//ajoute les valeurs au tableau existant
      console.log(arrayStorage);//vérification de l'array
      */
      let arrayProduct = [articleName, articlePrice, vernis, productQuantity];
      arrayStorage.push(arrayProduct);
      localStorage.setItem("CartProductData", JSON.stringify(arrayStorage));//enregistre le tableau
      console.log("article ajouté");

      //cartePanier.innerHTML = cartProductData;
      cartePanier.insertAdjacentHTML("beforeend", 
        `
        <div class="card col">
          <div class="card-body">
            <h5 class="card-title">${element[0]}</h5>
            <p> 
              Option choisie : ${element[2]} <br/>
              Quantité : ${element[3]} <br/>
              Prix total : ${element[1] * element[3]} €
            </p>
          </div>
        </div>
        `
      );
    }
  })
  .catch(function(error)//catch errors
  {
    alert(error);
  })


