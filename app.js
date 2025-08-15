 import config from './config.js';
 
 // FIXED: Initialize particles.js

 particlesJS('particles-js',{
    
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value":"#3b82f6"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color":"#3b82f6",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    });


        // Custom cursor
        const cursor = document.getElementById('cursor');
        if (cursor) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        }

        // FIXED: Enhanced Mobile Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');

        function showMobileMenu() {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('show');
            
            // Animate menu items
            const items = document.querySelectorAll('.mobile-nav-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            });
        }

        function hideMobileMenu() {
            const items = document.querySelectorAll('.mobile-nav-item');
            items.forEach(item => {
                item.classList.remove('show');
            });
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            }, 300);
        }

        if (menuToggle) {
            menuToggle.addEventListener('click', showMobileMenu);
        }

        if (closeMenu) {
            closeMenu.addEventListener('click', hideMobileMenu);
        }

        // FIXED: Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Hide mobile menu if open
                hideMobileMenu();
                
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // FIXED: Animate elements on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.skill-bar, .glass-card, .code-line');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('visible');
                    
                    if (element.classList.contains('skill-bar')) {
                        const width = element.getAttribute('data-width');
                        if (width) {
                            element.style.width = '0';
                            setTimeout(() => {
                                element.style.width = width;
                            }, 100);
                        }
                    }
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on load

        // FIXED: Enhanced 3D Scene with Three.js - Complete Integration
        const initThreeJS = () => {
            const container = document.getElementById('threejs-container');
            if (!container || !window.THREE) return;

            // Scene setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: true,
                powerPreference: "high-performance"
            });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Enhanced lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            const pointLight = new THREE.PointLight(0x4361ee, 0.8, 100);
            pointLight.position.set(10, 10, 10);
            scene.add(pointLight);

            // Create diverse 3D objects as background elements
            const geometries = [
                new THREE.IcosahedronGeometry(1.2, 1),
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.TorusGeometry(1.5, 0.6, 16, 32),
                new THREE.ConeGeometry(1.2, 2.5, 8),
                new THREE.SphereGeometry(1.3, 32, 32),
                new THREE.OctahedronGeometry(1.4),
                new THREE.TetrahedronGeometry(1.6),
                new THREE.DodecahedronGeometry(1.1)
            ];

            const materials = [
                new THREE.MeshPhongMaterial({ 
                    color: 0x4361ee, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x111133
                }),
                new THREE.MeshPhongMaterial({ 
                    color: 0x3a0ca3, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x330011
                }),
                new THREE.MeshPhongMaterial({ 
                    color: 0xf72585, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x330022
                }),
                new THREE.MeshPhongMaterial({ 
                    color: 0x4cc9f0, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x002233
                }),
                new THREE.MeshPhongMaterial({ 
                    color: 0x7209b7, 
                    transparent: true, 
                    opacity: 0.7, 
                    shininess: 100,
                    emissive: 0x220033
                })
            ];

            const objects = [];
            const numObjects = 20; // Increased for better background coverage

            for (let i = 0; i < numObjects; i++) {
                const geometry = geometries[Math.floor(Math.random() * geometries.length)];
                const material = materials[Math.floor(Math.random() * materials.length)].clone();
                
                // Enhanced color variation
                const hue = Math.random() * 0.3 + 0.4;
                const saturation = Math.random() * 0.5 + 0.5;
                const lightness = Math.random() * 0.4 + 0.4;
                material.color.setHSL(hue, saturation, lightness);
                
                const object = new THREE.Mesh(geometry, material);
                
                // Strategic positioning for background coverage
                const angle = (i / numObjects) * Math.PI * 2;
                const radius = Math.random() * 30 + 20;
                object.position.x = Math.cos(angle) * radius + (Math.random() - 0.5) * 25;
                object.position.y = Math.sin(angle) * radius + (Math.random() - 0.5) * 25;
                object.position.z = (Math.random() - 0.5) * 40 - 10; // Push objects behind content
                
                // Random rotation
                object.rotation.x = Math.random() * Math.PI;
                object.rotation.y = Math.random() * Math.PI;
                object.rotation.z = Math.random() * Math.PI;
                
                // Varied sizes
                const size = Math.random() * 2.5 + 0.8;
                object.scale.set(size, size, size);
                
                // Store initial values for animation
                object.userData = {
                    initialX: object.position.x,
                    initialY: object.position.y,
                    initialZ: object.position.z,
                    initialScale: size,
                    floatSpeed: Math.random() * 0.02 + 0.01,
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    }
                };
                
                scene.add(object);
                objects.push(object);
            }

            // Camera positioning
            camera.position.set(0, 0, 25);
            camera.lookAt(0, 0, 0);

            // Mouse interaction
            const mouse = new THREE.Vector2();
            const targetCameraPos = new THREE.Vector3(0, 0, 25);

            document.addEventListener('mousemove', (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                
                // Smooth camera movement based on mouse
                targetCameraPos.x = mouse.x * 5;
                targetCameraPos.y = mouse.y * 5;
                targetCameraPos.z = 25;
            });

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                
                // Smooth camera movement
                camera.position.lerp(targetCameraPos, 0.03);
                camera.lookAt(0, 0, 0);
                
                // Animate all 3D objects
                const time = Date.now() * 0.001;
                
                objects.forEach((object, index) => {
                    const userData = object.userData;
                    
                    // Continuous rotation
                    object.rotation.x += userData.rotationSpeed.x;
                    object.rotation.y += userData.rotationSpeed.y;
                    object.rotation.z += userData.rotationSpeed.z;
                    
                    // Floating motion
                    object.position.y = userData.initialY + Math.sin(time * userData.floatSpeed + index) * 2;
                    object.position.x = userData.initialX + Math.cos(time * userData.floatSpeed * 0.7 + index) * 1.5;
                    
                    // Subtle mouse interaction
                    const mouseInfluence = 0.02;
                    object.position.x += mouse.x * mouseInfluence * (2 + index * 0.05);
                    object.position.y += mouse.y * mouseInfluence * (2 + index * 0.05);
                    
                    // Pulsing effect
                    const pulse = 1 + Math.sin(time * 1.5 + index * 0.5) * 0.1;
                    object.scale.setScalar(userData.initialScale * pulse);
                });
                
                renderer.render(scene, camera);
            };

            // Handle window resize
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);
            animate();
        };

        // Initialize ThreeJS when page loads
        window.addEventListener('load', initThreeJS);

        // FIXED: Code Editor Functionality
        const runCodeBtn = document.getElementById('run-code');
        const codeOutput = document.getElementById('code-output');

        if (runCodeBtn && codeOutput) {
            runCodeBtn.addEventListener('click', function() {
                codeOutput.innerHTML = `
                    <div class="text-center p-4">
                        <div class="inline-block mb-4">
                            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto animate-spin">
                                <i class="fas fa-cog text-white text-2xl"></i>
                            </div>
                        </div>
                        <p class="text-gray-400">Building Flutter App...</p>
                    </div>
                `;
                
                setTimeout(() => {
                    codeOutput.innerHTML = `
                        <div class="p-4 h-full">
                            <div class="bg-white rounded-lg overflow-hidden shadow-md h-full">
                                <div class="bg-gray-100 px-4 py-2 border-b flex items-center">
                                    <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <span class="text-xs text-gray-600 ml-2">Temple Finder</span>
                                </div>
                                <div class="p-4">
                                    <div class="flex items-center mb-4">
                                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <i class="fas fa-place-of-worship text-blue-500"></i>
                                        </div>
                                        <h4 class="font-medium text-gray-800">Temple Finder App</h4>
                                    </div>
                                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                                        <button class="py-2 rounded flex flex-col items-center justify-center bg-blue-50 text-blue-600 text-xs">
                                            <i class="fas fa-place-of-worship mb-1"></i>
                                            <span>Temples</span>
                                        </button>
                                        <button class="py-2 rounded flex flex-col items-center justify-center bg-gray-100 text-gray-600 text-xs">
                                            <i class="fas fa-map mb-1"></i>
                                            <span>Map</span>
                                        </button>
                                        <button class="py-2 rounded flex flex-col items-center justify-center bg-gray-100 text-gray-600 text-xs">
                                            <i class="fas fa-heart mb-1"></i>
                                            <span>Favorites</span>
                                        </button>
                                        <button class="py-2 rounded flex flex-col items-center justify-center bg-gray-100 text-gray-600 text-xs">
                                            <i class="fas fa-user mb-1"></i>
                                            <span>Profile</span>
                                        </button>
                                    </div>
                                    <div class="bg-gray-100 rounded-lg p-3">
                                        <p class="text-sm text-gray-700">Select a temple to view 360° panorama</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }, 2000);
            });
        }

        // Device and source view buttons
        const viewDeviceBtn = document.getElementById('view-device');
        const viewSourceBtn = document.getElementById('view-source');

        if (viewDeviceBtn) {
            viewDeviceBtn.addEventListener('click', function() {
                alert('Connecting to device... This would launch the app on a connected device in a real scenario.');
            });
        }

        if (viewSourceBtn) {
            viewSourceBtn.addEventListener('click', function() {
                alert('Opening GitHub repository... This would link to your actual project source code.');
            });
        }

        
        // --- API Logic ---
const API_KEY = "OPENAI_API_KEY";
const TEXT_API_URL = "https://api.openai.com/v1/chat/completions";
const HF_MODELS = [
    "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"
];
const HF_API_KEY ="HUGGINGFACE_API_KEY";

const promptInput = document.getElementById('prompt-input');
const sendButton = document.getElementById('send-button');
const loadingIndicator = document.getElementById('loading-indicator');
const resultBox = document.getElementById('result-box');
const resultContent = document.getElementById('result-content');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const imagePreviewImg = document.getElementById('preview-image');
const clearImageButton = document.getElementById('clear-image');

// Encode image as Base64
const base64EncodeImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

// Enhanced fetch with comprehensive error handling
const fetchWithRetry = async (url, options, retries = 3) => {
    let lastError;
    let delay = 1000;
    
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Attempting request to: ${url} (attempt ${i + 1})`);
            
            const response = await fetch(url, options);
            
            // Handle rate limiting
            if (response.status === 429) {
                console.warn(`Rate limited. Retry ${i+1}/${retries}`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2;
                continue;
            }
            
            // Handle server errors
            if (response.status >= 500) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }
            
            // Handle client errors (but don't retry)
            if (response.status >= 400) {
                const contentType = response.headers.get('content-type');
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                
                try {
                    if (contentType && contentType.includes('application/json')) {
                        const errorData = await response.json();
                        errorMessage = errorData.error || errorData.message || errorMessage;
                    } else {
                        const text = await response.text();
                        errorMessage = text || errorMessage;
                    }
                } catch (parseError) {
                    console.warn('Could not parse error response');
                }
                
                throw new Error(errorMessage);
            }
            
            return response;
            
        } catch (error) {
            lastError = error;
            console.error(`Request failed (attempt ${i + 1}):`, error.message);
            
            // Don't retry for certain errors
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                // This is likely a CORS issue - don't retry
                throw new Error('CORS or network error: Unable to connect to the API. This may be due to browser security restrictions.');
            }
            
            if (i === retries - 1) break;
            
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
        }
    }
    
    throw lastError;
};

