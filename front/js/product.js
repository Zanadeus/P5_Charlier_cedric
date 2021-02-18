let urlActive = (new URL(document.location)).searchParams;
let urlID = urlActive.get('id'); // la chaine de caractère "Jonathan Smith".
console.log(urlID);

function getDataArray()
{
  return fetch("http://localhost:3000/api/furniture" + urlID)//va chercher les informations sur le serveur
  .then(function(httpBodyResponse)//puis lance la fonction suivante
  {
    console.log("test getDataArray");
    const response = httpBodyResponse.json();//convertit le fichier en json (format array)
    return response;//renvoie l'array en promise --> à retraiter avec then
  })
  .then(function(response)//puis traite l'array
{
  console.log(response); //affiche l'array
  document.getElementById("test").innerText += `${response.name}` ; //titre
})
.catch(function(error)//catch errors
{
  alert(error);
})
}

getDataArray();
/*
const urlAPI = function()
{
  if (urlID === null)
  {
    return "http://localhost:3000/api/furniture";
  }
  else
  {
    return "http://localhost:3000/api/furniture" + urlID;
  }
}
*/
