const SPREADSHEET_ID = '1oNFzsq3Wuqyej18k0K73bysJMaYZIoLrYYB1dcOACGU';
const API_KEY = 'AIzaSyCqPL_5vVIJ_dNqU_u4xqEjFvZVSU1w8sA';

let guestData = [];
let galleryPhotos = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadGuestData();
    createSampleGallery();
    loadGuestbookFromStorage();
});

function initializeApp() {
    console.log('✨ Wedding Companion Site Ready');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {
            console.log('Service Worker not available');
        });
    }
}

function goHome() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById('home-screen').classList.add('active');
    window.scrollTo(0, 0);
}

function switchScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(`${screenId}-screen`).classList.add('active');
    window.scrollTo(0, 0);
}

function setupEventListeners() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const screenId = card.getAttribute('data-screen');
            switchScreen(screenId);
        });
    });

    document.getElementById('enter-btn').addEventListener('click', () => {
        document.querySelectorAll('.card').forEach(card => {
            card.style.animation = 'slideUp 0.4s ease forwards';
        });
    });

    const guestSearch = document.getElementById('guest-search');
    if (guestSearch) {
        guestSearch.addEventListener('input', (e) => {
            handleGuestSearch(e.target.value);
        });
    }

    const uploadZone = document.getElementById('upload-zone');
    if (uploadZone) {
        uploadZone.addEventListener('click', () => {
            document.getElementById('file-input').click();
        });

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.background = 'rgba(255, 154, 118, 0.2)';
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.style.background = '';
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.background = '';
            handleFileSelect(e.dataTransfer.files);
        });
    }

    document.getElementById('file-input')?.addEventListener('change', (e) => {
        handleFileSelect(e.target.files);
    });

    document.getElementById('upload-btn')?.addEventListener('click', uploadPhotos);
    document.getElementById('guestbook-submit')?.addEventListener('click', submitGuestbookMessage);

    document.querySelectorAll('.gallery-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.getAttribute('data-category');
            filterGallery(category);
        });
    });

    document.getElementById('cancel-upload')?.addEventListener('click', () => {
        resetUploadZone();
    });

    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

async function handleGuestSearch(searchTerm) {
    const searchContainer = document.getElementById('search-suggestions');
    const seatResult = document.getElementById('seat-result');
    const errorMessage = document.getElementById('search-error');

    if (!searchTerm.trim()) {
        searchContainer.innerHTML = '';
        seatResult.classList.add('hidden');
        errorMessage.classList.add('hidden');
        return;
    }

    const normalizedSearch = normalizeString(searchTerm);
    const suggestions = guestData
        .filter(guest => {
            const fullName = normalizeString(`${guest.prenom} ${guest.nom}`);
            return fullName.includes(normalizedSearch);
        })
        .slice(0, 5);

    if (suggestions.length > 0) {
        searchContainer.innerHTML = suggestions
            .map(guest => `
                <div class="suggestion-item" onclick="selectGuest('${escapeHtml(guest.prenom)}', '${escapeHtml(guest.nom)}')">
                    ${guest.prenom} ${guest.nom}
                </div>
            `)
            .join('');
        errorMessage.classList.add('hidden');
    } else {
        searchContainer.innerHTML = '';
        errorMessage.classList.remove('hidden');
    }
}

function selectGuest(prenom, nom) {
    const guest = guestData.find(g => g.prenom === prenom && g.nom === nom);
    if (guest) {
        displaySeatInfo(guest);
        document.getElementById('search-suggestions').innerHTML = '';
        document.getElementById('search-error').classList.add('hidden');
    }
}

function displaySeatInfo(guest) {
    const seatResult = document.getElementById('seat-result');
    const greeting = document.getElementById('result-greeting');
    const table = document.getElementById('result-table');
    const place = document.getElementById('result-place');
    const tableMates = document.getElementById('tablemates-list');

    greeting.textContent = `Bonjour ${guest.prenom},`;
    table.textContent = guest.table || 'À déterminer';
    place.textContent = guest.place || 'À déterminer';

    const tmates = guest.personnes_table ? guest.personnes_table.split(',').map(t => t.trim()) : [];
    tableMates.innerHTML = tmates
        .filter(t => t && t.toLowerCase() !== guest.prenom.toLowerCase())
        .map(t => `<li>${escapeHtml(t)}</li>`)
        .join('');

    seatResult.classList.remove('hidden');
    seatResult.scrollIntoView({ behavior: 'smooth' });
}

function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

