// Import particlesJS if using a module bundler
// import particlesJS from 'particles.js';

// If particlesJS is not available globally or as a module, you might need to include the particles.js script in your HTML file.
// For example: <script src="path/to/particles.js"></script>

// Declare particlesJS if it's not globally available
// This is a placeholder; ensure particles.js is correctly loaded
if (typeof particlesJS === "undefined") {
  window.particlesJS = (tagId, config) => {
    console.warn("particlesJS is not properly loaded.  Ensure particles.js is included in your HTML.")
  }
}

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
      value: "#00c6ff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
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
          opacity: 0.5,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
})

// DOM Elements
const cube = document.querySelector(".cube")
const modal = document.getElementById("achievement-modal")
const modalTitle = document.getElementById("modal-title")
const achievementSlider = document.getElementById("achievement-slider")
const slideDescription = document.getElementById("slide-description")
const closeModal = document.querySelector(".close-modal")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const sliderPagination = document.querySelector(".slider-pagination")
const autoRotateToggle = document.getElementById("auto-rotate-toggle")
const resetPositionBtn = document.getElementById("reset-position")
const zoomInBtn = document.getElementById("zoom-in")
const zoomOutBtn = document.getElementById("zoom-out")

// Variables
let isDragging = false
let previousX, previousY
let rotationX = -15
let rotationY = 15
let isAutoRotating = true
let currentSlideIndex = 0
let currentAchievement = ""
let cubeScale = 1

// Achievement Data (Example)
const achievementsData = {
  achievement1: {
    title: "Achievement 1 Title",
    slides: [
      {
        image: "image1.jpg",
        caption: "Image 1 Caption",
        description: "Description for image 1",
      },
      {
        image: "image2.jpg",
        caption: "Image 2 Caption",
        description: "Description for image 2",
      },
    ],
  },
  achievement2: {
    title: "Achievement 2 Title",
    slides: [
      {
        image: "image3.jpg",
        caption: "Image 3 Caption",
        description: "Description for image 3",
      },
      {
        image: "image4.jpg",
        caption: "Image 4 Caption",
        description: "Description for image 4",
      },
    ],
  },
}

// Initialize cube
updateCubeTransform()

// Cube rotation functionality
cube.addEventListener("mousedown", (e) => {
  if (e.target.closest(".face")) {
    // If clicking directly on a face, don't start dragging
    return
  }
  startDragging(e.clientX, e.clientY)
})

cube.addEventListener("touchstart", (e) => {
  if (e.target.closest(".face")) {
    // If touching directly on a face, don't start dragging
    return
  }
  startDragging(e.touches[0].clientX, e.touches[0].clientY)
})

document.addEventListener("mouseup", stopDragging)
document.addEventListener("touchend", stopDragging)

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    handleDrag(e.clientX, e.clientY)
  }
})

document.addEventListener(
  "touchmove",
  (e) => {
    if (isDragging) {
      handleDrag(e.touches[0].clientX, e.touches[0].clientY)
      e.preventDefault() // Prevent page scrolling
    }
  },
  { passive: false },
)

// Face click event
document.querySelectorAll(".face").forEach((face) => {
  face.addEventListener("click", function () {
    const achievement = this.getAttribute("data-achievement")
    openAchievementModal(achievement)

    // Add pulse animation to the clicked face
    this.style.animation = "pulse 0.5s, glow 5s infinite alternate"
    setTimeout(() => {
      this.style.animation = "glow 5s infinite alternate"
    }, 500)
  })
})

// Modal events
closeModal.addEventListener("click", closeAchievementModal)
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeAchievementModal()
  }
})

// Slider navigation
prevBtn.addEventListener("click", showPreviousSlide)
nextBtn.addEventListener("click", showNextSlide)

// Control buttons
autoRotateToggle.addEventListener("click", toggleAutoRotate)
resetPositionBtn.addEventListener("click", resetCubePosition)
zoomInBtn.addEventListener("click", zoomIn)
zoomOutBtn.addEventListener("click", zoomOut)

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("show")) {
    if (e.key === "ArrowLeft") {
      showPreviousSlide()
    } else if (e.key === "ArrowRight") {
      showNextSlide()
    } else if (e.key === "Escape") {
      closeAchievementModal()
    }
  }
})

