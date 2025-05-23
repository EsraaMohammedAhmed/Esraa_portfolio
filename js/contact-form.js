// Contact Form Validation and Submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.querySelector(".form-message")

  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit)
  }

  // Form submission handler
  function handleSubmit(e) {
    e.preventDefault()

    // Get form fields
    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")
    const subjectInput = document.getElementById("subject")
    const messageInput = document.getElementById("message")

    // Reset previous error messages
    resetErrors()

    // Validate form
    let isValid = true

    // Validate name
    if (!nameInput.value.trim()) {
      showError(nameInput, "Please enter your name")
      isValid = false
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email")
      isValid = false
    }

    // Validate subject
    if (!subjectInput.value.trim()) {
      showError(subjectInput, "Please enter a subject")
      isValid = false
    }

    // Validate message
    if (!messageInput.value.trim()) {
      showError(messageInput, "Please enter your message")
      isValid = false
    }

    // If form is valid, submit it
    if (isValid) {
      // Show loading state
      const submitButton = contactForm.querySelector("button[type='submit']")
      const originalText = submitButton.innerHTML
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitButton.disabled = true

      // Simulate form submission (replace with actual AJAX submission)
      setTimeout(() => {
        // Show success message
        formMessage.textContent = "Message sent successfully! I'll get back to you soon."
        formMessage.classList.add("success")

        // Reset form
        contactForm.reset()

        // Reset button
        submitButton.innerHTML = originalText
        submitButton.disabled = false

        // Clear success message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = ""
          formMessage.classList.remove("success")
        }, 5000)
      }, 2000)
    }
  }

  // Show error message for a field
  function showError(input, message) {
    const errorElement = input.nextElementSibling
    errorElement.textContent = message
  }

  // Reset all error messages
  function resetErrors() {
    const errorElements = document.querySelectorAll(".form-error")
    errorElements.forEach((element) => {
      element.textContent = ""
    })
    formMessage.textContent = ""
    formMessage.classList.remove("success", "error")
  }

  // Email validation function
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  // Add input event listeners for real-time validation
  if (contactForm) {
    const formInputs = contactForm.querySelectorAll("input, textarea")
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        // Clear error when user types
        const errorElement = input.nextElementSibling
        errorElement.textContent = ""
      })
    })
  }
})
