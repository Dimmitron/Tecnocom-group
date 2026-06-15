// ==========================================
// PORTFOLIO PAGE JAVASCRIPT
// ==========================================

"use strict";

// ==========================================
// Portfolio Filter
// ==========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter items
      portfolioItems.forEach((item, index) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          setTimeout(() => {
            item.style.display = "block";
            setTimeout(() => item.classList.remove("hidden"), 10);
          }, index * 50);
        } else {
          item.classList.add("hidden");
          setTimeout(() => {
            if (item.classList.contains("hidden")) {
              item.style.display = "none";
            }
          }, 300);
        }
      });
    });
  });
}

// ==========================================
// Portfolio Modal
// ==========================================

const portfolioModal = document.getElementById("portfolioModal");

// Portfolio projects data
const projectsData = {
  1: {
    title: 'Офисный центр "Астрахань-Сити"',
    date: "15 января 2024",
    category: "Офисы",
    description:
      "Комплексный проект по установке системы видеонаблюдения и структурированной кабельной системы в современном офисном центре. Установлено 24 IP-камеры с разрешением 4 Мп, обеспечивающие полное покрытие всех этажей и прилегающей территории.",
    specs: [
      "24 IP-камеры Hikvision 4 Мп",
      "Видеорегистратор NVR на 32 канала",
      "HDD 8 Тб для записи",
      "Прокладка 500 м витой пары Cat6",
      "Структурированная кабельная система",
      "Удаленный доступ через мобильное приложение",
    ],
    tech: [
      { name: "IP-камеры", model: "Hikvision DS-2CD2143G0-I" },
      { name: "Видеорегистратор", model: "Hikvision DS-7732NI-I4" },
      { name: "Коммутатор PoE", model: "Cisco SG350-28P" },
      { name: "Кабель", model: "UTP Cat6 LSZH" },
    ],
    images: [
      "images/examples/city-1.jpg",
      "images/portfolio/city-2.jpg",
      "images/portfolio/office-1-3.jpg",
    ],
  },
  2: {
    title: 'Бизнес-центр "Волга"',
    date: "22 декабря 2023",
    category: "Офисы",
    description:
      "Построение комплексной сетевой инфраструктуры для 10-этажного бизнес-центра с возможностью обслуживания более 200 рабочих мест.",
    specs: [
      "СКС на 200 портов",
      "Wi-Fi покрытие всего здания",
      "15 точек доступа Ubiquiti",
      "Серверная стойка 42U",
      "Резервное питание UPS",
      "Система мониторинга сети",
    ],
    tech: [
      { name: "Точки доступа", model: "Ubiquiti UniFi 6 Pro" },
      { name: "Коммутаторы", model: "Cisco Catalyst 2960-X" },
      { name: "Серверная стойка", model: "APC NetShelter SX 42U" },
      { name: "UPS", model: "APC Smart-UPS 3000" },
    ],
    images: [
      "images/portfolio/ast-volga-1.jpg",
      "images/portfolio/ast-volga-2.jpg",
    ],
  },
  3: {
    title: 'Складской комплекс "Логистика+"',
    date: "10 ноября 2023",
    category: "Склады",
    description:
      "Система видеонаблюдения для контроля периметра и внутренних помещений складского комплекса площадью 5000 м².",
    specs: [
      "32 IP-камеры (16 внутренних, 16 уличных)",
      "Видеоаналитика периметра",
      "Детекция движения",
      "Прожекторная подсветка",
      "Запись 30 дней",
      "Интеграция с СКУД",
    ],
    tech: [
      { name: "Уличные камеры", model: "Dahua IPC-HFW5442E-ZE" },
      { name: "Внутренние камеры", model: "Hikvision DS-2CD2343G0-I" },
      { name: "NVR", model: "Dahua NVR5432-4KS2" },
      { name: "HDD", model: "Seagate SkyHawk 12TB x2" },
    ],
    images: [
      "images/portfolio/warehouse-1.jpg",
      "images/portfolio/warehouse-1-2.jpg",
      "images/portfolio/warehouse-1-3.jpg",
    ],
  },
  // Add more projects as needed
};

const openPortfolioModal = (projectId) => {
  const project = projectsData[projectId];
  if (!project || !portfolioModal) return;

  // Update modal content
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDate").textContent = project.date;
  document.getElementById("modalCategory").textContent = project.category;
  document.getElementById("modalDescription").textContent = project.description;

  // Update main image
  const mainImage = document.getElementById("modalMainImage");
  mainImage.src = project.images[0];
  mainImage.alt = project.title;

  // Update thumbnails
  const thumbnails = document.getElementById("modalThumbnails");
  thumbnails.innerHTML = "";
  project.images.forEach((image, index) => {
    const thumb = document.createElement("img");
    thumb.src = image;
    thumb.alt = `${project.title} - ${index + 1}`;
    if (index === 0) thumb.classList.add("active");
    thumb.addEventListener("click", () => {
      mainImage.src = image;
      thumbnails
        .querySelectorAll("img")
        .forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
    thumbnails.appendChild(thumb);
  });

  // Update specs
  const specsList = document.getElementById("modalSpecs");
  specsList.innerHTML = "";
  project.specs.forEach((spec) => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fas fa-check"></i> ${spec}`;
    specsList.appendChild(li);
  });

  // Update tech
  const techDiv = document.getElementById("modalTech");
  techDiv.innerHTML = "";
  project.tech.forEach((item) => {
    const techItem = document.createElement("div");
    techItem.style.cssText =
      "margin-bottom: 0.75rem; padding: 0.75rem; background: var(--light-color); border-radius: 6px;";
    techItem.innerHTML = `
            <strong style="color: var(--primary-color);">${item.name}:</strong>
            <span style="color: var(--gray-color);">${item.model}</span>
        `;
    techDiv.appendChild(techItem);
  });

  // Show modal
  portfolioModal.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closePortfolioModal = () => {
  if (portfolioModal) {
    portfolioModal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && portfolioModal?.classList.contains("active")) {
    closePortfolioModal();
  }
});

// Export functions
window.openPortfolioModal = openPortfolioModal;
window.closePortfolioModal = closePortfolioModal;

// ==========================================
// Load More Functionality
// ==========================================

const loadMoreBtn = document.getElementById("loadMore");
let currentItems = 9;

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    const hiddenItems = Array.from(portfolioItems).slice(
      currentItems,
      currentItems + 6,
    );

    hiddenItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.display = "block";
        setTimeout(() => item.classList.remove("hidden"), 10);
      }, index * 100);
    });

    currentItems += 6;

    if (currentItems >= portfolioItems.length) {
      loadMoreBtn.style.display = "none";
    }
  });
}
