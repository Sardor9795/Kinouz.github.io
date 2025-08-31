// === Particle fon avvalgi kod (o‘sha-o‘sha) ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1
    });
  }
}

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// === KINOLAR RO‘YXATINI YUKLASH VA FILTRLASH ===
let allMovies = [];

fetch('movies.json')
  .then(response => response.json())
  .then(movies => {
    allMovies = movies;
    renderMovies(movies);
  })
  .catch(err => console.error("Kino ro'yxatini yuklashda xatolik:", err));

function renderMovies(movies) {
  const moviesDiv = document.querySelector('.movies');
  if (movies.length === 0) {
    moviesDiv.innerHTML = "<p>Kino topilmadi 😢</p>";
    return;
  }
  moviesDiv.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
    </div>
  `).join('');
}

// === Qidiruv oynasi orqali filtr ===
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = allMovies.filter(m =>
    m.title.toLowerCase().includes(query)
  );
  renderMovies(filtered);
});
