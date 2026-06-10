# quarkus 프로젝트 시작! (학번 :20231032 이름 :한새빛 )
매 주 수업 내용을 정리하자.

##1주차 수업 내용
강의 소개 및 앞으로 배울 내용 설명

이번 학기에 Quarkus로 LOL 팬사이트 만드는 프로젝트를 한다고 해서 흥미로웠다
Spring Boot보다 시장 점유율이 빠르게 오르고 있는 프레임워크라고 하심
GraalVM 네이티브 컴파일로 시작 속도가 엄청 빠르다는데 빌드는 오래 걸린다고도 하심

평가 기준 : 출석 20점, 중간고사 30점, 기말고사 30점, 깃허브 보고서 20점
기말 보고서가 깃허브 프로젝트 제출이라서 매주 올려두는게 중요하다고 하심
AI 도구 써도 된다고 했는데 그냥 복붙만 하면 의미 없으니까 이해하면서 써야 한다고

##1주차 과제 수행
- VS Code 설치 후 확장 탭에서 Quarkus Tools, Extension Pack for Java, Korean 설치
- JDK 17 공식 사이트에서 다운로드 후 환경 변수(JAVA_HOME) 설정
- GitHub 계정 생성 및 로그인 확인

## 2, 3주차 수업 내용
실습 1 : 쿼크스 환경 구축 및 준비 완료!
실습 2 : HTML 기본 및 LOL 메인 화면 개발 완료!
<div align="center">
<img src="screenshots/2026-01-26 오전 9_51_43.png" width="45%" alt="실습 1 화면">
<img src="screenshots/파일명.png" width="45%" alt="실습 2 화면">
</div>
<br>

