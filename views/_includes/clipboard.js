console.log("script loaded 2");
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'code'
    document.querySelectorAll('.code').forEach(function(element) {
      element.addEventListener('click', function() {
        // Use the Clipboard API to copy text
        navigator.clipboard.writeText(element.textContent)
          .then(() => {
            const copiedElement = document.querySelector('.copied');
            if (copiedElement) {
                copiedElement.style.display = 'unset';
                copiedElement.style.opacity = '1'; // Ensure opacity is reset to full
  
                // After 3 seconds, fade it out
                setTimeout(() => {
                  copiedElement.style.opacity = '0'; // Fade out
  
                  // Optionally, hide the element completely after the fade-out
                  setTimeout(() => {
                    copiedElement.style.display = 'none';
                  }, 1000); // Wait for the fade-out (1 second)
                }, 2000); // 3-second delay before fading out
            }
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      });
    });
});
