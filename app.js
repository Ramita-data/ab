// Simple Phaser Game Setup
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight * 0.7,
  backgroundColor: '#0b0920',
  parent: 'phaser-root',
  scene: { preload, create, update },
  scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH }
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  const text = this.add.text(50, 50, '💜 DreamPop Therapy 💜', {
    font: '32px Arial',
    fill: '#8b7cff'
  });
  text.setInteractive();
  text.on('pointerdown', () => {
    beep();
  });
}

function update() {}

// Soft chime sound when clicked
function beep(freq = 440, dur = 0.08) {
  try {
    const ctx = window.__dp_audio_ctx || (window.__dp_audio_ctx = new (window.AudioContext || window.webkitAudioContext)());
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.value = 0.02;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    setTimeout(() => {
      o.stop();
      o.disconnect();
      g.disconnect();
    }, dur * 1000 + 50);
  } catch (e) {
    console.warn('Audio not supported yet.');
  }
}
