// Internationalization System
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || 'en';
        this.messages = {};
        this.currentPage = this.getCurrentPageName();
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        if (path.includes('/projects/')) {
            // Extract project name from path like /projects/safety-scanner.html
            const match = path.match(/\/projects\/(.+)\.html/);
            return match ? match[1] : 'project';
        }
        return path === '/' || path.endsWith('index.html') ? 'index' : 'index';
    }

    async loadMessages() {
        try {
            const response = await fetch(`lang/messages/${this.currentLang}/${this.currentPage}.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            this.messages = await response.json();
            this.updatePage();
        } catch (error) {
            console.warn(`Failed to load messages for ${this.currentLang}/${this.currentPage}, falling back to English`);
            if (this.currentLang !== 'en') {
                this.currentLang = 'en';
                await this.loadMessages();
            }
        }
    }

    async setLanguage(lang) {
        if (this.currentLang !== lang) {
            this.currentLang = lang;
            localStorage.setItem('preferred-language', lang);
            await this.loadMessages();
        }
    }

    getMessage(key) {
        return this.messages[key] || key;
    }

    updatePage() {
        // Update all elements with IDs that match message keys
        Object.keys(this.messages).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = this.messages[key];
            }
        });

        // Update language toggle button
        this.updateLanguageToggle();
    }

    updateLanguageToggle() {
        const flag = document.getElementById('lang-flag');
        const text = document.getElementById('lang-text');
        
        if (flag && text) {
            if (this.currentLang === 'en') {
                flag.textContent = '🇫🇷';
                text.textContent = 'FR';
            } else {
                flag.textContent = '🇨🇦';
                text.textContent = 'EN';
            }
        }
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    async init() {
        await this.loadMessages();
        
        // Set up language toggle
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', async () => {
                const newLang = this.currentLang === 'en' ? 'fr' : 'en';
                await this.setLanguage(newLang);
            });
        }
    }
}

// Initialize i18n system
const i18n = new I18n();