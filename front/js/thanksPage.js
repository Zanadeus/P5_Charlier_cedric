//récupérer les infos panier dans le localStorage
let cartQuantity = 0;
let cartStorage = JSON.parse(localStorage.getItem("cartLists"));
cartStorage.forEach(element => 
{
  cartQuantity += Number(element.quantity);
});
let cartPrice = localStorage.getItem("totalCartPrice");

//afficher le nombre d'éléments dans le panier sur barre de navigation
document.getElementById("countItems").insertAdjacentHTML("beforeend",`<sup>${cartStorage.length}</sup>`);
document.getElementById("countItems").querySelector("sup").style.backgroundColor = "brown";

let validatedOrder = JSON.parse(localStorage.getItem("validatedOrder"));
console.log(validatedOrder);

document.querySelector("article").innerHTML += 
      `
        <h4>Votre commande n°${validatedOrder.orderId} d'un montant de ${cartPrice}€ a été enregistrée. </h4>
        <p> Merci pour votre achat, vos produits seront envoyés dés que possible. </p>
        <p> N'hésitez pas à nous contacter en cas de besoin ! </p>
      `
    ;

localStorage.clear();