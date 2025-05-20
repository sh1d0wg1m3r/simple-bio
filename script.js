function updateLastUpdated() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = formattedDate;
    }
}

function applyGlitchEffect(elementId, originalText) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let glitchInterval;
    const glitchChars = '!@#$%^&*()_+[]{}|;:\'",.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    element.addEventListener('mouseover', () => {
        let iterations = 0;
        const textLength = originalText.length;
        glitchInterval = setInterval(() => {
            if (iterations >= 8) { // Number of quick changes (increased slightly for better visibility)
                clearInterval(glitchInterval);
                element.textContent = originalText;
                return;
            }
            let glitchedText = '';
            for (let i = 0; i < textLength; i++) {
                if (Math.random() > 0.65) { // Randomly change some characters
                    glitchedText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;
            iterations++;
        }, 40); // Speed of character change (slightly faster)
    });

    element.addEventListener('mouseout', () => { // Ensure text resets if mouse leaves early
        clearInterval(glitchInterval);
        element.textContent = originalText;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdated();

    const mainHeadingElement = document.getElementById('main-heading');
    if (mainHeadingElement) {
        const originalHeadingText = mainHeadingElement.textContent;
        applyGlitchEffect('main-heading', originalHeadingText);
    } else {
        console.warn("Main heading with ID 'main-heading' not found for glitch effect.");
    }
});
