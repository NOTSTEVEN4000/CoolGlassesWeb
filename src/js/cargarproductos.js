// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAbd11VWk59OtFFL3i67wpHH7E5yqfrBCs",
    authDomain: "webpage-c2682.firebaseapp.com",
    databaseURL: "https://webpage-c2682-default-rtdb.firebaseio.com",
    projectId: "webpage-c2682",
    storageBucket: "webpage-c2682.appspot.com",
    messagingSenderId: "569695768284",
    appId: "1:569695768284:web:47cfca133559f51444ee19",
    measurementId: "G-89G79GTZEY"
};

///----- Inicializar Firebase------/////
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
coleccionProductos = db.ref().child('productos');

let bodyProductosHombre = document.getElementById('bodyProductosHombre');
let bodyProductosMujer = document.getElementById('bodyProductosMujer');
let bodyProductosNino = document.getElementById('bodyProductosNino');
let selectCategoria = document.getElementById('categoria');

//Inicializar filtro y cargar productos//
document.addEventListener("DOMContentLoaded", function () {
    filtrarProductosHombre();
    filtrarProductosMujer();
    filtrarProductosNino();
});

function CargarProductos({ codigo, nombre, precio, categoria, descripcion, descuento, imagen, genero }) {
    return `
    <div class="flex flex-wrap max-w-sm mx-2 mb-4 bg-black border rounded-lg shadow 
                dark:bg-slate-300
                transition duration-300 ease-in-out transform hover:scale-95">
                    <a>
                        <img style="height: 170px;" class="rounded-t-lg" src="${imagen}" alt="" />
                    </a>
                    <div class="p-5">
                        <a>
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                            ${nombre}</h5>
                        </a>
                        <a>
                            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-black">
                            ${categoria}</h5>
                        </a>
                        <a>
                            <h5 class="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-black">Genero: 
                            ${genero}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-600">${descripcion}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-3xl font-bold text-gray-900 dark:text-black">$ ${precio}</span>
                            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Carrito</a>
                        </div>
                    </div>
                </div>
     `
};



function filtrarProductosHombre() {
    coleccionProductos.on('child_added', data => {
        const producto = data.val();
        if (producto.genero === "hombre") {
            let div = document.createElement('div');
            div.id = data.key;
            div.innerHTML = CargarProductos(producto);
            document.getElementById('bodyProductosHombre').appendChild(div);
        }
    });
}


function filtrarProductosMujer() {
    //FILTRO DE MUJER
    coleccionProductos.on('child_added', data => {
        const producto = data.val();
        if (producto.genero === "mujer") { // Verificar si el género del producto es "mujer"
            let div = document.createElement('div');
            div.id = data.key;
            div.innerHTML = CargarProductos(producto);
            document.getElementById('bodyProductosMujer').appendChild(div);
        }
    });
}

function filtrarProductosNino() {
    //FILTRO DE NINOS
    coleccionProductos.on('child_added', data => {
        const producto = data.val();
        if (producto.genero === "nino") { // Verificar si el género del producto es "mujer"
            let div = document.createElement('div');
            div.id = data.key;
            div.innerHTML = CargarProductos(producto);
            document.getElementById('bodyProductosNino').appendChild(div);
        }
    });
}


selectCategoria.addEventListener('change', function () {
    const categoriaSeleccionada = selectCategoria.value;
    if (bodyProductosHombre) {
        bodyProductosHombre.innerHTML = '';
        if (categoriaSeleccionada === "") {
            filtrarProductosHombre();
        } else {
            filtroProductosHombre("hombre", categoriaSeleccionada);
        }
    } else {
        console.error('El elemento bodyProductosHombre no se encontró en el DOM.');
    }
});

selectCategoria.addEventListener('change', function () {
    const categoriaSeleccionada = selectCategoria.value;
    bodyProductosMujer.innerHTML = '';
    if (categoriaSeleccionada === "") {
        filtrarProductosMujer();
    } else {
        filtroProductosMujer("mujer", categoriaSeleccionada);
    }
});

selectCategoria.addEventListener('change', function () {
    const categoriaSeleccionada = selectCategoria.value;
    bodyProductosNino.innerHTML = '';
    if (categoriaSeleccionada === "") {
        filtrarProductosNino();
    } else {
        filtroProductosNino("nino", categoriaSeleccionada);
    }
});


function filtroProductosHombre(genero, categoriaSeleccionada) {
    let encontrado = false;
    coleccionProductos.on('child_added', data => {
        const producto = data.val();
        if (producto.genero === genero && producto.categoria === categoriaSeleccionada) {
            let div = document.createElement('div');
            div.id = data.key;
            div.innerHTML = CargarProductos(producto);
            bodyProductosHombre.appendChild(div);
            encontrado = true;
        }
    });
    // Verificar si no se encontraron productos
    setTimeout(() => { // Agregar un pequeño retardo para esperar a que se complete la búsqueda
        if (!encontrado) {
            const mensaje = document.createElement('p');
            mensaje.textContent = "No se encontraron productos";
            mensaje.classList.add('text-center', 'text-gray-600', 'italic', 'mt-4');
            bodyProductosHombre.appendChild(mensaje);
        }
    }, 100);
}



function filtroProductosMujer(genero, categoriaSeleccionada) {
    let encontrado = false;
    coleccionProductos.on('child_added', data => {
        const producto = data.val();
        if (producto.genero === genero && producto.categoria === categoriaSeleccionada) {
            let div = document.createElement('div');
            div.id = data.key;
            div.innerHTML = CargarProductos(producto);
            bodyProductosMujer.appendChild(div);
            encontrado = true;
        }
    });
    // Verificar si no se encontraron productos
    setTimeout(() => { // Agregar un pequeño retardo para esperar a que se complete la búsqueda
        if (!encontrado) {
            const mensaje = document.createElement('p');
            mensaje.textContent = "No se encontraron productos";
            mensaje.classList.add('text-center', 'text-gray-600', 'italic', 'mt-4');
            bodyProductosMujer.appendChild(mensaje);
        }
    }, 100);
}



function filtroProductosNino(genero, categoriaSeleccionada) {
    let encontrado = false;
    coleccionProductos.on('child_added', data => {
        const producto = data.val();
        if (producto.genero === genero && producto.categoria === categoriaSeleccionada) {
            let div = document.createElement('div');
            div.id = data.key;
            div.innerHTML = CargarProductos(producto);
            bodyProductosNino.appendChild(div);
            encontrado = true;
        }
    });
    // Verificar si no se encontraron productos
    setTimeout(() => { // Agregar un pequeño retardo para esperar a que se complete la búsqueda
        if (!encontrado) {
            const mensaje = document.createElement('p');
            mensaje.textContent = "No se encontraron productos";
            mensaje.classList.add('text-center', 'text-gray-600', 'italic', 'mt-4');
            bodyProductosNino.appendChild(mensaje);
        }
    }, 100);
}