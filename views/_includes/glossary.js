// Function to replace terms in text nodes with glossary terms
console.log('Script is loaded');

function applyGlossaryTooltips() {
    const glossary = window.glossary || {}; // Use the glossary data from the script

    function replaceTextWithTooltip(node) {
        // Ensure the node is a text node and its parent is a <p> element
        if (node.nodeType === Node.TEXT_NODE && node.parentNode.tagName === 'P') {
            const text = node.textContent;
            let newText = text;

            for (const [term, definition] of Object.entries(glossary)) {
                const regex = new RegExp(`\\b${term}\\b`, 'gi'); // Word boundary to match whole words
                newText = newText.replace(regex, (match) => {
                    return `<span class="glossary-key">${match}<span class="glossary-tooltip">${definition}</span></span>`;
                });
            }

            if (newText !== text) {
                const span = document.createElement('span');
                span.innerHTML = newText;
                span.classList.add('glossary-highlight'); // Add a class for green text
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Skip headers and anchor tags
            if (!['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A'].includes(node.tagName)) {
                node.childNodes.forEach(replaceTextWithTooltip);
            }
        }
    }

    // Apply the function to all elements within the content container
    document.querySelectorAll('.content-container').forEach(element => {
        element.childNodes.forEach(replaceTextWithTooltip);
    });
}

// Fetch glossary data and apply tooltips
function initializeGlossary() {
    fetch('/_data/glossary.json')
        .then(response => response.json())
        .then(data => {
            window.glossary = data;
            console.log('Glossary data:', window.glossary);
            applyGlossaryTooltips();
        })
        .catch(error => {
            console.error('Error fetching glossary data:', error);
        });
}

// Execute the function once the document is fully loaded
document.addEventListener('DOMContentLoaded', initializeGlossary);
