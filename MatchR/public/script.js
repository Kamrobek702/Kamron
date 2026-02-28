const questions = [
    {
        question: "1. Which activity sounds most exciting to you on a weekend?",
        options: [
            { text: "Building a small automation script or app", category: "technology" },
            { text: "Reading a biography of a successful CEO", category: "business" },
            { text: "Prototyping a new visual layout for a website", category: "design" },
            { text: "Learning about the latest CRISPR gene-editing breakthroughs", category: "medical" }
        ]
    },
    {
        question: "2. How do you prefer to solve a complex problem?",
        options: [
            { text: "Deconstruct it into logical algorithms and code", category: "technology" },
            { text: "Analyze the cost-benefit and resource allocation", category: "business" },
            { text: "Sketch out a visual flow or user journey", category: "design" },
            { text: "Examine biological systems or data patterns", category: "medical" }
        ]
    },
    {
        question: "3. Which tech trend interests you most?",
        options: [
            { text: "Decentralized AI and edge computing", category: "technology" },
            { text: "Global market automation and fin-tech", category: "business" },
            { text: "Augmented Reality (AR) spatial interfaces", category: "design" },
            { text: "Personalized medicine based on digital twins", category: "medical" }
        ]
    },
    {
        question: "4. What is your ideal workspace environment?",
        options: [
            { text: "Multiple monitors with a high-end IDE open", category: "technology" },
            { text: "A sleek executive office with real-time data dashboards", category: "business" },
            { text: "A creative studio filled with inspiration and tablets", category: "design" },
            { text: "A clean, high-tech lab with advanced diagnostic gear", category: "medical" }
        ]
    },
    {
        question: "5. Pick a superpower:",
        options: [
            { text: "Ability to communicate directly with hardware", category: "technology" },
            { text: "Predicting market trends with 100% accuracy", category: "business" },
            { text: "Instant visualization of any abstract concept", category: "design" },
            { text: "Real-time cellular regeneration and healing", category: "medical" }
        ]
    },
    {
        question: "6. Which project would you rather lead?",
        options: [
            { text: "Developing a new programming language", category: "technology" },
            { text: "Scaling a startup to a global unicorn", category: "business" },
            { text: "Rebranding a world-class luxury product", category: "design" },
            { text: "Spearheading a cure for a rare disease", category: "medical" }
        ]
    },
    {
        question: "7. When browsing an app, what's the first thing you notice?",
        options: [
            { text: "The speed and responsiveness of the system", category: "technology" },
            { text: "The business model and monetization strategy", category: "business" },
            { text: "The spacing, typography, and color palette", category: "design" },
            { text: "How it tracks and uses health or personal data", category: "medical" }
        ]
    },
    {
        question: "8. What kind of impact do you want to have?",
        options: [
            { text: "Establishing the infrastructure for future internet", category: "technology" },
            { text: "Driving economic growth and stability", category: "business" },
            { text: "Changing how humans interact with digital worlds", category: "design" },
            { text: "Extending human lifespan and improving health", category: "medical" }
        ]
    },
    {
        question: "9. Your favorite way to learn is:",
        options: [
            { text: "Tinkering with code and reading documentation", category: "technology" },
            { text: "Case studies and networking with experts", category: "business" },
            { text: "Watching tutorials and experimenting with tools", category: "design" },
            { text: "Reading scientific journals and clinical trials", category: "medical" }
        ]
    },
    {
        question: "10. In a group project, you are the one who:",
        options: [
            { text: "Handles the technical implementation", category: "technology" },
            { text: "Manages the timeline and communication", category: "business" },
            { text: "Makes sure everything looks professional", category: "design" },
            { text: "Ensures the accuracy and safety of the data", category: "medical" }
        ]
    }
];

let currentQuestion = 0;
const scores = {
    technology: 0,
    business: 0,
    design: 0,
    medical: 0
};

const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        completeAssessment();
        return;
    }

    const q = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    questionContainer.innerHTML = `
        <div class="question-card active">
            <h2>${q.question}</h2>
            <div class="options-grid">
                ${q.options.map((opt, index) => `
                    <button class="option-btn" onclick="selectOption('${opt.category}')">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function selectOption(category) {
    scores[category]++;
    currentQuestion++;
    loadQuestion();
}

async function completeAssessment() {
    questionContainer.innerHTML = `
        <div class="text-center">
            <h2>Calculating your future...</h2>
            <p>Our AI is matching your pulse with the patterns of 2026.</p>
        </div>
    `;

    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scores })
        });

        const result = await response.json();
        // Store result in localStorage for the result page
        localStorage.setItem('matchr_result', JSON.stringify(result));

        // Short delay for "AI effect"
        setTimeout(() => {
            window.location.href = 'result.html';
        }, 1500);
    } catch (error) {
        console.error("Error submitting scores:", error);
        alert("Something went wrong. Please try again.");
    }
}

// Initialize if on test page
if (questionContainer) {
    loadQuestion();
}
