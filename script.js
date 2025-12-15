// Автоматично обновяване на датата
function updateCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = `${day}.${month}.${year}`;
    }
    
    // Обновяване на годината във футъра
    const copyrightElements = document.querySelectorAll('.footer-bottom p:first-child');
    copyrightElements.forEach(element => {
        element.textContent = element.textContent.replace(/2024|2025/g, year);
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 GBT PRO AI Travel зареден успешно!');
    
    // Обновяване на датата
    updateCurrentDate();
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // AI Chat Widget
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', function() {
            chatContainer.classList.toggle('active');
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatContainer.classList.remove('active');
        });
    }

    // AI Responses
    const aiResponses = [
        "Разбирам, че търсите информация за пътуване! Мога да ви препоръчам няколко страхотни дестинации за 2025 година.",
        "За да ви подготвя перфектния план за 2025, моля кажете ми: Какъв е вашият бюджет? Предпочитате плаж, планини или градски туризъм?",
        "Страхотен избор! За 2025 имам специални оферти за тази дестинация. Кога планирате да пътувате?",
        "На базата на вашите предпочитания за 2025, мога да ви предложа пълен пакет включващ полети, хотел и екскурзии.",
        "За вашия бюджет през 2025 има няколко отлични опции. Имаме и ранни резервации с отстъпки!",
        "Разбирам, че пътувате с група през 2025. Мога да ви предложа групови отстъпки и специални активности.",
        "Тази дестинация е перфектна за 2025! Климатът ще бъде идеален за посещение.",
        "За 2025 имам няколко нови, скрити бисера за тази дестинация - много модерни места!",
        "Въз основа на тенденциите за 2025, препоръчвам да включите и тези забележителности.",
        "Мога да ви подготвя пълен дневен план за ваканцията през 2025. Искате ли да го видите?"
    ];

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAIResponse() {
        const randomIndex = Math.floor(Math.random() * aiResponses.length);
        return aiResponses[randomIndex];
    }

    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatInput.value = '';
                
                // Simulate AI thinking
                setTimeout(() => {
                    addMessage(getAIResponse());
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage.click();
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const destination = document.getElementById('destination').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                formMessage.textContent = 'Моля, попълнете всички задължителни полета!';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            // Simulate form submission
            formMessage.textContent = '✅ Благодарим ви за запитването за 2025! Ще се свържем с вас в рамките на 24 часа.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });

    // Pricing card interactions
    const pricingButtons = document.querySelectorAll('.btn-pricing');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            
            // Open chat and send message
            if (chatContainer) {
                chatContainer.classList.add('active');
                
                // Add user message
                addMessage(`Интересувам се от ${plan} план за 2025. Можете ли да ми дадете повече информация?`, true);
                
                // AI response
                setTimeout(() => {
                    addMessage(`Разбира се! ${plan} план за 2025 включва всички функции плюс нови ексклузивни оферти. Имате ли конкретни дати за пътуване?`);
                }, 1000);
            }
        });
    });

    // CTA Buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add loading animation to all buttons
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Additional smooth scrolling for all anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});