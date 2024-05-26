const animateHeading = () => {
    const bannerHeading = document.querySelector('.banner-heading');
    const firstSpan = bannerHeading.querySelector('span');
    const text = firstSpan.innerText.trim(); 
    const characters = text.split(''); 

    const newText = characters.map(char => `<span>${char}</span>`).join('');
    firstSpan.innerHTML = newText;

    // Additional code to apply AOS attributes to each span
    characters.forEach((char, index) => {
        const span = firstSpan.querySelector(`span:nth-child(${index + 1})`);
        if (span) {
            span.setAttribute('data-aos', 'fade-right');
            span.setAttribute('data-aos-delay', `${index * 150}`); // Adjust delay as needed
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const scrollTopButton = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) { // Change 500 to the specific height where you want the button to appear
            scrollTopButton.classList.remove('hidden');
        } else {
            scrollTopButton.classList.add('hidden');
        }
    });

    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Call the animateHeading function
animateHeading();

document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayTimeline(data);
        })
        .catch(error => console.error('Error loading JSON:', error));
});

function displayTimeline(data) {
    const timelineContainer = document.querySelector('.history-timeline');
    const timelineHTML = generateTimelineHTML(data);
    timelineContainer.innerHTML = `
    <div class="divider absolute"></div>

    </div>
    ${timelineHTML}`;
}
function generateTimelineHTML(data) {
    let html = '';
    let rowIndex = 1; // Initialize the rowIndex

    for (const period in data) {
        html += `<div class="period ${rowIndex % 2 == 0 ? "mr-6": "ml-6"}" style="grid-column: ${rowIndex % 2 === 0 ? '1 / 1' : '2 / -1'}; grid-row: ${rowIndex};" data-aos="fade-up"> <!-- Added AOS attribute -->
                    <h3 class="text-lg md:text-xl font-bold mb-3">${formatTitle(period)}</h3>`;

        for (const event in data[period]) {
            const details = data[period][event];
            html += `<div class="event mb-4" data-aos="fade-up" data-aos-delay="200"> <!-- Added AOS attributes -->
                        <h4 class="text-base md:text-lg font-bold mb-2">${formatTitle(event)}</h4>`;
            if (details.time_period) {
                html += `<p class="text-sm md:text-base"><strong>Time Period:</strong> ${details.time_period}</p>`;
            }
            if (details.year) {
                html += `<p class="text-sm md:text-base"><strong>Year:</strong> ${details.year}</p>`;
            }
            if (details.scientist) {
                html += `<p class="text-sm md:text-base"><strong>Scientist:</strong> ${details.scientist}</p>`;
            }
            html += `<p class="text-sm md:text-base">${details.description}</p>
                    </div>`;
        }
        html += `</div>`;

        rowIndex += 1; // Increment the row index for the next item
    }

    return html;
}

function formatTitle(title) {
    return title.replace(/_/g, ' ');
}
