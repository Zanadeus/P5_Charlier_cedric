//récupérer les infos panier dans le localStorage
let cartStorage = [];
let cartQuantity = 0;
if (localStorage.getItem("cartLists") !== null )
{
  cartStorage = JSON.parse(localStorage.getItem("cartLists"));
  cartStorage.forEach(element => 
  {
    cartQuantity += Number(element.quantity);
  });
}

//afficher le nombre d'éléments dans le panier sur barre de navigation
document.getElementById("countItems").insertAdjacentHTML("beforeend",`<sup>${cartStorage.length}</sup>`);
document.getElementById("countItems").querySelector("sup").style.backgroundColor = "brown";

let validatedOrder = JSON.parse(localStorage.getItem("validatedOrder"));
console.log(validatedOrder);

document.querySelector("article").innerHTML += 
      `
        <h4>Merci pour votre commande n°${validatedOrder.orderId} ! </h4>
        <p> Vos produits seront envoyés dés que possible. </p>
        <p> N'hésitez pas à nous contacter en cas de besoin ! </p>
      `
    ;

localStorage.clear();