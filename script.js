// Language switch, "Copy email" button, "Last updated" date, and the photo viewer.
(() => {
  const root = document.documentElement;
  const STORAGE_KEY = "site-language";

  // Short interface text that the script writes itself.
  const words = {
    en: {
      copy: "Copy email",
      copied: "Copied",
      copyFailed: "Couldn't copy. Select the address and copy it instead.",
      locale: "en-US",
    },
    es: {
      copy: "Copiar correo",
      copied: "Copiado",
      copyFailed: "No se pudo copiar. Selecciona la dirección y cópiala.",
      locale: "es-MX",
    },
  };

  function savedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Private browsing can block storage; the switch still works on this page.
    }
  }

  function refreshText() {
    const lang = root.dataset.ui;

    const title = document.querySelector("title");
    if (title) {
      if (!title.dataset.en) title.dataset.en = title.textContent;
      document.title = (lang === "es" && title.dataset.es) || title.dataset.en;
    }

    const copyButton = document.querySelector("[data-copy-email]");
    if (copyButton) copyButton.textContent = words[lang].copy;

    const lastUpdated = document.getElementById("last-updated");
    if (lastUpdated) {
      const modified = new Date(document.lastModified);
      if (!Number.isNaN(modified.getTime())) {
        lastUpdated.textContent = modified.toLocaleDateString(words[lang].locale, {
          year: "numeric",
          month: "long",
        });
      }
    }
  }

  function applyLanguage(lang) {
    root.dataset.ui = lang;
    root.lang = lang;
    refreshText();
  }

  // Pick the language before the page draws, so it never flashes the wrong one.
  // Order: the visitor's last choice, then their browser's language, then English.
  const saved = savedLanguage();
  const browserSpanish = (navigator.language || "").toLowerCase().startsWith("es");
  applyLanguage(saved === "es" || saved === "en" ? saved : browserSpanish ? "es" : "en");

  document.addEventListener("DOMContentLoaded", () => {
    refreshText();

    // Language button
    const toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const next = root.dataset.ui === "es" ? "en" : "es";
        applyLanguage(next);
        saveLanguage(next);
      });
    }

    // Copy email
    const copyButton = document.querySelector("[data-copy-email]");
    const copyStatus = document.querySelector(".copy-status");
    if (copyButton && copyStatus) {
      copyButton.addEventListener("click", async () => {
        const lang = root.dataset.ui;
        try {
          await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
          copyButton.textContent = words[lang].copied;
          copyStatus.textContent = "";
          setTimeout(() => {
            copyButton.textContent = words[root.dataset.ui].copy;
          }, 2000);
        } catch {
          copyStatus.textContent = words[lang].copyFailed;
        }
      });
    }

    // Photo viewer: opens a photo full screen, with previous and next.
    const viewer = document.querySelector(".lightbox");
    const links = Array.from(document.querySelectorAll(".gallery a"));
    if (viewer && links.length) {
      const image = viewer.querySelector(".lightbox-image");
      const caption = viewer.querySelector(".lightbox-caption");
      let current = 0;

      const show = (index) => {
        current = (index + links.length) % links.length;
        const link = links[current];
        const thumb = link.querySelector("img");
        image.src = link.href;
        image.alt = thumb ? thumb.alt : "";
        const figcaption = link.closest("figure")?.querySelector("figcaption");
        caption.innerHTML = figcaption ? figcaption.innerHTML : "";
      };

      links.forEach((link, index) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          show(index);
          viewer.showModal();
        });
      });

      viewer.querySelector("[data-prev]").addEventListener("click", () => show(current - 1));
      viewer.querySelector("[data-next]").addEventListener("click", () => show(current + 1));
      viewer.querySelector("[data-close]").addEventListener("click", () => viewer.close());

      // Clicking the dark area around the photo closes it.
      viewer.addEventListener("click", (event) => {
        if (event.target === viewer) viewer.close();
      });

      viewer.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") show(current - 1);
        if (event.key === "ArrowRight") show(current + 1);
      });
    }
  });
})();
