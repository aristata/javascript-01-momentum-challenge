// 이미지 이름 배열
const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg"
];

// 이미지 이름 랜덤 선택하기
const chosenImage = images[Math.floor(Math.random() * images.length)];

// 이미지 앨리먼트 만들기
const bgImage = document.createElement("img");

// 이미지 앨리먼트에 속성 부여하기
bgImage.src = `../img/${chosenImage}`;
bgImage.className = "backgroundImg";

// 이미지 앨리먼트를 body 에 붙이기
document.body.appendChild(bgImage);
