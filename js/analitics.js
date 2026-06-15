// ==========================================
// ANALYTICS & TRACKING
// ==========================================

"use strict";

// ==========================================
// Custom Event Tracking
// ==========================================

const trackEvent = (category, action, label = "", value = 0) => {
  // Google Analytics (gtag.js)
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Yandex Metrika
  if (typeof ym !== "undefined") {
    ym(12345678, "reachGoal", action, {
      category: category,
      label: label,
      value: value,
    });
  }

  console.log("Event tracked:", { category, action, label, value });
};

// ==========================================
// Form Submission Tracking
// ==========================================

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    const formName = form.id || form.className;
    trackEvent("Form", "submit", formName);
  });
});

// ==========================================
// Button Click Tracking
// ==========================================

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent.trim();
    trackEvent("Button", "click", buttonText);
  });
});

// ==========================================
// Phone Click Tracking
// ==========================================

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", () => {
    const phone = link.getAttribute("href").replace("tel:", "");
    trackEvent("Contact", "phone_click", phone);
  });
});

// ==========================================
// Email Click Tracking
// ==========================================

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", () => {
    const email = link.getAttribute("href").replace("mailto:", "");
    trackEvent("Contact", "email_click", email);
  });
});

// ==========================================
// Scroll Depth Tracking
// ==========================================

let scrollDepths = [25, 50, 75, 100];
let scrollTracked = [];

window.addEventListener("scroll", () => {
  const scrollPercent = Math.round(
    (window.pageYOffset /
      (document.documentElement.scrollHeight - window.innerHeight)) *
      100,
  );

  scrollDepths.forEach((depth) => {
    if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
      trackEvent("Scroll", "depth", `${depth}%`, depth);
      scrollTracked.push(depth);
    }
  });
});

// ==========================================
// Time on Page Tracking
// ==========================================

let timeOnPage = 0;
const timeInterval = setInterval(() => {
  timeOnPage += 10;

  // Track every 30 seconds
  if (timeOnPage % 30 === 0) {
    trackEvent("Engagement", "time_on_page", `${timeOnPage}s`, timeOnPage);
  }
}, 10000);

// Clear interval on page unload
window.addEventListener("beforeunload", () => {
  clearInterval(timeInterval);
  trackEvent("Engagement", "total_time", `${timeOnPage}s`, timeOnPage);
});

// ==========================================
// Outbound Link Tracking
// ==========================================

document.querySelectorAll('a[href^="http"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const url = link.getAttribute("href");
    if (!url.includes(window.location.hostname)) {
      trackEvent("Outbound", "click", url);
    }
  });
});

// ==========================================
// Download Tracking
// ==========================================

document
  .querySelectorAll(
    'a[download], a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"]',
  )
  .forEach((link) => {
    link.addEventListener("click", () => {
      const filename = link.getAttribute("href").split("/").pop();
      trackEvent("Download", "file", filename);
    });
  });

// ==========================================
// Error Tracking
// ==========================================

window.addEventListener("error", (e) => {
  trackEvent("Error", "js_error", e.message, 0);
});

// ==========================================
// Page Performance Tracking
// ==========================================

window.addEventListener("load", () => {
  setTimeout(() => {
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

      trackEvent(
        "Performance",
        "page_load_time",
        "",
        Math.round(pageLoadTime / 1000),
      );
    }
  }, 0);
});
