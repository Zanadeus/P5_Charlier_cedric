function getDataArray()//fonction appel des données serveur
{
  return fetch("http://localhost:3000/api/furniture")//va chercher les informations sur le serveur
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {
    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
}

getDataArray()//fonction appel des données serveur
.then(function(response)//puis traite l'array
{
  //console.log(response);//affiche l'array
  response.forEach(product => 
  {
    //console.log(product);
    document.querySelector("article").innerHTML += 
      `
        <a href="product.html?id=${product._id}" class="card col-md-5">
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
