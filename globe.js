 document.addEventListener('DOMContentLoaded', () => {
            // Configuration
            const config = {
                autoRotate: true,
                rotationSpeed: 0.2,
                enableZoom: true,
                enablePan: true,
                reduceMotion: false,
                isMobile: window.innerWidth <= 768
            };
            
            // Elements
            const canvas = document.getElementById('earth-globe');
            const loadingOverlay = document.getElementById('loading');
            const reduceMotionBtn = document.getElementById('reduce-motion');
            const toggleRotationBtn = document.getElementById('toggle-rotation');
            const zoomInBtn = document.getElementById('zoom-in');
            const zoomOutBtn = document.getElementById('zoom-out');
            
            // Scene setup
            const scene = new THREE.Scene();
            
            // Adjust camera for mobile
            const camera = new THREE.PerspectiveCamera(
                45, 
                canvas.clientWidth / canvas.clientHeight, 
                0.1, 
                1000
            );
            
            // Position camera differently for mobile
            if (config.isMobile) {
                camera.position.z = 4.5;
            } else {
                camera.position.z = 3.5;
            }
            
            const renderer = new THREE.WebGLRenderer({ 
                canvas: canvas, 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.isMobile ? 1.5 : 2));
            
            // Set initial renderer size
            updateRendererSize();
            
            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);
            
            const sunLight = new THREE.DirectionalLight(0xffffff, 1);
            sunLight.position.set(5, 3, 5);
            scene.add(sunLight);
            
            // Earth group
            const earthGroup = new THREE.Group();
            scene.add(earthGroup);
            
            // Create Earth
            const createEarth = () => {
                // Adjust geometry detail for mobile
                const segments = config.isMobile ? 48 : 64;
                
                // Earth sphere
                const earthGeometry = new THREE.SphereGeometry(1, segments, segments);
                
                // Load textures
                const textureLoader = new THREE.TextureLoader();
                
                const earthTexture = textureLoader.load(EARTH_TEXTURE, () => {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 500);
                });
                
                const earthBump = textureLoader.load(EARTH_BUMP);
                const earthSpec = textureLoader.load(EARTH_SPEC);
                const cloudTexture = textureLoader.load(CLOUD_TEXTURE);
                
                // Earth material
                const earthMaterial = new THREE.MeshPhongMaterial({
                    map: earthTexture,
                    bumpMap: earthBump,
                    bumpScale: config.isMobile ? 0.03 : 0.05,
                    specularMap: earthSpec,
                    specular: new THREE.Color(0x333333),
                    shininess: 5
                });
                
                const earth = new THREE.Mesh(earthGeometry, earthMaterial);
                earthGroup.add(earth);
                
                // Clouds
                const cloudGeometry = new THREE.SphereGeometry(1.005, segments, segments);
                const cloudMaterial = new THREE.MeshPhongMaterial({
                    map: cloudTexture,
                    transparent: true,
                    opacity: 0.8
                });
                
                const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
                earthGroup.add(clouds);
                
                // Stars - fewer on mobile
                const starCount = config.isMobile ? 2000 : 5000;
                const starGeometry = new THREE.BufferGeometry();
                const starVertices = [];
                
                for (let i = 0; i < starCount; i++) {
                    const x = (Math.random() - 0.5) * 2000;
                    const y = (Math.random() - 0.5) * 2000;
                    const z = (Math.random() - 0.5) * 2000;
                    
                    starVertices.push(x, y, z);
                }
                
                starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
                
                const starMaterial = new THREE.PointsMaterial({
                    color: 0xffffff,
                    size: config.isMobile ? 1.0 : 1.2,
                    sizeAttenuation: true
                });
                
                const stars = new THREE.Points(starGeometry, starMaterial);
                scene.add(stars);
                
                return { earth, clouds };
            };
            
            // Initialize earth
            const { earth, clouds } = createEarth();
            
            // Controls
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.screenSpacePanning = false;
            controls.minDistance = config.isMobile ? 2.5 : 2.0;
            controls.maxDistance = config.isMobile ? 7.0 : 8.0;
            controls.enablePan = config.enablePan;
            controls.enableZoom = config.enableZoom;
            
            // Mouse movement tracking
            let mouseX = 0;
            let mouseY = 0;
            let targetRotationX = 0;
            let targetRotationY = 0;
            
            const onMouseMove = (event) => {
                if (config.reduceMotion) return;
                
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = (event.clientY / window.innerHeight) * 2 - 1;
                
                targetRotationY = mouseX * 0.5;
                targetRotationX = mouseY * 0.2;
            };
            
            window.addEventListener('mousemove', onMouseMove);
            
            // Touch events for mobile
            const onTouchMove = (event) => {
                if (config.reduceMotion) return;
                
                if (event.touches.length === 1) {
                    mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
                    mouseY = (event.touches[0].clientY / window.innerHeight) * 2 - 1;
                    
                    targetRotationY = mouseX * 0.5;
                    targetRotationX = mouseY * 0.2;
                }
            };
            
            window.addEventListener('touchmove', onTouchMove, { passive: true });
            
            // Function to update renderer size
            function updateRendererSize() {
                const width = canvas.clientWidth;
                const height = canvas.clientHeight;
                
                // Check if device pixel ratio has changed
                const pixelRatio = Math.min(window.devicePixelRatio, config.isMobile ? 1.5 : 2);
                
                // Only update if dimensions or pixel ratio have changed
                if (canvas.width !== width || canvas.height !== height || renderer.getPixelRatio() !== pixelRatio) {
                    renderer.setSize(width, height, false);
                    renderer.setPixelRatio(pixelRatio);
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                }
            }
            
            // Handle window resize
            const onWindowResize = () => {
                // Update config for mobile detection
                config.isMobile = window.innerWidth <= 768;
                
                // Update renderer size
                updateRendererSize();
            };
            
            window.addEventListener('resize', onWindowResize);
            
            // Mobile zoom controls
            zoomInBtn.addEventListener('click', () => {
                camera.position.z -= 0.5;
                if (camera.position.z < controls.minDistance) {
                    camera.position.z = controls.minDistance;
                }
            });
            
            zoomOutBtn.addEventListener('click', () => {
                camera.position.z += 0.5;
                if (camera.position.z > controls.maxDistance) {
                    camera.position.z = controls.maxDistance;
                }
            });
            
            // Accessibility controls
            reduceMotionBtn.addEventListener('click', () => {
                config.reduceMotion = !config.reduceMotion;
                reduceMotionBtn.innerHTML = config.reduceMotion ? 
                    '<i class="fas fa-wheelchair"></i> Reduced Motion' : 
                    '<i class="fas fa-running"></i> Reduce Motion';
                
                if (config.reduceMotion) {
                    config.autoRotate = false;
                    toggleRotationBtn.innerHTML = '<i class="fas fa-play"></i> Start Rotation';
                }
            });
            
            toggleRotationBtn.addEventListener('click', () => {
                config.autoRotate = !config.autoRotate;
                toggleRotationBtn.innerHTML = config.autoRotate ? 
                    '<i class="fas fa-pause"></i> Pause Rotation' : 
                    '<i class="fas fa-play"></i> Start Rotation';
            });
            
            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                
                // Smooth rotation towards target
                earthGroup.rotation.y += (targetRotationY - earthGroup.rotation.y) * 0.05;
                earthGroup.rotation.x += (targetRotationX - earthGroup.rotation.x) * 0.05;
                
                // Auto-rotation
                if (config.autoRotate && !config.reduceMotion) {
                    earthGroup.rotation.y += 0.001 * config.rotationSpeed;
                }
                
                // Cloud rotation
                if (clouds) {
                    clouds.rotation.y += 0.0005;
                }
                
                controls.update();
                renderer.render(scene, camera);
            };
            
            animate();
            
            // Initial size update
            setTimeout(updateRendererSize, 100);
        });