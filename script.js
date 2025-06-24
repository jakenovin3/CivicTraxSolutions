window.addEventListener('DOMContentLoaded', () => {
  const getStartedBtn = document.getElementById('get-started-btn');
  const loginModal = document.querySelector('.login-modal');
  const modalRow = document.querySelector('.modal-row');
  const modalSection = document.querySelector('.modals-section');

  // Get the bottom position of the Get Started button relative to modal-row
  const btnRect = getStartedBtn.getBoundingClientRect();
  const rowRect = modalRow.getBoundingClientRect();
  const modalSectRect = modalSection.getBoundingClientRect();
  const initialTop = btnRect.bottom - rowRect.top + 100;
  const modalHeight = loginModal.offsetHeight;
  const sectionBottom = modalSectRect.bottom - rowRect.top;

  loginModal.style.top = `${initialTop}px`;

  // Set up scroll animation
  const slideDistance = sectionBottom - initialTop - modalHeight;
  const scrollStart = btnRect.bottom + window.scrollY - 400;
  const scrollEnd = scrollStart + window.innerHeight;
  // const scrollEnd = rowRect.top + window.scrollY + 400;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Calculates progress as you scroll
    let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
    progress = Math.max(0, Math.min(1, progress));

    // No animation if window is too small
    if(window.innerWidth > 768) {
        loginModal.style.transform = `translate(-50%, ${progress * slideDistance}px)`; 
    }
  });
  
});