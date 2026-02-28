const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock realistic data for careers
const careerData = {
    technology: {
        title: "Senior AI Engineer",
        overview: "Architect and implement advanced machine learning models and neural networks to solve complex problems and drive innovation.",
        skills: ["Python", "PyTorch/TensorFlow", "Math/Calculus", "Cloud Computing"],
        salary: "$145,000 - $210,000",
        growth: "Very High (35% increase projection by 2030)"
    },
    business: {
        title: "Strategic Operations Director",
        overview: "Design and execute high-level business strategies to optimize organizational efficiency and scale global operations.",
        skills: ["Strategic Planning", "Financial Modeling", "Data Analysis", "Leadership"],
        salary: "$130,000 - $195,000",
        growth: "High (15% increase projection by 2030)"
    },
    design: {
        title: "Product Experience Designer",
        overview: "Create intuitive and stunning digital experiences by blending user behavior research with cutting-edge visual design.",
        skills: ["UI/UX Design", "Figma/Adobe Suite", "Prototyping", "Design Systems"],
        salary: "$110,000 - $175,000",
        growth: "High (20% increase projection by 2030)"
    },
    medical: {
        title: "Biomedical Innovation Specialist",
        overview: "Develop breakthrough medical technologies and systems that bridge the gap between engineering and clinical healthcare.",
        skills: ["Bio-Engineering", "Data Science", "Clinical Research", "Regulatory Affairs"],
        salary: "$140,000 - $220,000",
        growth: "Very High (25% increase projection by 2030)"
    }
};

// API Endpoint to calculate scores
app.post('/api/calculate', (req, res) => {
    try {
        const { scores } = req.body;
        if (!scores || typeof scores !== 'object') {
            return res.status(400).json({ error: "Invalid scores data" });
        }

        // Determine the highest score category
        let maxScore = -1;
        let recommendedCategory = 'technology'; // Default

        for (const [category, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                recommendedCategory = category;
            }
        }

        const result = careerData[recommendedCategory];
        res.json({ category: recommendedCategory, ...result });
    } catch (error) {
        console.error("Calculation Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fallback for HTML5 history API (optional for this setup but good practice)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`MatchR Server running on http://localhost:${PORT}`);
});
