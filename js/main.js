// Main JavaScript File
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll)
  // Declare AOS if it's not globally available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  } else {
    console.warn("AOS is not defined. Make sure to include the AOS library.")
  }

  // Initialize Particles.js
  // Declare particlesJS if it's not globally available
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#883FFF",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#E21EE2",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  } else {
    console.warn("particlesJS is not defined. Make sure to include the particles.js library.")
  }

  // Preloader
  const preloader = document.querySelector(".preloader")
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }, 1500)
  })

  // Header scroll effect
  const header = document.querySelector("header")
  const scrollTop = document.getElementById("scroll-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
      scrollTop.classList.add("active")
    } else {
      header.classList.remove("scrolled")
      scrollTop.classList.remove("active")
    }
  })

  // Scroll to top button
  scrollTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
    menuToggle.classList.toggle("fa-bars")
    menuToggle.classList.toggle("fa-times")
  })

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll("nav ul li a")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      menuToggle.classList.add("fa-bars")
      menuToggle.classList.remove("fa-times")
    })
  })

  // Active nav link based on scroll position
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Typing effect for the hero section
  const role = document.querySelector(".role")
  const roles = ["Front-End Developer", "Instructor :", "Front-End" , "Soft Skills" , "Freelancing"]
  let roleIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeEffect() {
    const currentRole = roles[roleIndex]

    if (isDeleting) {
      role.textContent = currentRole.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      role.textContent = currentRole.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true
      typingSpeed = 1000 // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
      typingSpeed = 500 // Pause before typing next role
    }

    setTimeout(typeEffect, typingSpeed)
  }

  // Start the typing effect
  setTimeout(typeEffect, 1000)

  // Animate stats counter
  function animateCounter() {
    const statNumbers = document.querySelectorAll(".stat-number")

    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-count"))
      let count = 0
      const duration = 2000 // 2 seconds
      const increment = target / (duration / 30) // Update every 30ms

      const counter = setInterval(() => {
        count += increment
        if (count >= target) {
          stat.textContent = target
          clearInterval(counter)
        } else {
          stat.textContent = Math.floor(count)
        }
      }, 30)
    })
  }

  // Use Intersection Observer to trigger counter animation when stats section is visible
  const statsSection = document.querySelector(".stats")
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(statsSection)
  }

  // Animate floating elements
  const floatingTags = document.querySelectorAll(".floating-tag")
  const floatingCubes = document.querySelectorAll(".floating-cube")
  const floatingIcons = document.querySelectorAll(".floating-icon")
  const floatingSvgs = document.querySelectorAll(".floating-svg")

  // Add random delays to floating tags
  floatingTags.forEach((tag) => {
    const delay = Math.random() * 5
    tag.style.animationDelay = `${delay}s`
  })

  // Add random rotation to floating cubes
  floatingCubes.forEach((cube) => {
    const randomRotation = Math.random() * 360
    cube.style.transform = `rotateX(${randomRotation}deg) rotateY(${randomRotation}deg)`
  })

  // Add random delays to floating icons
  floatingIcons.forEach((icon) => {
    const delay = Math.random() * 10
    icon.style.animationDelay = `${delay}s`
  })

  // Add random delays to floating SVGs
  floatingSvgs.forEach((svg) => {
    const delay = Math.random() * 8
    svg.style.animationDelay = `${delay}s`
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
})
