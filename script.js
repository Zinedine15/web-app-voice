let miVentana = null;
let miVentana2 = null;

let textCc = ''; //Variable que guardará el comando detectado
let resultado = ''; //Variable que guardará el resultado de la detección de voz

// Función para obtener la hora del sistema
function obtenerHoraDelSistema() {
  // Obtener la fecha y hora actual
  var fechaHoraActual = new Date();

  // Extraer la hora, minutos y segundos
  var hora = fechaHoraActual.getHours();
  var minutos = fechaHoraActual.getMinutes();
  var segundos = fechaHoraActual.getSeconds();

  // Formatear la hora en formato HH:MM:SS
  var horaFormateada = hora + ":" + minutos + ":" + segundos;

  // Devolver la hora formateada
  return horaFormateada;
}

// Verificar si el navegador soporta reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    const resultDiv = document.getElementById('result');

    recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz

    // Evento cuando la voz es detectada
    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript; // Obtener el texto reconocido

        resultado = result;
        resultDiv.textContent = 'Orden identificada: ' + resultado;
        console.log("Comando Detectado: ", resultado);

        const kw1 = 'pestaña nueva';
        const kw2 = 'la cuerda';
        const kw3 = 'tamaño pequeño';
        const kw4 = 'Abre YouTube';
        const kw5 = 'cierra navegador';
        const kw6 = 'página del tec';

        if (result.includes(kw1)) {
            // Obtener el texto reconocido
            textCc = kw1;
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw2)) {
            // Obtener el texto reconocido
            textCc = kw2;
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw3)) {
            // Obtener el texto reconocido
            textCc = kw3;
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw4)) {
            // Obtener el texto reconocido
            textCc = kw4;
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw5)) {
            // Obtener el texto reconocido
            textCc = kw5;
            enviarDatosAMockAPI(textCc);
        } else if (result.includes(kw6)) {
            // Obtener el texto reconocido
            textCc = kw6;
            enviarDatosAMockAPI(textCc);
        }
        else {
            resultDiv.textContent = "No se detecto el comando";
        }

        function enviarDatosAMockAPI(textCc) {
            const apiUrl = "https://6604c6232ca9478ea17e7e32.mockapi.io/ComandosDetectados";
        
            const datos = {
                textoComando: textCc,
                horaSistema: obtenerHoraDelSistema() // Agregar la hora del sistema
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

    // Iniciar el reconocimiento de voz
    recognition.start();

    // Evento para detectar la palabra clave y activar el reconocimiento de voz
    recognition.onend = function() {
        console.log("Reconocimiento de voz terminado. Reiniciando...");
        recognition.start(); // Reinicia el reconocimiento de voz después de cada detección
    };
} else {
    // Si no hay soporte para reconocimiento de voz
    console.error('El reconocimiento de voz no está soportado en este navegador.');
}
