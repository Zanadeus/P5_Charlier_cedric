let CartProductData = localStorage.getItem("CartProductData").split(',');
console.log(CartProductData);
let productTitle = CartProductData[0];
let productPrice = CartProductData[1];
let productVarnish = CartProductData[2];
let productQuantity = CartProductData[3];

document.getElementById("panier").innerHTML += //affiche la carte du produit
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

document.getElementById("submitButton").addEventListener("click", getValues);
    async function getValues(response)
    {
      let test = document.querySelector("form").value;
      localStorage.setItem("test",test);
    }