document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const menuIcon = document.querySelector('.main-navigation .fa-bars');
  const closeIcon = document.querySelector('.nav-menu .fa-circle-xmark');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  
  // Function to toggle the mobile menu
  function toggleMenu() {
    navMenu.classList.toggle('show');
    if (navMenu.classList.contains('show')) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = ''; // Allow scrolling when menu is closed
    }
  }
  
  // Open menu when hamburger icon is clicked
  if (menuIcon) {
    menuIcon.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });
  }
  
  // Close menu when X icon is clicked
  if (closeIcon) {
    closeIcon.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });
  }
  
  // Handle dropdown toggles based on screen size
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Only handle dropdown functionality in desktop view
      if (window.innerWidth > 1025) {
        e.preventDefault();
        
        const parent = this.parentNode;
        parent.classList.toggle('show-dropdown');
        
        // Toggle dropdown arrow direction
        const arrow = this.querySelector('.dropdown-arrow');
        if (arrow) {
          arrow.style.transform = parent.classList.contains('show-dropdown') 
            ? 'rotate(180deg)' 
            : 'rotate(0)';
        }
      }
      // For mobile, we let the click navigate to the page (don't prevent default)
    });
  });
  
  // Function to handle responsive layout changes
  function handleResponsiveLayout() {
    const isMobile = window.innerWidth <= 1025;
    const dropdownParent = document.querySelector('.dropdown');
    
    if (isMobile) {
      // In mobile view
      dropdownParent.classList.add('mobile-dropdown');
      
      // Convert all dropdown link text to uppercase in mobile view to match nav links
      const dropdownLinks = document.querySelectorAll('.dropdown-link');
      dropdownLinks.forEach(link => {
        // Only apply if not already uppercase in the HTML
        if (link.textContent === link.textContent.toLowerCase() || 
            link.textContent === link.textContent.charAt(0).toUpperCase() + link.textContent.slice(1).toLowerCase()) {
          link.style.textTransform = 'uppercase';
        }
      });
    } else {
      // In desktop view - restore original case if needed
      dropdownParent.classList.remove('mobile-dropdown');
    }
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('show') && 
        !navMenu.contains(e.target) && 
        e.target !== menuIcon) {
      toggleMenu();
    }
  });
  
  // Close menu when clicking on any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('show') && window.innerWidth <= 1025) {
        toggleMenu();
      }
    });
  });
  
  // Close menu when clicking on dropdown links in mobile view
  const dropdownLinks = document.querySelectorAll('.dropdown-link');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('show') && window.innerWidth <= 1025) {
        toggleMenu();
      }
    });
  });
  
  // Call responsive layout handler on page load and resize
  handleResponsiveLayout();
  window.addEventListener('resize', function() {
    handleResponsiveLayout();
    
    if (window.innerWidth > 1025 && navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
});