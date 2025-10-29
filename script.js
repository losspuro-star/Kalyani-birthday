let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentX = 0;
  currentY = 0;

  init(paper) {
    paper.style.transform = `rotateZ(${this.rotation}deg)`;

    paper.addEventListener('pointerdown', (e) => {
      this.holdingPaper = true;
      paper.setPointerCapture(e.pointerId);
      paper.style.zIndex = highestZ++;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    paper.addEventListener('pointermove', (e) => {
      if (!this.holdingPaper) return;

      this.velX = e.clientX - this.prevX;
      this.velY = e.clientY - this.prevY;

      this.currentX += this.velX;
      this.currentY += this.velY;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener('pointerup', () => {
      this.holdingPaper = false;
    });
  }
}

document.querySelectorAll('.paper').forEach(paper => {
  new Paper().init(paper);
});
