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


// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
coleccionProductos = db.ref().child('productos');
bodyProductos = $('#bodyProductos').val();


function guardarProducto() {
  const id = $('#id').val() || coleccionProductos.push().key; // Si no hay ID, genera uno nuevo
  const codigo = $('#codigo').val();
  const nombre = $('#nombre').val();
  const descripcion = $('#descripcion').val();
  const categoria = $('#categoria').val();
  descuento = $('#descuento').val();
  const genero = $('#genero').val();
  const imagen = $('#imagen').val();
  precio = $('#precio').val();

  coleccionProductos.child(id).set({
      codigo: codigo,
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
      descuento: descuento,
      genero: genero,
      imagen: imagen,
      precio: precio
  });

  // Limpiar los campos después de enviar el formulario
  $('form').trigger('reset');
}


$('form').submit(function (e) {
  e.preventDefault();
  guardarProducto();
});


function mostrarProductos({ codigo, nombre, precio, categoria, descripcion, descuento, imagen, genero }) {
  return `
  <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
  <td class="p-3 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${codigo}</td>
  <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">
    <img src="${imagen}" alt="producto" class="w-22 h-12">
  </td>
  <td class="p-1 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${nombre}</td>
  <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${categoria}</td>
  <td class="p-4 text-base font-medium text-gray-900 dark:text-black" style="overflow-wrap: break-word;">${descripcion}</td>
  <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${genero}</td>
  <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${precio}</td>
  <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${descuento}</td>
  <td class="p-4 space-x-2 whitespace-nowrap">
    <button type="button" class="updateProductButton inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            data-drawer-target="drawer-create-product-default" data-drawer-show="drawer-create-product-default" aria-controls="drawer-update-product-default" data-drawer-placement="right"
            data-imagen="${imagen}">
      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
      </svg>
      Actualizar
    </button>
    <button type="button" id="deleteProductButton" data-drawer-target="drawer-delete-product-default"
            data-drawer-show="drawer-delete-product-default" aria-controls="drawer-delete-product-default"
            data-drawer-placement="right"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"></path>
      </svg>
      Eliminar
    </button>
  </td>
</tr>
`;
}

function handleChildEvent(data, eventType) {
  const { key } = data;
  const parentNode = document.getElementById('bodyProductos');
  let nodeToUpdate = document.getElementById(key);
  if (eventType === 'child_removed' && nodeToUpdate) {
    parentNode.removeChild(nodeToUpdate);
    return;
  }
  if (!nodeToUpdate) {
    nodeToUpdate = document.createElement('tr');
    nodeToUpdate.id = key;
    parentNode.appendChild(nodeToUpdate);
  }
  nodeToUpdate.innerHTML = mostrarProductos(data.val());
}
// Manejar eventos
coleccionProductos.on('child_added', data => handleChildEvent(data, 'child_added'));
coleccionProductos.on('child_changed', data => handleChildEvent(data, 'child_changed'));
coleccionProductos.on('child_removed', data => handleChildEvent(data, 'child_removed'));


//CREAR PRODUCTO//
$('#createProductButton').click(
  function () {
  $('#id, #codigo, #nombre, #precio, #genero, #categoria, #descripcion, #descuento, #imagen').val('');
  // Restablecer el formulario
  $('form').trigger('reset');
});


//MODIFICAR PRODUCTO//
$('#tablaProductos').on('click', '.updateProductButton', function () {
  document.querySelector('[data-drawer-target="drawer-create-product-default"]').click();
  let id = $(this).closest('tr').attr('id');
  let codigo = $(this).closest('tr').find('td:eq(0)').text();
  let imagen = $(this).data('imagen'); // Obtener la URL de la imagen del atributo data-imagen
  let nombre = $(this).closest('tr').find('td:eq(2)').text(); // Cambiado de 3 a 2, ya que ahora la imagen está en la segunda columna
  let categoria = $(this).closest('tr').find('td:eq(3)').text();
  let descripcion = $(this).closest('tr').find('td:eq(4)').text();
  let genero = $(this).closest('tr').find('td:eq(5)').text();
  let precio = $(this).closest('tr').find('td:eq(6)').text();
  let descuento = $(this).closest('tr').find('td:eq(7)').text();

  $('#id').val(id);
  $('#codigo').val(codigo);
  $('#nombre').val(nombre);
  $('#precio').val(precio);
  $('#categoria').val(categoria);
  $('#genero').val(genero);
  $('#descripcion').val(descripcion);
  $('#descuento').val(descuento);
  $('#imagen').val(imagen);
});


//ELIMINAR//
$('#tablaProductos').on('click', '#deleteProductButton', function () {
  // Obtener el ID del producto
  let id = $(this).closest('tr').attr('id');
  // Mostrar un cuadro de diálogo de confirmación
  Swal.fire({
    title: '¿Está seguro de eliminar el producto?',
    text: "¡Esta operación no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Borrar'
  }).then((result) => {
    // Si el usuario confirma la eliminación
    if (result.value) {
      // Eliminar el producto de la base de datos Firebase
      db.ref(`productos/${id}`).remove()
        .then(() => {
          // Si la eliminación es exitosa, mostrar un mensaje de éxito
          Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
        })
        .catch((error) => {
          // Si ocurre un error durante la eliminación, mostrar un mensaje de error
          console.error("Error al eliminar el producto:", error);
          Swal.fire('Error', 'No se pudo eliminar el producto. Por favor, inténtelo de nuevo.', 'error');
        });
    }
  });
});



