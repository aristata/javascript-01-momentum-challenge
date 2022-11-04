/**
 * todo.js
 *
 * [todo 입력]
 * 1. todoForm 내부 input 에 값을 입력하고 제출한다
 * 2. input 값을 가져와서 새로운 객체에 저장한다
 * 3. 새로운 객체를 배열에 추가한다
 * 4. 배열을 로컬 스토리지에 저장한다
 * 5. 배열을 화면을 그린다
 *
 * [todo 삭제]
 * 1. li 를 지운다
 * 2. todos 배열에서 삭제하려는 todo 를 삭제한다
 * 3. 로컬 스토리지에서 todo 를 삭제한다
 *
 * [todo 조회]
 * 1. 로컬 스토리지에서 todos 를 가져온다
 * 2. todos 를 배열에 저장한다
 * 3. todos 를 화면에 그린다
 *
 * @author aristata
 */

// HTML Element 선택자 ----------------------------------------------------------
/* 
  todoContainer 는 login 성공시 화면에 표시되어야 한다
  해당 로직을 구현하기 위해 login.js 에서 해당 선택자를 사용하였다
  그래서 이 파일에서는 해당 선택자를 주석 처리 하였다
 */
// const todoContainer = document.querySelector("#todo-container");
const todoForm = todoContainer.querySelector("form");
const todoInput = todoContainer.querySelector("form input");
const todoList = todoContainer.querySelector("ul");

// 전역 변수 --------------------------------------------------------------------
const TODOS_KEY = "todos";
let todos = [];

// 함수 -------------------------------------------------------------------------
// todo 입력
function insertTodo(event) {
  // form submit 의 기본 동작을 중단한다
  event.preventDefault();

  // input 값을 가져온다
  const newTodo = todoInput.value;

  // 공백 입력을 방지
  if (newTodo.trim() === "") {
    alert("todo에는 공백을 입력할 수 없습니다");
    return;
  }

  // input 값을 비운다
  todoInput.value = "";

  // todo 객체에 id 와 content 를 저장한다
  const newTodoObject = {
    id: new Date().getTime(),
    content: newTodo
  };

  // todos 배열에 새 객체를 추가한다
  todos.push(newTodoObject);

  // 로컬 스토리지에 todos 배열을 저장한다
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

  // todos 배열을 화면에 그린다
  renderTodo(newTodoObject);
}

// todo 그리기
function renderTodo(newTodoObject) {
  const li = document.createElement("li");
  li.id = newTodoObject.id;

  const span = document.createElement("span");
  span.innerText = newTodoObject.content;

  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);

  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

// todo 삭제
function deleteTodo(event) {
  // 부모 노드를 선택한다
  // 부모 노드를 선택하는 이유는 button 이 li 에 붙어 있기 때문이다
  const parentLi = event.target.parentNode;

  // 부모 노드 (li) 를 지운다
  parentLi.remove();

  // todos 배열에서 삭제하려는 todo 를 빼야한다
  // 이말은 id 가 다른 todo 들만 필터하여 다시 todos 배열에 저장하는 것과 같다
  console.log(parentLi.id);
  todos = todos.filter((item) => item.id !== parseInt(parentLi.id));

  // 로컬 스토리지에 새 배열을 다시 저장한다
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

// 이벤트 -----------------------------------------------------------------------
todoForm.addEventListener("submit", insertTodo);

// 실행 -------------------------------------------------------------------------
// 처음 화면이 실행되었을 때 로컬스토리지에 저장되어 있는 todos 가 있다면 가져와서 화면에 그려야 한다
const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  // JSON 을 파싱한다
  const parsedTodos = JSON.parse(savedTodos);

  // 파싱한 값을 todos 배열에 담는다
  todos = parsedTodos ? parsedTodos : [];

  // 파싱한 값을 화면에 그린다
  parsedTodos?.forEach((item) => renderTodo(item));
}
