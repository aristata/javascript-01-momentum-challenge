/**
 * login.js
 *
 * [start]
 * 1. localStorage 에서 username 을 가져온다
 * 2. username 이 없으면 로그인 으로 이동
 * 3. username 이 있으면 환영인사 로 이동
 *
 * [login]
 * 1. 로그인 되지 않은 상태이고, 로그인 입력 폼이 보여야 한다
 * 2. 로그인 입력 폼에 적힌 username 을 localStorage 에 저장한다
 * 3. 로그인 입력 폼을 화면에서 감춘다
 * 4. 환영 인사를 화면에 보인다
 *
 * [greeting]
 * 1. 로그인 된 상태이고, 로그인 입력 폼이 안보여야 한다
 * 2. username 과 함께 환영 인사를 화면에 보인다
 * 3. 로그아웃 버튼을 클릭하면 localStorage 에서 username 을 삭제한다
 * 4. 환영 인사 화면을 감춘다
 * 5. 로그인 입력 폼을 화면에 보인다
 *
 * @author aristata
 */

// HTML Element 선택자 ----------------------------------------------------------
const loginContainer = document.querySelector("#login-container");
const loginForm = loginContainer.querySelector("form");
const loginInput = loginContainer.querySelector("input");
const greetingContainer = document.querySelector("#greeting-container");
const greetingTitle = greetingContainer.querySelector("h1");
const logoutButton = greetingContainer.querySelector("button");
const todoContainer = document.querySelector("#todo-container");

// 전역 변수 --------------------------------------------------------------------
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

// 함수 -------------------------------------------------------------------------

/**
 * 로그인으로 이동
 */
function goToLogin() {
  // 로그인 컨테이너를 보이게 한다
  loginContainer.classList.remove(HIDDEN_CLASSNAME);

  // 그리팅 컨테이너를 감춘다
  greetingContainer.classList.add(HIDDEN_CLASSNAME);

  // todo 입력 컨테이너를 감춘다
  todoContainer.classList.add(HIDDEN_CLASSNAME);

  // loginForm 에 이벤트를 건다
  loginForm.addEventListener("submit", login);
}

/**
 * 환영인사로 이동
 */
function goToGreeting() {
  // 로그인 컨테이너를 감춘다
  loginContainer.classList.add(HIDDEN_CLASSNAME);

  // 그리팅 컨테이너를 보이게 한다
  greetingContainer.classList.remove(HIDDEN_CLASSNAME);

  // todo 입력 컨테이너를 보이게 한다
  todoContainer.classList.remove(HIDDEN_CLASSNAME);

  // 로컬 스토리지에서 userName 을 가져온다
  const userName = localStorage.getItem(USERNAME_KEY);

  // 그리팅 타이틀에 userName 을 포함하여 환영인사를 넣어준다
  greetingTitle.innerText = `${userName} 님, 환영합니다 :)`;

  // logoutButton 에 이벤트를 건다
  logoutButton.addEventListener("click", logout);
}

/**
 * 로그인
 */
function login(event) {
  // form submit 의 기본 동작을 막는다
  event.preventDefault();

  // 인풋에서 값을 가져온다
  const inputUserName = loginInput.value;

  // 공백 입력을 방지
  if (inputUserName.trim() === "") {
    alert("유저네임을 입력해 주세요.");
    return;
  }

  // 로컬 스토리지에 값을 저장한다
  localStorage.setItem(USERNAME_KEY, inputUserName);

  // 인풋을 비워둔다
  loginInput.value = "";

  // 환영인사로 이동한다
  goToGreeting();
}

/**
 * 로그아웃
 */
function logout() {
  // 로컬 스토리지에서 값을 제거한다
  localStorage.removeItem(USERNAME_KEY);

  // 로그인 으로 이동한다
  goToLogin();
}

// 이벤트 -----------------------------------------------------------------------

// 1. localStorage 에서 username 을 가져온다
const savedUserName = localStorage.getItem(USERNAME_KEY);
if (savedUserName === null) {
  // 2. username 이 없으면 로그인 으로 이동
  goToLogin();
} else {
  // 3. username 이 있으면 환영인사 로 이동
  goToGreeting();
}
