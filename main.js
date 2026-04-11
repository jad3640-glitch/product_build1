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
