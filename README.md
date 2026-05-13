# quarkus 프로젝트 시작! (학번 :20231032 이름 :한새빛 )
매 주 수업 내용을 정리하자.
## 2, 3주차 수업 내용
실습 1 : 쿼크스 환경 구축 및 준비 완료!
실습 2 : HTML 기본 및 LOL 메인 화면 개발 완료!
<div align="center">
<img src="screenshots/2026-01-26 오전 9_51_43.png" width="45%" alt="실습 1 화면">
<img src="screenshots/파일명.png" width="45%" alt="실습 2 화면">
</div>
<br>
## 4주차 수업 내용
bootstrap사용 방법, 
##5주차 수업 내용
모달창 구현, 서브페이지 구현, table구조 확인
##6주차 수업 내용
자바스크립트 작동방법, id 지정해서 search기능 구현
##7주차 수업 내용
search.js 챔피언 검색 기능 작성, 검색 동작 실행 과정 이해
##9주차 수업 내용
다크,라이프 전환 모드 구현, db설정
##10주차 수업 내용
로그인 기능 구현
##커밋 오류 이유(claude)
 로컬이 GitHub보다 2커밋 뒤처짐
 README.md 충돌 -> 로컬 README.md와 GitHub README.md 내용이 달라서 충돌 발생
 Detached HEAD 상태 -> 커밋이 main 브랜치가 아닌 분리된 상태. git checkout main 으로 복구
##9,10주차 과제
다크라이트 버튼 onclick="toggleTheme()" 제거후 document.getElementById('themeToggleBtn')   추가
                                                .addEventListener('click', toggleTheme); 
로그인 페이지, 로그인후 페이지 다크/라이트 모드 추가  <script src="js/toggle.js" ></script>에 defer추가 login.html,main_after_login.html(body로 옮기면 defer없어도 작동 (index.html에 구현))
defer추가 이유 script가 head에 있어서 없는경우 head에서 script실행후 버튼은 나중에 생성 -> 에러남
##11주차 수업
로그인,로그아웃구현, 회원가입 화면 구현, 기능(암호화,회원가입 정보 체크)