let CartProductData = JSON.parse(localStorage.getItem("CartProductData"));
console.log(CartProductData);
let productTitle = CartProductData[0];
let productPrice = CartProductData[1];
let productVarnish = CartProductData[2];
let productQuantity = CartProductData[3];

//afficher la carte du produit
document.getElementById("panier").innerHTML += 
      `
        <div class="card col">
          <div class="card-body">
            <h5 class="card-title">${productTitle}</h5>
            <p> 
              Option choisie : ${productVarnish} <br/>
              Quantité : ${productQuantity} <br/>
              Prix total : ${productPrice * productQuantity} €
            </p>
          </div>
        </div>
      `
    ;

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

function validationFormulaire(event)
{
  console.log("test fonction validationFormulaire")
  formInput.forEach(element => {
    if(element.value != "")
    {
      // les données sont ok, on peut envoyer le formulaire
      element.parentNode.querySelector("p").setAttribute("class", "d-none");
      element.setAttribute("class", "border border-success");
      return true;
    }
    else
    {
      event.preventDefault();
      //alert(`Veuillez vérifier ce champs`);
      element.parentNode.querySelector("p").setAttribute("class", "text-danger");
      element.setAttribute("class", "border border-danger");
      // et on indique de ne pas envoyer le formulaire
      return false;
    }
  });

}

document.querySelector("form").addEventListener('submit', validationFormulaire) ;
/*
const formInput = document.querySelectorAll("input");
console.log(formInput);

formInput.forEach(element => 
{
  function regex()
  {
    console.log(/^\w{3,}$/.test(element.value));
    return /^\w{3,}$/.test(element.value);
  }

  function isValid()
  {
    if (regex() === true ) 
    {
      console.log("formulaire valide");
      document.getElementById("submitButton").disabled = false;
    }
    else if (regex() === false)
    {
      console.log("formulaire invalide");
      document.getElementById("submitButton").disabled = true;
    }
  }

  element.addEventListener('input', isValid);
});
*/