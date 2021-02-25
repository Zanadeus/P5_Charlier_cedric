let urlActive = (new URL(document.location)).searchParams;
let urlID = urlActive.get('id'); // la chaine de caractère après id=.
//console.log(urlID);

function getDataArray()
{
  return fetch("http://localhost:3000/api/furniture/" + urlID)//va chercher les informations sur le serveur
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {
    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
}

getDataArray()
  .then(function(response)//puis traite l'array
  {
  /*
    document.querySelector("article").querySelector("h5").innerHTML = `${response.name}` ;//affiche le titre
    document.querySelector("article").querySelector("h4").innerHTML = `${response.price}€` ;//affiche le prix
    document.querySelector("article").querySelector("p").innerHTML = `${response.description}` ;//affiche la description
    document.querySelector("article").querySelector("img").setAttribute("src", response.imageUrl);//affiche l'image
    document.getElementById("varnishSelect").querySelector(`option`).innerHTML = `${response.varnish[1]}` ;//affiche l'option
  */
    //console.log(response);
    document.querySelector("article").innerHTML += //affiche la carte du produit
      `
      <div class="card col-5 furniture">
      <img class=”card-img-top” src=${response.imageUrl} alt=”...”>
      <div class="card-body">
        <h5 class="card-title">${response.name}</h5>
        <h4 class="card-text">${response.price}€</h4>
        <p class="card-text" >${response.description}</p>
        <form action="thanksPage.html" method="get" class="text-center">
          <label for="optionSelect">Selectionnez un vernis:</label>
            <select name="varnish" id="optionSelect">
              <option value="">--Choisissez une option--</option>
            </select>
          <label for="quantity">Combien de produits voulez-vous ?</label>
            <select name="quantity" id="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          <input type="submit" class="btn btn-primary" value="input Ajouter ce produit et aller au panier">
          <a href="cart.html?id=${response._id}" class="text-center"><button type="button" class="btn btn-primary"> hrefButton Ajouter ce produit et aller au panier</button></a>
        </form>
      </div>
    </div>
      `
    ;
    //affiche les options dans la carte du produit
    response.varnish.forEach(element => 
    {
      document.getElementById("optionSelect").innerHTML +=
      `
        <option label="${element}" value="${element}"></option>
      `
    });
    //sessionStorage.setItem("numberOfProduct", )
    sessionStorage.setItem("titre",response.name);
    sessionStorage.setItem("texte",response.description);
    sessionStorage.setItem("image",response.imageUrl);
    sessionStorage.setItem("id", response._id);
  })
  .catch(function(error)//catch errors
  {
    alert(error);
  })