// Functions
function startDragging(clientX, clientY) {
  isDragging = true
  previousX = clientX
  previousY = clientY
  cube.style.animation = "none"
  isAutoRotating = false
  cube.style.cursor = "grabbing"
  updateAutoRotateButton()
}

function stopDragging() {
  if (isDragging) {
    isDragging = false
    cube.style.cursor = "grab"
  }
}

function handleDrag(clientX, clientY) {
  const deltaX = clientX - previousX
  const deltaY = clientY - previousY

  rotationY += deltaX * 0.5
  rotationX -= deltaY * 0.5

  // Limit rotation on X axis to prevent flipping
  rotationX = Math.max(-60, Math.min(60, rotationX))

  updateCubeTransform()

  previousX = clientX
  previousY = clientY
}

function updateCubeTransform() {
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${cubeScale})`
}

function toggleAutoRotate() {
  isAutoRotating = !isAutoRotating
  updateAutoRotateButton()

  if (isAutoRotating) {
    cube.style.animation = "rotate 20s infinite linear"
  } else {
    cube.style.animation = "none"
  }
}

function updateAutoRotateButton() {
  if (isAutoRotating) {
    autoRotateToggle.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>'
  } else {
    autoRotateToggle.innerHTML = '<i class="fas fa-sync-alt"></i><span>Auto Rotate</span>'
  }
}

function resetCubePosition() {
  rotationX = -15
  rotationY = 15
  cubeScale = 1
  isAutoRotating = true
  cube.style.animation = "rotate 20s infinite linear"
  updateCubeTransform()
  updateAutoRotateButton()
}

function zoomIn() {
  if (cubeScale < 1.5) {
    cubeScale += 0.1
    updateCubeTransform()
  }
}

function zoomOut() {
  if (cubeScale > 0.5) {
    cubeScale -= 0.1
    updateCubeTransform()
  }
}

function openAchievementModal(achievement) {
  currentAchievement = achievement
  currentSlideIndex = 0

  // Set modal title
  modalTitle.textContent = achievementsData[achievement].title

  // Clear existing slides
  achievementSlider.innerHTML = ""
  sliderPagination.innerHTML = ""

  // Add slides to the slider
  const slides = achievementsData[achievement].slides
  slides.forEach((slide, index) => {
    // Create slide
    const slideElement = document.createElement("div")
    slideElement.className = "slide"
    slideElement.innerHTML = `
      <img src="${slide.image}" alt="${slide.caption}">
      <div class="slide-caption">${slide.caption}</div>
    `
    achievementSlider.appendChild(slideElement)

    // Create pagination dot
    const dot = document.createElement("div")
    dot.className = index === 0 ? "pagination-dot active" : "pagination-dot"
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
    sliderPagination.appendChild(dot)
  })

  // Set initial description
  slideDescription.textContent = slides[0].description

  // Show modal
  modal.classList.add("show")

  // Disable body scroll
  document.body.style.overflow = "hidden"
}

function closeAchievementModal() {
  modal.classList.remove("show")
  document.body.style.overflow = ""
}

function showPreviousSlide() {
  const slides = achievementsData[currentAchievement].slides
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length
  updateSlider()
}

function showNextSlide() {
  const slides = achievementsData[currentAchievement].slides
  currentSlideIndex = (currentSlideIndex + 1) % slides.length
  updateSlider()
}

function goToSlide(index) {
  currentSlideIndex = index
  updateSlider()
}

function updateSlider() {
  // Update slider position
  achievementSlider.style.transform = `translateX(-${currentSlideIndex * 100}%)`

  // Update description
  const slides = achievementsData[currentAchievement].slides
  slideDescription.textContent = slides[currentSlideIndex].description

  // Update pagination dots
  const dots = sliderPagination.querySelectorAll(".pagination-dot")
  dots.forEach((dot, index) => {
    if (index === currentSlideIndex) {
      dot.classList.add("active")
    } else {
      dot.classList.remove("active")
    }
  })
}

// Add touch swipe functionality to slider
let touchStartX = 0
let touchEndX = 0

achievementSlider.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

achievementSlider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left
    showNextSlide()
  } else if (touchEndX > touchStartX + 50) {
    // Swipe right
    showPreviousSlide()
  }
}

// Initialize with auto-rotate button text
updateAutoRotateButton()
