// Indian forensic data templates
const forensicData = {
    fingerprint: {
        positive: {
            status: "MATCH FOUND",
            details: "Fingerprint matched with NAFIS (National Automated Fingerprint Identification System) database",
            confidence: () => (Math.random() * 8 + 92).toFixed(1),
            pattern: ["Whorl", "Loop", "Arch", "Tented Arch"][Math.floor(Math.random() * 4)],
            minutiae: () => Math.floor(Math.random() * 15 + 15),
            quality: ["Excellent", "Very Good", "Good"][Math.floor(Math.random() * 3)],
            database: "NAFIS Database",
            location: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"][Math.floor(Math.random() * 10)],
            caseId: () => `FIR/${Math.floor(Math.random() * 9000 + 1000)}/${new Date().getFullYear()}`
        },
        negative: {
            status: "NO MATCH FOUND",
            details: "Fingerprint not found in any Indian forensic database",
            confidence: () => (Math.random() * 20 + 5).toFixed(1),
            pattern: ["Unclassified", "Partial", "Smudged"][Math.floor(Math.random() * 3)],
            minutiae: () => Math.floor(Math.random() * 10 + 5),
            quality: ["Poor", "Very Poor", "Insufficient"][Math.floor(Math.random() * 3)],
            database: "No Database Match",
            location: "Unknown",
            caseId: "N/A"
        }
    },
    dna: {
        positive: {
            status: "DNA PROFILE MATCH",
            details: "DNA matched with CODIS-India database",
            confidence: () => (Math.random() * 2 + 98).toFixed(1),
            sequence: () => Math.floor(Math.random() * 2000 + 3000),
            gcContent: () => (Math.random() * 15 + 35).toFixed(1),
            quality: "Q40+",
            database: "CODIS-India",
            state: ["Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Gujarat", "Rajasthan", "West Bengal", "Andhra Pradesh", "Telangana", "Madhya Pradesh"][Math.floor(Math.random() * 10)],
            lab: ["CFSL Delhi", "CFSL Hyderabad", "SFSL Mumbai", "SFSL Bangalore", "CFSL Chandigarh", "SFSL Pune", "CFSL Kolkata", "SFSL Chennai"][Math.floor(Math.random() * 8)],
            gender: () => ["Male", "Female", "Other"][Math.floor(Math.random() * 3)],
            bloodGroup: () => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"][Math.floor(Math.random() * 8)],
            caseId: () => `DNA/${new Date().getFullYear()}/${Math.floor(Math.random() * 90000 + 10000)}`
        },
        negative: {
            status: "NO DNA MATCH",
            details: "DNA profile not found in Indian forensic databases",
            confidence: () => (Math.random() * 30 + 10).toFixed(1),
            sequence: () => Math.floor(Math.random() * 1000 + 1000),
            gcContent: () => (Math.random() * 20 + 30).toFixed(1),
            quality: ["Q20", "Q25", "Q30"][Math.floor(Math.random() * 3)],
            database: "No Match",
            state: "Unknown",
            lab: "Processing Lab",
            gender: "Unknown",
            bloodGroup: "Unknown",
            caseId: "N/A"
        }
    },
    iris: {
        positive: {
            status: "IRIS MATCH CONFIRMED",
            details: "Iris pattern matched with Aadhaar biometric database",
            confidence: () => (Math.random() * 5 + 95).toFixed(1),
            resolution: "High Definition",
            features: () => Math.floor(Math.random() * 200 + 150),
            quality: ["Excellent", "Very Good"][Math.floor(Math.random() * 2)],
            database: "Aadhaar Biometric",
            region: ["North", "South", "East", "West", "Central", "Northeast", "Northwest", "Southeast", "Southwest", "Central-East"][Math.floor(Math.random() * 10)],
            uid: () => `XXXX-XXXX-${Math.floor(Math.random() * 9000 + 1000)}`
        },
        negative: {
            status: "IRIS NOT RECOGNIZED",
            details: "Iris pattern not found in Indian biometric databases",
            confidence: () => (Math.random() * 40 + 15).toFixed(1),
            resolution: ["Low", "Medium", "Blurry"][Math.floor(Math.random() * 3)],
            features: () => Math.floor(Math.random() * 100 + 50),
            quality: ["Poor", "Insufficient", "Unclear"][Math.floor(Math.random() * 3)],
            database: "No Match",
            region: "Unknown",
            uid: "N/A"
        }
    }
};

