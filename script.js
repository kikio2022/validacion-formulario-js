const firebaseConfig = {
    apiKey: "AIzaSyDw_tH6PHDTYwWlVYa7th8oB1aR7_ZvHfs",
    authDomain: "datos-de-formulario-cf695.firebaseapp.com",
    projectId: "datos-de-formulario-cf695",
    storageBucket: "datos-de-formulario-cf695.appspot.com",
    messagingSenderId: "729888524521",
    appId: "1:729888524521:web:3dd61b5c8b6fb789d54878",
    measurementId: "G-DDQGMXNKZF" 
};

//inicializar firebase
firebase.initializeApp(firebaseConfig);


//inicializar cloud firestore y agarrar una referencia para el servicio
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //validar campo nombre 
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor introduci tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    // validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //patron de validacion basico
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introducí un mail válido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        errorNombre.classList.remove('error-message')
    }


    // validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    //si todos los campos son validos enviar formulario
if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

//backend que reciba la informacion
db.collection("users").add({
    nombre: entradaNombre.value,
    email: emailEntrada.value,
    password: contrasenaEntrada.value
})
.then((docRef) => {
    alert('El formulario se ha enviado con exito', docRef.id)
    document.getElementById('formulario').reset();
})
.catch((error) => {
    alert(error);
});


    }
})