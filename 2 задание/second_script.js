const btn = document.querySelector('.btn')

// const heightOutput = document.querySelector(".height");
// const widthOutput = document.querySelector(".width");



btn.addEventListener('click', () => {
const height = window.innerHeight;
const width = window.innerWidth;
alert(`Ширина: ${width} пикселей, а высота: ${height} пикселей`)
});