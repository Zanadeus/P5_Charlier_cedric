let CartProductData = localStorage.getItem("CartProductData").split(',');
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
const formInput = document.querySelector("input");

function regex()
{
  console.log(/^\w{3,}$/.test(formInput.value));
  return /^\w{3,}$/.test(formInput.value);
}

function isValid()
{
  if (regex() === true ) //problème sur la validation ou invalidation
  {
    console.log("formulaire valide");
    document.getElementById("submitButton").disabled = false;
  }
  else if (regex() === false )
  {
    console.log("formulaire invalide");
    document.getElementById("submitButton").disabled = true;
  }
}

formInput.addEventListener('input', isValid);
/*
formInput.forEach(element => {
  element.addEventListener('input', isValid);
});
*/