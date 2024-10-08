// src/js/utils.js
export function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error cargando el componente:', error));
}

export function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && window.location.pathname.includes('dashboard')) {
        window.location.href = '/src/pages/login.html';
    }
    return user;
}

export function logout() {
    localStorage.removeItem('user');
    window.location.href = '/src/pages/login.html';
}