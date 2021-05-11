//récupérer les infos panier dans le localStorage
let products = ["5be9cc611c9d440000c1421e"];
if (JSON.parse(localStorage.getItem("cartLists")) !== null )
{
  products = JSON.parse(localStorage.getItem("cartLists"));
}
console.log(products);
//afficher le nombre d'éléments dans le panier sur barre de navigation
document.getElementById("countItems").insertAdjacentHTML("beforeend",`<sup>${products.length}</sup>`);
document.getElementById("countItems").querySelector("sup").style.backgroundColor = "brown";

let products = JSON.parse(localStorage.getItem("cartLists"));
console.log(products);
let productTitle = products[0];
let productPrice = products[1];
let productVarnish = products[2];
let productQuantity = products[3];

document.querySelector("article").innerHTML += 
      `
        <h4>Merci pour votre commande n°XXXXXXXX ! </h4>
        <p> d'un total de ${productPrice * productQuantity} €. </p>
        <p> Vos produits seront envoyés dés que possible. </p>
        <p> N'hésitez pas à nous contacter en cas de besoin ! </p>
      `
    ;

localStorage.clear();