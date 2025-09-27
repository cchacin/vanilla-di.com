// Main JavaScript for Vanilla DI site
document.addEventListener('DOMContentLoaded', function() {

  // Mobile navigation toggle with accessibility
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');

      // Update ARIA attributes for accessibility
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when clicking on links
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus(); // Return focus to toggle button
      }
    });
  }

  // Copy to clipboard functionality
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const textToCopy = this.getAttribute('data-clipboard-text');
      const copyText = this.querySelector('.copy-text');
      const originalText = copyText.textContent;

      try {
        await navigator.clipboard.writeText(textToCopy);
        copyText.textContent = 'Copied!';
        setTimeout(() => {
          copyText.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          copyText.textContent = 'Copied!';
          setTimeout(() => {
            copyText.textContent = originalText;
          }, 2000);
        } catch (fallbackErr) {
          console.error('Fallback copy failed: ', fallbackErr);
        }
        document.body.removeChild(textArea);
      }
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll effect to header
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // Performance table mobile enhancement
  const performanceTable = document.querySelector('.performance-table');
  if (performanceTable && window.innerWidth <= 767) {
    const headers = performanceTable.querySelectorAll('th');
    const rows = performanceTable.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      cells.forEach((cell, index) => {
        if (headers[index]) {
          cell.setAttribute('data-label', headers[index].textContent);
        }
      });
    });

    performanceTable.classList.add('stack-mobile');
  }

  // Add intersection observer for animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.comparison-section, .feature-card, .performance-table');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Enhanced animations and interactions
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Comparison section hover effects */
    .comparison-section {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .comparison-section:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    /* Code block expansion animation */
    .code-container {
      position: relative;
      overflow: hidden;
    }

    .code-expandable {
      max-height: 300px;
      transition: max-height 0.3s ease;
    }

    .code-expandable.expanded {
      max-height: none;
    }

    .expand-button {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: var(--accent-color);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.75rem;
      opacity: 0.9;
      transition: opacity 0.2s ease;
    }

    .expand-button:hover {
      opacity: 1;
    }

    /* Performance table animations */
    .performance-table tbody tr {
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .performance-table tbody tr:hover {
      background-color: rgba(52, 152, 219, 0.1) !important;
      transform: scale(1.01);
    }

    .vanilla-row:hover {
      background-color: rgba(39, 174, 96, 0.2) !important;
    }

    /* Floating action button for quick navigation */
    .quick-nav {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--accent-color);
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      z-index: 1000;
      font-size: 1.5rem;
    }

    .quick-nav:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    .quick-nav.hidden {
      transform: translateY(100px);
      opacity: 0;
    }

    /* Progress bar */
    .reading-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(to right, var(--accent-color), var(--success-color));
      z-index: 1001;
      transition: width 0.1s ease;
    }

    /* Tooltip for complexity indicators */
    .complexity-tooltip {
      position: relative;
      cursor: help;
    }

    .complexity-tooltip::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 1000;
    }

    .complexity-tooltip:hover::after {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // Add reading progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);

  // Add quick navigation button
  const quickNav = document.createElement('button');
  quickNav.className = 'quick-nav';
  quickNav.innerHTML = '↑';
  quickNav.title = 'Back to top';
  document.body.appendChild(quickNav);

  // Progress bar functionality
  function updateProgressBar() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = Math.min(progress, 100) + '%';
  }

  // Quick nav functionality
  function updateQuickNav() {
    if (window.pageYOffset > 300) {
      quickNav.classList.remove('hidden');
    } else {
      quickNav.classList.add('hidden');
    }
  }

  window.addEventListener('scroll', () => {
    updateProgressBar();
    updateQuickNav();
  });

  quickNav.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add expand/collapse functionality to long code blocks
  const codeContainers = document.querySelectorAll('.code-container pre');
  codeContainers.forEach(container => {
    if (container.scrollHeight > 300) {
      container.classList.add('code-expandable');

      const expandButton = document.createElement('button');
      expandButton.className = 'expand-button';
      expandButton.textContent = 'Expand';

      expandButton.addEventListener('click', () => {
        container.classList.toggle('expanded');
        expandButton.textContent = container.classList.contains('expanded') ? 'Collapse' : 'Expand';
      });

      container.parentNode.style.position = 'relative';
      container.parentNode.appendChild(expandButton);
    }
  });

  // Add tooltips to complexity indicators
  const complexityScores = document.querySelectorAll('.complexity-score');
  complexityScores.forEach(score => {
    const complexity = parseInt(score.textContent);
    let tooltip = '';

    if (complexity === 0) {
      tooltip = 'No complexity - pure Java constructors';
    } else if (complexity <= 2) {
      tooltip = 'Very low complexity - minimal framework overhead';
    } else if (complexity <= 4) {
      tooltip = 'Low complexity - some annotations and configuration';
    } else if (complexity <= 6) {
      tooltip = 'Medium complexity - moderate framework involvement';
    } else if (complexity <= 8) {
      tooltip = 'High complexity - significant framework magic';
    } else {
      tooltip = 'Extreme complexity - framework controls everything';
    }

    score.classList.add('complexity-tooltip');
    score.setAttribute('data-tooltip', tooltip);
  });

  // Enhanced keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Press 'h' for home/top
    if (e.key === 'h' || e.key === 'H') {
      if (!e.target.matches('input, textarea')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        e.preventDefault();
      }
    }

    // Press 'p' for performance section
    if (e.key === 'p' || e.key === 'P') {
      if (!e.target.matches('input, textarea')) {
        const performanceSection = document.getElementById('performance');
        if (performanceSection) {
          performanceSection.scrollIntoView({ behavior: 'smooth' });
          e.preventDefault();
        }
      }
    }

    // Press 'e' for examples section
    if (e.key === 'e' || e.key === 'E') {
      if (!e.target.matches('input, textarea')) {
        const examplesSection = document.getElementById('examples');
        if (examplesSection) {
          examplesSection.scrollIntoView({ behavior: 'smooth' });
          e.preventDefault();
        }
      }
    }
  });

  // Add visual feedback for section visibility
  const sections = document.querySelectorAll('.comparison-section, .performance-table, .hero-section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

});