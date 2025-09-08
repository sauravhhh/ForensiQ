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

// Counter for negative results
let negativeResultCount = {
    fingerprint: 0,
    dna: 0,
    iris: 0
};

// Generate result HTML
function generateResult(type, isPositive) {
    const data = forensicData[type][isPositive ? 'positive' : 'negative'];
    const confidence = data.confidence();
    
    let html = `
        <div class="mb-3">
            <span class="match-indicator ${isPositive ? 'match-high' : 'match-low'}"></span>
            <strong>${data.status}</strong>
        </div>
        <div class="mb-3">
            <p><strong>Details:</strong> ${data.details}</p>
            <p><strong>Confidence:</strong> ${confidence}%</p>
    `;

    if (type === 'fingerprint') {
        html += `
            <p><strong>Pattern Type:</strong> ${data.pattern}</p>
            <p><strong>Minutiae Points:</strong> ${data.minutiae()}</p>
            <p><strong>Quality Score:</strong> ${data.quality}</p>
            <p><strong>Database:</strong> ${data.database}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Case ID:</strong> ${data.caseId()}</p>
        `;
    } else if (type === 'dna') {
        html += `
            <p><strong>Sequence Length:</strong> ${data.sequence().toLocaleString()} bp</p>
            <p><strong>GC Content:</strong> ${data.gcContent()}%</p>
            <p><strong>Quality Score:</strong> ${data.quality}</p>
            <p><strong>Gender:</strong> ${data.gender()}</p>
            <p><strong>Blood Group:</strong> ${data.bloodGroup()}</p>
            <p><strong>Database:</strong> ${data.database}</p>
            <p><strong>State:</strong> ${data.state}</p>
            <p><strong>Laboratory:</strong> ${data.lab}</p>
            <p><strong>Case ID:</strong> ${data.caseId()}</p>
        `;
    } else if (type === 'iris') {
        html += `
            <p><strong>Resolution:</strong> ${data.resolution}</p>
            <p><strong>Features Detected:</strong> ${data.features()}</p>
            <p><strong>Quality Score:</strong> ${data.quality}</p>
            <p><strong>Database:</strong> ${data.database}</p>
            <p><strong>Region:</strong> ${data.region}</p>
            <p><strong>UID:</strong> ${data.uid()}</p>
        `;
    }

    html += '</div>';

    // Add stats grid
    html += '<div class="stats-grid">';
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
    resultDiv.classList.add(isPositive ? 'result-positive' : 'result-negative');
    resultDiv.classList.add('show');
}

// Determine if result should be positive based on negative count
function shouldShowPositive(type) {
    // After every 5 negative results, show 2 positive results
    if (negativeResultCount[type] >= 5) {
        // Reset counter after 2 positive results
        if (negativeResultCount[type] >= 7) {
            negativeResultCount[type] = 0;
        }
        return true;
    }
    return false;
}

// File upload handlers
function setupFileUpload(type) {
    document.getElementById(`${type}Input`).addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const loading = document.getElementById(`${type}Loading`);
            const result = document.getElementById(`${type}Result`);
            
            loading.classList.add('show');
            result.classList.remove('show');
            
            // Determine if result should be positive or negative
            let isPositive = shouldShowPositive(type);
            
            // If not forced positive by counter, randomly determine
            if (!isPositive) {
                isPositive = Math.random() > 0.7; // 30% chance for positive
            }
            
            // Update counter
            if (isPositive) {
                // Don't increment counter for positive results
            } else {
                negativeResultCount[type]++;
            }
            
            setTimeout(() => {
                loading.classList.remove('show');
                updateResult(type, isPositive);
            }, type === 'dna' ? 2500 : 2000);
        }
    });
}

// Add touch feedback for mobile
document.querySelectorAll('.btn-forensic').forEach(button => {
    button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

// Initialize all handlers
setupFileUpload('fingerprint');
setupFileUpload('dna');
setupFileUpload('iris');

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
