 <script>

  const firebaseConfig = {
   apiKey: "AIzaSyAgxaOSHo85FFSG7SnuXGBkpA6GjfgQvjw",
   authDomain: "artistas-b908e.firebaseapp.com",
   projectId: "artistas-b908e",
   storageBucket: "artistas-b908e.appspot.com",
   messagingSenderId: "797108216415",
   appId: "1:797108216415:web:6d5806905d1f97aeb4f1ea"

  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

  // Referencia a la base de datos de Firebase
  const database = firebase.database();

  // Función para manejar el clic en el botón de votar
  function handleVote(artistId) {
    const artistRef = database.ref(`artistas/${artistId}/votos`);
    
    // Obtener el valor actual de votos
    artistRef.once('value', (snapshot) => {
      let votos = snapshot.val() || 0; // Si no hay datos, inicializar en 0
      
      // Incrementar el contador de votos
      votos++;

      // Actualizar la base de datos con el nuevo valor
      artistRef.set(votos);

      // Actualizar la UI (opcional, dependiendo de cómo quieras mostrarlo)
      const votosElement = document.getElementById(artistId);
      if (votosElement) {
        votosElement.textContent = `${votos} votos`;
      }
    });
  }

  // Función para inicializar los votos desde la base de datos (opcional)
  function initVotes() {
    const artistIds = ['Georgy Cañas', 'Cly&Beyr', 'pentagrama', 'Las Indomables', 'Los Federales', 
	        'Yo me llamo Alzate', 'Pedro Vidal-Latín Show', 'Huberth Montero', 'Genesis Internacional'];

    artistIds.forEach(artistId => {
      const artistRef = database.ref(`artistas/${artistId}/votos`);

      artistRef.once('value', (snapshot) => {
        const votos = snapshot.val() || 0;
        const votosElement = document.getElementById(artistId);
        if (votosElement) {
          votosElement.textContent = `${votos} votos`;
        }
      });
    });
  }

  // Llamar a la función para inicializar los votos al cargar la página
  window.onload = initVotes;
</script>
