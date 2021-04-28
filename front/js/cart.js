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

//Déclaration des variables
const formInput = document.querySelectorAll("input");//selection de tous les inputs a vérifier
const contact = {};//objet contact recevant les informations de contact
let cartPrice = 0;

//afficher les produits du panier + prix total panier
if (products == null)
{
  document.getElementById("panier").innerHTML += "<p>Votre panier est vide</p>"
}
else
{
  products.forEach(element => 
  {
    cartPrice = cartPrice + element.price * element.quantity;
    document.getElementById("panier").innerHTML += 
      `
        <div class="card col">
          <div class="card-body">
            <h5 class="card-title">${element.productName}</h5>
            <p> 
              Option choisie : ${element.varnish} <br/>
              Quantité : ${element.quantity} <br/>
              Prix : ${element.price * element.quantity} €
            </p>
          </div>
        </div>
      `
    ;
  });
  document.getElementById("panier").insertAdjacentHTML("afterbegin",`Le prix total de votre panier est de ${cartPrice}€`)
}

function getDataArray()//fonction appel des données serveur
{
  return fetch("http://localhost:3000/api/furniture/order")//va chercher les informations sur le serveur
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {
    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
  .then(function(response)//puis traite l'array
  {
    console.log(response);
  })
}

function cartBilling()
{
  fetch ("http://localhost:3000/api/furniture/order", 
  {
    method: "POST",
    body: contact, products
  })
  getDataArray()//fonction appel des données serveur
  .catch(function(error)//catch errors
  {
    alert(error);
  })
}

function validationFormulaire(event)
{
  console.log("test fonction validationFormulaire")
  formInput.forEach(element => 
  {
    function badInput()
    {
      if(element.parentNode.querySelector("p") == null)//on vérifie qu'une phrase d'avertissement pour le champ n'existe pas
      {
        element.insertAdjacentHTML("beforebegin", '<p class="text-danger" >Veuillez vérifier ce champ :</p>')
        element.setAttribute("class", "border border-danger");//On met la bordure de l'input en rouge
      }
    }
    if(element.value == "")//annulation de l'envoi formulaire et alerte de la mauvaise complétion du champ
    {
      event.preventDefault();
      badInput();
    }
    else//vérification du champ mail + validation du champ existant + récupération des données
    {
      event.preventDefault();

      //test regex pour email :
      if (element.parentNode.getAttribute("for") === "email")//on vérifie que le label de l'input est "email"
      {
        console.log(/^.+[@]+.+[.]+[\w]+$/.test(element.value));
        if ((/^.+[@]+.+[.]+[\w]+$/.test(element.value)) === false)//si l'input ne correspond pas à la forme d'un email "a@b.c"
        {
          event.preventDefault();
          badInput();
          return
        }
        else{}
      }

      //validation du champ
      if(element.parentNode.querySelector("p") != null)//On vérifie si le champ a déja été validé vide
      {
        element.parentNode.querySelector("p").remove();//On retire le texte demandant de vérifier le champ
      }
      element.setAttribute("class", "border border-success");//On met la bordure de couleur verte

      //récupération des données formulaire de contact
      contact[element.parentNode.getAttribute("for")] = element.value;
    }
  });
  console.log(contact);
  cartBilling();
}

document.querySelector("form").addEventListener('submit', validationFormulaire) ;