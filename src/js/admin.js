// src/js/admin.js
import { loadComponent, checkAuth } from './utils.js';
import { getSchoolInfo, updateSchoolInfo } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    loadComponent('header', '../components/header.html');
    loadComponent('footer', '../components/footer.html');

    const user = checkAuth();
    if (!user || user.type !== 'admin') {
        window.location.href = '/src/pages/login.html';
        return;
    }

    const adminForm = document.getElementById('admin-form');
    const adminMessage = document.getElementById('admin-message');

    await loadSchoolInfo();

    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(adminForm);
        const schoolInfo = Object.fromEntries(formData.entries());

        try {
            const response = await updateSchoolInfo(schoolInfo);
            if (response.success) {
                showMessage('Información actualizada con éxito.', 'success');
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            showMessage(error.message || 'Error al actualizar la información.', 'error');
        }
    });

    async function loadSchoolInfo() {
        try {
            const schoolInfo = await getSchoolInfo();
            Object.entries(schoolInfo).forEach(([key, value]) => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = value;
                }
            });
        } catch (error) {
            console.error('Error al cargar la información:', error);
            showMessage('Error al cargar la información. Por favor, intente de nuevo.', 'error');
        }
    }

    function showMessage(text, type) {
        
        adminMessage.textContent = text;
        adminMessage.className = `message ${type}`;
    }
});