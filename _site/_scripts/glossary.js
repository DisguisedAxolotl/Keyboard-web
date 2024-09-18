function applyGlossaryTooltips() {
    const glossary = window.glossary || {};

    function replaceTextWithTooltip(node) {
        if (node.nodeType === Node.TEXT_NODE) {
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
                span.classList.add('glossary-highlight'); 
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(replaceTextWithTooltip);
        }
    }

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

document.addEventListener('DOMContentLoaded', initializeGlossary);
