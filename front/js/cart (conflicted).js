//récupérer les infos panier dans le localStorage
let products = ["5be9cc611c9d440000c1421e"];
/*
if (JSON.parse(localStorage.getItem("cartLists")) !== null )
{
  products = JSON.parse(localStorage.getItem("cartLists"));
}
*/
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
  document.getElementById("panier").insertAdjacentHTML("beforebegin",`<h4>Le prix total de votre panier est de ${cartPrice}€</h4>`)
}

function validationFormulaire(event)//fonction de vérification du formulaire, récupération et envoi des données contact et products au serveur
{
  let validateField = 0 ;
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
    
    //vérification d'un champ vide
    if(element.value == "")
    {
      event.preventDefault();
      badInput();
      return;
    }
    //vérification du champ email
    if (element.parentNode.getAttribute("for") === "email")//on vérifie que le label de l'input est "email"
    {
      console.log(/^.+[@]+.+[.]+[\w]+$/.test(element.value));//test -- vérification de la valeur obtenue
      if ((/^.+[@]+.+[.]+[\w]+$/.test(element.value)) === false)//si l'input ne correspond pas à la forme d'un email "a@b.c"
      {
        event.preventDefault();
        badInput();
        return;
      }
    }
    //validation du champ
    validateField += 1;
    if(element.parentNode.querySelector("p") != null)//On vérifie si le champ a déja été validé vide
    {
      element.parentNode.querySelector("p").remove();//On retire le texte demandant de vérifier le champ
    }
    element.setAttribute("class", "border border-success");//On met la bordure de couleur verte
    //récupération des données formulaire de contact
    contact[element.parentNode.getAttribute("for")] = element.value;
    //ajouter fonction fetch
    event.preventDefault();
  });
  return validateField;
}

  /*_________________________________Envoi des informations au serveur_________________________________*/
function postOrder()
{
  let reqURL = "http://localhost:3000/api/furniture/order" ;
  fetch (reqURL,
  {
    method: "POST",
    headers: 
    {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(
    {
      contact,
      products
    })
  })
  .then((response) => 
  {
    console.log(response);
    return response.json();
  })
  .then((data) =>
  {
    //location.href = "thanksPage.html" ;
    console.log(data);
  })
  .catch(function(error)//catch errors
  {
    alert(error);
  })
}

function submitData(event)
{
  //validationFormulaire(event);
  console.log(validationFormulaire(event));
  /*
  if (validationFormulaire = 5)
  {
    postOrder();
  }
  */
}

document.getElementById("submitForm").addEventListener('submit', submitData) ;