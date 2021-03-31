let CartProductData = JSON.parse(localStorage.getItem("CartProductData"));
console.log(CartProductData);

//afficher la carte du produit
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
let formData = [];
function validationFormulaire(event)
{
  console.log("test fonction validationFormulaire")
  formInput.forEach(element => {
    if(element.value != "")
    {
      // les données sont ok, on peut envoyer le formulaire
      element.parentNode.querySelector("p").setAttribute("class", "d-none");
      element.setAttribute("class", "border border-success");
      //récupération des données formulaire
      formData.push(element.value);
      //pour le test de récupération de données
      event.preventDefault();
    }
    else
    {
      event.preventDefault();
      //alert(`Veuillez vérifier ce champs`);
      element.parentNode.querySelector("p").setAttribute("class", "text-danger");
      element.setAttribute("class", "border border-danger");
      // et on indique de ne pas envoyer le formulaire
    }
  });
  console.log(formData);
}

document.querySelector("form").addEventListener('submit', validationFormulaire) ;