// Handle send button
const handleSendPrompt = async () => {
    const prompt = promptInput.value.trim();
    const imageFile = fileInput.files[0];

    if (!prompt && !imageFile) return;

    resultBox.classList.add('hidden');
    resultContent.innerHTML = '';
    loadingIndicator.classList.remove('hidden');
    sendButton.disabled = true;

    try {
        const isImageGen = prompt.toLowerCase().includes('draw') || 
                           prompt.toLowerCase().includes('sketch') || 
                           prompt.toLowerCase().includes('generate image') ||
                           prompt.toLowerCase().includes('create image') ||
                           prompt.toLowerCase().includes('make image');

        if (isImageGen) {
            await handleImageGenerationWithHF(prompt);
        } else if (imageFile) {
            await handleImageAnalysis(prompt, imageFile);
        } else {
            await handleTextGeneration(prompt);
        }
    } catch (error) {
        console.error('Error:', error);
        displayError(error.message);
    } finally {
        loadingIndicator.classList.add('hidden');
        sendButton.disabled = false;
        clearImage();
        promptInput.value = '';
    }
};

// Enhanced error display function
const displayError = (errorMessage) => {
    const isCORSError = errorMessage.toLowerCase().includes('cors') || 
                       errorMessage.toLowerCase().includes('failed to fetch');
    
    let troubleshootingTips = `
        <div class="error-container">
            <p class="text-red-400 mb-3"><strong>Error:</strong> ${errorMessage}</p>
            <div class="troubleshooting-tips">
                <p class="text-yellow-400 text-sm mb-2"><strong>Troubleshooting Tips:</strong></p>
                <ul class="text-sm text-gray-300 list-disc ml-4 space-y-1">
    `;
    
    if (isCORSError) {
        troubleshootingTips += `
                    <li>This is a browser security restriction (CORS policy)</li>
                    <li>Try using a browser extension like "CORS Unblock" for testing</li>
                    <li>Consider deploying your app to a web server instead of opening locally</li>
                    <li>Use a backend proxy server to make API calls</li>
        `;
    } else {
        troubleshootingTips += `
                    <li>Check if your Hugging Face API key is valid</li>
                    <li>The model might be overloaded, try again in a few minutes</li>
                    <li>Try a simpler prompt</li>
                    <li>Check your internet connection</li>
        `;
    }
    
    troubleshootingTips += `
                    <li>Consider upgrading to Hugging Face Pro for better reliability</li>
                </ul>
            </div>
        </div>
    `;
    
    resultContent.innerHTML = troubleshootingTips;
    resultBox.classList.remove('hidden');
};