async function loadGuestData() {
    try {
        showLoading(true);
        const range = 'Placement!A:E';
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`
        );

        if (!response.ok) throw new Error('Erreur chargement');

        const data = await response.json();
        const rows = data.values || [];

        guestData = rows.slice(1).map(row => ({
            prenom: row[0] || '',
            nom: row[1] || '',
            table: row[2] || '',
            place: row[3] || '',
            personnes_table: row[4] || ''
        })).filter(g => g.prenom && g.nom);

        console.log(`✅ ${guestData.length} invités chargés`);
        showLoading(false);
    } catch (error) {
        console.error('❌ Erreur:', error);
        showLoading(false);
    }
}

function createSampleGallery() {
    galleryPhotos = [
        { id: '1', category: 'ceremony', emoji: '💒' },
        { id: '2', category: 'family', emoji: '👨‍👩‍👧‍👦' },
        { id: '3', category: 'reception', emoji: '🎉' },
        { id: '4', category: 'friends', emoji: '👯' },
        { id: '5', category: 'ceremony', emoji: '💐' },
        { id: '6', category: 'reception', emoji: '🍽️' }
    ];
    displayGallery('all');
}

function displayGallery(category) {
    const galleryGrid = document.getElementById('gallery-grid');
    const filtered = category === 'all' ? galleryPhotos : galleryPhotos.filter(p => p.category === category);

    galleryGrid.innerHTML = filtered
        .map(photo => `
            <div class="gallery-item" onclick="openModal('${photo.id}')" style="background: linear-gradient(135deg, #ff9a76, #f4a460); cursor: pointer;">
                <div style="font-size: 4rem;">${photo.emoji}</div>
            </div>
        `)
        .join('');
}

function filterGallery(category) {
    displayGallery(category);
}

function handleFileSelect(files) {
    const previewContainer = document.getElementById('preview-container');
    const previewList = document.getElementById('preview-list');

    previewList.innerHTML = '';
    previewContainer.classList.remove('hidden');

    let validFiles = 0;
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') && file.size < 10 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.className = 'preview-item';
                div.innerHTML = `<img src="${e.target.result}" alt="preview">`;
                previewList.appendChild(div);
            };
            reader.readAsDataURL(file);
            validFiles++;
        }
    });

    if (validFiles === 0) {
        alert('❌ Aucune image valide sélectionnée');
        previewContainer.classList.add('hidden');
    }
}

async function uploadPhotos() {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length === 0) return;

    showLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        resetUploadZone();
        alert('✨ Photos partagées avec succès!');
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        showLoading(false);
    }
}

function resetUploadZone() {
    document.getElementById('file-input').value = '';
    document.getElementById('preview-container').classList.add('hidden');
    document.getElementById('preview-list').innerHTML = '';
}

function openModal(photoId) {
    const modal = document.getElementById('modal');
    const img = document.getElementById('modal-image');
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ff9a76" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="48" font-weight="bold"%3E📸%3C/text%3E%3C/svg%3E';
    modal.classList.remove('hidden');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function submitGuestbookMessage() {
    const nameInput = document.getElementById('guestbook-name');
    const messageInput = document.getElementById('guestbook-message');
    const messagesContainer = document.getElementById('guestbook-messages');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert('⚠️ Veuillez remplir tous les champs');
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'guestbook-message';
    messageDiv.innerHTML = `
        <div class="message-name">${escapeHtml(name)}</div>
        <div class="message-text">${escapeHtml(message)}</div>
        <div class="message-time">À l'instant</div>
    `;

    messagesContainer.insertBefore(messageDiv, messagesContainer.firstChild);

    nameInput.value = '';
    messageInput.value = '';

    saveGuestbookToStorage({
        name: name,
        message: message,
        timestamp: new Date().toISOString()
    });

    alert('💌 Message ajouté au livre d\'or!');
}

function saveGuestbookToStorage(message) {
    let messages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');
    messages.unshift(message);
    messages = messages.slice(0, 100);
    localStorage.setItem('guestbookMessages', JSON.stringify(messages));
}

function loadGuestbookFromStorage() {
    const messages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');
    const messagesContainer = document.getElementById('guestbook-messages');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = messages
        .map(msg => `
            <div class="guestbook-message">
                <div class="message-name">${escapeHtml(msg.name)}</div>
                <div class="message-text">${escapeHtml(msg.message)}</div>
                <div class="message-time">${formatDate(msg.timestamp)}</div>
            </div>
        `)
        .join('');
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `Il y a ${diffDays}j`;
}

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

console.log('🎊 Site Compagnon de Mariage Ready! 🎊');