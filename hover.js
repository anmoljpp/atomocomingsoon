const hoverElements = document.querySelectorAll('.hover-effect');
let timeoutIds = [];

function showElement(element) {
  element.style.opacity = 1; // Make the element fully visible
  clearTimeout(timeoutIds[element.dataset.index]); // Clear any existing timeout for this element
}

function hideElement(element) {
  timeoutIds[element.dataset.index] = setTimeout(() => {
    element.style.opacity = 0; // Hide the element after 5 seconds
  }, 400); // 5 seconds delay
}

hoverElements.forEach((element, index) => {
  element.dataset.index = index; // Assign a unique index to each element
  timeoutIds[index] = null; // Initialize timeout IDs array

  element.addEventListener('mouseenter', () => showElement(element));
  element.addEventListener('mouseleave', () => hideElement(element));
});