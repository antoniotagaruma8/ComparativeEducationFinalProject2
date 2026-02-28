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

    // Scroll Progress Bar and Navigation
    const progressBar = document.getElementById('progressBar');
    const mainNav = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Progress Bar
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        if (progressBar) progressBar.style.width = scrollPercentage + '%';

        // Nav Glass effect
        if (mainNav) {
            if (scrollTop > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        }

        // Active Nav Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Initialize PISA Chart
    initPisaChart();
});

// Global chart instance for modal
let modalChartInstance = null;

function openChartModal() {
    const modal = document.getElementById('chartModalBox');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        if (!modalChartInstance) {
            modalChartInstance = createPisaChart('pisaModalChart');
        }
    }
}

function closeChartModal() {
    const modal = document.getElementById('chartModalBox');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on escape or outside click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeChartModal();
});
document.addEventListener('click', (e) => {
    const modal = document.getElementById('chartModalBox');
    if (e.target === modal) closeChartModal();
});

function initPisaChart() {
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // Create inline chart
    createPisaChart('pisaChart');
}

function createPisaChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Math', 'Science', 'Reading'],
            datasets: [
                {
                    label: 'Philippines (ESL / English Test)',
                    data: [355, 356, 347],
                    backgroundColor: 'rgba(230, 25, 75, 0.9)', // Deep Red
                    borderColor: 'rgba(230, 25, 75, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Malaysia (ESL / English Test)',
                    data: [409, 416, 388],
                    backgroundColor: 'rgba(60, 180, 75, 0.9)', // Strong Green
                    borderColor: 'rgba(60, 180, 75, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Malta (ESL / English Test)',
                    data: [466, 466, 445],
                    backgroundColor: 'rgba(255, 225, 25, 0.9)', // Bright Yellow
                    borderColor: 'rgba(255, 225, 25, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Japan (Mother Tongue Asian)',
                    data: [536, 547, 516],
                    backgroundColor: 'rgba(67, 99, 216, 0.9)', // Deep Blue
                    borderColor: 'rgba(67, 99, 216, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Macao (Mother Tongue Asian)',
                    data: [552, 543, 510],
                    backgroundColor: 'rgba(245, 130, 49, 0.9)', // Strong Orange
                    borderColor: 'rgba(245, 130, 49, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Finland (Mother Tongue EU)',
                    data: [484, 511, 490],
                    backgroundColor: 'rgba(145, 30, 180, 0.9)', // Deep Purple
                    borderColor: 'rgba(145, 30, 180, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Estonia (Mother Tongue EU)',
                    data: [510, 526, 511],
                    backgroundColor: 'rgba(66, 212, 244, 0.9)', // Light Cyan
                    borderColor: 'rgba(66, 212, 244, 1)',
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
                    },
                    onHover: function (event, legendItem, legend) {
                        const index = legendItem.datasetIndex;
                        const chart = legend.chart;

                        chart.data.datasets.forEach((dataset, i) => {
                            if (i !== index && dataset.label !== 'OECD Average') {
                                // Store original colors
                                if (!dataset.originalBg) {
                                    dataset.originalBg = dataset.backgroundColor;
                                    dataset.originalBorder = dataset.borderColor;
                                }
                                dataset.backgroundColor = 'rgba(71, 85, 105, 0.1)';
                                dataset.borderColor = 'rgba(71, 85, 105, 0.3)';
                            } else if (i === index) {
                                // Restore isolated dataset fully in case it was dimmed before
                                if (dataset.originalBg) {
                                    dataset.backgroundColor = dataset.originalBg;
                                    dataset.borderColor = dataset.originalBorder;
                                }
                            }
                        });
                        chart.update();
                    },
                    onLeave: function (event, legendItem, legend) {
                        const chart = legend.chart;
                        // Restore all datasets
                        chart.data.datasets.forEach((dataset) => {
                            if (dataset.originalBg) {
                                dataset.backgroundColor = dataset.originalBg;
                                dataset.borderColor = dataset.originalBorder;
                                delete dataset.originalBg;
                                delete dataset.originalBorder;
                            }
                        });
                        chart.update();
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
                    min: 300,
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

// Language Translation Toggle Logic
let isTranslated = false;

function toggleTranslation() {
    isTranslated = !isTranslated;
    const btn = document.getElementById('translateBtn');
    const question = document.getElementById('phQuestion');
    const opt1 = document.getElementById('phOpt1');
    const opt2 = document.getElementById('phOpt2');
    const opt3 = document.getElementById('phOpt3');
    const opt4 = document.getElementById('phOpt4');

    // Cognitive Load Elements
    const step1 = document.getElementById('phStep1');
    const step2 = document.getElementById('phStep2');
    const loadFill = document.getElementById('phLoadFill');

    if (isTranslated) {
        // Tagalog Translation
        btn.innerHTML = 'Revert to English';
        btn.style.backgroundColor = 'var(--primary-light)';
        btn.style.color = '#fff';

        question.innerHTML = '"Alin sa mga sumusunod na proseso ang naglalarawan ng paglipat ng init sa isang likido dahil sa paggalaw ng mga molekula?"';
        opt1.innerHTML = 'A. Conduction';
        opt2.innerHTML = 'B. Convection';
        opt3.innerHTML = 'C. Radiation';
        opt4.innerHTML = 'D. Insulation';

        // Animate Cognitive Load drop
        step1.classList.add('dimmed');
        step1.innerHTML = '<span class="step-icon">✓</span> <del>Decode unfamiliar English vocabulary <em>("fluid", "molecular motion")</em>.</del>';

        step2.classList.add('dimmed');
        step2.innerHTML = '<span class="step-icon">✓</span> <del>Translate the sentence structure into their native tongue (e.g., Tagalog/Cebuano).</del>';

        // Match Finland's low load
        loadFill.style.width = '35%';
        loadFill.style.backgroundColor = 'var(--accent)';

    } else {
        // English Original
        btn.innerHTML = 'Translate to Mother Tongue (Tagalog)';
        btn.style.backgroundColor = 'transparent';
        btn.style.color = 'var(--text-color)';

        question.innerHTML = '"Which of the following processes describes the transfer of heat through a fluid caused by molecular motion?"';
        opt1.innerHTML = 'A. Conduction';
        opt2.innerHTML = 'B. Convection';
        opt3.innerHTML = 'C. Radiation';
        opt4.innerHTML = 'D. Insulation';

        // Revert Cognitive Load
        step1.classList.remove('dimmed');
        step1.innerHTML = '<span class="step-icon">1</span> Decode unfamiliar English vocabulary <em>("fluid", "molecular motion")</em>.';

        step2.classList.remove('dimmed');
        step2.innerHTML = '<span class="step-icon">2</span> Translate the sentence structure into their native tongue (e.g., Tagalog/Cebuano).';

        // Revert to high load
        loadFill.style.width = '90%';
        loadFill.style.backgroundColor = 'var(--secondary)';
    }
}
