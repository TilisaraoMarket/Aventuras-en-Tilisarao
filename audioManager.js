class AudioManager {
    constructor() {
        this.audioSources = {
            backgroundMusic: 'https://assets.mixkit.co/music/preview/mixkit-game-level-music-689.mp3',
            jump: 'https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3',
            point: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-score-interface-217.mp3',
            gameOver: 'https://assets.mixkit.co/sfx/preview/mixkit-failure-arcade-alert-notification-240.mp3'
        };

        this.sounds = {};
        this.isMusicMuted = false;
        this.isSoundMuted = false;

        this.init();
    }

    init() {
        for (const [key, url] of Object.entries(this.audioSources)) {
            this.sounds[key] = new Audio(url);
            if (key === 'backgroundMusic') {
                this.sounds[key].loop = true;
                this.sounds[key].volume = 0.5;
            }
            this.sounds[key].load();
        }

        this.setupControls();
    }

    setupControls() {
        const musicBtn = document.getElementById('musicToggle');
        const soundBtn = document.getElementById('soundToggle');

        musicBtn.addEventListener('click', () => this.toggleMusic());
        soundBtn.addEventListener('click', () => this.toggleSound());
    }

    toggleMusic() {
        this.isMusicMuted = !this.isMusicMuted;
        this.sounds.backgroundMusic.muted = this.isMusicMuted;
        
        const musicBtn = document.getElementById('musicToggle');
        musicBtn.textContent = this.isMusicMuted ? "🔇 Música" : "🎵 Música";
        musicBtn.classList.toggle('muted', this.isMusicMuted);
    }

    toggleSound() {
        this.isSoundMuted = !this.isSoundMuted;
        
        Object.keys(this.sounds).forEach(key => {
            if (key !== 'backgroundMusic') {
                this.sounds[key].muted = this.isSoundMuted;
            }
        });

        const soundBtn = document.getElementById('soundToggle');
        soundBtn.textContent = this.isSoundMuted ? "🔇 Efectos" : "🔊 Efectos";
        soundBtn.classList.toggle('muted', this.isSoundMuted);
    }

    playMusic() {
        const music = this.sounds.backgroundMusic;
        music.currentTime = 0;
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented:", error);
                document.addEventListener('click', () => {
                    music.play().catch(e => console.log("Playback failed:", e));
                }, { once: true });
            });
        }
    }

    playSound(soundName) {
        if (!this.sounds[soundName]) return;
        const sound = this.sounds[soundName];
        sound.currentTime = 0;
        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log(`${soundName} playback prevented:`, error);
            });
        }
    }

    stopMusic() {
        const music = this.sounds.backgroundMusic;
        music.pause();
        music.currentTime = 0;
    }
}

const audioManager = new AudioManager();