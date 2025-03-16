// form.js

// Работа с ползунком
const rangeInput = document.getElementById("credit-limit");
const limitValue = document.getElementById("limit-amount");

if (rangeInput && limitValue){
  // Обновление значения ползунка сразу при загрузке
  document.addEventListener("DOMContentLoaded", updateSlider);
  
  // Обновление при каждом изменении
  rangeInput.addEventListener("input", updateSlider);
  
  function updateSlider() {
    const value = +rangeInput.value;
    limitValue.textContent = value.toLocaleString("ru-RU");
  
    const min = +rangeInput.min;
    const max = +rangeInput.max;
    const percent = ((value - min) / (max - min)) * 100;
  
    rangeInput.style.background = `linear-gradient(to right, 
      #5f7f91 0%, 
      #5f7f91 ${percent}%, 
      #e4e4e4 ${percent}%, 
      #e4e4e4 100%)`;
  }
}

// Работа с формой
const form = document.getElementById("myForm");
if (form){
  form.addEventListener("submit", retrieveFormValue);
}

function retrieveFormValue(event) {
  event.preventDefault();

  const creditLimitInput = form.querySelector('[name="creditLimit"]');
  const payConditionInput = form.querySelector('[name="payCondition"]:checked');
  const ageInput = form.querySelector('[name="age"]');
  const goalsInputs = form.querySelectorAll('[name="goals"]:checked');
  const goals = Array.from(goalsInputs).map(el => el.value);

  const formData = {
    creditLimit: creditLimitInput.value,
    payCondition: payConditionInput.value,
    age: ageInput.value,
    goals: goals,
  };

  console.log("Отправляем на сервер:", formData);

  // Фейковая отправка данных
  fakeFetch(formData)
    .then(response => {
      console.log("Ответ бэка:", response);
      
      // Получаем существующие ответы или создаём новый массив
      let responses = JSON.parse(localStorage.getItem("form_responses")) || [];
      responses.push(response);
      localStorage.setItem("form_responses", JSON.stringify(responses));
      
      // Показываем модальное окно
      showModal();
    })
    .catch(error => {
      console.error("Ошибка:", error);
    });
}

// Фейковая функция запроса
function fakeFetch(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        // Здесь можно вернуть массив ID рекомендованных карточек, например:
        message: [1, 2, 3],
        receivedData: data
      });
    }, 1000);
  });
}

// Модальное окно
const modal = document.querySelector('#modal');
const openModalBtn = document.querySelector('#openModal'); // если нужно, но здесь мы вызываем showModal() напрямую
const closeBtn = document.querySelector('.close');

function showModal() {
  if (modal) {
    modal.style.display = 'block';
  }
}

if (closeBtn) {
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};




const authToken = localStorage.getItem("authToken");
const end_form_btn = document.getElementById("openModal");
const end_notauf = document.getElementById("end_notauf");


if (authToken) {
  end_form_btn.style.display = "block";
  end_notauf.style.display = "none";
} else {
  end_form_btn.style.display = "none";
  end_notauf.style.display = "block";
}
