function showError(fieldId, msgId, message) {
    document.getElementById(fieldId).classList.add('is-invalid');
    const msg = document.getElementById(msgId);
    if (msg) msg.textContent = message;
}

function clearError(fieldId) {
    document.getElementById(fieldId).classList.remove('is-invalid');
    document.getElementById(fieldId).classList.add('is-valid');
}

function validateAndLogin() {
    let valid = true;

    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    // ① 아이디: 4~20자 영문/숫자
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!usernameRegex.test(username)) {
        showError('usernameInput', 'usernameMsg', '아이디는 4~20자 영문/숫자만 가능합니다.');
        valid = false;
    } else {
        clearError('usernameInput');
    }

    // ② 패스워드: 8자 이상, 영문+숫자+특수문자
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('passwordInput', 'passwordMsg', '8자 이상, 영문+숫자+특수문자를 포함 필요.');
        valid = false;
    } else {
        clearError('passwordInput');
    }

    // ③ 모두 통과 시 로그인 실행
    if (valid) submitLogin();
}

async function submitLogin() {
    const password = document.getElementById('passwordInput').value;
    const hashed = await hashPassword(password);
    document.getElementById('password').value = hashed;
    document.getElementById('loginForm').submit();
}

window.addEventListener('load', function() {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error === '1') {
        document.getElementById('passwordInput').classList.add('is-invalid');
        document.getElementById('passwordMsg').textContent = '아이디 또는 패스워드가 올바르지 않습니다.';
    }
});