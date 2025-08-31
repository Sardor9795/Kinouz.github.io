// Particle background (basic animation)
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = '-1';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    size: 2 + Math.random() * 2
  }));
  function drawParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // Fetch movies from backend and render
  fetch('/api/movies')
    .then(res => res.json())
    .then(movies => {
      const list = document.getElementById('movie-list');
      list.innerHTML = '';
      movies.forEach(m => {
        const div = document.createElement('div');
        div.className = 'movie-card';
        div.innerHTML = `<img src="img/poster.svg" alt="${m.title}"><h3>${m.title}</h3>`;
        list.appendChild(div);
      });
    });

  // Search filter (front-end)
  document.getElementById('search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.movie-card').forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = title.includes(q) ? '' : 'none';
    });
  });
});
