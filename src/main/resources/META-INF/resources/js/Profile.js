window.onload = function () {
    // 서버에서 사용자 정보 요청 (비동기 처리)
    fetch('/profile/info')
        .then(res => res.json())
        .then(data => {
            // 기존 정보 테이블 표시
            document.getElementById('infoUsername').textContent = data.username;
            document.getElementById('infoEmail').textContent   = data.email;
            document.getElementById('infoPhone').textContent   = data.phone;

            // 프로필 이미지 null 체크 후 표시
            if (data.profileImage) {
                document.getElementById('profileImg').src =
                    '/uploads/profile/' + data.profileImage;
            }

            // 수정 폼에 기존 값 자동 채우기
            const emailEl = document.getElementById('updateEmail');
            const phoneEl = document.getElementById('updatePhone');
            if (emailEl) emailEl.value = data.email;
            if (phoneEl) phoneEl.value = data.phone;

            // 툴팁으로 사용자명 표시: fetch 이후 동적 title이므로 JS 초기화 필수
            const profileLink = document.getElementById('profileNavLink');
            if (profileLink) {
                profileLink.setAttribute('data-bs-title', '👤 ' + data.username);
                new bootstrap.Tooltip(profileLink);
            }
        });

    // URL 파라미터로 결과 감지
    const params = new URLSearchParams(window.location.search);
    const error   = params.get('error');
    const success = params.get('success');

    // 회원정보 수정 결과 메시지 처리
    const msgEl = document.getElementById('updateMsg');
    if (msgEl) {
        if (success === 'updated') {
            msgEl.className   = 'alert alert-success';
            msgEl.textContent = '✅ 개인정보가 수정되었습니다.';
        } else if (error === 'duplicate_email') {
            msgEl.className   = 'alert alert-danger';
            msgEl.textContent = '❌ 이미 사용중인 이메일입니다.';
        }
    }

    // 비밀번호 변경 성공 처리
    if (success === 'password_changed') {
        // Toast 먼저(즉각 알림)
        showToast('비밀번호가 변경완료, 로그인 페이지로 이동합니다.', 'success');
        // 3.5초 후 로그아웃 후 로그인 페이지로 이동
        setTimeout(function() {
            window.location.href = '/logout?next=login';
        }, 3500);
    }

    // 비밀번호 불일치 오류 처리
    if (error === 'wrong_password') {
        // Toast 즉각 알림
        showToast('현재 비밀번호가 일치하지 않습니다.', 'danger');
        const pwMsgEl = document.getElementById('pwMsg');
        if (pwMsgEl) {
            pwMsgEl.className   = 'alert alert-danger';
            pwMsgEl.textContent = '❌ 현재 비밀번호가 일치하지 않습니다.';
        }
    }

    // 사진 업로드 오류 처리
    if (error) {
        const messages = {
            'invalid_type': 'jpg, png, gif, webp 파일만 가능합니다.',
            'too_large':    '파일 크기는 5MB 이하여야 합니다.',
            'upload_fail':  '업로드 실패. 다시 시도해주세요.'
        };
        const msg = messages[error];
        const div = document.getElementById('uploadErrorMsg');
        if (msg && div) {
            div.textContent = msg;
            div.classList.remove('d-none');
        }
    }
};

// profile.js 전용 필드 오류 표시 함수 (login.js와 별도)
function showFieldError(fieldId, msgId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    const msg = document.getElementById(msgId);
    if (msg) msg.textContent = message;
}

// 오류 상태 초기화
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

// 회원정보 수정 유효성 검사 후 폼 제출
function validateAndUpdate() {
    let valid = true;
    const email = document.getElementById('updateEmail').value.trim();
    const phone = document.getElementById('updatePhone').value.trim();

    // ① 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('updateEmail', 'updateEmailMsg', '올바른 이메일 형식이 아닙니다.');
        valid = false;
    } else {
        clearFieldError('updateEmail');
    }

    // ② 연락처 형식 검사 (010-0000-0000 형식)
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showFieldError('updatePhone', 'updatePhoneMsg', '010-0000-0000 형식으로 입력해주세요.');
        valid = false;
    } else {
        clearFieldError('updatePhone');
    }

    if (valid) document.getElementById('updateForm').submit();
}

// 비밀번호 변경 유효성 검사 + SHA-256 해시 후 폼 제출
async function validateAndChangePassword() {
    let valid = true;
    const currentPw    = document.getElementById('currentPwInput').value;
    const newPw        = document.getElementById('newPwInput').value;
    const newPwConfirm = document.getElementById('newPwConfirm').value;

    // ① 현재 비밀번호 빈값 체크
    if (!currentPw) {
        showFieldError('currentPwInput', 'currentPwMsg', '현재 비밀번호를 입력해주세요.');
        valid = false;
    } else {
        clearFieldError('currentPwInput');
    }

    // ② 새 비밀번호 정규식 검사 (8자+영문+숫자+특수문자)
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!pwRegex.test(newPw)) {
        showFieldError('newPwInput', 'newPwMsg', '8자 이상, 영문+숫자+특수문자를 포함해야 합니다.');
        valid = false;
    } else {
        clearFieldError('newPwInput');
    }

    // ③ 새 비밀번호 확인 일치
    if (newPw !== newPwConfirm) {
        showFieldError('newPwConfirm', 'newPwConfirmMsg', '새 비밀번호가 일치하지 않습니다.');
        valid = false;
    } else {
        clearFieldError('newPwConfirm');
    }

    if (!valid) return;

    // ④ 현재/새 비밀번호 SHA-256 해시 생성
    const hashedCurrent = await hashPassword(currentPw);
    const hashedNew     = await hashPassword(newPw);
    document.getElementById('currentPassword').value = hashedCurrent;
    document.getElementById('newPassword').value     = hashedNew;

    document.getElementById('pwForm').submit();
}