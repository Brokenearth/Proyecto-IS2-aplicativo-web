// src/js/login.js
import { login, resetPassword } from './api.js';
import { loadComponent } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '../components/header.html');
    loadComponent('footer', '../components/footer.html');

    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const resetPasswordForm = document.getElementById('reset-password-form');

    let loginAttempts = parseInt(localStorage.getItem('loginAttempts') || '0');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (loginAttempts >= 3) {
            showMessage('Demasiados intentos fallidos. Por favor, intente más tarde.', 'error');
            return;
        }

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('user-type').value;

        try {
            const response = await login(username, password, userType);
            if (response.success) {
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.removeItem('loginAttempts');
                showMessage('Inicio de sesión exitoso. Redirigiendo...', 'success');
                setTimeout(() => {
                    if (userType === 'student') {
                        window.location.href = '/index.html';
                    } else {
                        window.location.href = `${userType}-dashboard.html`;
                    }
                }, 2000);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            loginAttempts++;
            localStorage.setItem('loginAttempts', loginAttempts.toString());
            showMessage(error.message || 'Error al iniciar sesión. Por favor, intente de nuevo.', 'error');
        }
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        resetPasswordForm.style.display = 'block';
    });

    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('reset-email').value;
        try {
            const response = await resetPassword(email);
            if (response.success) {
                showMessage('Se ha enviado un correo con instrucciones para restablecer su contraseña.', 'success');
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            showMessage(error.message || 'Error al solicitar el restablecimiento de contraseña.', 'error');
        }
    });

    function showMessage(text, type) {
        loginMessage.textContent = text;
        loginMessage.className = `message ${type}`;
    }
}); 