// Generate result HTML
function generateResult(type, isPositive) {
    const data = forensicData[type][isPositive ? 'positive' : 'negative'];
    const confidence = data.confidence();
    
    let html = `
        <div class="mb-4">
            <div class="d-flex align-items-center mb-3">
                <span class="match-indicator ${isPositive ? 'match-high' : 'match-low'}"></span>
                <h4 class="mb-0">${data.status}</h4>
            </div>
            <p class="text-muted">${data.details}</p>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${confidence}%"></div>
            </div>
            <small class="text-muted">Confidence: ${confidence}%</small>
        </div>

        <div class="mb-4">
            <h5 class="highlight-text mb-3">Analysis Details</h5>
            <div class="data-rows">
    `;

    if (type === 'fingerprint') {
        html += `
            <div class="data-row">
                <span class="data-label">Pattern Type:</span>
                <span class="data-value">${data.pattern}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Minutiae Points:</span>
                <span class="data-value">${data.minutiae()}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Quality Score:</span>
                <span class="data-value">${data.quality}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Database:</span>
                <span class="data-value">${data.database}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Location:</span>
                <span class="data-value">${data.location}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Case ID:</span>
                <span class="data-value">${data.caseId()}</span>
            </div>
        `;
    } else if (type === 'dna') {
        html += `
            <div class="data-row">
                <span class="data-label">Sequence Length:</span>
                <span class="data-value">${data.sequence().toLocaleString()} bp</span>
            </div>
            <div class="data-row">
                <span class="data-label">GC Content:</span>
                <span class="data-value">${data.gcContent()}%</span>
            </div>
            <div class="data-row">
                <span class="data-label">Quality Score:</span>
                <span class="data-value">${data.quality}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Gender:</span>
                <span class="data-value">${data.gender()}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Blood Group:</span>
                <span class="data-value">${data.bloodGroup()}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Database:</span>
                <span class="data-value">${data.database}</span>
            </div>
            <div class="data-row">
                <span class="data-label">State:</span>
                <span class="data-value">${data.state}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Laboratory:</span>
                <span class="data-value">${data.lab}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Case ID:</span>
                <span class="data-value">${data.caseId()}</span>
            </div>
        `;
    } else if (type === 'iris') {
        html += `
            <div class="data-row">
                <span class="data-label">Resolution:</span>
                <span class="data-value">${data.resolution}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Features Detected:</span>
                <span class="data-value">${data.features()}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Quality Score:</span>
                <span class="data-value">${data.quality}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Database:</span>
                <span class="data-value">${data.database}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Region:</span>
                <span class="data-value">${data.region}</span>
            </div>
            <div class="data-row">
                <span class="data-label">UID:</span>
                <span class="data-value">${data.uid()}</span>
            </div>
        `;
    }

    html += `
            </div>
        </div>

        <div class="stats-grid">
    `;

    if (type === 'fingerprint') {
        html += `
            <div class="stat-card">
                <div class="stat-value">${confidence}%</div>
                <div class="stat-label">Match Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.minutiae()}</div>
                <div class="stat-label">Minutiae</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">0.12s</div>
                <div class="stat-label">Process Time</div>
            </div>
        `;
    } else if (type === 'dna') {
        html += `
            <div class="stat-card">
                <div class="stat-value">${confidence}%</div>
                <div class="stat-label">Match Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.sequence().toLocaleString()}</div>
                <div class="stat-label">Base Pairs</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.gcContent()}%</div>
                <div class="stat-label">GC Content</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">2.34s</div>
                <div class="stat-label">Process Time</div>
            </div>
        `;
    } else if (type === 'iris') {
        html += `
            <div class="stat-card">
                <div class="stat-value">${confidence}%</div>
                <div class="stat-label">Match Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.features()}</div>
                <div class="stat-label">Features</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">0.08s</div>
                <div class="stat-label">Process Time</div>
            </div>
        `;
    }
    html += '</div>';

    return html;
}

// Update result display
function updateResult(type, isPositive) {
    const resultDiv = document.getElementById(`${type}Result`);
    const contentDiv = document.getElementById(`${type}ResultContent`);
    
    contentDiv.innerHTML = generateResult(type, isPositive);
    resultDiv.classList.remove('result-positive', 'result-negative');
    resultDiv.classList.add(isPositive ? 'result-positive' : 'result-negative', 'success-border');
    resultDiv.classList.add('show');
    
    // Animate confidence bar
    setTimeout(() => {
        const confidenceFill = resultDiv.querySelector('.confidence-fill');
        if (confidenceFill) {
            const confidence = forensicData[type][isPositive ? 'positive' : 'negative'].confidence();
            confidenceFill.style.width = '0%';
            setTimeout(() => {
                confidenceFill.style.width = confidence + '%';
            }, 100);
        }
    }, 500);
}

// File upload handlers
function setupFileUpload(type) {
    const inputElement = document.getElementById(`${type}Input`);
    
    inputElement.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const loading = document.getElementById(`${type}Loading`);
            const result = document.getElementById(`${type}Result`);
            
            loading.classList.add('show');
            result.classList.remove('show');
            
            // Always show positive results
            const isPositive = true;
            
            // Simulate processing time
            const processingTime = type === 'dna' ? 2500 : 2000;
            
            setTimeout(() => {
                loading.classList.remove('show');
                updateResult(type, isPositive);
            }, processingTime);
        }
    });
}

// Add touch feedback for mobile
function setupTouchFeedback() {
    document.querySelectorAll('.btn-forensic').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Add hover effects to cards
function setupCardEffects() {
    document.querySelectorAll('.analysis-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup file upload handlers
    setupFileUpload('fingerprint');
    setupFileUpload('dna');
    setupFileUpload('iris');
    
    // Setup touch feedback
    setupTouchFeedback();
    
    // Setup card effects
    setupCardEffects();
    
    // Simulate real-time scanning animation
    setInterval(() => {
        const scannerLines = document.querySelectorAll('.scanner-line');
        scannerLines.forEach(line => {
            line.style.animation = 'none';
            setTimeout(() => {
                line.style.animation = '';
            }, 10);
        });
    }, 4000);

    // Add some interactive elements
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', function() {
            // Hide all results when switching tabs
            document.querySelectorAll('.result-display').forEach(result => {
                result.classList.remove('show');
            });
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + 1, 2, 3 to switch tabs
    if (e.ctrlKey || e.metaKey) {
        if (e.key === '1') {
            document.getElementById('fingerprint-tab').click();
        } else if (e.key === '2') {
            document.getElementById('dna-tab').click();
        } else if (e.key === '3') {
            document.getElementById('iris-tab').click();
        }
    }
});
