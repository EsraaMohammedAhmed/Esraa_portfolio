// Testimonials Slider
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")

  let currentSlide = 0
  const slideCount = slides.length

  // Initialize the slider
  function initSlider() {
    // Set the first slide as active
    slides[0].classList.add("active")
    dots[0].classList.add("active")

    // Add event listeners to controls
    prevBtn.addEventListener("click", prevSlide)
    nextBtn.addEventListener("click", nextSlide)

    // Add event listeners to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index)
      })
    })

    // Auto slide
    startAutoSlide()
  }

  // Go to previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  // Go to next slide
  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  // Go to specific slide
  function goToSlide(n) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    // Calculate the new slide index
    currentSlide = (n + slideCount) % slideCount

    // Add active class to new slide and dot
    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")

    // Reset auto slide timer
    resetAutoSlide()
  }

  // Auto slide variables
  let autoSlideInterval
  const autoSlideDelay = 5000 // 5 seconds

  // Start auto slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay)
  }

  // Reset auto slide
  function resetAutoSlide() {
    clearInterval(autoSlideInterval)
    startAutoSlide()
  }

  // Pause auto slide on hover
  const testimonialContainer = document.querySelector(".testimonials-container")
  testimonialContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval)
  })

  testimonialContainer.addEventListener("mouseleave", () => {
    startAutoSlide()
  })

  // Initialize the slider
  initSlider()

  // Add touch swipe functionality for mobile
  let touchStartX = 0
  let touchEndX = 0

  testimonialContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
  })

  testimonialContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  function handleSwipe() {
    // Detect swipe direction
    if (touchEndX < touchStartX) {
      // Swipe left, go to next slide
      nextSlide()
    } else if (touchEndX > touchStartX) {
      // Swipe right, go to previous slide
      prevSlide()
    }
  }
})
