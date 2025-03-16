// log.js

const loginForm = document.querySelector('.login-form');

if (loginForm) {
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = loginForm.querySelector('#name').value;
    const password = loginForm.querySelector('#password').value;

    // Получаем список зарегистрированных пользователей
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Ищем пользователя по имени и паролю
    const user = registeredUsers.find(user => user.name === name && user.password === password);

    if (user) {
      fakeFetchLogin(user)
        .then(response => {
          if (response.success) {
            localStorage.setItem("authToken", response.token);
            localStorage.setItem("user_data", JSON.stringify(response.user));
            alert("Вы успешно вошли!");
            window.location.href = "history.html";
          } else {
            alert("Неправильный логин или пароль!");
          }
        });
    } else {
      alert("Неправильный логин или пароль!");
    }
  });
}

function fakeFetchLogin(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        token: "fakeTokenFor_" + user.name,
        user: user
      });
    }, 1000);
  });
}
