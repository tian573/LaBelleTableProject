document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
    });
    
    // Dropdown menu toggle
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('show-dropdown');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.dropdown')) {
        const openDropdowns = document.querySelectorAll('.dropdown.show-dropdown');
        openDropdowns.forEach(dropdown => {
          dropdown.classList.remove('show-dropdown');
        });
      }
    });
});

// for the header menu buttons
document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality for menu categories
  const menuCategories = document.querySelectorAll('.menu-category');
  const menuItems = document.querySelectorAll('.menu-items');
  
  menuCategories.forEach(category => {
    category.addEventListener('click', function() {
      // Remove active class from all categories and items
      menuCategories.forEach(cat => cat.classList.remove('active'));
      menuItems.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked category
      this.classList.add('active');
      
      // Show corresponding menu items
      const categoryId = this.getAttribute('data-category');
      document.getElementById(categoryId).classList.add('active');
      
      // Add staggered animation to menu items
      const activeMenuItems = document.querySelectorAll(`#${categoryId} .menu-item`);
      activeMenuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
      });
    });
  });
  
  // Zoom effect on menu item images
  const menuItemImages = document.querySelectorAll('.menu-item-image img');
  
  menuItemImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Filter menu items by dietary preferences (could be expanded)
  const createFilterSystem = () => {
    const menuFooter = document.querySelector('.menu-footer');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'menu-filters';
    filterContainer.innerHTML = `
      <p>Filter by: 
        <span class="filter-tag" data-filter="vegetarian">Vegetarian</span> | 
        <span class="filter-tag" data-filter="gluten-free">Gluten-Free</span> | 
        <span class="filter-tag" data-filter="show-all">Show All</span>
      </p>
    `;
    
    menuFooter.insertAdjacentElement('beforebegin', filterContainer);
    
    // Add filter functionality (placeholder - would need actual data attributes on menu items)
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
      tag.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        console.log(`Filtering by: ${filter}`);
        
        // Placeholder for actual filtering logic
        alert(`Filtering by ${filter} preference. This is a demo - actual filtering would require data attributes on menu items.`);
      });
    });
  };
  
  // Uncomment to enable filtering
  // createFilterSystem();
  
  // Optional: Add a "View full menu" button
  const addViewFullMenuButton = () => {
    const menuSection = document.querySelector('.menu-section');
    const viewFullMenuButton = document.createElement('div');
    viewFullMenuButton.className = 'view-full-menu';
    viewFullMenuButton.innerHTML = `
      <a href="#" class="full-menu-btn">View Full Menu <i class="fas fa-arrow-right"></i></a>
    `;
    
    menuSection.appendChild(viewFullMenuButton);
    
    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
      .view-full-menu {
        text-align: center;
        margin-top: 2rem;
      }
      
      .full-menu-btn {
        display: inline-block;
        padding: 0.8rem 1.5rem;
        background-color: #e0b05e;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.1rem;
        transition: all 0.3s ease;
      }
      
      .full-menu-btn:hover {
        background-color: #c99b4f;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .full-menu-btn i {
        margin-left: 0.5rem;
        transition: transform 0.3s ease;
      }
      
      .full-menu-btn:hover i {
        transform: translateX(5px);
      }
    `;
    
    document.head.appendChild(style);
  };
  
  // Uncomment to add the view full menu button
  // addViewFullMenuButton();
  
  // Add animation to menu items on page load
  const allMenuItems = document.querySelectorAll('.menu-item');
  allMenuItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
  });
});

// smooth scroll
document.addEventListener('DOMContentLoaded', function() {
  // Select all buttons and links that have href attributes starting with '#'
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevent default anchor behavior
      e.preventDefault();
      
      // Get the target element
      const targetId = this.getAttribute('href');
      
      // Handle the case where href is just "#" (top of page)
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // Find the target element by ID
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate the target position with some offset for better visibility
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Scroll to the target element
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash (optional)
        history.pushState(null, null, targetId);
      } else {
        console.warn(`Target element ${targetId} not found`);
      }
    });
  });
  
  // Also handle the scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      // Scroll to the height of the viewport
      const scrollTarget = window.innerHeight;
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    });
  }
});

// Initialize the Google Map
function initMap() {
  // Restaurant coordinates (Paris)
  const restaurantLocation = { lat: 48.8534, lng: 2.3388 };
  
  // Create map centered at the restaurant
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: restaurantLocation,
    mapId: "8e0a97af9386fef",
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false
  });
  
  // Custom marker style
  const marker = new google.maps.Marker({
    position: restaurantLocation,
    map: map,
    title: "Le Restaurant",
    animation: google.maps.Animation.DROP,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: "#D4AF37",
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: "#fff"
    }
  });
  
  // Create info window with restaurant details
  const infoContent = `
    <div style="padding: 10px; color: #f0f0f0; font-family: 'Montserrat', sans-serif;">
      <h3 style="color: #D4AF37; margin: 0 0 8px 0; font-size: 16px;">Le Restaurant</h3>
      <p style="margin: 0 0 5px 0; font-size: 14px;">27 Rue Saint-André des Arts</p>
      <p style="margin: 0 0 5px 0; font-size: 14px;">75006 Paris, France</p>
      <p style="margin: 8px 0 0 0; font-size: 13px;">
        <a href="tel:+33142861896" style="color: #D4AF37; text-decoration: none;">+33 1 42 86 18 96</a>
      </p>
    </div>
  `;
  
  const infoWindow = new google.maps.InfoWindow({
    content: infoContent
  });
  
  // Open info window when marker is clicked
  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
  
  // Add click event to "Get Directions" button
  document.getElementById("get-directions").addEventListener("click", function(e) {
    e.preventDefault();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${restaurantLocation.lat},${restaurantLocation.lng}`, '_blank');
  });
}

// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // If the map script is already loaded, initialize the map
  if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
    initMap();
  }
  // Otherwise the callback parameter in the script URL will handle initialization
});

// Intersection Observer to detect when elements enter the viewport
document.addEventListener('DOMContentLoaded', () => {
  // Configuration options for the Intersection Observer
  const observerOptions = {
    root: null, // use the viewport as the root
    rootMargin: '0px', // no margin
    threshold: 0.2 // trigger when 20% of the element is visible
  };

  // Create the observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when element is visible
        entry.target.classList.add('animate');
        
        // If this is a menu section, also animate the menu items with a staggered delay
        if (entry.target.id === 'menu-section') {
          const menuItems = entry.target.querySelectorAll('.menu-item');
          menuItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate');
            }, 150 * index);
          });
        }
        
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Observe menu categories
  observer.observe(document.querySelector('.menu-categories'));
  
  // Explicitly observe footer and its children
  const footer = document.querySelector('.footer');
  observer.observe(footer);
  
  // Observe footer components individually
  const footerContent = document.querySelector('.footer-content');
  const socialMedia = document.querySelector('.social-media');
  const footerBottom = document.querySelector('.footer-bottom');
  
  if (footerContent) observer.observe(footerContent);
  if (socialMedia) observer.observe(socialMedia);
  if (footerBottom) observer.observe(footerBottom);
  
  // Also observe individual footer columns
  const footerColumns = document.querySelectorAll('.footer-column');
  footerColumns.forEach(column => {
    observer.observe(column);
  });
  
  // Also observe individual elements within about section
  const aboutElements = document.querySelectorAll('.about-image-container, .about-text, .about-highlights, .chef-quote');
  aboutElements.forEach(element => {
    observer.observe(element);
  });
});

window.addEventListener('scroll', () => {
  const footer = document.querySelector('.footer');
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  // When user scrolls near the bottom of the page
  if (scrollTop + windowHeight > documentHeight - 100) {
    footer.classList.add('animate');
    document.querySelectorAll('.footer-content, .footer-column, .social-media, .footer-bottom')
      .forEach(el => el.classList.add('animate'));
  }
});

