// ======= NAVIGATION ======= //
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');

// Toggle mobile menu visibility on hamburger click
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Smooth scrolling behavior when nav links are clicked
navItems.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.classList.remove('show'); // Close mobile menu on link click

    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60, // Adjust for fixed navbar height
        behavior: 'smooth'
      });
    }
  });
});

// Highlight the active nav link based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.pageYOffset + 65; // Offset for navbar height

  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ======= SCROLL ANIMATIONS ======= //

// Animate section headings and skill cards when they come into view
const sectionHeadings = document.querySelectorAll('.section h2');
const skillCards = document.querySelectorAll('.skill-category');

const animateObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, { threshold: 0.2 });

[...sectionHeadings, ...skillCards].forEach(el => animateObserver.observe(el));

// Animate project categories with fade-in effect on scroll
const projectCategories = document.querySelectorAll('.project-categories .category');

const projectObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, { threshold: 0.1 });

projectCategories.forEach(cat => projectObserver.observe(cat));

// ======= TOGGLE SKILL VISIBILITY ======= //
const toggleSkillsBtn = document.createElement('button');
toggleSkillsBtn.textContent = "Toggle Skill Categories";
toggleSkillsBtn.classList.add('toggle-btn');

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  // Insert the toggle button just after the section heading (assumed to be first child)
  skillsSection.insertBefore(toggleSkillsBtn, skillsSection.children[1]);

  toggleSkillsBtn.addEventListener('click', () => {
    skillCards.forEach(card => {
      card.classList.toggle('hidden');
    });
  });
}


