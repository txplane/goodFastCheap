class ProjectTriangle {
    constructor() {
        this.selectedAttributes = new Set();
        this.maxSelections = 2;
        
        this.scenarios = {
            'good,fast': {
                title: 'Good + Fast = Expensive',
                description: 'You\'ll get high quality delivered quickly, but it will cost significantly more.',
                examples: [
                    {
                        title: 'Software Development',
                        description: 'Hiring senior developers and working overtime to deliver a polished app on tight deadlines.',
                        color: 'var(--good-color)'
                    },
                    {
                        title: 'Manufacturing',
                        description: 'Rush orders with premium materials require expedited shipping and overtime labor.',
                        color: 'var(--fast-color)'
                    },
                    {
                        title: 'Consulting Services',
                        description: 'Top-tier consultants working around the clock to meet your deadline.',
                        color: 'var(--good-color)'
                    }
                ]
            },
            'good,cheap': {
                title: 'Good + Cheap = Slow',
                description: 'You\'ll get high quality at a low cost, but it will take much longer to complete.',
                examples: [
                    {
                        title: 'Software Development',
                        description: 'A small team of skilled developers working part-time on your project over many months.',
                        color: 'var(--good-color)'
                    },
                    {
                        title: 'Construction',
                        description: 'Quality craftsmanship using budget materials, with work done during slow seasons.',
                        color: 'var(--cheap-color)'
                    },
                    {
                        title: 'Custom Manufacturing',
                        description: 'Artisanal production with careful attention to detail but no rush fees.',
                        color: 'var(--good-color)'
                    }
                ]
            },
            'fast,cheap': {
                title: 'Fast + Cheap = Poor Quality',
                description: 'You\'ll get it quickly and affordably, but quality will be compromised.',
                examples: [
                    {
                        title: 'Software Development',
                        description: 'Quick MVP with minimal testing, basic UI, and potential technical debt.',
                        color: 'var(--fast-color)'
                    },
                    {
                        title: 'Manufacturing',
                        description: 'Mass-produced items with cheaper materials and minimal quality control.',
                        color: 'var(--cheap-color)'
                    },
                    {
                        title: 'Services',
                        description: 'Junior staff or automated solutions with limited customization.',
                        color: 'var(--fast-color)'
                    }
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
    }
    
    bindEvents() {
        // Checkbox event listeners
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e));
        });
        
        // Triangle vertex click events
        const vertices = document.querySelectorAll('.vertex');
        vertices.forEach(vertex => {
            vertex.addEventListener('click', (e) => this.handleVertexClick(e));
        });
    }
    
    handleCheckboxChange(event) {
        const attribute = event.target.dataset.attribute;
        
        if (event.target.checked) {
            if (this.selectedAttributes.size >= this.maxSelections) {
                // Prevent selecting more than 2
                event.target.checked = false;
                this.showMaxSelectionWarning();
                return;
            }
            this.selectedAttributes.add(attribute);
        } else {
            this.selectedAttributes.delete(attribute);
        }
        
        this.updateDisplay();
    }
    
    handleVertexClick(event) {
        const attribute = event.currentTarget.dataset.attribute;
        const checkbox = document.getElementById(`${attribute}-checkbox`);
        
        if (this.selectedAttributes.has(attribute)) {
            // Deselect
            checkbox.checked = false;
            this.selectedAttributes.delete(attribute);
        } else {
            // Select if under limit
            if (this.selectedAttributes.size >= this.maxSelections) {
                this.showMaxSelectionWarning();
                return;
            }
            checkbox.checked = true;
            this.selectedAttributes.add(attribute);
        }
        
        this.updateDisplay();
    }
    
    showMaxSelectionWarning() {
        const resultCard = document.getElementById('result-card');
        const originalBg = resultCard.style.background;
        
        resultCard.style.background = 'linear-gradient(135deg, #ff6b6b, #ffa726)';
        resultCard.style.color = 'white';
        
        document.getElementById('result-title').textContent = 'Maximum 2 Selections!';
        document.getElementById('result-description').textContent = 'The triangle principle: you can only optimize for two attributes at once.';
        document.getElementById('result-examples').innerHTML = '';
        
        setTimeout(() => {
            resultCard.style.background = originalBg;
            resultCard.style.color = '';
            this.updateDisplay();
        }, 2000);
    }
    
    updateDisplay() {
        this.updateTriangleVisuals();
        this.updateResultCard();
    }
    
    updateTriangleVisuals() {
        const vertices = document.querySelectorAll('.vertex');
        const triangleCenter = document.querySelector('.triangle-center');
        
        vertices.forEach(vertex => {
            const attribute = vertex.dataset.attribute;
            if (this.selectedAttributes.has(attribute)) {
                vertex.classList.add('selected');
            } else {
                vertex.classList.remove('selected');
            }
        });
        
        // Update center based on selections
        if (this.selectedAttributes.size === 3) {
            triangleCenter.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            triangleCenter.style.transform = 'translate(-50%, -50%) scale(1.2)';
        } else if (this.selectedAttributes.size === 2) {
            triangleCenter.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            triangleCenter.innerHTML = `
                <div class="possible-zone">
                    <span style="font-size: 1.5rem; display: block; margin-bottom: 0.2rem;">✓</span>
                    <span style="font-size: 0.7rem; color: white; font-weight: bold;">Achievable</span>
                </div>
            `;
            triangleCenter.style.transform = 'translate(-50%, -50%) scale(1.1)';
        } else {
            triangleCenter.style.background = 'rgba(255, 255, 255, 0.9)';
            triangleCenter.innerHTML = `
                <div class="impossible-zone">
                    <span>❌</span>
                    <span>Impossible</span>
                </div>
            `;
            triangleCenter.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }
    
    updateResultCard() {
        const titleEl = document.getElementById('result-title');
        const descriptionEl = document.getElementById('result-description');
        const examplesEl = document.getElementById('result-examples');
        
        if (this.selectedAttributes.size === 0) {
            titleEl.textContent = 'Select your priorities above';
            descriptionEl.textContent = 'Choose up to two attributes to see what trade-offs you\'ll need to make.';
            examplesEl.innerHTML = '';
        } else if (this.selectedAttributes.size === 1) {
            const selected = Array.from(this.selectedAttributes)[0];
            titleEl.textContent = `You've chosen: ${selected.toUpperCase()}`;
            descriptionEl.textContent = 'Select one more attribute to see the trade-offs and real-world implications.';
            examplesEl.innerHTML = '';
        } else if (this.selectedAttributes.size === 2) {
            const selectedArray = Array.from(this.selectedAttributes).sort();
            const scenarioKey = selectedArray.join(',');
            const scenario = this.scenarios[scenarioKey];
            
            if (scenario) {
                titleEl.textContent = scenario.title;
                descriptionEl.textContent = scenario.description;
                
                examplesEl.innerHTML = scenario.examples.map(example => `
                    <div class="example-item" style="border-left-color: ${example.color}">
                        <h5>${example.title}</h5>
                        <p>${example.description}</p>
                    </div>
                `).join('');
            }
        } else {
            titleEl.textContent = 'That\'s Impossible!';
            descriptionEl.textContent = 'You cannot optimize for all three attributes simultaneously. This is the fundamental constraint of the project triangle.';
            examplesEl.innerHTML = `
                <div class="example-item" style="border-left-color: #e74c3c; background: rgba(231, 76, 60, 0.1);">
                    <h5>Why This Doesn't Work</h5>
                    <p>Resources are finite. Attempting to maximize all three typically results in failure in all areas, budget overruns, missed deadlines, or compromised quality.</p>
                </div>
            `;
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectTriangle();
});

// Add some visual flair with particle effects (optional enhancement)
class ParticleEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.setupCanvas();
        this.createParticles();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        document.body.appendChild(this.canvas);
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Add particle effect after a short delay
setTimeout(() => {
    new ParticleEffect();
}, 1000);
