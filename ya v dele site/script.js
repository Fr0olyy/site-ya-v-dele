// Handle tab switching
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Switch active tab
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profileForm");
  const profileDisplay = document.getElementById("profileDisplay");

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const patronymicInput = document.getElementById("patronymic");
  const genderInput = document.getElementById("gender");
  const aboutInput = document.getElementById("about");
  const photoInput = document.getElementById("photo");

  const displayFirstName = document.getElementById("displayFirstName");
  const displayLastName = document.getElementById("displayLastName");
  const displayPatronymic = document.getElementById("displayPatronymic");
  const displayGender = document.getElementById("displayGender");
  const displayAbout = document.getElementById("displayAbout");
  const displayPhoto = document.getElementById("displayPhoto");

  const saveProfileButton = document.getElementById("saveProfile");
  const editProfileButton = document.getElementById("editProfile");

  // Load profile data from localStorage
  const loadProfile = () => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) {
      displayFirstName.textContent = savedProfile.firstName || "";
      displayLastName.textContent = savedProfile.lastName || "";
      displayPatronymic.textContent = savedProfile.patronymic || "";
      displayGender.textContent = savedProfile.gender || "";
      displayAbout.textContent = savedProfile.about || "";
      displayPhoto.src = savedProfile.photo || "placeholder.jpg";
      profileForm.style.display = "none";
      profileDisplay.style.display = "block";
    }
  };

  // Save profile data and switch to display mode
  saveProfileButton.addEventListener("click", () => {
    const photoFile = photoInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const profileData = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        patronymic: patronymicInput.value.trim(),
        gender: genderInput.value,
        about: aboutInput.value.trim(),
        photo: reader.result, // Save photo as Base64 string
      };

      // Save data to localStorage
      localStorage.setItem("profile", JSON.stringify(profileData));

      // Update display
      displayFirstName.textContent = profileData.firstName;
      displayLastName.textContent = profileData.lastName;
      displayPatronymic.textContent = profileData.patronymic;
      displayGender.textContent = profileData.gender;
      displayAbout.textContent = profileData.about;
      displayPhoto.src = profileData.photo;

      // Switch to display mode
      profileForm.style.display = "none";
      profileDisplay.style.display = "block";
    };

    if (photoFile) {
      reader.readAsDataURL(photoFile);
    } else {
      reader.onload();
    }
  });

  // Edit profile
  editProfileButton.addEventListener("click", () => {
    profileForm.style.display = "block";
    profileDisplay.style.display = "none";
  });

  // Load profile on page load
  loadProfile();
});


// Chat tab functionality
const userList = document.getElementById('userList');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageButton = document.getElementById('sendMessage');
const chatWith = document.getElementById('chatWith');

const users = [
  { id: 1, name: 'Алиса', photo: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Мария', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Кристина', photo: 'https://via.placeholder.com/50' },
];

let activeChatUser = null;

function renderUsers() {
  userList.innerHTML = users
    .map(user => `
      <li class="user-item" data-id="${user.id}">
        <img src="${user.photo}" alt="${user.name}">
        <span>${user.name}</span>
      </li>
    `)
    .join('');
}

userList.addEventListener('click', e => {
  const userItem = e.target.closest('.user-item');
  if (!userItem) return;

  const userId = parseInt(userItem.dataset.id, 10);
  activeChatUser = users.find(user => user.id === userId);

  chatWith.textContent =` Чат с ${activeChatUser.name}`;
  chatMessages.innerHTML = ''; // Clear previous messages
});

sendMessageButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (!message || !activeChatUser) return;

  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.innerHTML = `<strong>Я:</strong> ${message}`;
  chatMessages.appendChild(messageElement);

  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatInput.value = '';
});

renderUsers();

// Search for People tab functionality
let profiles = [
  { id: 1, name: 'Александра', about: 'Люблю петь и танцевать', photo: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Вера', about: 'обожаю кодить и гулять по ночному городу', photo: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Мария', about: 'Люблю животных и волейбол', photo: 'https://via.placeholder.com/150' },
];

let currentProfileIndex = 0;

function renderProfileCard() {
  const profile = profiles[currentProfileIndex];
  if (!profile) return;

  const profileCard = document.getElementById('profileCard');
  profileCard.querySelector('img').src = profile.photo;
  profileCard.querySelector('#cardName').textContent = profile.name;
  profileCard.querySelector('#cardAbout').textContent = profile.about;
}
document.getElementById('likeButton').addEventListener('click', () => {
  currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
  renderProfileCard();
});

document.getElementById('dislikeButton').addEventListener('click', () => {
  currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
  renderProfileCard();
});

renderProfileCard();

