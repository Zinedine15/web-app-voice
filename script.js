let miVentana = null;
let miVentana2 = null;

let textCc = ''; //Variable que guardará el comando detectado

// Verificar si el navegador soporta reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    const resultDiv = document.getElementById('result');

    recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

    // Evento cuando la voz es detectada
    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript; // Obtener el texto reconocido

        resultDiv.textContent = 'Orden identificada: ' + result;
        console.log("Comando Detectado: ", result);
        textCc = result.toLowerCase();

        const kw1 = 'pestaña nueva';
        const kw2 = 'la cuerda';
        const kw3 = 'tamaño pequeño';
        const kw4 = 'cierra pestaña';
        const kw5 = 'cierra navegador';

        if (result.includes(kw1)) {
            window.alert("Abriendo Pestaña Nueva");
            miVentana = window.open('https://www.google.com', '_blank');
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw2)) {
            window.alert("Abriendo Página de 'LaCuerda'");
            miVentana2 = window.open('https://acordes.lacuerda.net', '_blank');
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw3)) {
            const opciones = 'width=600,height=400,left=100,top=100';
            window.alert("Abriendo Ventana Pequeña");
            window.open('https://www.google.com', '_blank', opciones);
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw4)) {
            window.alert("Puedes cerrar la pestaña de la cuerdax");
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw5)) {
            window.alert("Puedes cerrar el navegador");
            enviarDatosAMockAPI(textCc);
        } else {
            console.log("No se encontró la palabra ");
        }

        function enviarDatosAMockAPI(textCc) {
            const apiUrl = "https://6604c6232ca9478ea17e7e32.mockapi.io/ComandosDetectados";
        
            const datos = {
                textoComando: textCc
            };
        
            const options = {
                method: 'POST', // Método HTTP POST para enviar los datos
                headers: {
                    'Content-Type': 'application/json' // Especificar el tipo de contenido JSON
                },
                body: JSON.stringify(datos) // Convertir el objeto a JSON
            };
        
            fetch(apiUrl, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ocurrió un error al enviar los datos a la API.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos enviados exitosamente a la API:', data);
            })
            .catch(error => {
                console.error('Error al enviar los datos a la API:', error);
            });
        }
        
    };

    // Evento de error
    recognition.onerror = function(event) {
        console.error('Error de reconocimiento de voz:', event.error);
    };

    // Palabra clave para iniciar el reconocimiento de voz
    const activationKeyword = 'Luis';

    // Iniciar el reconocimiento de voz cuando se detecta la palabra clave
    recognition.onstart = function() {
        console.log("Reconocimiento de voz activado");
    };

    // Detectar la palabra clave y activar el reconocimiento de voz
    recognition.onend = function() {
        recognition.start();
    };

    // Iniciar el reconocimiento de voz
    recognition.start();
} else {
    // Si no hay soporte para reconocimiento de voz
    console.error('El reconocimiento de voz no está soportado en este navegador.');
}
