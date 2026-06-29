/* =====================================================================
   Syncraft Electronics — site behaviour (vanilla JS, no dependencies)
   1. Mobile nav toggle
   2. Scroll-reveal animations
   3. Contact form: client-side validation, honeypot, success/error UI
   Each block is guarded so pages without a given element are unaffected.
   ===================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------- */
  /* 1. Mobile navigation toggle                                       */
  /* ----------------------------------------------------------------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navMenu = document.querySelector("[data-nav-menu]");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("hidden") === false;
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping a link on mobile.
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 768) {
          navMenu.classList.add("hidden");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ----------------------------------------------------------------- */
  /* 2. Scroll-reveal animations                                       */
  /* ----------------------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // No IntersectionObserver support: just show everything.
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* ----------------------------------------------------------------- */
  /* 3. Contact form handling                                          */
  /* ----------------------------------------------------------------- */
  var form = document.querySelector("[data-contact-form]");

  if (form) {
    var statusEl = form.querySelector("[data-form-status]");
    var submitBtn = form.querySelector("[data-form-submit]");

    var setStatus = function (message, type) {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.classList.remove("hidden", "text-green-700", "text-red-600");
      statusEl.classList.add(type === "success" ? "text-green-700" : "text-red-600");
    };

    var showFieldError = function (field, message) {
      var errEl = form.querySelector('[data-error-for="' + field.name + '"]');
      if (errEl) {
        errEl.textContent = message;
        errEl.classList.remove("hidden");
      }
      field.setAttribute("aria-invalid", "true");
    };

    var clearFieldError = function (field) {
      var errEl = form.querySelector('[data-error-for="' + field.name + '"]');
      if (errEl) {
        errEl.textContent = "";
        errEl.classList.add("hidden");
      }
      field.removeAttribute("aria-invalid");
    };

    var emailLooksValid = function (value) {
      // Pragmatic email check — good enough for client-side UX.
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    var validate = function () {
      var ok = true;
      var name = form.elements["name"];
      var email = form.elements["email"];
      var message = form.elements["message"];

      [name, email, message].forEach(clearFieldError);

      if (!name.value.trim()) {
        showFieldError(name, "Please enter your name.");
        ok = false;
      }
      if (!email.value.trim()) {
        showFieldError(email, "Please enter your email.");
        ok = false;
      } else if (!emailLooksValid(email.value.trim())) {
        showFieldError(email, "Please enter a valid email address.");
        ok = false;
      }
      if (!message.value.trim()) {
        showFieldError(message, "Please tell us a little about your project.");
        ok = false;
      }
      return ok;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: if the hidden field is filled, treat as spam and bail
      // silently (pretend success so bots don't learn anything).
      var honey = form.elements["_gotcha"];
      if (honey && honey.value) {
        setStatus("Thanks! Your message has been sent.", "success");
        form.reset();
        return;
      }

      if (!validate()) {
        setStatus("Please correct the highlighted fields and try again.", "error");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.label = submitBtn.textContent;
        submitBtn.textContent = "Sending…";
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            setStatus("Thanks! Your message has been sent. We'll be in touch shortly.", "success");
            form.reset();
          } else {
            return response.json().then(function (data) {
              var msg =
                data && data.errors && data.errors.length
                  ? data.errors.map(function (err) { return err.message; }).join(", ")
                  : "Something went wrong. Please try again or email us directly.";
              setStatus(msg, "error");
            });
          }
        })
        .catch(function () {
          setStatus(
            "Network error. Please try again, or email us directly.",
            "error"
          );
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.label || "Send message";
          }
        });
    });

    // Clear an individual field error as the user corrects it.
    form.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        clearFieldError(field);
      });
    });
  }

  /* ----------------------------------------------------------------- */
  /* Footer year                                                       */
  /* ----------------------------------------------------------------- */
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
