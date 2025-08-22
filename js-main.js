// ===================== NAVIGATION ===================== //
// Select elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');

// Hamburger menu toggle for mobile view
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Smooth scrolling for nav links
navItems.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    navLinks.classList.remove('show'); // close menu after click

    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60, // navbar height offset
        behavior: 'smooth'
      });
    }
  });
});

// Highlight nav link of the section currently in view
window.addEventListener('scroll', () => {
  let currentSectionId = '';
  const scrollPosition = window.pageYOffset + 65;

  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
});

// ===================== ANIMATIONS ===================== //
// Select elements to animate
const sectionHeadings = document.querySelectorAll('.section h2');
const skillCards = document.querySelectorAll('.skill-category');
const learningItems = document.querySelectorAll('#learning ul li');
const projectCategories = document.querySelectorAll('.project-categories .category');

// Intersection Observer options
const observerOptions = { threshold: 0.2 };

// Animate headings and skill cards
const animateObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, observerOptions);

// Observe headings and skill cards
[...sectionHeadings, ...skillCards].forEach(el => animateObserver.observe(el));

// Animate projects with fade-in
const projectObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projectCategories.forEach(cat => projectObserver.observe(cat));

// ===================== LEARNING ITEMS STAGGERED FADE ===================== //
const learningObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // stagger animation for each item
      learningItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 150); // 150ms delay between items
      });
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.3 });

learningObserver.observe(document.querySelector('#learning ul'));

// ===================== TOGGLE SKILL BUTTON ===================== //
const toggleSkillsBtn = document.createElement('button');
toggleSkillsBtn.textContent = "Toggle Skill Categories";
toggleSkillsBtn.classList.add('toggle-btn');

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillsSection.insertBefore(toggleSkillsBtn, skillsSection.children[1]);
  toggleSkillsBtn.addEventListener('click', () => {
    skillCards.forEach(card => card.classList.toggle('hidden'));
  });
}

// ===================== SCROLL TO TOP BUTTON ===================== //
// Create button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = "↑ Top";
scrollTopBtn.classList.add('toggle-btn');
scrollTopBtn.style.position = 'fixed';
scrollTopBtn.style.bottom = '30px';
scrollTopBtn.style.right = '30px';
scrollTopBtn.style.display = 'none';
scrollTopBtn.style.zIndex = '100';
document.body.appendChild(scrollTopBtn);

// Show button when scrolled down
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


