const controlTexto = document.getElementById('controlTexto');


// Verificar si el navegador soporta reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    const resultDiv = document.getElementById('result');
  
    recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz
  
    // Evento cuando la voz es detectada
    recognition.onresult = function(event) {
      const result = event.results[0][0].transcript; // Obtener el texto reconocido
      const keyword = 'Hola';
      resultDiv.textContent = 'Orden identificada: ' + result;
      
      // result.includes(word);

      if (result.includes(keyword)) {
        controlTexto.classList.add('fs-3');
        console.log("Se encontró la palabra");
      }
      else  console.log("No se encontró la palabra");
      
    };

    
  
    // Evento de error
    recognition.onerror = function(event) {
      console.error('Error de reconocimiento de voz:', event.error);
    };
  
    // Botón para iniciar el reconocimiento de voz
    const startButton = document.createElement('button');
    startButton.textContent = 'Iniciar Identificación por Voz';
    startButton.classList.add('btn', 'btn-primary', 'mt-3');
    startButton.onclick = function() {
      recognition.start();
    };
  
    // Añadir el botón al DOM
    document.body.appendChild(startButton);
  } else {
    // Si no hay soporte para reconocimiento de voz
    console.error('El reconocimiento de voz no está soportado en este navegador.');
  }
  