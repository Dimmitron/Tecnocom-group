// ==========================================
// ADVANCED ANIMATIONS
// ==========================================

"use strict";

// ==========================================
// Parallax Effect
// ==========================================

const parallaxElements = document.querySelectorAll("[data-parallax]");

if (parallaxElements.length > 0) {
  window.addEventListener("scroll", () => {
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-parallax") || 0.5;
      const yPos = -(window.pageYOffset * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ==========================================
// Typing Effect
// ==========================================

class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = `<span class="txt">${this.txt}</span><span class="cursor">|</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typewriter
const typeWriterElement = document.querySelector(".typewriter");
if (typeWriterElement) {
  const words = JSON.parse(
    typeWriterElement.getAttribute("data-words") || "[]",
  );
  if (words.length > 0) {
    new TypeWriter(typeWriterElement, words);
  }
}

// Add typewriter CSS
const typeWriterStyle = document.createElement("style");
typeWriterStyle.textContent = `
    .typewriter .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(typeWriterStyle);

// ==========================================
// Number Counter with Intersection Observer
// ==========================================

class NumberCounter {
  constructor(element, options = {}) {
    this.element = element;
    this.target = parseInt(element.getAttribute("data-target")) || 0;
    this.duration = options.duration || 2000;
    this.separator = options.separator || " ";
    this.suffix = options.suffix || "";
    this.prefix = options.prefix || "";
  }

  animate() {
    const startTime = performance.now();
    const start = 0;
    const end = this.target;

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      this.element.textContent =
        this.prefix +
        current.toLocaleString("ru-RU").replace(/,/g, this.separator) +
        this.suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}

// ==========================================
// Particles Background
// ==========================================

class ParticlesBackground {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 50;

    this.init();
  }

  init() {
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "0";

    this.container.style.position = "relative";
    this.container.insertBefore(this.canvas, this.container.firstChild);

    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      this.ctx.fill();

      // Draw connections
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particles on hero section
const heroSection = document.querySelector(".hero");
if (heroSection) {
  new ParticlesBackground(heroSection);
}

// ==========================================
// Magnetic Button Effect
// ==========================================

const magneticButtons = document.querySelectorAll(".btn-magnetic");

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

// ==========================================
// Text Reveal Animation
// ==========================================

class TextReveal {
  constructor(element) {
    this.element = element;
    this.text = element.textContent;
    this.element.textContent = "";
    this.reveal();
  }

  reveal() {
    const words = this.text.split(" ");

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
      this.element.appendChild(span);
    });
  }
}

// Initialize text reveal
document.querySelectorAll(".text-reveal").forEach((element) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        new TextReveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(element);
});

// ==========================================
// Image Comparison Slider
// ==========================================

class ImageComparison {
  constructor(container) {
    this.container = container;
    this.slider = container.querySelector(".comparison-slider");
    this.beforeImage = container.querySelector(".before-image");
    this.isDragging = false;

    this.init();
  }

  init() {
    this.slider.addEventListener("mousedown", () => (this.isDragging = true));
    document.addEventListener("mouseup", () => (this.isDragging = false));
    document.addEventListener("mousemove", (e) => this.slide(e));

    this.slider.addEventListener("touchstart", () => (this.isDragging = true));
    document.addEventListener("touchend", () => (this.isDragging = false));
    document.addEventListener("touchmove", (e) => this.slide(e.touches[0]));
  }

  slide(e) {
    if (!this.isDragging) return;

    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    if (percentage >= 0 && percentage <= 100) {
      this.beforeImage.style.width = percentage + "%";
      this.slider.style.left = percentage + "%";
    }
  }
}

// Initialize image comparisons
document.querySelectorAll(".image-comparison").forEach((container) => {
  new ImageComparison(container);
});

// ==========================================
// Progress Circle Animation
// ==========================================

class ProgressCircle {
  constructor(element) {
    this.element = element;
    this.circle = element.querySelector("circle");
    this.text = element.querySelector(".progress-text");
    this.percentage = parseInt(element.getAttribute("data-percentage")) || 0;
    this.radius = this.circle.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;

    this.init();
  }

  init() {
    this.circle.style.strokeDasharray = this.circumference;
    this.circle.style.strokeDashoffset = this.circumference;
  }

  animate() {
    const offset =
      this.circumference - (this.percentage / 100) * this.circumference;
    this.circle.style.strokeDashoffset = offset;

    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    const updateText = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      current = Math.floor(this.percentage * progress);

      this.text.textContent = current + "%";

      if (progress < 1) {
        requestAnimationFrame(updateText);
      }
    };

    requestAnimationFrame(updateText);
  }
}

// Initialize progress circles when visible
document.querySelectorAll(".progress-circle").forEach((element) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressCircle = new ProgressCircle(entry.target);
        progressCircle.animate();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(element);
});

// ==========================================
// Tilt Effect
// ==========================================

class TiltEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.maxTilt = options.maxTilt || 15;
    this.perspective = options.perspective || 1000;
    this.scale = options.scale || 1.05;
    this.speed = options.speed || 300;

    this.init();
  }

  init() {
    this.element.style.transformStyle = "preserve-3d";
    this.element.style.perspective = this.perspective + "px";

    this.element.addEventListener("mouseenter", () => {
      this.element.style.transition = `transform ${this.speed}ms ease-out`;
    });

    this.element.addEventListener("mousemove", (e) => this.handleMove(e));

    this.element.addEventListener("mouseleave", () => {
      this.element.style.transform = "";
    });
  }

  handleMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const tiltX = percentY * this.maxTilt;
    const tiltY = -percentX * this.maxTilt;

    this.element.style.transform = `
            perspective(${this.perspective}px)
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            scale3d(${this.scale}, ${this.scale}, ${this.scale})
        `;
  }
}

// Initialize tilt effect on cards
document.querySelectorAll(".tilt-card").forEach((element) => {
  new TiltEffect(element);
});
