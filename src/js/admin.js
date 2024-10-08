document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('admin-form');
    const adminMessage = document.getElementById('admin-message');

    // Cargar la información existente
    loadSchoolInfo();

    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(adminForm);
        const schoolInfo = Object.fromEntries(formData.entries());

        try {
            const response = await updateSchoolInfo(schoolInfo);
            if (response.success) {
                adminMessage.textContent = 'Información actualizada con éxito.';
                adminMessage.className = 'message success';
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            adminMessage.textContent = error.message || 'Error al actualizar la información.';
            adminMessage.className = 'message error';
        }
    });
});

async function loadSchoolInfo() {
    try {
        // Simular una llamada a la API para obtener la información existente
        const schoolInfo = await getSchoolInfo();
        Object.entries(schoolInfo).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                element.value = value;
            }
        });
    } catch (error) {
        console.error('Error al cargar la información:', error);
    }
}

async function getSchoolInfo() {
    // Simular una llamada a la API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                mission: 'Misión de la institución...',
                vision: 'Visión de la institución...',
                hymn: 'Letra del himno...',
                shield: 'Descripción del escudo...',
                flag: 'Descripción de la bandera...',
                principles: 'Principios institucionales...',
                values: 'Valores institucionales...',
                campuses: 'Lista de sedes...',
                pei: 'Resumen del PEI...',
                manual: 'Enlace al manual de convivencia...',
                'study-plan': 'Resumen del plan de estudio...',
                platforms: 'Enlaces a plataformas académicas...'
            });
        }, 1000);
    });
}

async function updateSchoolInfo(schoolInfo) {
    // Simular una llamada a la API para actualizar la información
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Información actualizada:', schoolInfo);
            resolve({ success: true, message: 'Información actualizada con éxito' });
        }, 1000);
    });
}