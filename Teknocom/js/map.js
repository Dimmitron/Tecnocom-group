// ==========================================
// YANDEX MAPS INTEGRATION
// ==========================================

"use strict";

// ==========================================
// Initialize Map for Index Page
// ==========================================

function initMap() {
  if (typeof ymaps === "undefined") {
    console.warn("Yandex Maps API not loaded");
    return;
  }

  ymaps.ready(() => {
    const mapElement = document.getElementById("map");

    if (mapElement) {
      // Coordinates for Astrakhan
      const astrakhanCoords = [46.3477, 48.033];

      const map = new ymaps.Map("map", {
        center: astrakhanCoords,
        zoom: 11,
        controls: ["zoomControl", "fullscreenControl"],
      });

      // Office placemark
      const officePlacemark = new ymaps.Placemark(
        [46.3497, 48.035],
        {
          balloonContentHeader: "<strong>NetSecure</strong>",
          balloonContentBody:
            "г. Астрахань, ул. Ленина, д. 25, офис 304<br>Телефон: +7 (851) 234-56-78",
          balloonContentFooter: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
          hintContent: "Офис NetSecure",
        },
        {
          preset: "islands#blueDotIconWithCaption",
          iconColor: "#2563eb",
        },
      );

      map.geoObjects.add(officePlacemark);

      // Service area circle
      const serviceCircle = new ymaps.Circle(
        [astrakhanCoords, 50000], // 50km radius
        {},
        {
          fillColor: "#2563eb22",
          strokeColor: "#2563eb",
          strokeOpacity: 0.5,
          strokeWidth: 2,
        },
      );

      map.geoObjects.add(serviceCircle);

      // Disable scroll zoom
      map.behaviors.disable("scrollZoom");
    }
  });
}

// ==========================================
// Initialize Contact Map
// ==========================================

function initContactMap() {
  if (typeof ymaps === "undefined") {
    console.warn("Yandex Maps API not loaded");
    return;
  }

  ymaps.ready(() => {
    const contactMapElement = document.getElementById("contactMap");

    if (contactMapElement) {
      const officeCoords = [46.3497, 48.035];

      const contactMap = new ymaps.Map("contactMap", {
        center: officeCoords,
        zoom: 16,
        controls: ["zoomControl", "fullscreenControl", "routeButtonControl"],
      });

      const officePlacemark = new ymaps.Placemark(
        officeCoords,
        {
          balloonContentHeader:
            '<div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">NetSecure</div>',
          balloonContentBody: `
                        <div style="line-height: 1.6;">
                            <p><strong>Адрес:</strong> г. Астрахань, ул. Ленина, д. 25, офис 304</p>
                            <p><strong>Телефон:</strong> <a href="tel:+78512345678">+7 (851) 234-56-78</a></p>
                            <p><strong>Email:</strong> <a href="mailto:info@netsecure.ru">info@netsecure.ru</a></p>
                            <p><strong>Режим работы:</strong><br>Пн-Пт: 9:00-18:00<br>Сб: 10:00-15:00<br>Вс: выходной</p>
                        </div>
                    `,
          hintContent: "Нажмите для подробной информации",
        },
        {
          preset: "islands#blueOfficeIcon",
          iconColor: "#2563eb",
        },
      );

      contactMap.geoObjects.add(officePlacemark);

      // Auto-open balloon
      officePlacemark.balloon.open();
    }
  });
}

// Auto-initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initMap();
    initContactMap();
  });
} else {
  initMap();
  initContactMap();
}
