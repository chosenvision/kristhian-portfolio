"use client"

import { useEffect } from "react"

export default function Portfolio() {
  useEffect(() => {
    const themeToggle = document.getElementById("theme-toggle")
    const html = document.documentElement
    const themeIcon = themeToggle?.querySelector("i")

    const currentTheme = localStorage.getItem("theme") || "dark"
    html.setAttribute("data-theme", currentTheme)
    if (currentTheme === "light") {
      html.classList.remove("dark")
    } else {
      html.classList.add("dark")
    }
    updateThemeIcon(currentTheme)

    function updateThemeIcon(theme: string) {
      if (themeIcon) {
        if (theme === "dark") {
          themeIcon.className = "fas fa-sun"
        } else {
          themeIcon.className = "fas fa-moon"
        }
      }
    }

    themeToggle?.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      html.setAttribute("data-theme", newTheme)
      if (newTheme === "light") {
        html.classList.remove("dark")
      } else {
        html.classList.add("dark")
      }
      localStorage.setItem("theme", newTheme)
      updateThemeIcon(newTheme)
    })

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href") as string)
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

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
        }
      })
    }, observerOptions)

    document.querySelectorAll("section > div, .cyber-card").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-text">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 cyber-nav">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="#home" className="text-2xl font-bold cyber-logo">
                <span className="text-neon-green">{"<"}</span>KP<span className="text-neon-green">{"/>"}</span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="nav-link">
                  Home
                </a>
                <a href="#about" className="nav-link">
                  About
                </a>
                <a href="#skills" className="nav-link">
                  Skills
                </a>
                <a href="#projects" className="nav-link">
                  Projects
                </a>
                <a href="#experience" className="nav-link">
                  Experience
                </a>
                <a href="#contact" className="nav-link">
                  Contact
                </a>
                <button
                  id="theme-toggle"
                  className="p-2 rounded-md border border-cyber-border hover:border-neon-green transition-colors"
                >
                  <i className="fas fa-moon text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center cyber-hero pt-16">
        <div className="matrix-bg"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg font-mono text-neon-green cyber-text-glow">
                  <span className="typing-cursor">$</span> whoami
                </p>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight font-orbitron">
                  Kristhian <span className="text-neon-green cyber-text-glow">Pinili</span>
                </h1>
                <p className="text-xl lg:text-2xl font-mono text-gray-300">
                  <span className="text-neon-green">{">"}</span> Software Engineer & Problem Solver
                </p>
              </div>
              <div className="cyber-terminal">
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <span className="terminal-btn red"></span>
                    <span className="terminal-btn yellow"></span>
                    <span className="terminal-btn green"></span>
                  </div>
                  <span className="terminal-title">~/portfolio</span>
                </div>
                <div className="terminal-content">
                  <p className="font-mono text-sm">
                    <span className="text-neon-green">kristhian@dev:~$</span> cat about.txt
                    <br />
                    <span className="text-gray-300">
                      {'"I don\'t just build programs — I build purpose through code."'}
                    </span>
                    <br />
                    <span className="text-gray-400">
                      Detail-oriented, solutions-driven junior software engineer passionate about creating impactful
                      digital experiences.
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#projects" className="cyber-btn-primary">
                  <i className="fas fa-code mr-2"></i>
                  View My Work
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
                <a href="#contact" className="cyber-btn-secondary">
                  <i className="fas fa-terminal mr-2"></i>
                  Get In Touch
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 rounded-full border-2 border-neon-green bg-cyber-dark flex items-center justify-center">
                  <i className="fas fa-user-astronaut text-6xl text-neon-green"></i>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-cyber-dark border border-cyber-border rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                    <span className="text-sm font-mono">ONLINE • Available for work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 cyber-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-orbitron">
              <span className="text-neon-green">{"<"}</span>About<span className="text-neon-green">{"/>"}</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300 font-mono">
              Passionate about creating meaningful solutions that make a real impact
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 space-y-6">
              <div className="cyber-card">
                <p className="text-lg leading-relaxed text-gray-300 font-mono">
                  I'm a passionate junior software engineer currently pursuing a Bachelor of Science in Computer Science
                  at Batangas State University, where I maintain my status as a Dean's Lister. My journey in technology
                  is driven by a desire to create meaningful solutions that make a real impact.
                </p>
              </div>
              <div className="cyber-card">
                <p className="text-lg leading-relaxed text-gray-300 font-mono">
                  Beyond coding, I'm actively involved in humanitarian efforts through "Just Shut Up and Love" and
                  participate in TechnoFusion workshops to advance my software engineering skills. I believe in
                  continuous learning and giving back to the community.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="cyber-card text-center">
                <div className="text-3xl font-bold mb-2 text-neon-green font-orbitron">7+</div>
                <p className="font-mono">Projects Completed</p>
              </div>
              <div className="cyber-card text-center">
                <div className="text-3xl font-bold mb-2 text-neon-green font-orbitron">4+</div>
                <p className="font-mono">Programming Languages</p>
              </div>
              <div className="cyber-card text-center">
                <div className="text-3xl font-bold mb-2 text-neon-green font-orbitron">3+</div>
                <p className="font-mono">Certifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-orbitron">
              <span className="text-neon-green">{"<"}</span>Skills<span className="text-neon-green">{"/>"}</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300 font-mono">
              A comprehensive toolkit for building modern applications
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Programming Languages",
                icon: "fas fa-code",
                skills: [
                  { name: "Python", icon: "fab fa-python" },
                  { name: "JavaScript", icon: "fab fa-js-square" },
                  { name: "C++", icon: "fas fa-code" },
                  { name: "Java", icon: "fab fa-java" },
                ],
              },
              {
                title: "Web Development",
                icon: "fas fa-globe",
                skills: [
                  { name: "HTML/CSS", icon: "fab fa-html5" },
                  { name: "Frontend Dev", icon: "fas fa-laptop-code" },
                  { name: "Responsive Design", icon: "fas fa-mobile-alt" },
                  { name: "UI/UX Design", icon: "fas fa-paint-brush" },
                ],
              },
              {
                title: "Tools & Frameworks",
                icon: "fas fa-tools",
                skills: [
                  { name: "Android Studio", icon: "fab fa-android" },
                  { name: "Firebase", icon: "fas fa-fire" },
                  { name: "Git & GitHub", icon: "fab fa-github" },
                  { name: "MySQL", icon: "fas fa-database" },
                ],
              },
              {
                title: "Core Skills",
                icon: "fas fa-brain",
                skills: [
                  { name: "Problem Solving", icon: "fas fa-puzzle-piece" },
                  { name: "System Design", icon: "fas fa-sitemap" },
                  { name: "Team Collaboration", icon: "fas fa-users" },
                  { name: "Leadership", icon: "fas fa-crown" },
                ],
              },
            ].map((category, index) => (
              <div key={index} className="cyber-card">
                <div className="text-center mb-6">
                  <i className={`${category.icon} text-4xl mb-4 text-neon-green`}></i>
                  <h3 className="text-xl font-bold font-orbitron">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between">
                      <span className="font-mono">{skill.name}</span>
                      <i className={`${skill.icon} text-neon-green`}></i>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 cyber-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-orbitron">
              <span className="text-neon-green">{"<"}</span>Projects<span className="text-neon-green">{"/>"}</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300 font-mono">
              A showcase of my technical expertise and creative problem-solving
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AgriLocate",
                icon: "fas fa-seedling",
                description:
                  "Crop recommendation system using weather and soil data to help farmers make informed decisions.",
                tags: ["Python", "ML", "Data Analysis"],
              },
              {
                title: "CryptoCrafters",
                icon: "fas fa-lock",
                description:
                  "Gamified learning platform for classical cryptography with interactive challenges and tutorials.",
                tags: ["Java", "Game Dev", "Education"],
              },
              {
                title: "HabiHub",
                icon: "fas fa-mobile-alt",
                description:
                  "Android app to help users build and track habits with progress visualization and reminders.",
                tags: ["Android", "Firebase", "Java"],
              },
              {
                title: "Flight Booking System",
                icon: "fas fa-plane",
                description:
                  "Console-based reservation and ticketing platform with seat management and booking features.",
                tags: ["C++", "System Design", "Database"],
              },
              {
                title: "Edu Hub",
                icon: "fas fa-graduation-cap",
                description:
                  "Career simulations and educational modules to help students explore different career paths.",
                tags: ["Python", "Education", "Simulation"],
              },
              {
                title: "Reforge: Rise of Seven Cities",
                icon: "fas fa-gamepad",
                description: "RPG game with cities, pets, bosses, and immersive gameplay mechanics.",
                tags: ["Game Dev", "C++", "Graphics"],
              },
            ].map((project, index) => (
              <div key={index} className="cyber-card group hover:scale-105 transition-transform">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-cyber-dark border border-cyber-border flex items-center justify-center mr-4">
                    <i className={`${project.icon} text-neon-green text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold font-orbitron">{project.title}</h3>
                </div>
                <p className="mb-6 text-gray-300 font-mono">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-cyber-dark border border-cyber-border rounded-full text-sm font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/kristhianpinili"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-neon-green hover:text-green-300 transition-colors font-mono"
                >
                  <i className="fab fa-github mr-2"></i>
                  View on GitHub
                  <i className="fas fa-external-link-alt ml-2 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-orbitron">
              <span className="text-neon-green">{"<"}</span>Experience<span className="text-neon-green">{"/>"}</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300 font-mono">
              Building expertise through hands-on experience and continuous learning
            </p>
          </div>

          <div className="mb-16 space-y-8">
            <div className="cyber-card">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 rounded-lg bg-cyber-dark border border-cyber-border flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-briefcase text-neon-green text-2xl"></i>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <h3 className="text-2xl font-bold font-orbitron">IT Intern</h3>
                    <span className="text-lg font-mono text-neon-green">National Transmission Corporation</span>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300 font-mono">
                    Tasked with creating a comprehensive ticketing system for the IT/IS Division. Developed a system
                    that allows all incoming requests to be processed efficiently, improving workflow and response times
                    for technical support.
                  </p>
                </div>
              </div>
            </div>

            <div className="cyber-card">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 rounded-lg bg-cyber-dark border border-cyber-border flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-bug text-neon-green text-2xl"></i>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <h3 className="text-2xl font-bold font-orbitron">Quality Assurance Tester</h3>
                    <span className="text-lg font-mono text-neon-green">Part-time</span>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300 font-mono">
                    Conducted comprehensive testing of software applications to identify bugs, usability issues, and
                    performance bottlenecks. Collaborated with development teams to ensure high-quality deliverables and
                    improved user experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="cyber-card">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 rounded-lg bg-cyber-dark border border-cyber-border flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-video text-neon-green text-2xl"></i>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <h3 className="text-2xl font-bold font-orbitron">Casting Agent</h3>
                    <span className="text-lg font-mono text-neon-green">Part-time</span>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300 font-mono">
                    Managed talent recruitment and selection processes for various media productions. Coordinated
                    auditions, evaluated performer capabilities, and maintained professional relationships with talent
                    and production teams.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-center mb-12 font-orbitron">Achievements & Certifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Academic Excellence",
                  icon: "fas fa-trophy",
                  description: "Consistent Honor Student & Dean's Lister at Batangas State University",
                },
                {
                  title: "TESDA Certified",
                  icon: "fas fa-certificate",
                  description: "Computer System Servicing NCII - Best in CSS",
                },
                {
                  title: "Leadership",
                  icon: "fas fa-users",
                  description: "Multiple student leadership roles and community involvement",
                },
                {
                  title: "Cybersecurity",
                  icon: "fas fa-shield-alt",
                  description: "BitCon Seminar participant - Cybersecurity & Trends",
                },
              ].map((achievement, index) => (
                <div key={index} className="cyber-card text-center">
                  <div className="w-16 h-16 rounded-lg bg-cyber-dark border border-cyber-border flex items-center justify-center mx-auto mb-6">
                    <i className={`${achievement.icon} text-neon-green text-2xl`}></i>
                  </div>
                  <h4 className="text-xl font-bold mb-3 font-orbitron">{achievement.title}</h4>
                  <p className="text-gray-300 font-mono">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 cyber-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-orbitron">
              <span className="text-neon-green">{"<"}</span>Contact<span className="text-neon-green">{"/>"}</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300 font-mono">
              Let's discuss new opportunities, interesting projects, or just have a chat about technology
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="cyber-card">
                <h3 className="text-2xl font-bold mb-6 font-orbitron">Let's Connect</h3>
                <p className="text-lg mb-8 text-gray-300 font-mono">
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                  technology and innovation.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: "fas fa-envelope",
                    title: "Email",
                    value: "kristhianpinili@gmail.com",
                    href: "mailto:kristhianpinili@gmail.com",
                  },
                  {
                    icon: "fas fa-phone",
                    title: "Phone",
                    value: "+63 908 169 3403",
                    href: "tel:+639081693403",
                  },
                  {
                    icon: "fas fa-map-marker-alt",
                    title: "Location",
                    value: "Taal, Batangas, Philippines",
                    href: null,
                  },
                  {
                    icon: "fab fa-github",
                    title: "GitHub",
                    value: "GitHub Profile",
                    href: "https://github.com/kristhianpinili",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-cyber-border hover:border-neon-green transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-cyber-dark border border-cyber-border flex items-center justify-center flex-shrink-0">
                      <i className={`${contact.icon} text-neon-green`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold mb-1 font-orbitron text-cyber-text">{contact.title}</h4>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          target={contact.href.startsWith("http") ? "_blank" : undefined}
                          rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-neon-green hover:text-green-300 transition-colors font-mono break-words"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-gray-300 font-mono break-words">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cyber-card">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg font-mono text-cyber-text placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg font-mono text-cyber-text placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg font-mono text-cyber-text placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg font-mono text-cyber-text placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="cyber-btn-primary w-full">
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cyber-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 font-mono">&copy; 2024 Kristhian Pinili. All rights reserved.</p>
            <div className="flex space-x-6">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-neon-green transition-colors font-mono"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
