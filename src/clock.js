/**
 * clock.js
 *
 * 로그인 여부와 관계없이 시각은 보여준다
 * 매초 현재 시각을 조회하는 함수를 실행한다
 *
 * @author aristata
 */

// HTML Element 선택자 ----------------------------------------------------------
const clockContainer = document.querySelector("#clock-container");

// 함수 -------------------------------------------------------------------------
function getDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  const ymd = `${year}년 ${month}월 ${date}일`;
  const hmm = `${hour}시 ${minute}분 ${second}초`;
  clockContainer.innerHTML = `<h3>${year}년 ${month}월 ${date}일</h3><h3>${hour}시 ${minute}분 ${second}초</h3>`;
}

// 실행 -------------------------------------------------------------------------

// 화면이 로드될 때 일단 한번 실행한다
getDateTime();

// 이후 1초 간격으로 함수를 반복 실행한다
setInterval(getDateTime, 1000);
