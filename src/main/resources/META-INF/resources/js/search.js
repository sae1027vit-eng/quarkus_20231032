// ── 챔피언 데이터 ──────────────────────────────────────────────
const CHAMPIONS = [
  { name: '아트록스',  engName: 'Aatrox',  role: '전사',       lane: '탑',       img: 'img/Aatrox.jpg',  difficulty: '상', modal: 'modalAatrox' },
  { name: '사일러스',  engName: 'Sylas',   role: '마법사',     lane: '정글/미드', img: 'img/sylas.jpg',   difficulty: '상', modal: 'modalSylas'  },
  { name: '아리',      engName: 'Ahri',    role: '마법사',     lane: '미드',      img: 'img/Ahri.jpg',    difficulty: '중', modal: 'modalAhri'   },
  { name: '애쉬',      engName: 'Ashe',    role: '원거리딜러', lane: '원딜',      img: 'img/Ashe.jpg',    difficulty: '하', modal: 'modalAshe'   },
  { name: '멜',        engName: 'Mel',     role: '마법사',     lane: '미드',      img: 'img/Mel.jpg',     difficulty: '중', modal: 'modalMel'    },
  { name: '자헨',      engName: 'Zaahen',  role: '전사',       lane: '탑',        img: 'img/Zaahen.jpg',  difficulty: '하', modal: 'modalZaahen' },
];

// ── 뉴스 데이터 ──────────────────────────────────────────────
const NEWS = [
  { title: '새로운 챔피언 출시', desc: '2026 루나 레벨 이벤트! 신규 챔피언과 함께하는 특별한 시즌.', category: '게임 업데이트' },
  { title: '패치 노트 16.4',    desc: '챔피언 밸런스 및 아이템 업데이트 내용을 확인하세요.',         category: '패치 노트' },
];

// ── 메인화면으로 돌아가기 ──────────────────────────────────────
function showMainScreen() {
  // 히어로 섹션 다시 보임
  document.querySelector('.hero').classList.remove('d-none');

  // 카드와 뉴스 다시 보임 ← '' 으로 설정해야 원래대로 돌아옴
  document.getElementById('championCards').style.display = '';
  document.getElementById('newsSection').style.display = '';
  document.getElementById('newsContent').style.display = '';

  // 검색 결과 섹션 숨김
  document.getElementById('searchResults').style.display = 'none';

  // 검색창 초기화
  document.getElementById('searchInput').value = '';
}

// // ── 카테고리 탭 전환 ──────────────────────────────────────────
// function switchCategory(type, el) {
//   document.querySelectorAll('.search-category-item').forEach(item => {
//     item.style.borderLeft = '3px solid transparent';
//     item.style.color = '#333';
//     item.style.fontWeight = 'normal';
//   });
//   el.style.borderLeft = '3px solid #c8253a';
//   el.style.color = '#c8253a';
//   el.style.fontWeight = 'bold';

//   document.getElementById('resultChampion').style.display = (type === 'champion') ? 'block' : 'none';
//   document.getElementById('resultNews').style.display     = (type === 'news')     ? 'block' : 'none';
// }

// ── 카테고리 전환 ────────────────────────────────────────────
function switchCategory(type, el) {
    document.querySelectorAll('.search-category-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('resultChampion').style.display = type === 'champion' ? 'block' : 'none';
    document.getElementById('resultNews').style.display = type === 'news' ? 'block' : 'none';
}

// ── 검색 실행 ────────────────────────────────────────────────
function performSearch(query) {
  const q = query.trim().toLowerCase();

  // 검색어가 없거나 공백이면 메인화면으로
  if (!q) {
    showMainScreen();
    return;
  }

  // 검색어 출력
  document.getElementById('searchKeywordDisplay').textContent = `"${query}"`;

  // 챔피언 필터링
  const champResults = CHAMPIONS.filter(c =>
    c.name.includes(q) ||
    c.engName.toLowerCase().includes(q) ||
    c.role.includes(q) ||
    c.lane.includes(q)
  );

  // 뉴스 필터링
  const newsResults = NEWS.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.desc.toLowerCase().includes(q) ||
    n.category.toLowerCase().includes(q)
  );

  // 카운트 표시
  document.getElementById('champCount').textContent = `(${champResults.length})`;
  document.getElementById('newsCount').textContent  = `(${newsResults.length})`;

  // 챔피언 결과 출력
  const champList = document.getElementById('championResultList');
  if (champResults.length === 0) {
    champList.innerHTML = `<div style="color:#999; padding:20px;">"${query}"에 해당하는 챔피언이 없습니다.</div>`;
  } else {
    champList.innerHTML = champResults.map(c => `
      <div style="display:flex; align-items:center; background:#fff; border:1px solid #eee; border-radius:8px; margin-bottom:12px; overflow:hidden;">
        <img src="${c.img}" alt="${c.name}" style="width:80px; height:80px; object-fit:cover;">
        <div style="padding:12px; flex:1;">
          <div style="font-weight:700; font-size:1rem; color:#111;">
            ${c.name} <span style="color:#888; font-size:0.85rem;">(${c.engName})</span>
          </div>
          <div style="color:#555; font-size:0.9rem; margin-top:4px;">
            역할: ${c.role} &nbsp;|&nbsp; 라인: ${c.lane} &nbsp;|&nbsp; 난이도: ${c.difficulty}
          </div>
        </div>
        <div style="padding:12px;">
          <button class="btn btn-outline-secondary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#${c.modal}">
            상세 보기
          </button>
        </div>
      </div>
    `).join('');
  }

  // 뉴스 결과 출력
  const newsList = document.getElementById('newsResultList');
  if (newsResults.length === 0) {
    newsList.innerHTML = `<div style="color:#999; padding:20px;">"${query}"에 해당하는 뉴스가 없습니다.</div>`;
  } else {
    newsList.innerHTML = newsResults.map(n => `
      <div style="background:#fff; border:1px solid #eee; border-radius:8px; padding:16px; margin-bottom:12px;">
        <span style="font-size:0.75rem; background:#c8253a; color:#fff; padding:2px 8px; border-radius:3px;">${n.category}</span>
        <div style="font-weight:700; font-size:1rem; color:#111; margin-top:8px;">${n.title}</div>
        <div style="color:#555; font-size:0.9rem; margin-top:4px;">${n.desc}</div>
      </div>
    `).join('');
  }

  // 챔피언 탭 먼저 보임
  switchCategory('champion', document.querySelector('.search-category-item'));

  // 기존 화면 숨기기 ← container 대신 카드/뉴스만 숨김
  document.querySelector('.hero').classList.add('d-none');
  document.getElementById('championCards').style.display = 'none';
  document.getElementById('newsSection').style.display = 'none';
  document.getElementById('newsContent').style.display = 'none';

  // 검색 결과 섹션 표시
  document.getElementById('searchResults').style.display = 'block';
}

// ── 폼 이벤트 연결 ────────────────────────────────────────────
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value;
  performSearch(query);
});