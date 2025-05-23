// Project Filtering System
document.addEventListener("DOMContentLoaded", () => {
  // Get all filter buttons and project cards
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")
  const noResults = document.querySelector(".no-results")

  // Add click event to filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      // Get filter value
      const filterValue = btn.getAttribute("data-filter")

      // Filter projects
      filterProjects(filterValue)
    })
  })

  // Filter projects function
  function filterProjects(filter) {
    let visibleCount = 0

    // Loop through all project cards
    projectCards.forEach((card) => {
      // Get card category
      const category = card.getAttribute("data-category")

      // Check if card should be shown
      if (filter === "all" || filter === category) {
        // Show card with animation
        showCard(card)
        visibleCount++
      } else {
        // Hide card with animation
        hideCard(card)
      }
    })

    // Show or hide "no results" message
    if (visibleCount === 0) {
      noResults.style.display = "block"
    } else {
      noResults.style.display = "none"
    }
  }

  // Function to show card with animation
  function showCard(card) {
    // First remove the hide class
    card.classList.remove("hide")

    // Force a reflow to ensure the animation works
    void card.offsetWidth

    // Add the show class for animation
    card.classList.add("show")
  }

  // Function to hide card with animation
  function hideCard(card) {
    // Remove show class
    card.classList.remove("show")

    // Add hide class after animation completes
    setTimeout(() => {
      card.classList.add("hide")
    }, 300)
  }

  // Initialize layout
  function initLayout() {
    // Set initial layout
    filterProjects("all")

    // Add resize event listener to maintain layout
    window.addEventListener("resize", () => {
      // Recalculate layout on resize
      adjustLayout()
    })
  }

  // Function to adjust layout
  function adjustLayout() {
    // Get visible cards
    const visibleCards = document.querySelectorAll(".project-card:not(.hide)")

    // Reset any inline styles
    visibleCards.forEach((card) => {
      card.style.opacity = "1"
      card.style.transform = ""
    })
  }

  // Initialize the layout
  initLayout()

  // Add hover effects for filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (!btn.classList.contains("active")) {
        btn.style.background = "rgba(136, 63, 255, 0.1)"
      }
    })

    btn.addEventListener("mouseleave", () => {
      if (!btn.classList.contains("active")) {
        btn.style.background = "var(--background-light)"
      }
    })
  })
})
