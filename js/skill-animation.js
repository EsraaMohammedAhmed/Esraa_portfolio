// Skill Cards Animation
document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card")
  const skillHighlight = document.querySelector(".skill-highlight")
  const skillsSection = document.querySelector(".skills")

  // Initialize skill progress bars
  function initSkillProgress() {
    const progressBars = document.querySelectorAll(".skill-progress")

    // Animate progress bars when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get all progress bars within the skills section
            const progressBars = document.querySelectorAll(".skill-progress")

            // Animate each progress bar
            progressBars.forEach((bar) => {
              const width = bar.style.width
              bar.style.width = "0"

              setTimeout(() => {
                bar.style.width = width
              }, 100)
            })

            // Unobserve after animation
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    // Observe the skills section
    observer.observe(skillsSection)
  }

  // Initialize the highlight effect
  function initHighlightEffect() {
    // Show highlight on mousemove
    skillsSection.addEventListener("mousemove", (e) => {
      skillHighlight.style.opacity = "1"
      moveHighlight(e)
    })

    // Hide highlight when mouse leaves the section
    skillsSection.addEventListener("mouseleave", () => {
      skillHighlight.style.opacity = "0"
    })

    // Add hover effect to skill cards
    skillCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        // Add active class to the card
        card.classList.add("active-skill")

        // Increase highlight size
        skillHighlight.style.width = "300px"
        skillHighlight.style.height = "300px"
      })

      card.addEventListener("mouseleave", () => {
        // Remove active class
        card.classList.remove("active-skill")

        // Reset highlight size
        skillHighlight.style.width = "250px"
        skillHighlight.style.height = "250px"
      })
    })
  }

  // Move the highlight with the mouse
  function moveHighlight(e) {
    const { clientX, clientY } = e
    const { left, top } = skillsSection.getBoundingClientRect()

    // Calculate position relative to the skills section
    const x = clientX - left
    const y = clientY - top

    // Position the highlight centered on the mouse
    skillHighlight.style.left = `${x - 125}px`
    skillHighlight.style.top = `${y - 125}px`
  }

  // Initialize animated borders for skill cards
  function initAnimatedBorders() {
    skillCards.forEach((card) => {
      const border = card.querySelector(".animated-border")
      const skillColor = card.getAttribute("data-skill-color")

      if (border && skillColor) {
        border.style.color = skillColor
      }
    })
  }

  // Auto-highlight animation
  function startAutoHighlight() {
    let currentIndex = 0

    // Function to highlight next skill card
    function highlightNextSkill() {
      // Remove active class from all cards
      skillCards.forEach((card) => card.classList.remove("active-skill"))

      // Add active class to current card
      skillCards[currentIndex].classList.add("active-skill")

      // Get position of current card
      const card = skillCards[currentIndex]
      const { left, top, width, height } = card.getBoundingClientRect()
      const sectionRect = skillsSection.getBoundingClientRect()

      // Position highlight at the center of the card
      skillHighlight.style.opacity = "1"
      skillHighlight.style.left = `${(left + width / 2) - sectionRect.left - 125}px`
      skillHighlight.style.top = `${(top + height / 2) - sectionRect.top - 125}px`

      // Increment index
      currentIndex = (currentIndex + 1) % skillCards.length
    }

    // Start the auto-highlight interval
    const autoHighlightInterval = setInterval(highlightNextSkill, 2000)

    // Stop auto-highlight when user interacts
    skillsSection.addEventListener("mousemove", () => {
      clearInterval(autoHighlightInterval)
    })

    // Initial highlight
    highlightNextSkill()
  }

  // Initialize all skill animations
  initSkillProgress()
  initHighlightEffect()
  initAnimatedBorders()

  // Start auto-highlight after a delay
  setTimeout(startAutoHighlight, 3000)
})
