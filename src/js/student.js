document.addEventListener('DOMContentLoaded', () => {
    loadSchoolInfo();
});

async function loadSchoolInfo() {
    try {
        const schoolInfo = await getSchoolInfo();
        const schoolInfoContainer = document.getElementById('school-info');
        
        Object.entries(schoolInfo).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.className = 'dashboard-item';
            item.innerHTML = `
                <h2>${formatTitle(key)}</h2>
                <p>${value}</p>
            `;
            schoolInfoContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Error al cargar la información:', error);
    }
}

function formatTitle(key) {
    return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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