// reg.js

const regForm = document.querySelector('.registration-form');

if (regForm) {
  regForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = regForm.querySelector('#name').value;
    const password = regForm.querySelector('#password').value;
    const confirmPassword = regForm.querySelector('#confirm-password').value;
    const pswError = document.querySelector('.Not_same_psw');

    // Проверка: пароли должны совпадать
    if (password !== confirmPassword) {
      pswError.classList.add("active");
      return;
    }
    pswError.classList.remove("active");

    // Создаём нового пользователя
    const newUser = { id: Date.now(), name, password };

    // Получаем список зарегистрированных пользователей или создаём новый массив
    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    console.log("Старый список пользователей:", registeredUsers);
    
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    console.log("Новый список пользователей:", registeredUsers);

    // Фейковый запрос на регистрацию
    fakeFetchRegister(newUser)
      .then(response => {
        console.log("Ответ регистрации:", response);
        if (response.success) {
          // Устанавливаем сессионные данные (токен и активного пользователя)
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("user_data", JSON.stringify(response.user));
          console.log("Сессионные данные установлены:", {
            authToken: response.token,
            user_data: response.user
          });
          alert("Регистрация прошла успешно!");
          window.location.href = "history.html";
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        console.error("Ошибка:", error);
      });
  });
}

function fakeFetchRegister(userData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Имитация успешного ответа от сервера
      resolve({
        success: true,
        token: "fakeTokenFor_" + userData.name,
        message: "Пользователь успешно зарегистрирован",
        user: userData
      });
    }, 1000);
  });
}
