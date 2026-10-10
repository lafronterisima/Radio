// ============================================
// SISTEMA DE VOTACIÓN CON SUPABASE
// ============================================
const SUPABASE_URL = "https://cnwsdsjbbircvgumenpi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNud3Nkc2piYmlyY3ZndW1lbnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NDUzNjcsImV4cCI6MjEwNzIyMTM2N30.DwBPv6yLMu692TvjEtK13dIr7vsorkVyDYfozIYfZek";
const VOTE_FUNCTION_URL = "https://cnwsdsjbbircvgumenpi.supabase.co/functions/v1/vote";

const ARTISTAS_VALIDOS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let supabaseClient = null;
if (typeof supabase !== "undefined") {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.error("❌ SDK de Supabase no cargado. Agrega <script src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'></script> ANTES de vote.js");
}

// ============================================
// CARGAR VOTOS
// ============================================
async function cargarVotos() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from("votos").select("artista_id");
    if (error) throw error;

    const conteo = {};
    ARTISTAS_VALIDOS.forEach((id) => (conteo[id] = 0));
    (data || []).forEach((voto) => {
      if (conteo[voto.artista_id] !== undefined) conteo[voto.artista_id]++;
    });

    ARTISTAS_VALIDOS.forEach((id) => {
      const span = document.getElementById(`vote-${id}`);
      if (span) {
        span.textContent = `${conteo[id]} ${conteo[id] === 1 ? "voto" : "votos"}`;
      }
    });
  } catch (err) {
    console.error("Error al cargar votos:", err);
  }
}

// ============================================
// REGISTRAR VOTO
// ============================================
async function registrarVoto(artistaId, boton) {
  boton.disabled = true;
  const spanCount = boton.querySelector(".vote-count");
  const textoOriginal = spanCount.textContent;
  spanCount.textContent = "Enviando...";

  try {
    const respuesta = await fetch(VOTE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ artista_id: artistaId }),
    });

    console.log("Status HTTP:", respuesta.status);
    const resultado = await respuesta.json();
    console.log("Respuesta:", resultado);

    if (resultado.ok) {
      spanCount.textContent = `${resultado.total} ${resultado.total === 1 ? "voto" : "votos"}`;
      mostrarMensaje(artistaId, "✅ ¡Voto registrado!", "verde");
      boton.disabled = true;
      boton.style.opacity = "0.6";
      boton.style.cursor = "not-allowed";
    } else {
      spanCount.textContent = textoOriginal;
      mostrarMensaje(artistaId, "⚠️ " + (resultado.mensaje || resultado.error), "naranja");
      boton.disabled = false;
    }
  } catch (err) {
    console.error("Error al votar:", err);
    spanCount.textContent = textoOriginal;
    mostrarMensaje(artistaId, "❌ Error de conexión", "rojo");
    boton.disabled = false;
  }
}

// ============================================
// MOSTRAR MENSAJE
// ============================================
function mostrarMensaje(artistaId, texto, color) {
  const li = document.getElementById(`artist-${artistaId}`);
  if (!li) return;
  const mensajeDiv = li.querySelector("#mensaje");
  if (!mensajeDiv) return;

  mensajeDiv.textContent = texto;
  mensajeDiv.style.marginTop = "8px";
  mensajeDiv.style.fontSize = "14px";
  mensajeDiv.style.fontWeight = "600";
  mensajeDiv.style.color = color === "verde" ? "#16a34a" : color === "naranja" ? "#ea580c" : "#dc2626";

  clearTimeout(mensajeDiv._timeout);
  mensajeDiv._timeout = setTimeout(() => { mensajeDiv.textContent = ""; }, 4000);
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  cargarVotos();
  document.querySelectorAll(".vote-button").forEach((boton) => {
    boton.addEventListener("click", () => {
      const artistaId = parseInt(boton.dataset.artist, 10);
      if (!ARTISTAS_VALIDOS.includes(artistaId)) return;
      registrarVoto(artistaId, boton);
    });
  });
});