function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = '/src/pages/login.html';
    }
    return user;
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = '/src/pages/login.html';
}

// Exportar las funciones si estás usando módulos ES6
export { checkAuth, logout };