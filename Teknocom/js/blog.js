// ==========================================
// BLOG PAGE JAVASCRIPT
// ==========================================

"use strict";

// ==========================================
// Blog Filter
// ==========================================

const categoryButtons = document.querySelectorAll(".category-btn");
const blogPosts = document.querySelectorAll(".blog-post-card");

if (categoryButtons.length > 0) {
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter posts
      blogPosts.forEach((post, index) => {
        const postCategory = post.getAttribute("data-category");

        if (category === "all" || postCategory === category) {
          setTimeout(() => {
            post.style.display = "grid";
            setTimeout(() => (post.style.opacity = "1"), 10);
          }, index * 50);
        } else {
          post.style.opacity = "0";
          setTimeout(() => {
            post.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// ==========================================
// Search Functionality
// ==========================================

const searchForm = document.querySelector(".search-form");
const searchInput = searchForm?.querySelector("input");

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();

    if (query.length < 2) {
      showNotification("Введите минимум 2 символа для поиска", "error");
      return;
    }

    let foundCount = 0;

    blogPosts.forEach((post) => {
      const title = post.querySelector("h3").textContent.toLowerCase();
      const text = post.querySelector("p").textContent.toLowerCase();

      if (title.includes(query) || text.includes(query)) {
        post.style.display = "grid";
        post.style.opacity = "1";
        foundCount++;
      } else {
        post.style.display = "none";
      }
    });

    if (foundCount === 0) {
      showNotification("По вашему запросу ничего не найдено", "error");
    } else {
      showNotification(`Найдено статей: ${foundCount}`, "success");
    }
  });
}

// ==========================================
// Newsletter Subscription
// ==========================================

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showNotification("Пожалуйста, введите корректный email", "error");
      return;
    }

    // Simulate subscription
    const button = newsletterForm.querySelector("button");
    const originalText = button.textContent;

    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Подписка...';

    setTimeout(() => {
      emailInput.value = "";
      button.disabled = false;
      button.textContent = originalText;
      showNotification("Спасибо за подписку! Проверьте вашу почту.", "success");
    }, 1500);
  });
}

// ==========================================
// Reading Time Calculation
// ==========================================

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
};

// Add reading time to posts
document.querySelectorAll(".blog-post-card").forEach((post) => {
  const text = post.querySelector("p")?.textContent || "";
  const readingTime = calculateReadingTime(text);
  const meta = post.querySelector(".post-meta");

  if (meta && !meta.querySelector(".reading-time")) {
    const timeSpan = document.createElement("span");
    timeSpan.className = "reading-time";
    timeSpan.innerHTML = `<i class="far fa-clock"></i> ${readingTime} мин`;
    meta.appendChild(timeSpan);
  }
});

// ==========================================
// Social Share Buttons
// ==========================================

const createShareButtons = () => {
  const shareContainer = document.createElement("div");
  shareContainer.className = "social-share";
  shareContainer.style.cssText = `
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 100;
    `;

  const shareButtons = [
    {
      name: "VK",
      icon: "fab fa-vk",
      color: "#4680C2",
      url: "https://vk.com/share.php?url=",
    },
    {
      name: "Telegram",
      icon: "fab fa-telegram",
      color: "#0088cc",
      url: "https://t.me/share/url?url=",
    },
    {
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      color: "#25D366",
      url: "https://wa.me/?text=",
    },
  ];

  shareButtons.forEach((button) => {
    const btn = document.createElement("a");
    btn.href = button.url + encodeURIComponent(window.location.href);
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.style.cssText = `
            width: 45px;
            height: 45px;
            background: ${button.color};
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        `;
    btn.innerHTML = `<i class="${button.icon}"></i>`;

    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.1)";
      btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
      btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
    });

    shareContainer.appendChild(btn);
  });

  // Only show on blog post pages
  if (window.location.pathname.includes("blog-post.html")) {
    document.body.appendChild(shareContainer);

    // Hide on mobile
    if (window.innerWidth < 768) {
      shareContainer.style.display = "none";
    }
  }
};

createShareButtons();

// ==========================================
// Related Posts
// ==========================================

const showRelatedPosts = (currentCategory) => {
  const relatedContainer = document.querySelector(".related-posts");
  if (!relatedContainer) return;

  const allPosts = Array.from(blogPosts);
  const relatedPosts = allPosts
    .filter((post) => post.getAttribute("data-category") === currentCategory)
    .slice(0, 3);

  if (relatedPosts.length > 0) {
    relatedContainer.innerHTML = "<h3>Похожие статьи</h3>";
    relatedPosts.forEach((post) => {
      relatedContainer.appendChild(post.cloneNode(true));
    });
  }
};
