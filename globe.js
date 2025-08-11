 import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/dist/cobe.esm.js';

        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            initializeGlobe();
        });

        function initializeGlobe() {
            const canvas = document.getElementById('globe-canvas');
            const toggleBtn = document.getElementById('toggle-rotation');
            const rotationIcon = document.getElementById('rotation-icon');
            const rotationText = document.getElementById('rotation-text');
            const globeContainer = document.getElementById('globe-container');
            const loadingIndicator = document.getElementById('loading-indicator');

            // Performance and state variables
            const DPR = Math.min(2, window.devicePixelRatio || 1);
            let widthPx;
            let globe = null;

            // Rotation state
            let phi = 0;          // Y-axis rotation
            let theta = 0.3;      // X-axis rotation (slight tilt)
            let targetPhi = 0;
            let targetTheta = 0.3;

            // Interaction state
            let pointerDown = false;
            let startX = 0, startY = 0, startPhi = 0, startTheta = 0;

            // Auto-rotation respects user's motion preferences
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let autoRotate = !prefersReduced;
            const ROTATION_SPEED = 0.005; // radians per frame

            console.log('Initializing globe...', { prefersReduced, autoRotate });

            // Resize function
            function resizeCanvas() {
                const container = canvas.parentElement;
                const rect = container.getBoundingClientRect();
                const size = Math.min(rect.width, rect.height);
                
                widthPx = size * DPR;
                canvas.width = widthPx;
                canvas.height = widthPx;
                canvas.style.width = `${size}px`;
                canvas.style.height = `${size}px`;

                // Resize the globe if it exists
                if (globe && globe.resize) {
                    globe.resize(widthPx, widthPx);
                }
            }

            // Create the globe
            function createGlobeInstance() {
                try {
                    console.log('Creating COBE globe...');
                    
                    globe = createGlobe(canvas, {
                        devicePixelRatio: DPR,
                        width: widthPx,
                        height: widthPx,
                        phi: 0,
                        theta: 0,
                        dark: window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0,
                        diffuse: 1.2,
                        mapSamples: 16000,
                        mapBrightness: 6,
                        baseColor: [0.3, 0.3, 0.3],
                        markerColor: [1, 0.5, 1],
                        glowColor: [1, 1, 1],
                        markers: [
                            // Add some city markers for visual interest
                            { location: [40.7128, -74.0060], size: 0.05 }, // New York
                            { location: [51.5074, -0.1278], size: 0.05 },  // London  
                            { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
                            { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
                            { location: [28.6139, 77.2090], size: 0.05 },   // Delhi
                        ],
                        onRender: (state) => {
                            // Auto-rotate if enabled and not interacting
                            if (autoRotate && !pointerDown) {
                                targetPhi += ROTATION_SPEED;
                            }
                            
                            // Smooth interpolation to target values
                            phi += (targetPhi - phi) * 0.08;
                            theta += (targetTheta - theta) * 0.08;
                            
                            // Update state
                            state.phi = phi;
                            state.theta = theta;
                        }
                    });

                    console.log('Globe created successfully');
                    
                    // Hide loading indicator
                    globeContainer.classList.add('globe-loaded');
                    
                } catch (error) {
                    console.error('Failed to create globe:', error);
                    showError('Failed to load the 3D globe. Please refresh the page.');
                }
            }

            // Error handling
            function showError(message) {
                loadingIndicator.innerHTML = `
                    <div class="text-center text-red-400">
                        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                        <p>${message}</p>
                        <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
                            Refresh Page
                        </button>
                    </div>
                `;
            }

            // Initialize canvas size and create globe
            resizeCanvas();
            createGlobeInstance();

            // Handle window resize
            window.addEventListener('resize', resizeCanvas);

            // Pointer/mouse interaction
            canvas.addEventListener('pointerdown', (e) => {
                pointerDown = true;
                startX = e.clientX;
                startY = e.clientY;
                startPhi = targetPhi;
                startTheta = targetTheta;
                canvas.setPointerCapture(e.pointerId);
                canvas.style.cursor = 'grabbing';
            });

            canvas.addEventListener('pointermove', (e) => {
                if (!pointerDown) return;
                
                const deltaX = (e.clientX - startX) / canvas.clientWidth;
                const deltaY = (e.clientY - startY) / canvas.clientHeight;
                
                targetPhi = startPhi + deltaX * Math.PI * 2;
                targetTheta = Math.max(
                    -Math.PI / 2, 
                    Math.min(Math.PI / 2, startTheta + deltaY * Math.PI)
                );
            });

            // End pointer interaction
            function endPointerInteraction() {
                pointerDown = false;
                canvas.style.cursor = 'grab';
            }

            canvas.addEventListener('pointerup', endPointerInteraction);
            canvas.addEventListener('pointerleave', endPointerInteraction);
            canvas.addEventListener('pointercancel', endPointerInteraction);

            // Keyboard controls
            canvas.addEventListener('keydown', (e) => {
                const step = 0.25;
                let handled = true;
                
                switch (e.key) {
                    case 'ArrowLeft':
                        targetPhi -= step;
                        break;
                    case 'ArrowRight':
                        targetPhi += step;
                        break;
                    case 'ArrowUp':
                        targetTheta = Math.max(-Math.PI / 2, targetTheta - step);
                        break;
                    case 'ArrowDown':
                        targetTheta = Math.min(Math.PI / 2, targetTheta + step);
                        break;
                    case ' ':
                    case 'Enter':
                        toggleRotation();
                        break;
                    default:
                        handled = false;
                }
                
                if (handled) {
                    e.preventDefault();
                }
            });

            // Toggle rotation function
            function toggleRotation() {
                autoRotate = !autoRotate;
                updateToggleButton();
            }

            // Update toggle button
            function updateToggleButton() {
                const isPaused = !autoRotate;
                toggleBtn.setAttribute('aria-pressed', autoRotate.toString());
                rotationIcon.className = isPaused ? 'fas fa-play' : 'fas fa-pause';
                rotationText.textContent = isPaused ? 'Resume Rotation' : 'Pause Rotation';
            }

            // Button click handler
            toggleBtn.addEventListener('click', toggleRotation);

            // Initialize button state
            updateToggleButton();

            // Handle form submission (optional enhancement)
            const contactForm = document.getElementById('contact-form');
            const submitBtn = document.getElementById('submit-btn');
            const notification = document.getElementById('form-notification');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulate form submission
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane ml-2"></i>';
                    
                    notification.className = 'mt-3 text-center text-green-400';
                    notification.textContent = 'Message sent successfully! (Demo mode)';
                    notification.classList.remove('hidden');
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        notification.classList.add('hidden');
                    }, 5000);
                }, 2000);
            });

            console.log('Globe initialization complete');
        }