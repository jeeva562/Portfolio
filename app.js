 // FIXED: Initialize particles.js

          particlesJS('particles-js',
  
  {
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
    }
  
);


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

        // FIXED: Quiz Game with Proper State Management
        const quizQuestions = [
            {
                question: "What is the primary programming language for Flutter development?",
                options: ["JavaScript", "Dart", "Python", "Java"],
                answer: 1
            },
            {
                question: "Which widget is used to create a scrollable list in Flutter?",
                options: ["ListView", "Column", "Row", "Stack"],
                answer: 0
            },
            {
                question: "What command is used to run a Flutter app?",
                options: ["flutter start", "flutter run", "flutter launch", "flutter execute"],
                answer: 1
            },
            {
                question: "Which function is the entry point for a Flutter app?",
                options: ["main()", "init()", "runApp()", "start()"],
                answer: 0
            },
            {
                question: "What does the 'setState' method do in Flutter?",
                options: ["Updates the UI", "Creates a new state", "Destroys the widget", "Navigates to new page"],
                answer: 0
            }
        ];

        let currentQuizQuestion = 0;
        let quizScore = 0;
        let quizAnswered = false;

        const startQuizBtn = document.getElementById('start-quiz');
        const quizContainer = document.getElementById('quiz-container');
        const quizQuestion = document.getElementById('quiz-question');
        const quizOptions = document.getElementById('quiz-options');
        const quizResult = document.getElementById('quiz-result');
        const quizNext = document.getElementById('quiz-next');

        function startQuiz() {
            if (startQuizBtn) startQuizBtn.classList.add('hidden');
            if (quizContainer) quizContainer.classList.remove('hidden');
            currentQuizQuestion = 0;
            quizScore = 0;
            loadQuizQuestion();
        }

        function loadQuizQuestion() {
            quizAnswered = false;
            
            if (currentQuizQuestion >= quizQuestions.length) {
                // Quiz completed
                if (quizQuestion) {
                    quizQuestion.innerHTML = `
                        <div class="text-center">
                            <h3 class="text-2xl font-bold mb-4">Quiz Completed! 🎉</h3>
                            <p class="text-lg">Final Score: ${quizScore}/${quizQuestions.length}</p>
                        </div>
                    `;
                }
                if (quizOptions) {
                    quizOptions.innerHTML = `
                        <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
                            <div class="text-center">
                                ${quizScore === quizQuestions.length ? 
                                    '<p class="text-green-400 text-lg font-medium mb-2">🏆 Perfect Score!</p><p class="text-gray-300">You\'re a Flutter expert!</p>' :
                                    quizScore >= quizQuestions.length * 0.7 ?
                                    '<p class="text-blue-400 text-lg font-medium mb-2">🎯 Great Job!</p><p class="text-gray-300">You have solid Flutter knowledge!</p>' :
                                    '<p class="text-yellow-400 text-lg font-medium mb-2">📚 Keep Learning!</p><p class="text-gray-300">Practice makes perfect!</p>'
                                }
                                <button onclick="resetQuiz()" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                    Try Again
                                </button>
                            </div>
                        </div>
                    `;
                }
                if (quizResult) quizResult.classList.add('hidden');
                if (quizNext) quizNext.classList.add('hidden');
                return;
            }

            const question = quizQuestions[currentQuizQuestion];
            if (quizQuestion) {
                quizQuestion.innerHTML = `
                    <div class="mb-2">
                        <span class="text-sm text-gray-400">Question ${currentQuizQuestion + 1} of ${quizQuestions.length}</span>
                    </div>
                    <h3 class="text-lg font-medium">${question.question}</h3>
                `;
            }
            
            if (quizOptions) {
                let optionsHtml = '';
                question.options.forEach((option, index) => {
                    optionsHtml += `
                        <button class="quiz-option w-full text-left px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition border border-gray-700 hover:border-gray-600" data-index="${index}">
                            <span class="font-medium">${String.fromCharCode(65 + index)}.</span> ${option}
                        </button>
                    `;
                });
                quizOptions.innerHTML = optionsHtml;

                // Add click listeners to options
                document.querySelectorAll('.quiz-option').forEach(option => {
                    option.addEventListener('click', function() {
                        if (quizAnswered) return;
                        
                        const selectedIndex = parseInt(this.getAttribute('data-index'));
                        const correctIndex = question.answer;
                        quizAnswered = true;
                        
                        // Disable all options
                        document.querySelectorAll('.quiz-option').forEach(opt => {
                            opt.style.pointerEvents = 'none';
                            opt.classList.add('opacity-60');
                        });
                        
                        if (selectedIndex === correctIndex) {
                            this.classList.add('bg-green-500/20', 'border-green-500', 'text-green-400');
                            this.classList.remove('opacity-60');
                            if (quizResult) {
                                quizResult.innerHTML = '<p class="text-green-400"><i class="fas fa-check-circle mr-2"></i>Correct!</p>';
                                quizResult.classList.remove('hidden');
                            }
                            quizScore++;
                        } else {
                            this.classList.add('bg-red-500/20', 'border-red-500', 'text-red-400');
                            this.classList.remove('opacity-60');
                            // Highlight correct answer
                            const correctOption = document.querySelector(`.quiz-option[data-index="${correctIndex}"]`);
                            if (correctOption) {
                                correctOption.classList.add('bg-green-500/20', 'border-green-500', 'text-green-400');
                                correctOption.classList.remove('opacity-60');
                            }
                            if (quizResult) {
                                quizResult.innerHTML = '<p class="text-red-400"><i class="fas fa-times-circle mr-2"></i>Incorrect!</p>';
                                quizResult.classList.remove('hidden');
                            }
                        }
                        
                        if (quizNext) quizNext.classList.remove('hidden');
                    });
                });
            }
            
            if (quizResult) quizResult.classList.add('hidden');
            if (quizNext) quizNext.classList.add('hidden');
        }

        function nextQuestion() {
            currentQuizQuestion++;
            loadQuizQuestion();
        }

        function resetQuiz() {
            currentQuizQuestion = 0;
            quizScore = 0;
            if (startQuizBtn) startQuizBtn.classList.remove('hidden');
            if (quizContainer) quizContainer.classList.add('hidden');
        }

        // Event listeners
        if (startQuizBtn) startQuizBtn.addEventListener('click', startQuiz);
        if (quizNext) quizNext.addEventListener('click', nextQuestion);

        // FIXED: Code Puzzle Game
        const puzzleCode = `class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Temple Finder',
      home: TempleViewScreen(),
    );
  }
}`;

        const startPuzzleBtn = document.getElementById('start-puzzle');
        const puzzleContainer = document.getElementById('puzzle-container');
        const puzzlePieces = document.getElementById('puzzle-pieces');
        const puzzleFeedback = document.getElementById('puzzle-feedback');
        const puzzleCheck = document.getElementById('puzzle-check');

        function startPuzzle() {
            if (startPuzzleBtn) startPuzzleBtn.classList.add('hidden');
            if (puzzleContainer) puzzleContainer.classList.remove('hidden');
            
            // Shuffle the code lines
            const codeLines = puzzleCode.split('\n').filter(line => line.trim() !== '');
            const shuffledLines = [...codeLines].sort(() => Math.random() - 0.5);
            
            if (puzzlePieces) {
                let piecesHtml = '';
                shuffledLines.forEach((line, index) => {
                    piecesHtml += `
                        <div class="puzzle-piece bg-gray-800/50 p-3 rounded-lg border border-gray-700 cursor-move hover:bg-gray-700/50 transition" draggable="true" data-line="${line.trim()}" data-order="${index}">
                            <code class="text-sm font-mono text-gray-300">${line}</code>
                        </div>
                    `;
                });
                puzzlePieces.innerHTML = piecesHtml;

                // Make puzzle pieces draggable
                initDragAndDrop();
            }
            
            if (puzzleFeedback) puzzleFeedback.classList.add('hidden');
        }

        function initDragAndDrop() {
            const pieces = document.querySelectorAll('.puzzle-piece');
            let draggedPiece = null;
            
            pieces.forEach(piece => {
                piece.addEventListener('dragstart', function() {
                    draggedPiece = this;
                    this.style.opacity = '0.5';
                });
                
                piece.addEventListener('dragend', function() {
                    this.style.opacity = '1';
                    draggedPiece = null;
                });
                
                piece.addEventListener('dragover', function(e) {
                    e.preventDefault();
                });
                
                piece.addEventListener('drop', function(e) {
                    e.preventDefault();
                    if (draggedPiece && draggedPiece !== this) {
                        // Swap the pieces
                        const tempHTML = this.innerHTML;
                        const tempLine = this.dataset.line;
                        
                        this.innerHTML = draggedPiece.innerHTML;
                        this.dataset.line = draggedPiece.dataset.line;
                        
                        draggedPiece.innerHTML = tempHTML;
                        draggedPiece.dataset.line = tempLine;
                    }
                });
            });
        }

        function checkPuzzleSolution() {
            const pieces = document.querySelectorAll('.puzzle-piece');
            const userSolution = Array.from(pieces).map(piece => piece.dataset.line).join('\n');
            const correctSolution = puzzleCode.split('\n').filter(line => line.trim() !== '').join('\n');
            
            if (puzzleFeedback) {
                if (userSolution === correctSolution) {
                    puzzleFeedback.innerHTML = `
                        <div class="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                            <p class="text-green-400 font-medium"><i class="fas fa-check-circle mr-2"></i>Perfect! Code arranged correctly!</p>
                            <button onclick="resetPuzzle()" class="mt-2 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition">
                                Try Another Puzzle
                            </button>
                        </div>
                    `;
                } else {
                    puzzleFeedback.innerHTML = `
                        <div class="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                            <p class="text-red-400 font-medium"><i class="fas fa-times-circle mr-2"></i>Not quite right. Keep trying!</p>
                            <p class="text-gray-400 text-sm mt-1">Hint: Think about the logical order of Flutter widget construction.</p>
                        </div>
                    `;
                }
                puzzleFeedback.classList.remove('hidden');
            }
        }

        function resetPuzzle() {
            if (startPuzzleBtn) startPuzzleBtn.classList.remove('hidden');
            if (puzzleContainer) puzzleContainer.classList.add('hidden');
        }

        // Event listeners for puzzle
        if (startPuzzleBtn) startPuzzleBtn.addEventListener('click', startPuzzle);
        if (puzzleCheck) puzzleCheck.addEventListener('click', checkPuzzleSolution);

        // FIXED: Memory Game with Proper Animation
        const memoryCards = [
            { icon: '<i class="fas fa-code"></i>', name: 'Code', id: 'code' },
            { icon: '<i class="fas fa-terminal"></i>', name: 'Terminal', id: 'terminal' },
            { icon: '<i class="fas fa-database"></i>', name: 'Database', id: 'database' },
            { icon: '<i class="fas fa-server"></i>', name: 'Server', id: 'server' },
            { icon: '<i class="fas fa-cloud"></i>', name: 'Cloud', id: 'cloud' },
            { icon: '<i class="fas fa-mobile-alt"></i>', name: 'Mobile', id: 'mobile' },
            { icon: '<i class="fas fa-desktop"></i>', name: 'Desktop', id: 'desktop' },
            { icon: '<i class="fas fa-globe"></i>', name: 'Web', id: 'web' }
        ];

        let memoryGameCards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let canFlip = true;

        const startMemoryBtn = document.getElementById('start-memory');
        const memoryGame = document.getElementById('memory-game');
        const memoryBoard = document.getElementById('memory-board');
        const memoryScore = document.getElementById('memory-score');
        const memoryReset = document.getElementById('memory-reset');

        function startMemoryGame() {
            if (startMemoryBtn) startMemoryBtn.classList.add('hidden');
            if (memoryGame) memoryGame.classList.remove('hidden');
            initializeMemoryGame();
        }

        function initializeMemoryGame() {
            // Create pairs and shuffle
            memoryGameCards = [...memoryCards, ...memoryCards]
                .sort(() => Math.random() - 0.5)
                .map((card, index) => ({ ...card, gameId: index, matched: false }));
            
            if (memoryBoard) {
                memoryBoard.innerHTML = '';
                
                memoryGameCards.forEach((card, index) => {
                    const cardElement = document.createElement('div');
                    cardElement.className = 'memory-card aspect-square cursor-pointer';
                    cardElement.dataset.gameId = card.gameId;
                    cardElement.dataset.cardId = card.id;
                    
                    cardElement.innerHTML = `
                        <div class="card-inner w-full h-full">
                            <div class="front w-full h-full bg-gradient-to-br from-blue-900/50 to-blue-500/50 rounded-lg border border-blue-500/30">
                                <i class="fas fa-question text-white text-2xl"></i>
                            </div>
                            <div class="back w-full h-full bg-gradient-to-br from-purple-900/50 to-purple-500/50 rounded-lg border border-purple-500/30 text-white">
                                ${card.icon}
                                <span class="text-xs mt-1">${card.name}</span>
                            </div>
                        </div>
                    `;
                    
                    cardElement.addEventListener('click', () => flipMemoryCard(index));
                    memoryBoard.appendChild(cardElement);
                });
            }
            
            flippedCards = [];
            matchedPairs = 0;
            canFlip = true;
            updateMemoryScore();
        }

        function flipMemoryCard(index) {
            if (!canFlip || memoryGameCards[index].matched) return;
            
            const cardElement = document.querySelector(`[data-game-id="${memoryGameCards[index].gameId}"]`);
            if (!cardElement || cardElement.classList.contains('flipped')) return;
            
            if (flippedCards.length < 2) {
                cardElement.classList.add('flipped');
                flippedCards.push(index);
                
                if (flippedCards.length === 2) {
                    canFlip = false;
                    setTimeout(checkMemoryMatch, 800);
                }
            }
        }

        function checkMemoryMatch() {
            const [index1, index2] = flippedCards;
            const card1 = memoryGameCards[index1];
            const card2 = memoryGameCards[index2];
            
            const cardElement1 = document.querySelector(`[data-game-id="${card1.gameId}"]`);
            const cardElement2 = document.querySelector(`[data-game-id="${card2.gameId}"]`);
            
            if (card1.id === card2.id) {
                // Match found
                card1.matched = true;
                card2.matched = true;
                matchedPairs++;
                updateMemoryScore();
                
                // Add matched styling
                cardElement1.style.opacity = '0.7';
                cardElement2.style.opacity = '0.7';
                cardElement1.style.pointerEvents = 'none';
                cardElement2.style.pointerEvents = 'none';
                
                if (matchedPairs === memoryCards.length) {
                    setTimeout(() => {
                        if (memoryBoard) {
                            memoryBoard.innerHTML = `
                                <div class="col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-900/20 to-green-500/20 rounded-lg border border-green-500/30">
                                    <i class="fas fa-trophy text-yellow-400 text-5xl mb-4 animate-bounce"></i>
                                    <h4 class="font-bold text-2xl text-green-400 mb-2">Congratulations!</h4>
                                    <p class="text-gray-300 text-center mb-4">You matched all pairs! 🎉</p>
                                    <button onclick="resetMemoryGame()" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                                        Play Again
                                    </button>
                                </div>
                            `;
                        }
                    }, 1000);
                }
            } else {
                // No match
                setTimeout(() => {
                    cardElement1.classList.remove('flipped');
                    cardElement2.classList.remove('flipped');
                }, 500);
            }
            
            flippedCards = [];
            canFlip = true;
        }

        function updateMemoryScore() {
            if (memoryScore) {
                memoryScore.textContent = `Pairs found: ${matchedPairs}/${memoryCards.length}`;
            }
        }

        function resetMemoryGame() {
            if (startMemoryBtn) startMemoryBtn.classList.remove('hidden');
            if (memoryGame) memoryGame.classList.add('hidden');
        }

        // Event listeners for memory game
        if (startMemoryBtn) startMemoryBtn.addEventListener('click', startMemoryGame);
        if (memoryReset) memoryReset.addEventListener('click', initializeMemoryGame);

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
            // Get form data
            const formData = new FormData(contactForm);
            
            // REPLACE THIS URL WITH YOUR ACTUAL FORMSPREE ENDPOINT
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
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
    // Optional: Show custom message
    showProtectionMessage('Right-click is disabled');
    
    return false;
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener('keydown', function(e) {
    // F12 (Developer Tools)
    if (e.keyCode === 123) {
        e.preventDefault();
        showProtectionMessage('Developer tools are disabled');
        return false;
    }
    
    // Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        showProtectionMessage('Developer tools are disabled');
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        showProtectionMessage('Console access is disabled');
        return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        showProtectionMessage('View source is disabled');
        return false;
    }
    
    // Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        showProtectionMessage('Element inspector is disabled');
        return false;
    }
    
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        showProtectionMessage('Saving page is disabled');
        return false;
    }
});

