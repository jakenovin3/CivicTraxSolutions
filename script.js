let removeModalAnimation = null;

// Checks screen size and runs function dependent on whichever screen size is active
const media = window.matchMedia('(max-width: 1250px)');
run(media);
media.addEventListener('change', (e) => {
  run(e);
});


/* ---------- Helper Functions ---------- */

function run(media) {
  if(media.matches) {
    // If screen size is smaller than or equal to 1250px, remove the modal animation
    if(removeModalAnimation) {
      removeModalAnimation();
      removeModalAnimation = null;
    }
  }
  else {
    // If screen size is larger than 1250px, run the animateModal function
    if(!removeModalAnimation) {
      removeModalAnimation = animateModal();
    }
  }
}

function animateModal() {

    const getStartedBtn = document.getElementById('get-started-btn');
    const loginModal = document.querySelector('.login-modal');
    const modalRow = document.querySelector('.modal-row');
    const modalSection = document.querySelector('.modals-section');

    // Don't run if elements are not found
    if (!getStartedBtn || !loginModal || !modalRow || !modalSection) return;

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

    function onScroll() {
      const scrollY = window.scrollY;
      
      // Calculates progress as you scroll
      let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
      progress = Math.max(0, Math.min(1, progress));

      // No animation if window is too small
      if(window.innerWidth > 768) {
          loginModal.style.transform = `translate(-50%, ${progress * slideDistance}px)`; 
      }
    }

    window.addEventListener('scroll', onScroll);
    
    return function cleanup() {
      window.removeEventListener('scroll', onScroll);
      loginModal.style.transform = '';
    };
    
}