// Add this function to properly close the result box
function closeResultBox() {
    const resultBox = document.getElementById('result-box');
    if (resultBox) {
        resultBox.classList.add('hidden');
        
        // Optional: Clear the content to free up memory
        const resultContent = document.getElementById('result-content');
        if (resultContent) {
            
            const images = resultContent.querySelectorAll('img');
            images.forEach(img => {
                if (img.src.startsWith('blob:')) {
                    URL.revokeObjectURL(img.src);
                }
            });
            resultContent.innerHTML = '';
        }
    }
}
window.closeResultBox = closeResultBox;


// Fixed text generation with proper validation
const handleTextGeneration = async (prompt) => {
    const apiKey = config.getOpenAIKey();
    
    if (!apiKey) {
        throw new Error("Please provide a valid OpenAI API key.");
    }

    const payload = {
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ]
    };

     const response = await fetchWithRetry(TEXT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.choices?.length) {
        const text = result.choices[0].message.content;
        resultContent.innerHTML = `<pre class="whitespace-pre-wrap text-left p-4 bg-gray-800 rounded-lg">${text}</pre>`;
    } else {
        resultContent.textContent = "No response received. Please try again.";
    }
    resultBox.classList.remove('hidden');
};

// Fixed image analysis with proper validation
const handleImageAnalysis = async (prompt, imageFile) => {
    if (!API_KEY || API_KEY.trim() === "" || API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
        throw new Error("Please provide a valid OpenAI API key in the API_KEY variable.");
    }

    const base64ImageData = await base64EncodeImage(imageFile);
    const payload = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: prompt },
                    { 
                        type: "image_url", 
                        image_url: { 
                            url: `data:${imageFile.type};base64,${base64ImageData}` 
                        } 
                    }
                ]
            }
        ]
    };

    const response = await fetchWithRetry(TEXT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.choices?.length) {
        const text = result.choices[0].message.content;
        resultContent.innerHTML = `<div class="p-4 bg-gray-800 rounded-lg">${text}</div>`;
    } else {
        resultContent.textContent = "Could not analyze the image. Please try again.";
    }
    resultBox.classList.remove('hidden');
};