document.addEventListener("DOMContentLoaded", () => {
  const userEventsList = document.getElementById("userEventsList");
  const eventSearch = document.getElementById("eventSearch");
  const eventType = document.getElementById("eventType");
  const eventSize = document.getElementById("eventSize");
  const findEventButton = document.getElementById("findEvent");

  // Пример данных для пользовательских событий
  const userEvents = [
    {
      name: "Кулинарный мастер-класс",
      type: "Развлекательное",
      size: "Маленькая группа (до 10 человек)",
      description: "Учимся готовить итальянскую кухню",
      photo: "user_event1.jpg",
    },
    {
      name: "Бизнес-конференция",
      type: "Серьезное",
      size: "Большая группа (50+ человек)",
      description: "Профессиональная встреча для обмена опытом",
      photo: "user_event2.jpg",
    },
    {
      name: "Йога на пляже",
      type: "Развлекательное",
      size: "Средняя группа (до 30 человек)",
      description: "Расслабляемся на природе",
      photo: "user_event3.jpg",
    },
  ];

  // Функция отображения событий
  const renderUserEvents = (events) => {
    userEventsList.innerHTML = "";
    events.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.classList.add("user-event");
      eventElement.innerHTML = `
        <img src="${event.photo}" alt="${event.name}" style="width:100%; border-radius: 10px;" />
        <h4>${event.name}</h4>
        <p>${event.description}</p>
        <small>Тип: ${event.type}, Размер: ${event.size}</small>
      `;
      userEventsList.appendChild(eventElement);
    });
  };

  // Фильтрация событий
  findEventButton.addEventListener("click", () => {
    const searchValue = eventSearch.value.toLowerCase();
    const selectedType = eventType.value;
    const selectedSize = eventSize.value;

    const filteredEvents = userEvents.filter((event) => {
      const matchesSearch =
        !searchValue || event.name.toLowerCase().includes(searchValue);
      const matchesType = !selectedType || event.type === selectedType;
      const matchesSize = !selectedSize || event.size === selectedSize;

      return matchesSearch && matchesType && matchesSize;
    });

    renderUserEvents(filteredEvents);
  });

// Показать все события при загрузке
renderUserEvents(userEvents);
});







document.getElementById('findMatch').addEventListener('click', findMatch);

// Пример данных для профилей пользователей
profiles = [
  {
      name: "Александра",
      hobbies: "волейбол, музыка",
      hairColor: "черные",
      eyeColor: "карие",
      height: "180",
      workPlace: "Яндекс",
      age: "25",
      habits: "курение"
  },
  {
      name: "Мария",
      hobbies: "чтение, путешествия",
      hairColor: "русые",
      eyeColor: "голубые",
      height: "170",
      workPlace: "МГУ",
      age: "30",
      habits: "питье кофе"
  },
  {
      name: "Ева",
      hobbies: "гимнастика, программирование",
      hairColor: "блондинистые",
      eyeColor: "зеленые",
      height: "160",
      workPlace: "Сбербанк",
      age: "28",
      habits: "вредных привычек нет"
  }
];

// Функция для подсчета совпадений слов
function countMatches(str1, str2) {
  let count = 0;
  const words1 = str1.toLowerCase().split(/\s+/);
  const words2 = str2.toLowerCase().split(/\s+/);
  words1.forEach(word1 => {
      if (words2.includes(word1)) {
          count++;
      }
  });
  return count;
}

// Обработчик кнопки "Найти match"
document.getElementById('findMatch').addEventListener('click', function() {
  // Получаем введенные значения из формы
  const hobbies = document.getElementById('hobbies').value;
  const hairColor = document.getElementById('hairColor').value;
  const eyeColor = document.getElementById('eyeColor').value;
  const height = document.getElementById('height').value;
  const workPlace = document.getElementById('workPlace').value;
  const age = document.getElementById('age').value;
  const habits = document.getElementById('habits').value;

  let bestMatch = null;
  let highestMatchScore = 0;

  // Проходим по каждому профилю и сравниваем
  profiles.forEach(profile => {
      let score = 0;

      score += countMatches(hobbies, profile.hobbies);
      score += countMatches(hairColor, profile.hairColor);
      score += countMatches(eyeColor, profile.eyeColor);
      score += countMatches(height, profile.height);
      score += countMatches(workPlace, profile.workPlace);
      score += countMatches(age, profile.age);
      score += countMatches(habits, profile.habits);

      // Если новый профиль имеет больший рейтинг совпадений, обновляем
      if (score > highestMatchScore) {
          highestMatchScore = score;
          bestMatch = profile;
      }
  });

  // Выводим лучший матч
  if (bestMatch) {
      document.getElementById('matchResult').innerHTML = `
          <h3>Лучший матч:</h3>
          <p><b>Имя:</b> ${bestMatch.name}</p>
          <p><b>Увлечения:</b> ${bestMatch.hobbies}</p>
          <p><b>Цвет волос:</b> ${bestMatch.hairColor}</p>
          <p><b>Цвет глаз:</b> ${bestMatch.eyeColor}</p>
          <p><b>Рост:</b> ${bestMatch.height}</p>
          <p><b>Место работы/учёбы:</b> ${bestMatch.workPlace}</p>
          <p><b>Возраст:</b> ${bestMatch.age}</p>
          <p><b>Вредные привычки:</b> ${bestMatch.habits}</p>
      `;
      
  } else {
      document.getElementById('matchResult').innerHTML = "<p>Нет совпадений!</p>";
  }
});
