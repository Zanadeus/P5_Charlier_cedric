function getDataArray()
{
  return fetch("http://localhost:3000/api/furniture")//va chercher les informations sur le serveur
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {
    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
  .then(function(response)//puis traite l'array
{
  //console.log(response);//affiche l'array
  for (let i = 0; i < response.length; i++)//récupère les infos de l'array pour les injecter dans la page html
  {
    document.getElementById(`furniture${i}`).querySelector("h5").innerHTML += `${response[i].name}` ;//titre
    document.getElementById(`furniture${i}`).querySelector("p").innerHTML += `${response[i].description}` ;//description
    document.getElementById(`furniture${i}`).querySelector("img").setAttribute("src", response[i].imageUrl);//image
    document.getElementById(`furniture${i}`).setAttribute("href", `product.html?id=${response[i]._id}`);//image
  }
})
.catch(function(error)//catch errors
{
  alert(error);
})
}

getDataArray()//lance la fonction pour obtenir les valeurs
/*
.then(function(response)//puis traite l'array
{
  //console.log(response);//affiche l'array
  for (let i = 0; i < response.length; i++)//récupère les infos de l'array pour les injecter dans la page html
  {
    document.getElementById(`furniture${i}`).querySelector("h5").innerHTML += `${response[i].name}` ;//titre
    document.getElementById(`furniture${i}`).querySelector("p").innerHTML += `${response[i].description}` ;//description
    document.getElementById(`furniture${i}`).querySelector("img").setAttribute("src", response[i].imageUrl);//image
    document.getElementById(`furniture${i}`).setAttribute("href", `product.html?id=${response[i]._id}`);//image
  }
})
.catch(function(error)//catch errors
{
  alert(error);
})
*/

/* 
//ancienne version, fonctionnelle
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() 
  {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200)
    {
        var response = JSON.parse(this.responseText);
        //console.log(response.length);
        for (let i = 0; i < response.length; i++)
        {
          document.getElementById(`furniture${i}`).querySelector("h5").innerHTML += `${response[i].name}` ;
          document.getElementById(`furniture${i}`).querySelector("p").innerHTML += `${response[i].description}` ;
          document.getElementById(`furniture${i}`).querySelector("img").setAttribute("src", response[i].imageUrl);
        }
    }
  }
  request.open("GET", "http://localhost:3000/api/furniture");
  request.send();
*/

/* 
//test nouvelle version, compréhension.
function getDatas()
{
  console.log(getDatas);
  return fetch("http://localhost:3000/api/furniture")
  .then(function(httpBodyResponse)//get JSON
  {
    console.log(httpBodyResponse);
    return httpBodyResponse.json();
  })
  .then(function(furnitureName)//get furniture Name
  {
    console.log(furnitureName[0].name);
    console.log(furnitureName[1].name);
    console.log(furnitureName[2].name);
    return furnitureName[0].name;
  })
  .catch(function(error)//catch errors
  {
    alert(error);
  })
}
*/