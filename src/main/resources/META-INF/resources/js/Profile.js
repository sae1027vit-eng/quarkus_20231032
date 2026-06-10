window.onload = function () {
    fetch('/profile/info')                          // 서버에서 사용자 정보 요청, 비동기 i/o
        .then(res => res.json())                    // json 파싱
        .then(data => {
            document.getElementById('infoUsername').textContent = data.username; // DOM 조작 방지
            document.getElementById('infoEmail').textContent   = data.email;
            document.getElementById('infoPhone').textContent   = data.phone;

            if (data.profileImage) {                // null 체크
                document.getElementById('profileImg').src =
                    '/uploads/profile/' + data.profileImage;
            }
        });

         const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
        const msgDiv = document.getElementById('uploadErrorMsg');
        const messages = {
            'invalid_type': 'jpg, png, gif, webp 파일만 가능합니다.',
            'too_large':    '파일 크기는 5MB 이하여야 합니다.',
            'upload_fail':  '업로드 실패. 다시 시도해주세요.'
        };
        if (messages[error]) {
            msgDiv.textContent = messages[error];
            msgDiv.classList.remove('d-none');
        }
    }
};