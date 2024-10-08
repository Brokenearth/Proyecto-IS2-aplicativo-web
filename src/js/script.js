// src/js/script.js
import { loadComponent, checkAuth, logout } from './utils.js';
import { getNews, getCalendarEvents } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    loadComponent('header', 'src/components/header.html');
    loadComponent('footer', 'src/components/footer.html');

    const user = checkAuth();
    if (user) {
        const userWelcome = document.getElementById('user-welcome');
        const userName = document.getElementById('user-name');
        if (userWelcome && userName) {
            userWelcome.style.display = 'block';
            userName.textContent = user.name;
        }
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    await loadNews();
    await loadCalendarEvents();
    setupStickyNavigation();
});

async function loadNews() {
    const newsContainer = document.getElementById('news-container');
    const news = await getNews();
    news.forEach(item => {
        const article = document.createElement('article');
        article.className = 'news-item';
        article.innerHTML = `
            <div class="news-content">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            </div>
            <figure class="news-image">
                <img src="${item.imageUrl}" alt="${item.imageAlt}" loading="lazy">
            </figure>
        `;
        newsContainer.appendChild(article);
    });
}

async function loadCalendarEvents() {
    const calendarList = document.getElementById('calendar-events');
    const events = await getCalendarEvents();
    events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `
            <time datetime="${event.date}">${event.formattedDate}</time>
            <p>${event.description}</p>
        `;
        calendarList.appendChild(li);
    });
}

function setupStickyNavigation() {
    const header = document.querySelector('header');
    const sticky = header.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}