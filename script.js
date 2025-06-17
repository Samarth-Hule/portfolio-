
// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Generate floating particles
    generateFloatingParticles();

    // Handle profile image error
    const profileImg = document.getElementById('profile-img');
    const profileInitial = document.querySelector('.profile-initial');
    
    profileImg.addEventListener('error', function() {
        profileImg.style.display = 'none';
        profileInitial.classList.remove('hidden');
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleContactForm);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', handleNavbarScroll);
});

// Generate floating particles
function generateFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Project expansion functionality
let expandedProject = null;

function toggleProject(index) {
    const projectCards = document.querySelectorAll('.project-card');
    const projectCard = projectCards[index];
    const projectDetails = projectCard.querySelector('.project-details');
    const expandBtn = projectCard.querySelector('.expand-btn');
    const expandText = expandBtn.querySelector('.expand-text');
    const expandIcon = expandBtn.querySelector('.expand-icon');

    // Close previously expanded project
    if (expandedProject !== null && expandedProject !== index) {
        const prevCard = projectCards[expandedProject];
        const prevDetails = prevCard.querySelector('.project-details');
        const prevBtn = prevCard.querySelector('.expand-btn');
        const prevText = prevBtn.querySelector('.expand-text');
        const prevIcon = prevBtn.querySelector('.expand-icon');
        
        prevDetails.classList.add('hidden');
        prevBtn.classList.remove('expanded');
        prevText.textContent = 'Learn More';
        prevIcon.textContent = '↓';
    }

    // Toggle current project
    if (expandedProject === index) {
        // Close current project
        projectDetails.classList.add('hidden');
        expandBtn.classList.remove('expanded');
        expandText.textContent = 'Learn More';
        expandIcon.textContent = '↓';
        expandedProject = null;
    } else {
        // Open current project
        projectDetails.classList.remove('hidden');
        expandBtn.classList.add('expanded');
        expandText.textContent = 'Show Less';
        expandIcon.textContent = '↑';
        expandedProject = index;
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    console.log('Contact form submitted:', data);
    
    // Show success message
    showToast('Message Sent!', "Thanks for reaching out. I'll get back to you soon!");
    
    // Reset form
    e.target.reset();
}

// Simple toast notification
function showToast(title, description) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-description">${description}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1e293b;
        border: 1px solid #0ea5e9;
        border-radius: 8px;
        padding: 16px;
        color: #e2e8f0;
        z-index: 1000;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .toast-content {
            margin-right: 20px;
        }
        .toast-title {
            margin: 0 0 4px 0;
            font-size: 14px;
            font-weight: 600;
            color: #0ea5e9;
        }
        .toast-description {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .toast-close {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            font-size: 18px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        .toast-close:hover {
            background: #374151;
            color: #e2e8f0;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.skill-category, .service-card, .project-card, .about-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Add scroll progress indicator
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrollPercent}%;
            height: 3px;
            background: linear-gradient(45deg, #0ea5e9, #3b82f6);
            z-index: 1000;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrollPercent + '%';
    }
});
