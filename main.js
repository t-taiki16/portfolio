// 🌌 星空キャンバスを作成して追加
const canvas = document.createElement('canvas');
canvas.id = 'star-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ⭐ 星データを生成
const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    alpha: Math.random(),
    alphaChange: (Math.random() * 0.02) - 0.01,
  });
}

// ✨ 星を描画＆明滅アニメーション
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();

    star.alpha += star.alphaChange;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.alphaChange *= -1;
    }
  }
  requestAnimationFrame(drawStars);
}
drawStars();

// 🌠 流れ星の生成
function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');

  const startX = Math.random() * window.innerWidth * 0.8;
  const startY = Math.random() * window.innerHeight * 0.5;
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  document.body.appendChild(star);
  star.addEventListener('animationend', () => star.remove());
}

// 🌸 ナビゲーション＆図形アニメーション（ロード後）
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // トップページ専用のアニメーション
  if (document.body.classList.contains('home-page')) {
    const ellipses = document.querySelectorAll('.ellipse');
    const centerCircle = document.querySelector('.center-circle');
    const clickText = document.querySelector('.click-text');
    const navLinks = document.querySelectorAll('.nav-link');

    setTimeout(() => ellipses[0].classList.add('ellipse1', 'animate'), 500);
    setTimeout(() => ellipses[1].classList.add('ellipse2', 'animate'), 1000);
    setTimeout(() => ellipses[2].classList.add('ellipse3', 'animate'), 1500);
    setTimeout(() => centerCircle.classList.add('animate'), 2200);
    setTimeout(() => clickText.classList.add('animate'), 2700);

    navLinks.forEach((link, i) => {
      setTimeout(() => link.classList.add('animate'), 3000 + i * 200);
    });
  }

  // ☄️ 流れ星を定期的に生成
  setInterval(() => {
    createShootingStar();
  }, 4000 + Math.random() * 4000); // 4〜8秒間隔
});


