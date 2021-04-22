//récupération du panier dans le localStorage
let cartProductData = JSON.parse(localStorage.getItem("cartLists"));
console.log(cartProductData);

//afficher les produits du panier
if (cartProductData == null)
{
  document.getElementById("panier").innerHTML += "<p>Votre panier est vide</p>"
}
else
{
  cartProductData.forEach(element => {
    document.getElementById("panier").innerHTML += 
        `
          <div class="card col">
            <div class="card-body">
              <h5 class="card-title">${element.productName}</h5>
              <p> 
                Option choisie : ${element.varnish} <br/>
                Quantité : ${element.quantity} <br/>
                Prix total : ${element.price * element.quantity} €
              </p>
            </div>
          </div>
        `
      ;
  });
}

//Déclaration des variables
const formInput = document.querySelectorAll("input");//selection de tous les inputs a vérifier
const contactObject = {};//objet contact recevant les informations de contact

function validationFormulaire(event)
{
  console.log("test fonction validationFormulaire")
  formInput.forEach(element => {
    if(element.value == "")//annulation de l'envoi formulaire et alerte de la mauvaise complétion du champ
    {
      event.preventDefault();
      if(element.parentNode.querySelector("p") == null)//on vérifie qu'une phrase d'avertissement pour le champ n'existe pas
      {
        element.insertAdjacentHTML("beforebegin", '<p class="text-danger" >Veuillez vérifier ce champ :</p>')
        element.setAttribute("class", "border border-danger");//On met la bordure de l'input en rouge
      }
    }
    else//vérification du champ mail + validation du champ existant + récupération des données
    {
      //pour le test de récupération de données
      event.preventDefault();

      //test regex pour email :
      if (element.parentNode.getAttribute("for") === "email")//on vérifie que le label de l'input est "email"
      {
        console.log("vérification champ email");
        console.log(/^.+[@]+.+[.]+[\w]+$/.test(element.value));
        if ((/^.+[@]+.+[.]+[\w]+$/.test(element.value)) === false)//si l'input ne correspond pas à la forme d'un email "a@b.c"
        {
          console.log("l'email est invalide");
          event.preventDefault();
          if(element.parentNode.querySelector("p") == null)//on vérifie qu'une phrase d'avertissement pour le champ n'existe pas
          {
            element.insertAdjacentHTML("beforebegin", '<p class="text-danger" >Veuillez vérifier ce champ :</p>')
            element.setAttribute("class", "border border-danger");//On met la bordure de l'input en rouge
          }
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
      contactObject[element.parentNode.getAttribute("for")] = element.value;
    }
  });
  console.log(contactObject);
}

document.querySelector("form").addEventListener('submit', validationFormulaire) ;