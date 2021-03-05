let urlActive = (new URL(document.location)).searchParams;
let urlID = urlActive.get('id'); // la chaine de caractère après id=.
//console.log(urlID);
let arrayStorage = [];

function getDataArray()//obtenir le json du produit
{
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
    arrayStorage.push(response.name, response.price/100);
    document.getElementById("submitButton").addEventListener("click", getValues);
  })
  .catch(function(error)//catch errors
  {
    alert(error);
  })

  async function getValues(response)
  {
    let vernis = document.getElementById("optionSelect").value;
    let productQuantity = document.getElementById("quantity").value;
    arrayStorage.push(vernis, productQuantity);//ajoute les valeurs au tableau existant
    console.log(arrayStorage);//vérification de l'array
    localStorage.setItem("CartProductData", arrayStorage);//enregistre le tableau
  }
