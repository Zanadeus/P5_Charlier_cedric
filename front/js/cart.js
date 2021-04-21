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

//verification des inputs formulaire
const formInput = document.querySelectorAll("input");
const contactObject = {};

function regexMail()
{
  console.log(/^.+[@]+[\w]+[.]+[\w]+$/.test(codeInput.value));
  return /^.+[@]+[\w]+[.]+[\w]+$/.test(codeInput.value);
}

function validationFormulaire(event)
{
  console.log("test fonction validationFormulaire")
  formInput.forEach(element => {
    if(element.value != "")//vérification du champ non vide
    {
      // les données sont ok, on peut envoyer le formulaire
      element.parentNode.querySelector("p").setAttribute("class", "d-none");
      element.setAttribute("class", "border border-success");
      //récupération des données formulaire de contact
      contactObject[element.parentNode.getAttribute("for")] = element.value;
      //pour le test de récupération de données
      event.preventDefault();
    }
    else//alerte de la mauvaise complétion du champ et annulation de l'envoi formulaire
    {
      //on indique de ne pas envoyer le formulaire
      event.preventDefault();
      //element.parentNode.querySelector("p").setAttribute("class", "text-danger");
      element.insertAdjacentHTML("beforebegin", '<p class="text-danger" >Veuillez vérifier ce champ :</p>')
      element.setAttribute("class", "border border-danger");
    }
  });
  console.log(contactObject);
}

document.querySelector("form").addEventListener('submit', validationFormulaire) ;