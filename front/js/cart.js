let CartProductData = JSON.parse(localStorage.getItem("CartProductData"));
console.log(CartProductData);

//afficher les produits du panier
if (CartProductData == null)
{
  document.getElementById("panier").innerHTML += "<p>Votre panier est vide</p>"
}
else
{
  CartProductData.forEach(element => {
    document.getElementById("panier").innerHTML += 
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
      ;
  });
}



// retenir les inputs du formulaire
/*
document.getElementById("submitButton").addEventListener("click", getValues);
async function getValues(response)
{
  let test = document.querySelector("form").value;
  localStorage.setItem("test",test);
}
*/

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
    /*
      if(element.parentNode.getAttribute("for") = "email") //vérification du champ email
      {
        if(regexMail === true)
        {
          console.log("email validé !");
          event.preventDefault();
        }
    */
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
      event.preventDefault();
      //alert(`Veuillez vérifier ce champs`);
      element.parentNode.querySelector("p").setAttribute("class", "text-danger");
      element.setAttribute("class", "border border-danger");
      // et on indique de ne pas envoyer le formulaire
    }
  });
  console.log(contactObject);
}

document.querySelector("form").addEventListener('submit', validationFormulaire) ;