// Disable text selection (optional)
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Disable drag and drop
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Custom protection message display
function showProtectionMessage(message) {
    // Remove existing message if any
    const existingMessage = document.getElementById('protection-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new message
    const messageDiv = document.createElement('div');
    messageDiv.id = 'protection-message';
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        ">
            <i class="fas fa-shield-alt mr-2"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// Add CSS for the slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    /* Disable text selection globally */
    * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    /* Allow selection for input fields */
    input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
    }
`;
document.head.appendChild(style);

// Advanced protection: Detect developer tools opening
let devtools = {
    open: false,
    orientation: null
};

// Check if developer tools are open
setInterval(function() {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
            devtools.open = true;
            // Optional: Redirect or show warning
            showProtectionMessage('Developer tools detected!');
            // Uncomment to redirect: window.location.href = "about:blank";
        }
    } else {
        devtools.open = false;
    }
}, 500);

// Console warning message
console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers. Content on this page is protected.', 'color: red; font-size: 16px;');

// Disable print
window.addEventListener('beforeprint', function(e) {
    e.preventDefault();
    showProtectionMessage('Printing is disabled');
    return false;
});

// Disable save shortcut
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
        e.preventDefault();
        showProtectionMessage('Saving is disabled');
        return false;
    }
});

// Protection for mobile devices
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault(); // Disable multi-touch gestures
    }
});

// Disable image dragging
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
    });
});

console.log('🔒 Right-click protection and security measures activated');