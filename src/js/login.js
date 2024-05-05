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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
coleccionUsuarios = db.ref().child('login');

coleccionUsuarios.once('value', (snapshot) => {
    const usuarios = snapshot.val();
    console.log(usuarios);
});

$('#btnLogin').click(function () {
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener los valores de correo electrónico y contraseña del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("email" + email)
        try {
            // Realizar una consulta a la base de datos para verificar si el usuario existe y la contraseña coincide
            const snapshot = await coleccionUsuarios.once('value');
            const usuarios = snapshot.val();

            // Verificar si el usuario con el correo electrónico proporcionado existe y si la contraseña coincide
            let usuarioEncontrado = false;
            if (usuarios) {
                Object.keys(usuarios).forEach((key) => {
                    const usuario = usuarios[key];
                    if (usuario.correo === email && usuario.contrasena === password) {
                        usuarioEncontrado = true;
                        console.log("Usuario encontrado:", usuario.correo);
                        console.log("Rol:", usuario.rol);
                        window.location.href = 'https://notsteven4000.github.io/CoolGlassesWeb/src/Admin/dashboard.html'
                        // Si el inicio de sesión es exitoso, muestra una alerta
                        Swal.fire({
                            icon: 'success',
                            title: 'Inicio de sesion correctamente!',
                            showConfirmButton: false,
                            timer: 3000
                        });

                        
                    }
                });
            }

            if (!usuarioEncontrado) {
                console.log("Usuario no encontrado o contraseña incorrecta.");
                             // Si el inicio de sesión es exitoso, muestra una alerta
                             Swal.fire({
                                icon: 'error',
                                title: 'Usuario no encontrado o contraseña incorrecta.',
                                showConfirmButton: false,
                                timer: 1500
                            });
            }
        } catch (error) {
            console.error("Error al consultar la base de datos:", error);
        }
    });
});

