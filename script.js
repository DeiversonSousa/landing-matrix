const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let columns = [];
let fontSize = 18;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns.length = 0;

  const columnsCount = Math.ceil(canvas.width / fontSize);
  for (let i = 0; i < columnsCount; i++) {
    columns.push(Math.random() * -100);
  }
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(1, 10, 8, 0.16)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < columns.length; i++) {
    const glyphs = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*+-=<>/';
    const char = glyphs[Math.floor(Math.random() * glyphs.length)];
    const x = i * fontSize;
    const y = columns[i] * fontSize;

    const brightness = Math.random() > 0.92 ? 'rgba(255,255,255,1)' : 'rgba(57,255,20,0.95)';
    ctx.fillStyle = brightness;
    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      columns[i] = 0;
    }

    columns[i] += 0.78;
  }
}

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (!targetId || !targetId.startsWith('#')) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', targetId);
  });
});

resizeCanvas();
setInterval(drawMatrix, 32);
window.addEventListener('resize', resizeCanvas);
