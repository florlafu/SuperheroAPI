//Declaro la ruta de la API donde voy a consultar la información
const access_token = '338148107599656';
const url = 'https://superheroapi.com/api.php/'+access_token+'/search/';

// Capturo el formulario de busqueda
let form = document.getElementById('search-form')
console.log('capturé el formulario')

//Agrego un evento que escucha al dar submit al form
form.addEventListener('submit', (e) => {

    e.preventDefault();
    console.log('escuché el submit')

    //Guardo el elemento ingresado por el usuario, en caso de no ingresar nada devuelvo mensaje de error
    const barraDeBusqueda = document.getElementById('search-data');
    const heroeBuscado = barraDeBusqueda.value;
    console.log("Searching for: ",heroeBuscado);    


    if (heroeBuscado.length == 0){     
        alert('Escriba un nombre válido')
    } else {

        searchHero(heroeBuscado);
    }
})


document.addEventListener('click', (event) => {
        
    if(event.target.id == 'details_btn'){
        let id = event.target.parentNode.id;
        window.open('details.html'+'?id='+id, "_self");
    }
});

async function searchHero(heroeBuscado){
    
    // Llamo a la API
    let response = await fetch(url+heroeBuscado);
    if (response.ok) {
        //Si da OK recibo el resultado y lo convierto a .json para poder trabajar
        renderData(await response.json());
    } else {
        //Si da error, muestro el error de estado
        alert("HTTP-Error: " + response.status);
    }
}

function renderData(data){
    //Reviso si se encontró algo dentro de la respuesta
    //Si da error devuelvo un mensaje de error
    if(data.response=='error' || data.results.length === 0){
        alert('Escriba un nombre válido')
        //document.getElementById('results').innerHTML = "Ingrese un nombre válido";   
    } else {
        //Si volvió un dato
        //Elimino previos resultados
        let resultsPrev = document.getElementById('results');
        resultsPrev.remove();

        //Cargo los resultados nuevos
        let result_container = document.getElementById('result-container');
        let results = document.createElement('DIV');
        results.id = 'results';
        result_container.appendChild(results);
        
        //Muestro en pantalla cada héroe recibido
        data.results.forEach((element) => {
            results.appendChild(getCard(element));
        });
    }
}


function getCard(data){
    //Contenedor Card
    //Si recibo datos de heroes creo el contenedor e introduzco los datos
    let card = document.createElement('DIV');
    card.className = 'card-container center';
    card.id = data.id;

    console.log("full-name: " + data.biography['full-name'])
    console.log("first-appearance: " + data.biography['first-appearance'])

    card.innerHTML = `
        <div class="card-img-container">
            <h2>${data.name}</h2>
            <p>${data.biography['full-name']}<p>
            <img src="${data.image.url}">
            <p>${data.biography.publisher}</p>
            <p><b>Primera aparición:</b> ${data.biography['first-appearance']}</p>
            <p><b>Personaje:</b> ${data.biography['full-name']}</p>
        </div>
        <div id="details_btn" class="card-name">Ver más</div>        
    `
    return card;
}