// Completely rewritten Hugging Face image generation with multiple fallbacks
const handleImageGenerationWithHF = async (prompt) => {
    const apiKey = config.getHuggingFaceKey();
    
    if (!apiKey) {
        throw new Error("Please provide a valid Hugging Face API key.");
    }
    

    resultContent.innerHTML = `
        <div class="text-center">
            <p class="text-yellow-400 mb-2">🎨 Generating image...</p>
            <p class="text-sm text-gray-400">This may take 10-30 seconds</p>
        </div>
    `;
    resultBox.classList.remove('hidden');

    let lastError;
    
    // Try each model as fallback
    for (let i = 0; i < HF_MODELS.length; i++) {
        const modelUrl = HF_MODELS[i];
        const modelName = modelUrl.split('/').pop();
        
        try {
            console.log(`Trying model: ${modelName}`);
            
            resultContent.innerHTML = `
                <div class="text-center">
                    <p class="text-yellow-400 mb-2">🎨 Trying model: ${modelName}</p>
                    <p class="text-sm text-gray-400">Attempt ${i + 1} of ${HF_MODELS.length}</p>
                </div>
            `;

            const response = await fetch(modelUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    inputs: prompt,
                    parameters: {
                        num_inference_steps: 20,
                        guidance_scale: 7.5
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Model ${modelName} failed: ${response.status} - ${errorText}`);
            }

            // Check if response is actually an image
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.startsWith('image/')) {
                // Try to parse as JSON to get error message
                const text = await response.text();
                try {
                    const errorData = JSON.parse(text);
                    throw new Error(errorData.error || 'Invalid response format');
                } catch (parseError) {
                    throw new Error(`Invalid response: ${text.substring(0, 200)}`);
                }
            }

            // Success! Handle the image
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            resultContent.innerHTML = `
                <div class="text-center">
                    <p class="text-green-400 mb-3">✅ Generated successfully with ${modelName}</p>
                    <p class="text-sm text-gray-400 mb-3">Prompt: "${prompt}"</p>
                    <img src="${imageUrl}" alt="Generated Image" 
                         class="rounded-lg shadow-lg mx-auto max-w-full border border-gray-500"
                         onload="this.style.opacity=1" style="opacity:0;transition:opacity 0.3s">
                    <p class="text-xs text-gray-500 mt-2">Right-click to save image</p>
                </div>
            `;
            
            // Success, exit the loop
            return;
            
        } catch (error) {
            console.error(`Model ${modelName} failed:`, error);
            lastError = error;
            
            // If this isn't the last model, continue to the next one
            if (i < HF_MODELS.length - 1) {
                continue;
            }
        }
    }
    
    // If we get here, all models failed
    throw new Error(`All image generation models failed. Last error: ${lastError.message}`);
};

// Event listeners
sendButton.addEventListener('click', handleSendPrompt);
promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendPrompt();
    }
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreviewImg.src = e.target.result;
            imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

clearImageButton.addEventListener('click', clearImage);

function clearImage() {
    imagePreview.classList.add('hidden');
    imagePreviewImg.src = '';
    fileInput.value = '';
}

// Initialize the app
console.log('🚀 AI Playground initialized');
console.log('💡 Make sure to add your OpenAI API key to the API_KEY variable');





        // FIXED: Contact Form with Proper Error Handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formNotification = document.getElementById('form-notification');

   if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!submitBtn || !formNotification) return;
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        submitBtn.disabled = true;
        formNotification.classList.add('hidden');

        try {
    
            const formData = new FormData(contactForm);
            
            const FORMSPREE_URL = 'https://formspree.io/f/xnnzoraz';
            
            // Send to Formspree
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                formNotification.innerHTML = '<i class="fas fa-check-circle mr-2 text-green-400"></i>Message sent successfully! I\'ll get back to you soon.';
                formNotification.className = 'mt-3 text-center text-green-400';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Error
            formNotification.innerHTML = '<i class="fas fa-exclamation-circle mr-2 text-red-400"></i>Failed to send message. Please try again or contact directly.';
            formNotification.className = 'mt-3 text-center text-red-400';
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            formNotification.classList.remove('hidden');

            // Hide notification after 5 seconds
            setTimeout(() => {
                formNotification.classList.add('hidden');
            }, 5000);
        }
    });
}

        // Initialize skill bar animations
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = '0';
            }
        });

        // Animate code lines sequentially
        const codeLines = document.querySelectorAll('.code-line');
        if (codeLines.length > 0) {
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, index * 200);
            });
        }

        // Global functions for inline event handlers
        window.nextQuestion = nextQuestion;
        window.resetQuiz = resetQuiz;
        window.resetPuzzle = resetPuzzle;
        window.resetMemoryGame = resetMemoryGame;

        console.log('Portfolio loaded successfully with all features working!');
        
  // ========================================
// RIGHT-CLICK PROTECTION & SECURITY
// ========================================

// Disable right-click context menu
