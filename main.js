document.addEventListener('DOMContentLoaded', () => {
    const currentWordSpan = document.getElementById('current-word');
    const wordInput = document.getElementById('word-input');
    const submitButton = document.getElementById('submit-button');
    const message = document.getElementById('message');
    const wordHistory = document.getElementById('word-history');
    const themeToggle = document.getElementById('theme-toggle');
    const formContainer = document.getElementById('form-container');
    const formToggleBtn = document.getElementById('form-toggle-btn');
    const formCloseBtn = document.getElementById('form-close-btn');

    let currentWord = '시작';
    const history = new Set([currentWord]);

    // Theme Toggle Logic
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Animal Face Test Logic
    const URL = "https://teachablemachine.withgoogle.com/models/ah5XrmvRKk/";
    let model, webcam, labelContainer, maxPredictions;
    const webcamStartBtn = document.getElementById('webcam-start-btn');
    const imageUpload = document.getElementById('image-upload');
    const uploadPreview = document.getElementById('upload-preview');
    const resultContainer = document.getElementById('result-container');
    const webcamContainer = document.getElementById('webcam-container');

    async function ensureModelLoaded() {
        if (!model) {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            
            // 레이블 컨테이너 초기화
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

    async function initAnimalTest() {
        webcamStartBtn.disabled = true;
        webcamStartBtn.textContent = '모델 로딩 중...';

        try {
            await ensureModelLoaded();
            
            const flip = true;
            webcam = new tmImage.Webcam(300, 300, flip);
            await webcam.setup();
            await webcam.play();
            window.requestAnimationFrame(loop);

            uploadPreview.classList.add('hidden');
            webcamContainer.appendChild(webcam.canvas);
            resultContainer.classList.remove('hidden');
            webcamStartBtn.classList.add('hidden');
            document.getElementById('upload-label').classList.add('hidden');
        } catch (error) {
            console.error(error);
            alert("카메라 권한이 필요합니다.");
            webcamStartBtn.disabled = false;
            webcamStartBtn.textContent = '실시간 테스트 (웹캠)';
        }
    }

    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            // 웹캠 중지 (실행 중인 경우)
            if (webcam && webcam.canvas) {
                webcam.stop();
                if (webcam.canvas.parentNode) {
                    webcam.canvas.parentNode.removeChild(webcam.canvas);
                }
            }

            uploadPreview.src = event.target.result;
            uploadPreview.classList.remove('hidden');
            resultContainer.classList.remove('hidden');

            await ensureModelLoaded();
            await predict(uploadPreview);
        };
        reader.readAsDataURL(file);
    }

    async function loop() {
        if (webcam && webcam.canvas) {
            webcam.update();
            await predict(webcam.canvas);
            window.requestAnimationFrame(loop);
        }
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

    webcamStartBtn.addEventListener('click', initAnimalTest);
    imageUpload.addEventListener('change', handleImageUpload);

    // Form Toggle Logic
    formToggleBtn.addEventListener('click', () => {
        formContainer.classList.remove('hidden');
        formToggleBtn.classList.add('hidden');
        formContainer.scrollIntoView({ behavior: 'smooth' });
    });

    formCloseBtn.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        formToggleBtn.classList.remove('hidden');
    });

    function init() {
        currentWordSpan.textContent = currentWord;
        addWordToHistory(currentWord);
    }

    function handleWordSubmit() {
        const newWord = wordInput.value.trim();

        if (newWord === '') {
            showMessage('단어를 입력해주세요.', 'error');
            return;
        }

        if (newWord.length <= 1) {
            showMessage('두 글자 이상의 단어를 입력해주세요.', 'error');
            return;
        }

        if (history.has(newWord)) {
            showMessage('이미 사용된 단어입니다.', 'error');
            return;
        }

        if (currentWord.charAt(currentWord.length - 1) !== newWord.charAt(0)) {
            showMessage('틀렸습니다! ' + currentWord.charAt(currentWord.length - 1) + '(으)로 시작하는 단어를 입력하세요.', 'error');
            return;
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
    wordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleWordSubmit();
        }
    });

    init();
});
