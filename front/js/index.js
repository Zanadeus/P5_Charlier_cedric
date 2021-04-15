function getDataArray()
{
  //return fetch("../furniture.json")
  //return fetch("https://ab-p5-api.herokuapp.com/api/furniture")
  return fetch("http://localhost:3000/api/furniture")//va chercher les informations sur le serveur
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {
    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
}

getDataArray()//lance la fonction pour obtenir les valeurs
.then(function(response)//puis traite l'array
{

  //console.log(response);//affiche l'array
/*
  for (let i = 0; i < response.length; i++)//récupère les infos de l'array pour les injecter dans la page html
  {
    document.getElementById(`furniture${i}`).querySelector("h5").innerHTML += `${response[i].name}` ;//titre
    document.getElementById(`furniture${i}`).querySelector("p").innerHTML += `${response[i].description}` ;//description
    document.getElementById(`furniture${i}`).querySelector("img").setAttribute("src", response[i].imageUrl);//image
    document.getElementById(`furniture${i}`).setAttribute("href", `product.html?id=${response[i]._id}`);//image
  }
*/
  response.forEach(product => 
  {
    //console.log(product);
    document.querySelector("article").innerHTML += 
      `
        <a href="product.html?id=${product._id}" class="card col-5">
        <img class=”card-img-top” src=${product.imageUrl} alt=”...”>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text" >${product.description}</p>
        </div>
        </a>
      ` ;
  });
})
.catch(function(error)//catch errors
{
  alert(error);
})
