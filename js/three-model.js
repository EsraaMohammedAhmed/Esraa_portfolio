// Three.js 3D Model Viewer for Hero Section
document.addEventListener("DOMContentLoaded", () => {
  // Check if Three.js is already loaded
  if (typeof THREE === "undefined") {
    console.error("Three.js library not found. Please include it in your HTML.")
    return // Exit if Three.js is not loaded
  }

  // Create a loading indicator
  const modelContainer = document.getElementById("model-container")
  const loadingElement = document.createElement("div")
  loadingElement.className = "model-loading"
  loadingElement.innerHTML = '<div class="model-loading-spinner"></div>'
  modelContainer.appendChild(loadingElement)

  // Scene setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a101e) // Match the site background

  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000)
  camera.position.z = 5

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  modelContainer.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight1 = new THREE.DirectionalLight(0x00d2df, 1) // Primary color
  directionalLight1.position.set(1, 1, 1)
  scene.add(directionalLight1)

  const directionalLight2 = new THREE.DirectionalLight(0x9358f7, 1) // Secondary color
  directionalLight2.position.set(-1, -1, -1)
  scene.add(directionalLight2)

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.7
  controls.enableZoom = false // Disable zooming for better UX

  // Create a group to hold the model and any other objects
  const modelGroup = new THREE.Group()
  scene.add(modelGroup)

  // Add a platform/base
  const platformGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 32)
  const platformMaterial = new THREE.MeshStandardMaterial({
    color: 0x131b31, // Background light color
    metalness: 0.5,
    roughness: 0.2,
  })
  const platform = new THREE.Mesh(platformGeometry, platformMaterial)
  platform.position.y = -1.5
  modelGroup.add(platform)

  // Add particles around the model
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 200
  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    // Create a sphere of particles
    const radius = 3 + Math.random() * 2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    posArray[i * 3 + 2] = radius * Math.cos(phi)
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  // Create gradient material for particles
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
  })

  // Add colors to particles (gradient from primary to secondary)
  const colors = new Float32Array(particlesCount * 3)
  const color1 = new THREE.Color(0x00d2df) // Primary color
  const color2 = new THREE.Color(0x9358f7) // Secondary color

  for (let i = 0; i < particlesCount; i++) {
    const mixFactor = Math.random()
    const color = new THREE.Color().lerpColors(color1, color2, mixFactor)

    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  modelGroup.add(particles)

  // Create a character model (simple geometric shape as placeholder)
  // This would be replaced with a proper GLTF model in a real implementation
  const characterGroup = new THREE.Group()

  // Body
  const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8)
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.2,
    roughness: 0.8,
  })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  characterGroup.add(body)

  // Head
  const headGeometry = new THREE.SphereGeometry(0.3, 32, 32)
  const headMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.2,
    roughness: 0.8,
  })
  const head = new THREE.Mesh(headGeometry, headMaterial)
  head.position.y = 0.9
  characterGroup.add(head)

  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16)
  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d2df,
    emissive: 0x00d2df,
    emissiveIntensity: 0.5,
  })

  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
  leftEye.position.set(-0.1, 0.95, 0.25)
  characterGroup.add(leftEye)

  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
  rightEye.position.set(0.1, 0.95, 0.25)
  characterGroup.add(rightEye)

  // Arms
  const armGeometry = new THREE.CapsuleGeometry(0.15, 0.7, 4, 8)

  const leftArm = new THREE.Mesh(armGeometry, bodyMaterial)
  leftArm.position.set(-0.65, 0.2, 0)
  leftArm.rotation.z = Math.PI / 6
  characterGroup.add(leftArm)

  const rightArm = new THREE.Mesh(armGeometry, bodyMaterial)
  rightArm.position.set(0.65, 0.2, 0)
  rightArm.rotation.z = -Math.PI / 6
  characterGroup.add(rightArm)

  // Legs
  const legGeometry = new THREE.CapsuleGeometry(0.15, 0.8, 4, 8)

  const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial)
  leftLeg.position.set(-0.25, -0.9, 0)
  characterGroup.add(leftLeg)

  const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial)
  rightLeg.position.set(0.25, -0.9, 0)
  characterGroup.add(rightLeg)

  // Add a glowing effect around the character
  const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32)
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x9358f7,
    transparent: true,
    opacity: 0.1,
  })
  const glow = new THREE.Mesh(glowGeometry, glowMaterial)
  characterGroup.add(glow)

  // Add the character to the scene
  characterGroup.position.y = 0.5
  modelGroup.add(characterGroup)

  // Remove loading indicator after our placeholder model is ready
  setTimeout(() => {
    loadingElement.remove()
  }, 1000)

  // Animation loop
  const clock = new THREE.Clock()
  let autoRotate = true

  function animate() {
    requestAnimationFrame(animate)

    const delta = clock.getDelta()

    // Rotate the model group if auto-rotate is enabled
    if (autoRotate) {
      modelGroup.rotation.y += 0.005
    }

    // Animate the character
    characterGroup.position.y = 0.5 + Math.sin(clock.getElapsedTime()) * 0.1

    // Animate particles
    particles.rotation.y += 0.001

    // Update controls
    controls.update()

    // Render the scene
    renderer.render(scene, camera)
  }

  // Start animation
  animate()

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = modelContainer.clientWidth / modelContainer.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight)
  })

  // Toggle auto-rotation when clicking on the model
  modelContainer.addEventListener("click", () => {
    autoRotate = !autoRotate
  })

  // Add instructions
  const instructions = document.createElement("div")
  instructions.style.position = "absolute"
  instructions.style.bottom = "10px"
  instructions.style.left = "10px"
  instructions.style.color = "rgba(255, 255, 255, 0.7)"
  instructions.style.fontSize = "12px"
  instructions.style.pointerEvents = "none"
  instructions.textContent = "Drag to rotate • Click to toggle auto-rotation"
  modelContainer.appendChild(instructions)
})
