// ==========================================
// MAIN JAVASCRIPT FILE
// ==========================================

"use strict";

// ==========================================
// DOM Elements
// ==========================================

const header = document.getElementById("header");
const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");
const modal = document.getElementById("consultModal");

// ==========================================
// Header Scroll Effect
// ==========================================

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class for shadow effect
  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ==========================================
// Mobile Menu Toggle
// ==========================================

if (burger && navMenu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
      burger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href !== "#" && href !== "") {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  });
});

// ==========================================
// Scroll Reveal Animation
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

document.querySelectorAll(".scroll-reveal").forEach((el) => {
  observer.observe(el);
});

// ==========================================
// Counter Animation for Stats
// ==========================================

const animateCounter = (element, target, duration = 2000) => {
  let current = 0;
  const increment = target / (duration / 16);
  const isCurrency = element.textContent.includes("₽");

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString("ru-RU");
      if (isCurrency) element.textContent += " ₽";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString("ru-RU");
      if (isCurrency) element.textContent += " ₽";
    }
  };

  updateCounter();
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        animateCounter(entry.target, target);
        entry.target.classList.add("counted");
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stat-number").forEach((stat) => {
  statsObserver.observe(stat);
});

// ==========================================
// Portfolio Slider
// ==========================================

const portfolioSlider = document.getElementById("portfolioSlider");
const sliderDots = document.getElementById("sliderDots");

if (portfolioSlider) {
  const slides = portfolioSlider.querySelectorAll(".portfolio-slide");
  let currentSlide = 0;

  // Create dots
  if (sliderDots) {
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      sliderDots.appendChild(dot);
    });
  }

  const goToSlide = (n) => {
    currentSlide = n;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    portfolioSlider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    if (sliderDots) {
      sliderDots.querySelectorAll(".slider-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }
  };

  // Navigation buttons
  document.querySelector(".slider-prev")?.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
  });

  document.querySelector(".slider-next")?.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
  });

  // Auto slide
  let autoSlideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);

  // Pause on hover
  portfolioSlider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  portfolioSlider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  });
}

// ==========================================
// Testimonials Slider Clone for Infinite Loop
// ==========================================

const testimonialTrack = document.getElementById("testimonialTrack");

if (testimonialTrack) {
  const testimonials = testimonialTrack.innerHTML;
  testimonialTrack.innerHTML += testimonials + testimonials;
}

// ==========================================
// Modal Functions
// ==========================================

const openModal = () => {
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

const closeModal = () => {
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("active")) {
    closeModal();
  }
});

// ==========================================
// Form Validation and Submission
// ==========================================

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^[\d\s\+\-\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

// Phone input mask
const phoneMask = (input) => {
  let value = input.value.replace(/\D/g, "");

  if (value.length > 0) {
    if (value[0] === "7") value = value.substring(1);
    if (value[0] === "8") value = value.substring(1);

    let formatted = "+7";
    if (value.length > 0) formatted += " (" + value.substring(0, 3);
    if (value.length >= 3) formatted += ") " + value.substring(3, 6);
    if (value.length >= 6) formatted += "-" + value.substring(6, 8);
    if (value.length >= 8) formatted += "-" + value.substring(8, 10);

    input.value = formatted;
  }
};

// Apply phone mask to all phone inputs
document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener("input", () => phoneMask(input));
  input.addEventListener("focus", () => {
    if (!input.value) input.value = "+7 ";
  });
});

// Form submission handler
const handleFormSubmit = (form, e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Validate
  let isValid = true;
  const errors = [];

  if (data.name && data.name.length < 2) {
    errors.push("Имя должно содержать минимум 2 символа");
    isValid = false;
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push("Неверный формат телефона");
    isValid = false;
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push("Неверный формат email");
    isValid = false;
  }

  if (!isValid) {
    alert("Ошибка:\n" + errors.join("\n"));
    return;
  }

  // Simulate form submission
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';

  // Simulate API call
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (modal?.classList.contains("active")) {
        closeModal();
      }

      // Show success message
      showNotification(
        "Спасибо! Мы свяжемся с вами в ближайшее время.",
        "success",
      );
    }, 2000);
  }, 1500);
};

// Attach form handlers
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => handleFormSubmit(form, e));
});

// ==========================================
// Notification System
// ==========================================

const showNotification = (message, type = "info") => {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}" style="font-size: 1.5rem;"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
};

// Add animation styles
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Back to Top Button
// ==========================================

const createBackToTop = () => {
  const button = document.createElement("button");
  button.className = "back-to-top";
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb, #1e40af);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
    button.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  });

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.display = "flex";
    } else {
      button.style.display = "none";
    }
  });
};

createBackToTop();

// ==========================================
// Lazy Loading Images
// ==========================================

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ==========================================
// Page Load Performance
// ==========================================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Remove preloader if exists
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => preloader.remove(), 300);
    }, 500);
  }
});

// ==========================================
// Cookie Consent (Optional)
// ==========================================

const showCookieConsent = () => {
  if (!localStorage.getItem("cookieConsent")) {
    const consent = document.createElement("div");
    consent.className = "cookie-consent";
    consent.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1f2937;
            color: white;
            padding: 1.5rem;
            z-index: 10000;
            box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
            animation: slideInUp 0.3s ease;
        `;

    consent.innerHTML = `
            <div class="container" style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap;">
                <p style="margin: 0;">Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с <a href="#" style="color: #3b82f6; text-decoration: underline;">политикой конфиденциальности</a>.</p>
                <button id="acceptCookies" class="btn btn-primary">Принять</button>
            </div>
        `;

    document.body.appendChild(consent);

    document.getElementById("acceptCookies").addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "true");
      consent.style.animation = "slideOutDown 0.3s ease";
      setTimeout(() => consent.remove(), 300);
    });
  }
};

const addCookieAnimation = () => {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
            }
            to {
                transform: translateY(0);
            }
        }
        
        @keyframes slideOutDown {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(100%);
            }
        }
    `;
  document.head.appendChild(style);
};

addCookieAnimation();
setTimeout(showCookieConsent, 2000);

// ==========================================
// Preloader (Optional)
// ==========================================

const createPreloader = () => {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.3s ease;
    `;

  preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; border: 4px solid #e5e7eb; border-top-color: #2563eb; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 1rem; color: #6b7280; font-weight: 600;">Загрузка...</p>
        </div>
    `;

  const spinStyle = document.createElement("style");
  spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(spinStyle);

  document.body.insertBefore(preloader, document.body.firstChild);
};

// Uncomment to enable preloader
// createPreloader();

// ==========================================
// Console Message
// ==========================================

console.log(
  "%cNetSecure",
  "font-size: 24px; font-weight: bold; color: #2563eb;",
);
console.log(
  "%cУстановка видеонаблюдения и сетевого оборудования в Астрахани",
  "font-size: 14px; color: #6b7280;",
);
console.log("%c📞 +7 (851) 234-56-78", "font-size: 14px; color: #10b981;");

// ==========================================
// Export functions for global use
// ==========================================

window.openModal = openModal;
window.closeModal = closeModal;
window.showNotification = showNotification;
