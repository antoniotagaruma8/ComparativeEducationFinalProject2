document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine delay if custom property exists
                const delay = entry.target.style.getPropertyValue('--delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial trigger for elements already in viewport on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // Dynamic mouse-tracking spotlight effect for cards
    const interactiveCards = document.querySelectorAll('.glass-card, .feature-card, .process-card, .accordion-item, .visual-box');

    document.addEventListener('mousemove', e => {
        for (const card of interactiveCards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });

    // Initialize PISA Chart
    initPisaChart();
});

function initPisaChart() {
    const ctx = document.getElementById('pisaChart');
    if (!ctx) return;

    // Dark theme configuration for Chart.js
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Math', 'Science', 'Reading'],
            datasets: [
                {
                    label: 'Philippines (ESL / English Test)',
                    data: [355, 356, 347],
                    backgroundColor: 'rgba(236, 72, 153, 0.9)', // Neon Pink
                    borderColor: 'rgba(236, 72, 153, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Malaysia (ESL / English Test)',
                    data: [409, 416, 388],
                    backgroundColor: 'rgba(244, 114, 182, 0.5)', // Muted Pink
                    borderColor: 'rgba(244, 114, 182, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Malta (ESL / English Test)',
                    data: [466, 466, 445],
                    backgroundColor: 'rgba(251, 113, 133, 0.5)', // Muted Red-Pink
                    borderColor: 'rgba(251, 113, 133, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Japan (Mother Tongue Asian)',
                    data: [536, 547, 516],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)', // Emerald Green
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Macao (Mother Tongue Asian)',
                    data: [552, 543, 510],
                    backgroundColor: 'rgba(52, 211, 153, 0.6)', // Lighter Emerald
                    borderColor: 'rgba(52, 211, 153, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Finland (Mother Tongue EU)',
                    data: [484, 511, 490],
                    backgroundColor: 'rgba(6, 182, 212, 0.8)', // Cyan
                    borderColor: 'rgba(6, 182, 212, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Estonia (Mother Tongue EU)',
                    data: [510, 526, 511],
                    backgroundColor: 'rgba(99, 102, 241, 0.8)', // Indigo
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'OECD Average',
                    data: [472, 485, 476],
                    type: 'line',
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    borderDash: [5, 5],
                    fill: false,
                    pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
                    pointRadius: 6,
                    order: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(5, 5, 5, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#e2e8f0',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 10
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 300, // Zoom in to show difference better
                    max: 600,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false,
                    },
                    ticks: {
                        stepSize: 50
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                }
            }
        }
    });
}

