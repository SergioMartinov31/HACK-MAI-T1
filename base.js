// base.js

document.addEventListener("DOMContentLoaded", function () {
  // Логика для выпадающего меню (если используется)
  const profileLink = document.getElementById("drop"); 
  const dropMenu = document.getElementById("drop-menu"); 

  function toggleMenu(event) {
    event.preventDefault();
    dropMenu.classList.toggle("active");
  }

  function closeMenu(event) {
    if (!profileLink.contains(event.target) && !dropMenu.contains(event.target)) {
      dropMenu.classList.remove("active");
    }
  }

  profileLink.addEventListener("click", toggleMenu);
  document.addEventListener("click", closeMenu);

  // Обновление активных ссылок
  const currentUrl = window.location.href;
  const menuLinks = document.querySelectorAll(".menu__list-link");
  menuLinks.forEach((link) => {
    if (link.href === currentUrl) {
      link.classList.add("active");
    }
  });
  if (currentUrl.indexOf("history.html") !== -1) {
    profileLink.classList.add("active");
  }

  // Проверяем сессионные данные
  const authToken = localStorage.getItem("authToken");
  const regLink = document.getElementById("reg-link");
  const signInLink = document.getElementById("signin-link");
  const logoutLink = document.getElementById("logout-link");

  if (authToken) {
    regLink.style.display = "none";
    signInLink.style.display = "none";
    profileLink.style.display = "block";

    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (userData) {
      profileLink.innerText = `${userData.name} ▿`;
    }

    if (logoutLink) {
      logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        logout();
      });
    } else {
      console.error("Элемент logoutLink не найден!");
    }
  } else {
    regLink.style.display = "block";
    signInLink.style.display = "block";
    profileLink.style.display = "none";
  }
});

function logout() {
  // Удаляем только сессионные данные, оставляя зарегистрированных пользователей и историю
  localStorage.removeItem("authToken");
  localStorage.removeItem("user_data");
  alert("Вы вышли из аккаунта!");
  window.location.href = "index.html";
}
