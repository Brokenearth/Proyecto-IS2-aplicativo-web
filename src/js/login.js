document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const resetPasswordForm = document.getElementById('reset-password-form');

    let loginAttempts = parseInt(localStorage.getItem('loginAttempts') || '0');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (loginAttempts >= 3) {
            loginMessage.textContent = 'Demasiados intentos fallidos. Por favor, intente más tarde.';
            loginMessage.className = 'message error';
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
                loginMessage.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
                loginMessage.className = 'message success';
                setTimeout(() => {
                    window.location.href = `${userType}-dashboard.html`;
                }, 2000);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            loginAttempts++;
            localStorage.setItem('loginAttempts', loginAttempts.toString());
            loginMessage.textContent = error.message || 'Error al iniciar sesión. Por favor, intente de nuevo.';
            loginMessage.className = 'message error';
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
                loginMessage.textContent = 'Se ha enviado un correo con instrucciones para restablecer su contraseña.';
                loginMessage.className = 'message success';
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            loginMessage.textContent = error.message || 'Error al solicitar el restablecimiento de contraseña.';
            loginMessage.className = 'message error';
        }
    });
});

async function login(username, password, userType) {
    const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType }),
    });
    return await response.json();
}

async function resetPassword(email) {
    const response = await fetch('http://localhost:8080/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    return await response.json();
}