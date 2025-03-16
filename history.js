// Получаем массив всех карточек из localStorage (сформированный на index.html)
const allCards = JSON.parse(localStorage.getItem("allCards") || "[]");

// Получаем массив всех ответов формы из localStorage
const responses = JSON.parse(localStorage.getItem("form_responses")) || [];

// Находим div, куда будем вставлять историю результатов
const historyContainer = document.getElementById("history-container");

// Если контейнер пуст, добавляем сообщение "Здесь пока пусто"
if (historyContainer.innerHTML === "") {
  console.log("пусто"); // Для отладки
  const emptyMessage = document.createElement("p");
  emptyMessage.textContent = "Здесь пока пусто";
  emptyMessage.className = "emptyhistory";
  emptyMessage.id = "empty-message"; // Добавляем ID для удобства поиска
  historyContainer.appendChild(emptyMessage); // Добавляем текст в контейнер
}

// Функция для создания DOM-элемента карточки на основе данных
function createCardElement(cardData) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.innerHTML = `
    <img class="card-image" src="${cardData.img}" alt="${cardData.title}">
    <h3 class="card-title">${cardData.title}</h3>
    <p class="card-text">${cardData.text.replace(/\n/g, "<br>")}</p>
  `;
  return cardDiv;
}

// Функция для обновления индикатора в заголовке
function updateToggleIcon(header, isCollapsed) {
  let icon = header.querySelector(".toggle-icon");
  if (!icon) {
    icon = document.createElement("span");
    icon.className = "toggle-icon";
    icon.style.marginLeft = "10px";
    header.appendChild(icon);
  }
  icon.textContent = isCollapsed ? "►" : "▼";
}

// Проходим по каждому результату анкеты
responses.forEach((response, index) => {
  // Если есть надпись "Здесь пока пусто", удаляем её
  const emptyMessage = document.getElementById("empty-message");
  if (emptyMessage) {
    emptyMessage.remove();
  }

  const resultDiv = document.createElement("div");
  resultDiv.className = "result-block";

  const header = document.createElement("h3");
  const data_header = document.createElement("h3");
  header.className = "result-header";
  data_header.className = "result-data-header";
  header.textContent = `Результат Анкеты номер ${index + 1}`;
  data_header.textContent = `-->Кредитный лимит: ${response["receivedData"]["creditLimit"]}, Бесплатное обслуживание ${response["receivedData"]["payCondition"]}, ....`;

  const contentDiv = document.createElement("div");
  contentDiv.className = "result-content";

  if (index > 0) {
    contentDiv.classList.add("collapsed");
    updateToggleIcon(header, true);
  } else {
    updateToggleIcon(header, false);
  }

  header.addEventListener("click", () => {
    contentDiv.classList.toggle("collapsed");
    updateToggleIcon(header, contentDiv.classList.contains("collapsed"));
  });

  resultDiv.appendChild(header);
  resultDiv.appendChild(data_header);

  const recommendedIds = response.message || [];
  recommendedIds.forEach(id => {
    const cardObj = allCards.find(card => card.id === id);
    if (cardObj) {
      const cardElement = createCardElement(cardObj);
      contentDiv.appendChild(cardElement);
    }
  });

  resultDiv.appendChild(contentDiv);
  historyContainer.appendChild(resultDiv);
});

// Получаем кнопку по ID и добавляем обработчик события
const deleteButton = document.getElementById("delete-history-btn");
deleteButton.addEventListener("click", function () {
  localStorage.removeItem("form_responses");
  const historyContainer = document.getElementById("history-container");
  historyContainer.innerHTML = ""; // Очищаем историю

  // После очистки добавляем сообщение "Здесь пока пусто"
  const emptyMessage = document.createElement("p");
  emptyMessage.textContent = "Здесь пока пусто";
  emptyMessage.className = "emptyhistory";
  emptyMessage.id = "empty-message"; // Добавляем ID для удобства поиска
  historyContainer.appendChild(emptyMessage);
});