document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const navGame = document.getElementById('nav-game');
    const navAnimal = document.getElementById('nav-animal');
    const gameView = document.getElementById('game-view');
    const animalView = document.getElementById('animal-view');
    
    const currentWordSpan = document.getElementById('current-word');
    const wordInput = document.getElementById('word-input');
    const submitButton = document.getElementById('submit-button');
    const message = document.getElementById('message');
    const wordHistory = document.getElementById('word-history');
    const themeToggle = document.getElementById('theme-toggle');
    const formContainer = document.getElementById('form-container');
    const formToggleBtn = document.getElementById('form-toggle-btn');
    const formCloseBtn = document.getElementById('form-close-btn');

    // Animal Test Elements
    const imageUpload = document.getElementById('image-upload');
    const uploadPreview = document.getElementById('upload-preview');
    const resultContainer = document.getElementById('result-container');
    const placeholderIcon = document.getElementById('placeholder-icon');

    const URL = "https://teachablemachine.withgoogle.com/models/ah5XrmvRKk/";
    let model, labelContainer, maxPredictions;

    // --- Navigation Logic ---
    function switchView(view) {
        if (view === 'game') {
            gameView.classList.remove('hidden');
            animalView.classList.add('hidden');
            navGame.classList.add('active');
            navAnimal.classList.remove('active');
        } else {
            gameView.classList.add('hidden');
            animalView.classList.remove('hidden');
            navGame.classList.remove('active');
            navAnimal.classList.add('active');
        }
    }

    navGame.addEventListener('click', () => switchView('game'));
    navAnimal.addEventListener('click', () => switchView('animal'));

    // Footer Nav Buttons
    const btnNavHome = document.querySelector('.btn-nav-home');
    const btnNavAnimal = document.querySelector('.btn-nav-animal');
    
    if (btnNavHome) btnNavHome.addEventListener('click', () => {
        switchView('game');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    if (btnNavAnimal) btnNavAnimal.addEventListener('click', () => {
        switchView('animal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Theme Toggle Logic ---
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // --- Animal Face Test Logic ---
    async function ensureModelLoaded() {
        if (!model) {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            
            labelContainer = document.getElementById("label-container");
            labelContainer.innerHTML = '';
            for (let i = 0; i < maxPredictions; i++) {
                const classDiv = document.createElement("div");
                classDiv.classList.add("result-item");
                classDiv.innerHTML = `
                    <div class="class-label">
                        <span class="class-name"></span>
                        <span class="class-prob"></span>
                    </div>
                    <div class="result-bar">
                        <div class="result-fill" style="width: 0%"></div>
                    </div>
                `;
                labelContainer.appendChild(classDiv);
            }
        }
    }

    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            uploadPreview.src = event.target.result;
            uploadPreview.classList.remove('hidden');
            placeholderIcon.classList.add('hidden');
            resultContainer.classList.remove('hidden');

            await ensureModelLoaded();
            await predict(uploadPreview);
        };
        reader.readAsDataURL(file);
    }

    async function predict(imageSource) {
        const prediction = await model.predict(imageSource);
        for (let i = 0; i < maxPredictions; i++) {
            const classDiv = labelContainer.childNodes[i];
            const className = prediction[i].className;
            const probability = (prediction[i].probability * 100).toFixed(0);

            classDiv.querySelector('.class-name').textContent = className === 'Dog' ? '🐶 강아지상' : '🐱 고양이상';
            classDiv.querySelector('.class-prob').textContent = probability + '%';
            classDiv.querySelector('.result-fill').style.width = probability + '%';
        }
    }

    imageUpload.addEventListener('change', handleImageUpload);

    // --- Word Game Logic ---
    let currentWord = '시작';
    const history = new Set([currentWord]);

    function init() {
        currentWordSpan.textContent = currentWord;
        addWordToHistory(currentWord);
    }

    function handleWordSubmit() {
        const newWord = wordInput.value.trim();
        if (newWord === '') return showMessage('단어를 입력해주세요.', 'error');
        if (newWord.length <= 1) return showMessage('두 글자 이상의 단어를 입력해주세요.', 'error');
        if (history.has(newWord)) return showMessage('이미 사용된 단어입니다.', 'error');
        if (currentWord.charAt(currentWord.length - 1) !== newWord.charAt(0)) {
            return showMessage(`'${currentWord.charAt(currentWord.length - 1)}'로 시작하는 단어를 입력하세요.`, 'error');
        }

        currentWord = newWord;
        history.add(currentWord);
        currentWordSpan.textContent = currentWord;
        wordInput.value = '';
        showMessage('정답입니다!', 'success');
        addWordToHistory(currentWord);
    }

    function showMessage(text, type) {
        message.textContent = text;
        message.style.color = type === 'error' ? 'var(--error-color)' : 'var(--success-color)';
    }

    function addWordToHistory(word) {
        const li = document.createElement('li');
        li.textContent = word;
        wordHistory.appendChild(li);
        wordHistory.scrollTop = wordHistory.scrollHeight;
    }

    submitButton.addEventListener('click', handleWordSubmit);
    wordInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleWordSubmit());

    // --- Form Toggle Logic ---
    formToggleBtn.addEventListener('click', () => {
        formContainer.classList.toggle('hidden');
        if (!formContainer.classList.contains('hidden')) {
            formContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });
    formCloseBtn.addEventListener('click', () => formContainer.classList.add('hidden'));

    // --- Privacy Modal Logic ---
    const btnPrivacy = document.getElementById('btn-privacy');
    const privacyModal = document.getElementById('privacy-modal');
    const closePrivacy = document.getElementById('close-privacy');

    btnPrivacy.addEventListener('click', () => privacyModal.classList.remove('hidden'));
    closePrivacy.addEventListener('click', () => privacyModal.classList.add('hidden'));
    window.addEventListener('click', (e) => {
        if (e.target === privacyModal) privacyModal.classList.add('hidden');
    });

    init();
});