구현한 것들
- VS Code에 Quarkus Tools, Extension Pack for Java 설치
- application.properties에 포트(8080), 시작페이지, 테스트 비활성화 설정 추가
- index.html LOL 메인화면 4단계로 제작
  1단계: h1, p, ul 기본 태그로 챔피언 목록 작성
  2단계: Bootstrap CDN 연동, 네비바 + 카드 레이아웃
  3단계: 어두운 배경(#0a0e17)에 보라색 포인트 커스텀 CSS 적용
  4단계: 카드 hover 시 scale(1.05) + 보라색 그림자 애니메이션
- 깃허브 초기 업로드 (처음이라 터미널에서 git 명령어 직접 입력해야 했음)

커밋 버튼 눌렀더니 바로 에러가 났다
관리자 권한으로 VS Code 재실행하고 git config 명령어 직접 입력해서 해결함

##2, 3주차 과제 수행
- META-INF/resources/ 폴더 생성 후 index.html 파일 만들고 4단계 코드 순서대로 작성
- application.properties에 quarkus.http.port=8080, index-page=index.html 등 3줄 추가
- src/main/resources/META-INF/resources/images/ 폴더 만들고 챔피언 이미지 저장
- GitHub 저장소 생성, 터미널에서 git config --global user.email / user.name 입력 후 첫 커밋

##4주차 수업 내용
Bootstrap 활용 심화, 서브 페이지 구현, README.md 작성

구현한 것들
- getbootstrap.kr 문서 보면서 네비바 드롭다운 메뉴로 교체
- 챔피언 카드에 data-bs-toggle="modal"로 클릭 시 팝업 구현
- 모달 안에 iframe으로 Aatrox.html 불러오는 방식 (modals 폴더 생성)
- main_page_sub 폴더에 download.html 서브페이지 생성
- css 폴더에 download.css 분리, 배경 이미지 hero 영역 스타일링
- download.html에 시스템 사양 표(table) 추가, Windows/Mac 탭 전환
- 하이퍼링크 a 태그 target 속성(_self, _blank 등) 배움
- README.md 작성 시작, screenshots 폴더 만들어서 이미지 삽입

F12 개발자 모드로 코드 뜯어보는 법 배웠는데 남의 페이지 구조 파악할 때 편했다
CSS 우선순위가 인라인 > ID > 클래스 > 요소 순서라는 거 헷갈렸는데 예제 보니까 이해됨

##4주차 과제 수행
- index.html의 navbar-brand 태그 바로 아래에 <img src="/images/LOL.webp" width="30" height="24"> 추가해서 LOL 로고 삽입
- resources/modals/ 폴더 생성 후 Aatrox.html, Mel.html, Zaahen.html 파일 작성
- index.html에 id="modalMel", id="modalZaahen" 모달 div 각각 추가, iframe으로 해당 html 연결
- js/search.js의 CHAMPIONS 배열에 멜(Mel), 자헨(Zaahen) 객체 추가 (name, engName, role, lane, img, modal 속성 포함)
- 프로젝트 최상위에 README.md 생성, screenshots/ 폴더 만들고 화면 캡처 이미지 넣어서 이미지 삽입 코드 작성
- GitHub 커밋 및 업로드

##5주차 수업 내용
모달창 구현, 서브페이지 구현, table구조 확인
챔피언 상세보기 모달이랑 다운로드 페이지 만들었다

##5주차 과제 수행
- resources/modals/Aatrox.html 작성 : 챔피언 이름, 역할, 난이도, 스킬 설명 등 상세정보 HTML로 구성
- index.html 카드 버튼에 data-bs-toggle="modal" data-bs-target="#modalAatrox" 속성 추가
- main_page_sub/download.html에 <section class="hero"> 배너 영역 추가 (다운로드 버튼 포함)
- download.html에 <table class="table table-bordered"> 로 Windows/Mac 시스템 사양 표 작성
- ul.nav.nav-tabs로 Windows/Mac 탭 전환 기능 구현 (data-bs-toggle="tab" 사용)
- GitHub 업로드

##6주차 수업 내용
자바스크립트 기초 문법, 실시간 챔피언 검색 기능 구현

구현한 것들
- js 폴더에 test.js 만들고 var/let/const 차이 콘솔로 직접 확인
- search.js 1단계: 검색어 입력하면 새 탭으로 구글 검색 결과 열기
- main.css 파일로 인라인 style 태그 내용 분리
- search.js 2단계: 페이지 내부에 검색 결과 섹션 출력
  챔피언/뉴스 카테고리 탭으로 나눠서 결과 표시
  검색어 없으면 메인화면으로 돌아가는 showMainScreen() 함수 추가

var는 함수 스코프라 블록 밖에서도 접근되는데 let, const는 블록 스코프라 안된다는게 핵심
호이스팅이 var는 undefined로 올라오고 let/const는 TDZ라서 에러 나는 것도 확인함
addEventListener로 submit 이벤트 등록하는 방식이 인라인 onclick보다 낫다는 거 이번에 배움

##6주차 과제 수행
- search.js의 CHAMPIONS 배열에 아리(Ahri), 애쉬(Ashe) 객체 추가해서 총 6개로 확장
- search.js 하단에 showMainScreen() 함수 추가 : hero 섹션과 챔피언 섹션 다시 표시, searchResults 숨김
- performSearch() 함수 맨 위에 if (!q) { showMainScreen(); return; } 조건 추가
- index.html의 기존 <style> 태그 내용을 resources/css/main.css 파일로 옮기고 <link href="css/main.css"> 로 교체
- GitHub 업로드 및 README.md에 6주차 내용 추가

##7주차 수업 내용
search.js 챔피언 검색 기능 작성, 검색 동작 실행 과정 이해
js파일을 따로 분리하는 방식 배움

##7주차 과제 수행
- search.js의 performSearch() 함수에서 CHAMPIONS 배열을 filter()로 검색어와 name/engName/role/lane 비교해 결과 추출
- 검색 결과를 map()으로 카드형 HTML 문자열 생성 후 innerHTML로 삽입
- #champCount, #newsCount span에 결과 개수 표시
- switchCategory() 함수 추가 : 챔피언/뉴스 탭 클릭 시 display 전환
- index.html 하단에 <script src="js/search.js"></script> 로 외부 스크립트 연결
- GitHub 업로드

##9주차 수업 내용
다크/라이트 전환 모드 구현, db설정

구현한 것들
- toggle.js 작성, main.css에 light-mode 스타일 추가
- 다크/라이트 버튼을 onclick 인라인 방식에서 addEventListener 방식으로 변경
  (HTML이랑 JS를 분리하는게 현대 웹 표준이라고 배움)
- MySQL 설치하고 lol 데이터베이스 생성
- Champion.java 엔티티 작성 (@Entity, PanacheEntity 사용)
- 검색 결과 카드 클릭하면 모달 뜨도록 search.js에 modalId 추가
- download.html에도 다크/라이트 모드 적용 (나중에 빠진 거 발견해서 추가함)

배운점 : classList.toggle() 하나로 클래스 추가/제거가 동시에 된다는게 신기했다

##9주차 과제 수행
- js/toggle.js 신규 생성 : document.getElementById('themeToggleBtn').addEventListener('click', ...) 으로 클릭 이벤트 등록, document.body.classList.toggle('light-mode')로 클래스 전환, 버튼 텍스트를 🌙DARK / ☀️LIGHT로 변경
- main.css 하단에 body.light-mode { background-color: #fff; color: #000; } 등 라이트 모드 스타일 추가
- index.html, main_after_login.html, download.html 각각에 <script src="js/toggle.js" defer> 추가
- org/acme/champion/Champion.java 생성 : @Entity @Table(name="champions") 어노테이션, PanacheEntity 상속, name/role/lane 필드 선언
- application.properties에 quarkus.datasource.db-kind=mysql, jdbc.url, username, password, hibernate-orm.database.generation=update 설정 추가
- GitHub 업로드

##10주차 수업 내용
로그인 기능 구현

구현한 것들
- 패키지 구조를 champion, common, login 폴더로 분리
- User.java 엔티티, DataSeeder.java에 guest 계정 추가
- SessionConfig.java 작성 (Vert.x 세션 핸들러 등록, 1시간 타임아웃)
- login.html 로그인 폼이랑 /login /login_check /logout /after_login 엔드포인트 추가
- 로그인후 페이지에서 세션 없으면 /login으로 강제 이동
- 로그인/로그인후 페이지 다크/라이트 모드 추가

toggle.js를 head에 넣었더니 버튼이 동작을 안해서 한참 찾아봤는데
head에서 js가 실행될 때 버튼이 아직 만들어지지 않은 상태라 오류가 난 거였다
defer 추가하거나 body 하단으로 옮기면 해결됨

Response.seeOther() = HTTP 303 이라는거 처음 알았다. POST 후 GET으로 전환하는 용도

##10주차 과제 수행
- org/acme/login/User.java 생성 : @Entity, PanacheEntity 상속, username/password 필드, findByUsername() 정적 메서드 작성
- org/acme/common/DataSeeder.java 생성 : @Startup으로 서버 시작 시 guest 계정 자동 삽입 (비밀번호는 SHA-256 해시값)
- org/acme/common/SessionConfig.java 생성 : RouterFactory로 Vert.x 세션 핸들러 등록, 타임아웃 1시간 설정
- resources/login/login.html 생성 : id/password 입력 폼, action="/login_check" method="POST"
- AuthResource.java에 @GET /login, @POST /login_check (DB 조회 후 세션 저장), @GET /logout (세션 destroy), @GET /after_login (세션 체크 후 페이지 반환) 엔드포인트 추가
- main_after_login.html 상단에 세션 없으면 window.location.href='/login' 처리 추가
- GitHub 업로드

##커밋 오류 이유(claude)
 로컬이 GitHub보다 2커밋 뒤처짐
 README.md 충돌 -> 로컬 README.md와 GitHub README.md 내용이 달라서 충돌 발생
 Detached HEAD 상태 -> 커밋이 main 브랜치가 아닌 분리된 상태. git checkout main 으로 복구

git commit 메시지 없이 실행하면 COMMIT_EDITMSG 파일이 열리면서 커밋이 안 됨
-> VS Code Source Control 패널에서 메시지 입력하고 커밋 버튼 누르는 방식으로 해결

##11주차 수업
회원가입 화면 구현, 기능(암호화, 회원가입 정보 체크)

구현한 것들
- register.html 폼 작성, /register /register_check /register_success 엔드포인트 추가
- User.java에 email(@Column unique), phone 컬럼 추가
- input_check.js : 아이디(4~20자 영문숫자), 패스워드(8자+영문+숫자+특수문자), 이메일, 연락처 정규식 검사
- input_sha256.js : 브라우저 내장 Web Crypto API로 SHA-256 해시 생성 (외부 라이브러리 없음)
- 가입 확인 모달(confirmModal) 구현
- login.js : validateAndLogin() 정규식 검사 + submitLogin() 해시 후 폼 제출

SHA-256 넣고 나서 기존 guest 계정 비번(123123 평문)이 로그인이 안 됨
당연한 거였는데 처음엔 왜 안되나 했다
DataSeeder.java에서 패스워드를 해시값으로 바꾸고 DB users 테이블 삭제 후 재시작으로 해결

##11주차 과제 수행
- resources/login/register.html 생성 : username/password/email/phone 입력 폼, action="/register_check" method="POST"
- AuthResource.java에 @GET /register, @POST /register_check (아이디 중복→/register?error=duplicate_username, 이메일 중복→duplicate_email, 정상→DB insert 후 /register_success), @GET /register_success 엔드포인트 추가
- User.java에 @Column(unique=true) String email, String phone 필드 추가, findByEmail() 메서드 추가
- js/input_check.js 생성 : validateUsername() 정규식 /^[a-zA-Z0-9]{4,20}$/, validatePassword() /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, validateEmail(), validatePhone() 함수 작성
- js/input_sha256.js 생성 : async hashPassword(pw) 함수, Web Crypto API의 crypto.subtle.digest('SHA-256', ...) 사용해 해시 후 hex 문자열 반환
- register.html에 가입 확인 모달(id="confirmModal") 추가, 제출 버튼 클릭 시 모달 먼저 띄우고 확인 시 폼 제출
- DataSeeder.java의 guest 비밀번호를 123123의 SHA-256 해시값으로 교체
- GitHub 업로드

##12주차 수업
프로필 페이지 구현, 사진 업로드, 에러 처리

구현한 것들
- profile.html 프로필 페이지 작성 (사진, 개인정보 테이블, 업로드 폼)
- User.java에 profileImage 컬럼 추가
- /profile /profile/info /profile/upload 엔드포인트 추가
- Profile.js : fetch()로 /profile/info 비동기 호출 후 DOM 업데이트
- 로그인 실패 시 에러 메시지 표시 (URL ?error=1 파라미터 감지)
- 업로드 에러 처리 : invalid_type / too_large / upload_fail 메시지 표시

fetch랑 Promise 체이닝(.then)이 처음엔 헷갈렸는데
화면을 멈추지 않고 서버에서 데이터 받아오는 방식이라는 게 이해되고 나니까 편했다
UUID 파일명으로 저장하는 이유 = 같은 이름 파일 올려도 충돌 안 나게 하려고

##12주차 과제 수행
- resources/login/profile.html 생성 : id="profileImg" img 태그, id="infoUsername/infoEmail/infoPhone" td 태그, enctype="multipart/form-data" 업로드 폼 작성
- User.java에 String profileImage 필드 추가
- AuthResource.java에 @GET /profile (세션 체크 후 페이지 반환), @GET /profile/info (DB 조회 후 JSON 반환), @POST /profile/upload (@RestForm FileUpload 받아서 확장자/용량 검사, UUID.randomUUID()로 파일명 생성, uploads/profile/ 폴더에 저장, DB profileImage 업데이트) 엔드포인트 추가
- js/Profile.js 생성 : window.onload 안에서 fetch('/profile/info').then(res=>res.json()).then(data=>{...}) 로 사용자 정보 받아와 DOM에 반영
- Profile.js에 URL 파라미터 감지 추가 : new URLSearchParams(window.location.search)로 ?error= 값 읽어서 id="uploadErrorMsg" div에 에러 메시지 표시
- GitHub 업로드

##13주차 수업
Toast 알림으로 전환, 회원정보 수정, 비밀번호 변경

구현한 것들
- test.js에 showToast() 함수 추가 (Bootstrap Toast, 3초 후 자동 사라짐)
- 전체 페이지 alert() 다 없애고 showToast()로 교체
- profile.html에 개인정보 수정 폼 추가 (Bootstrap Collapse로 접기/펼치기)
- profile.html에 비밀번호 변경 폼 추가
- Profile.js : validateAndUpdate(), validateAndChangePassword() 함수 추가
  (비밀번호 변경은 async 함수로 SHA-256 해시 처리 후 폼 제출)
- /profile/update /profile/password 엔드포인트 추가
- /logout에 @QueryParam("next") 추가 -> ?next=login 이면 로그인 페이지로 이동
  (비밀번호 변경 후 자동 로그아웃 처리 위해)

alert()은 클릭해야 없어지는 방해형 팝업인데 Toast는 3초 후 자동으로 사라지니까
실제 서비스에서 훨씬 나은 방식이라고 느꼈다

비밀번호 변경 후 바로 그 세션으로 계속 쓰면 이상하니까
성공하면 Toast 띄우고 3.5초 뒤에 로그아웃 -> 로그인 페이지로 보내는 흐름이 자연스러웠다

##13주차 과제 수행
- js/test.js에 showToast(message, type) 함수 추가 : id="liveToast" Bootstrap Toast 초기화, id="toastBody"에 메시지 삽입, new bootstrap.Toast(el, {delay:3000}).show() 호출
- main_index.html, main_after_login.html, register.html, register_success.html에서 alert() 전부 제거하고 showToast() 호출로 교체
- profile.html에 <button data-bs-toggle="collapse" data-bs-target="#updateFormArea"> 버튼 추가, <div class="collapse" id="updateFormArea"> 안에 이메일/연락처 수정 폼 작성
- profile.html에 id="pwForm" 비밀번호 변경 폼 추가 : 현재 비밀번호 입력(id="currentPwInput"), 새 비밀번호(id="newPwInput"), 확인(id="newPwConfirm"), hidden 필드(id="currentPassword", id="newPassword")로 해시값 전송
- js/Profile.js에 validateAndUpdate() 추가 : 이메일/연락처 정규식 검사 후 updateForm.submit(), validateAndChangePassword() async 함수 추가 : hashPassword()로 현재/새 비밀번호 해시 후 hidden 필드에 값 세팅하고 pwForm.submit()
- AuthResource.java에 @POST /profile/update (이메일 중복 체크 후 DB 업데이트 → /profile?success=updated), @POST /profile/password (현재 비밀번호 해시 비교 후 DB 업데이트 → /profile?success=password_changed) 엔드포인트 추가
- @GET /logout에 @QueryParam("next") String next 파라미터 추가, next.equals("login")이면 /login으로 리다이렉트
- GitHub 업로드

##전체 후기
처음에 HTML만 만들 때는 단순해 보였는데 로그인이랑 세션, 암호화까지 붙이니까
실제로 개인정보를 어떻게 다뤄야 하는지 생각하게 됐다
수업 때 SKT 해킹이나 인터파크 유출 사례 얘기 들었을 때는 좀 먼 얘기 같았는데
직접 평문 패스워드 저장했다가 나중에 해시로 바꾸는 과정을 겪으니까 왜 중요한지 이해됐다
Quarkus가 Spring보다 설정이 적어서 처음엔 낯설었는데 PanacheEntity 쓰니까 DB 코드가 많이 줄어서 좋았다
