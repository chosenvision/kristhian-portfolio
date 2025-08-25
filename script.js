const themeToggle = document.getElementById("theme-toggle")
const html = document.documentElement
const themeIcon = themeToggle.querySelector("i")

// Check for saved theme preference or default to 'dark' for cyberpunk theme
const currentTheme = localStorage.getItem("theme") || "dark"
html.setAttribute("data-theme", currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
  } else {
    themeIcon.className = "fas fa-moon"
  }
}


// Optional: close menu if clicked outside of navMenu
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }
})


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Smoothly highlight active section in the navbar
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Intersection Observer for fade-in effect on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

document.querySelectorAll("section > div, .cyber-card, .cyber-project-card, .cyber-skill-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease"
  observer.observe(el)
})

// Contact form submission and validation
const contactForm = document.querySelector("form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputs = contactForm.querySelectorAll("input, textarea")
    let isValid = true

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false
        input.style.borderColor = "#ff0000"
        input.style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.5)"
      } else {
        input.style.borderColor = "var(--cyber-border)"
        input.style.boxShadow = "none"
      }
    })

    if (!isValid) {
      showCyberAlert("ERROR: Please fill in all fields.", "error")
      return
    }

    const submitBtn = contactForm.querySelector("button[type='submit']")
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Transmitting...'
    submitBtn.disabled = true
    submitBtn.style.opacity = "0.7"

    setTimeout(() => {
      showCyberAlert("MESSAGE TRANSMITTED SUCCESSFULLY! I'll get back to you soon.", "success")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      submitBtn.style.opacity = "1"
    }, 2000)
  })
}

function showCyberAlert(message, type) {
  const alert = document.createElement("div")
  alert.className = `cyber-alert ${type}`
  alert.innerHTML = `
    <div class="cyber-alert-content">
      <i class="fas ${type === "error" ? "fa-exclamation-triangle" : "fa-check-circle"}"></i>
      <span>${message}</span>
      <button class="cyber-alert-close">&times;</button>
    </div>
  `

  // Add styles
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--cyber-gray);
    border: 1px solid ${type === "error" ? "#ff0000" : "var(--neon-green)"};
    border-radius: 8px;
    padding: 16px;
    color: var(--cyber-text);
    font-family: 'JetBrains Mono', monospace;
    z-index: 10000;
    box-shadow: 0 0 20px ${type === "error" ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 65, 0.5)"};
    animation: slideInRight 0.3s ease;
  `

  document.body.appendChild(alert)

  // Auto remove after 5 seconds
  setTimeout(() => {
    alert.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => alert.remove(), 300)
  }, 5000)

  // Close button
  alert.querySelector(".cyber-alert-close").addEventListener("click", () => {
    alert.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => alert.remove(), 300)
  })
}

// Navbar hide on scroll down
let lastScrollY = window.scrollY
const navbar = document.querySelector("nav")

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY

  if (navbar) {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }
  }

  lastScrollY = currentScrollY
})

// Typewriter effect for hero title
const heroTitle = document.querySelector("h1")
if (heroTitle) {
  const titleText = heroTitle.innerHTML
  heroTitle.innerHTML = ""

  let i = 0
  function typeWriter() {
    if (i < titleText.length) {
      heroTitle.innerHTML += titleText.charAt(i)
      i++
      setTimeout(typeWriter, 80)
    } else {
      // Add blinking cursor after typing is complete
      heroTitle.innerHTML += '<span class="typing-cursor">|</span>'
    }
  }

  window.addEventListener("load", () => {
    setTimeout(typeWriter, 1000)
  })
}

// Hover effects for skill cards
const skillCards = document.querySelectorAll(".cyber-skill-card")
skillCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
    card.style.boxShadow = "var(--cyber-glow-strong)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
    card.style.boxShadow = "none"
  })
})

// Stats counter animation on scroll
const stats = document.querySelectorAll(".text-3xl")
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.textContent.includes("+")) {
        const target = Number.parseInt(entry.target.textContent)
        let current = 0
        const increment = target / 50

        const timer = setInterval(() => {
          current += increment
          entry.target.textContent = Math.floor(current) + "+"

          if (current >= target) {
            entry.target.textContent = target + "+"
            clearInterval(timer)
          }
        }, 30)
      }
    })
  },
  { threshold: 0.5 },
)

stats.forEach((stat) => {
  if (stat.textContent.includes("+")) {
    statsObserver.observe(stat)
  }
})

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
})

// Matrix rain effect for background
function createMatrixRain() {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "-1"
  canvas.style.opacity = "0.1"

  document.body.appendChild(canvas)

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  const chars = "01"
  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = []

  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#00ff41"
    ctx.font = fontSize + "px JetBrains Mono"

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  setInterval(draw, 100)
}

// Initialize matrix rain effect
createMatrixRain()

// Add custom styles for alert animations
const style = document.createElement("style")
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .cyber-alert-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .cyber-alert-close {
    background: none;
    border: none;
    color: var(--cyber-text);
    font-size: 18px;
    cursor: pointer;
    margin-left: auto;
  }
  
  .cyber-alert-close:hover {
    color: var(--neon-green);
  }
`
document.head.appendChild(style)

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            hamburger.classList.toggle('open');
        });

        // Hide menu when a link is clicked
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburger.classList.remove('open');
            });
        });
    }
});
