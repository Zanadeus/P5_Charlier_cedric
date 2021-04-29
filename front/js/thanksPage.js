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

//localStorage.clear();