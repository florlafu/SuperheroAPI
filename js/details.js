const access_token = "338148107599656";
const api_url = "https://www.superheroapi.com/api.php/"+access_token+"/";

console.log("Entró a details")

driver();


async function driver(){
    const id = obtenerId();
    const data = await getInfo(id);
    renderPage(data);
}

//Obtengo el ID de la URL
function obtenerId(){
    const url = location.search;
    return url.substring(url.indexOf('=')+1);
}

// Llamo a la API
async function getInfo(id){
    let response = await fetch(api_url+id);
    //Si la respuesta está OK, guardo los datos en un json para poder trabajarlos
    if(response.ok){
        let jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }
    else{
        //Sino devuelvo un mensaje de alerta de status
        alert("HTTP-Error: ",response.status);
    }
}

//Función de renderización de la página con los datos obtenidos
function renderPage(data){
    document.getElementById('data-container').name = data.id;

    // Seteo imagen del superheroe
    let image = document.getElementById('image');
    image.firstElementChild.src = `${data.image.url}`;

    // Nombre
    const name = document.getElementById("name-hero");
    name.innerHTML = `${data.name}`;
    
    console.log(data.biography['first-appearance']);

    // Imagen iconográfica si es bueno o malo
    let imageGood = document.getElementById('image-good');
    let imageBad = document.getElementById('image-bad');

    console.log(data.biography.alignment);

    if (data.biography.alignment === "bad"){        
        imageBad.style.display = "block";
    } else {
        imageGood.style.display = "block";
    }

    // Powerstats
    let combat = document.getElementsByClassName('combat');
    combat[0].innerHTML = `${data.powerstats.combat}`;
    combat[0].style = `width: ${data.powerstats.combat}%;`;

    let durability = document.getElementsByClassName('durability');
    durability[0].innerHTML = `${data.powerstats.durability}`;
    durability[0].style = `width: ${data.powerstats.durability}%;`;

    let intelligence = document.getElementsByClassName('intelligence');
    intelligence[0].innerHTML = `${data.powerstats.intelligence}`;
    intelligence[0].style = `width: ${data.powerstats.intelligence}%;`;

    let power = document.getElementsByClassName('power');
    power[0].innerHTML = `${data.powerstats.power}`;
    power[0].style = `width: ${data.powerstats.power}%;`;

    let speed = document.getElementsByClassName('speed');
    speed[0].innerHTML = `${data.powerstats.speed}`;
    speed[0].style = `width: ${data.powerstats.speed}%;`;

    let strength = document.getElementsByClassName('strength');
    strength[0].innerHTML = `${data.powerstats.strength}`;
    strength[0].style = `width: ${data.powerstats.strength}%;`;

    // Apariencia
    document.getElementById('appearance').innerHTML = muestroResultado(data.appearance);

    // Biografía
    document.getElementById('biography').innerHTML = muestroResultado(data.biography);

    // Ocupación
    document.getElementById('occupation').innerHTML = muestroResultado(data.work);

    // Conexiones
    document.getElementById('connections').innerHTML = muestroResultado(data.connections);
}

// Convierto el objeto JSON en un párrafo
function muestroResultado(jsonData){
    let msj='';
    for (let key in jsonData){
        msj += 
            '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ jsonData[key]+ '</p>';
    }
    return msj;
}