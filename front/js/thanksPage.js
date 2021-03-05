let CartProductData = localStorage.getItem("CartProductData").split(',');
console.log(CartProductData);
let productTitle = CartProductData[0];
let productPrice = CartProductData[1];
let productVarnish = CartProductData[2];
let productQuantity = CartProductData[3];

document.querySelector("article").innerHTML += 
      `
        <h4>Merci pour votre commande n°XXXXXXXX ! </h4>
        <p> ${productQuantity} ${productTitle}, option ${productVarnish} pour un total de ${productPrice * productQuantity} €. </p>
        <p> Vos produits seront envoyés dés que possible. </p>
        <p> N'hésitez pas à nous contacter en cas de besoin ! </p>
      `
    ;

//localStorage.clear();