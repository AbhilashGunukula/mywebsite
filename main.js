// Main JavaScript file for portfolio website

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Initialize Typed.js for text animation in hero section
const typed = document.querySelector(".typed");
if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}

// Mobile Navigation Toggle
const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

navbarToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
  navbarToggle.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navbarMenu.contains(e.target) && !navbarToggle.contains(e.target)) {
    navbarMenu.classList.remove("active");
    navbarToggle.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu after clicking
      navbarMenu.classList.remove("active");
      navbarToggle.classList.remove("active");
    }
  });
});

// Navbar scroll effect
const header = document.querySelector(".header");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    header.style.transform = "translateY(0)";
  }

  // Add shadow when scrolling
  if (scrollTop > 50) {
    header.style.boxShadow = "var(--box-shadow)";
  } else {
    header.style.boxShadow = "none";
  }

  lastScrollTop = scrollTop;
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("active");
  } else {
    backToTopButton.classList.remove("active");
  }
});

// Project hover effects
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Form validation and submission
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation
    let isValid = true;
    const requiredFields = ["name", "email", "message"];

    requiredFields.forEach((field) => {
      const input = contactForm.querySelector(`[name="${field}"]`);
      if (!data[field]) {
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });

    if (isValid) {
      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.textContent = "Message Sent!";
      submitButton.style.backgroundColor = "var(--success-color)";

      // Reset form
      setTimeout(() => {
        contactForm.reset();
        submitButton.textContent = "Send Message";
        submitButton.style.backgroundColor = "";
      }, 3000);
    }
  });
}

// Remove error class when user starts typing
document
  .querySelectorAll(".form-group input, .form-group textarea")
  .forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("error");
    });
  });

// Add loading animation to images
const images = document.querySelectorAll("img");
images.forEach((img) => {
  img.style.opacity = "0";
  img.addEventListener("load", () => {
    img.style.transition = "opacity 0.5s ease";
    img.style.opacity = "1";
  });
});

// Add parallax effect to hero section
const hero = document.querySelector(".hero");
if (hero) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + "px";
  });
}

// Add typing effect to hero subtitle
const heroSubtitle = document.querySelector(".hero-subtitle");
if (heroSubtitle) {
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroSubtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing effect after a short delay
  setTimeout(typeWriter, 1000);
}

// Add skill level animation
const progressBars = document.querySelectorAll(".progress-bar");
progressBars.forEach((bar) => {
  const percentage = bar.getAttribute("data-level");
  bar.style.width = "0";
  setTimeout(() => {
    bar.style.width = percentage + "%";
  }, 500);
});
