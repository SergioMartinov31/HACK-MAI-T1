 
// Собираем все карточки из index.html
const cardElements = document.querySelectorAll(".card");

// Массив, где будем хранить данные о карточках.
const cardsData = [];

// Пробегаемся по каждому элементу и записываем данные из `data-` атрибутов.
cardElements.forEach(cardEl => {
  const cardId = parseInt(cardEl.dataset.cardId, 10);
  const cardTitle = cardEl.dataset.cardTitle;
  const cardImg = cardEl.dataset.cardImg;
  const cardText = cardEl.dataset.cardText;

  const obj = {
    id: cardId,
    title: cardTitle,
    img: cardImg,
    text: cardText
  };

  cardsData.push(obj);
});

// Выводим результат в консоль
console.log("cardsData:", cardsData);
localStorage.setItem("allCards", JSON.stringify(cardsData));
