function calculateMatch() {
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    const gender1 = document.getElementById('gender1').value;
    const gender2 = document.getElementById('gender2').value;

    if (!name1 || !name2 || !gender1 || !gender2) {
        alert('Please fill in all fields!');
        return;
    }

    // Calculate base percentage using names
    let matchPercentage = calculateNameMatch(name1, name2);
    
    // Adjust percentage based on gender compatibility
    matchPercentage = adjustGenderMatch(matchPercentage, gender1, gender2);

    // Show result
    displayResult(matchPercentage);
}

function calculateNameMatch(name1, name2) {
    // Calculate using various factors
    let score = 0;
    
    // Common letters bonus
    const commonLetters = [...new Set(name1)].filter(letter => name2.includes(letter));
    score += (commonLetters.length * 10);
    
    // Length similarity bonus
    const lengthDiff = Math.abs(name1.length - name2.length);
    score += (10 - lengthDiff) * 2;
    
    // First letter bonus
    if (name1[0] === name2[0]) score += 15;
    
    // Last letter bonus
    if (name1[name1.length - 1] === name2[name2.length - 1]) score += 10;
    
    // Normalize score to 0-100 range
    let percentage = Math.min(Math.max(score, 20), 100);
    
    // Add some randomness for fun
    percentage += Math.random() * 10 - 5;
    
    return Math.floor(percentage);
}

function adjustGenderMatch(percentage, gender1, gender2) {
    // Add some fun gender-based adjustments
    if (gender1 === gender2) {
        percentage += 5; // Same gender bonus for friendship
    } else if ((gender1 === 'male' && gender2 === 'female') || 
               (gender1 === 'female' && gender2 === 'male')) {
        percentage += 8; // Traditional match bonus
    }
    
    return Math.min(Math.max(percentage, 0), 100);
}

function displayResult(percentage) {
    const result = document.getElementById('result');
    const percentageElement = document.getElementById('percentage');
    const messageElement = document.getElementById('message');
    
    result.className = 'result-visible';
    
    // Animate percentage
    let currentPercent = 0;
    const interval = setInterval(() => {
        if (currentPercent >= percentage) {
            clearInterval(interval);
        } else {
            currentPercent++;
            percentageElement.textContent = currentPercent;
        }
    }, 20);

    // Set message based on percentage
    let message = '';
    if (percentage >= 90) {
        message = "Incredible match! Your vibes are totally in sync! ✨";
    } else if (percentage >= 70) {
        message = "Great match! You have amazing compatibility! 🌟";
    } else if (percentage >= 50) {
        message = "Good match! You have potential to connect well! 😊";
    } else if (percentage >= 30) {
        message = "Fair match. Maybe you need more time to connect! 🌱";
    } else {
        message = "Low match. But hey, opposites sometimes attract! 🤔";
    }
    
    messageElement.textContent = message;
} 