/* SKY YOGA CENTRE — site interactions (vanilla JS) */
(function () {
  "use strict";

  var WA_NUMBER = "919787330898";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------------------------- Sticky header ---------------------------- */
  var header = $("[data-header]");
  if (header) {
    var solid = header.hasAttribute("data-header-solid");
    var onScroll = function () {
      if (window.scrollY > 40 || solid) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------- Mobile menu ----------------------------- */
  var burger = $("[data-burger]");
  var menu = $("[data-menu]");
  if (burger && menu) {
    var setMenu = function (open) {
      burger.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("is-locked", open);
    };
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* --------------------------- Scroll reveals ---------------------------- */
  var revealTargets = $$(".reveal, .reveal-img, .journey-step");
  if (revealTargets.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
      revealTargets.forEach(function (el) { io.observe(el); });
    }
  }

  /* ----------------------------- Parallax -------------------------------- */
  var parallaxItems = $$("[data-parallax]");
  if (parallaxItems.length && !reduceMotion) {
    var ticking = false;
    var update = function () {
      parallaxItems.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        var progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        var strength = parseFloat(el.getAttribute("data-parallax")) || 40;
        el.style.transform = "translate3d(0," + (-progress * strength).toFixed(2) + "px,0)";
      });
      ticking = false;
    };
    var request = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  }

  /* --------------------- Hero video graceful fallback -------------------- */
  var heroVideo = $("[data-hero-video]");
  if (heroVideo) {
    var fail = function () { heroVideo.style.display = "none"; };
    heroVideo.addEventListener("error", fail);
    $$("source", heroVideo).forEach(function (s) { s.addEventListener("error", fail); });
    if (reduceMotion) {
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause();
    } else {
      var play = heroVideo.play();
      if (play && typeof play.catch === "function") { play.catch(function () {}); }
    }
  }

  /* --------------------- Duplicate marquee for looping ------------------- */
  var track = $("[data-marquee]");
  if (track && !reduceMotion) {
    track.innerHTML += track.innerHTML;
  }

  /* --------------------------- Contact form ------------------------------ */
  var form = $("[data-enquiry-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = $("[data-form-status]", form);
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var session = (data.get("session") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !phone) {
        if (status) status.textContent = "Please add your name and phone number.";
        return;
      }

      var text =
        "Hello SKY Yoga Centre,\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Preferred Session: " + (session || "Not specified") + "\n" +
        "Message: " + (message || "-") + "\n\n" +
        "I would like to enquire about joining a yoga session.";

      if (status) status.textContent = "Opening WhatsApp with your enquiry…";
      window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }

  /* ------------------------------- Year ---------------------------------- */
  $$("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------ Icons ---------------------------------- */
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
  if (document.readyState === "complete") renderIcons();
  else window.addEventListener("load", renderIcons);
})();
