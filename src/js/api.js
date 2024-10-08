// src/js/api.js
const API_URL = 'http://localhost:8080/api';

export async function login(username, password, userType) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType }),
    });
    return await response.json();
}

export async function resetPassword(email) {
    const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    return await response.json();
}

export async function getNews() {
    const response = await fetch(`${API_URL}/news`);
    return await response.json();
}

export async function getCalendarEvents() {
    const response = await fetch(`${API_URL}/calendar-events`);
    return await response.json();
}

export async function getSchoolInfo() {
    const response = await fetch(`${API_URL}/school-info`);
    return await response.json();
}

export async function updateSchoolInfo(schoolInfo) {
    const response = await fetch(`${API_URL}/school-info`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolInfo),
    });
    return await response.json();
}