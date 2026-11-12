document.addEventListener('DOMContentLoaded', () => {

    // Данные о животных
    const pets = [
        {
            id: 'bublik',
            name: 'Бублик',
            category: 'Собака',
            age: '2 года',
            gender: 'Мальчик',
            image: 'images/соб1.jpg',
            description: 'Добрый, активный и дружелюбный пёс. Любит прогулки и игры.',
            status: 'Ищет дом',
            statusClass: 'status-home'
        },
        {
            id: 'luna',
            name: 'Луна',
            category: 'Кошка',
            age: '1 год',
            gender: 'Девочка',
            image: 'images/кош1.jpg',
            description: 'Ласковая и спокойная кошка. Любит уют и внимание.',
            status: 'Ищет дом',
            statusClass: 'status-home'
        },
        {
            id: 'tyson',
            name: 'Тайсон',
            category: 'Собака',
            age: '4 года',
            gender: 'Мальчик',
            image: 'images/соб2.jpg',
            description: 'Спокойный и умный пёс, который хорошо ладит с людьми.',
            status: 'На передержке',
            statusClass: 'status-foster'
        },
        {
            id: 'musya',
            name: 'Муся',
            category: 'Кошка',
            age: '3 года',
            gender: 'Девочка',
            image: 'images/кош2.jpg',
            description: 'Нежная и общительная кошка, любит проводить время рядом с человеком.',
            status: 'Ищет дом',
            statusClass: 'status-home'
        },
        {
            id: 'rex',
            name: 'Рекс',
            category: 'Собака',
            age: '5 лет',
            gender: 'Мальчик',
            image: 'images/соб3.jpg',
            description: 'Верный и преданный друг. Уже обрёл свою любящую семью.',
            status: 'Нашёл дом',
            statusClass: 'status-adopted'
        },
        {
            id: 'barsik',
            name: 'Барсик',
            category: 'Кот',
            age: '2 года',
            gender: 'Мальчик',
            image: 'images/кош3.jpg',
            description: 'Любознательный и игривый кот. Любит исследовать новые места.',
            status: 'На передержке',
            statusClass: 'status-foster'
        }
    ];

    // Получение избранного из localStorage
    const getFavorites = () => {
        try {
            return JSON.parse(localStorage.getItem('favoritePets')) || [];
        } catch {
            return [];
        }
    };

    // Сохранение избранного
    const saveFavorites = (favorites) => {
        localStorage.setItem('favoritePets', JSON.stringify(favorites));
    };

    // Обновление счётчика и сердечек
    const updateFavoritesDisplay = () => {
        const favorites = getFavorites();

        document.querySelectorAll('[data-favorites-count]').forEach((counter) => {
            counter.textContent = favorites.length;
        });

        document.querySelectorAll('[data-favorite-toggle]').forEach((button) => {
            const isFavorite = favorites.includes(button.dataset.favoriteToggle);

            button.textContent = isFavorite ? '♥ В избранном' : '♡ В избранное';
            button.classList.toggle('btn-danger', isFavorite);
            button.classList.toggle('btn-outline-danger', !isFavorite);
        });
    };

    // Добавление кнопок избранного в карточки каталога
    document.querySelectorAll('#petsCatalog [data-category]').forEach((card) => {
        const nameElement = card.querySelector('h3');
        const content = card.querySelector('.p-4');

        if (!nameElement || !content) return;

        const pet = pets.find((item) => item.name === nameElement.textContent.trim());

        if (!pet || content.querySelector('[data-favorite-toggle]')) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-sm btn-outline-danger mb-3';
        button.dataset.favoriteToggle = pet.id;

        content.insertBefore(button, content.firstChild);
    });

    // Обработка нажатий на сердечки
    document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-favorite-toggle]');

        if (!button) return;

        const petId = button.dataset.favoriteToggle;
        let favorites = getFavorites();

        if (favorites.includes(petId)) {
            favorites = favorites.filter((id) => id !== petId);
        } else {
            favorites.push(petId);
        }

        saveFavorites(favorites);
        updateFavoritesDisplay();
        renderFavoritesPage();
    });

    // Отображение страницы избранного
    const renderFavoritesPage = () => {
        const list = document.getElementById('favoritesList');
        const emptyMessage = document.getElementById('favoritesEmpty');
        const count = document.getElementById('favoritesCount');

        if (!list) return;

        const favorites = getFavorites();
        const selectedPets = pets.filter((pet) => favorites.includes(pet.id));

        list.innerHTML = '';

        if (count) {
            count.textContent = selectedPets.length;
        }

        if (emptyMessage) {
            emptyMessage.classList.toggle('d-none', selectedPets.length > 0);
        }

        selectedPets.forEach((pet) => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';

            card.innerHTML = `
                <article class="pet-card h-100">
                    <img src="${pet.image}" alt="${pet.category} ${pet.name}">
                    <div class="p-4">
                        <button type="button"
                                class="btn btn-sm btn-danger mb-3"
                                data-favorite-toggle="${pet.id}">
                            ♥ В избранном
                        </button>
                        <span class="status ${pet.statusClass}">${pet.status}</span>
                        <h3 class="h4 mt-3">${pet.name}</h3>
                        <p class="pet-description">${pet.category} · ${pet.age} · ${pet.gender}</p>
                        <p>${pet.description}</p>
                        <a href="product.html?animal=${pet.id}"
                           class="btn btn-primary w-100">
                            Подробнее
                        </a>
                    </div>
                </article>
            `;

            list.appendChild(card);
        });

        updateFavoritesDisplay();
    };

    // Фильтрация животных в каталоге
    const filterButtons = document.querySelectorAll('[data-filter]');
    const petCards = document.querySelectorAll('#petsCatalog [data-category]');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.filter;

            petCards.forEach((card) => {
                const category = card.dataset.category;

                if (selectedCategory === 'all' || category === selectedCategory) {
                    card.classList.remove('d-none');
                } else {
                    card.classList.add('d-none');
                }
            });

            filterButtons.forEach((item) => {
                item.classList.remove('btn-primary');
                item.classList.add('btn-outline-primary');
            });

            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
        });
    });

    // Быстрый выбор типа помощи
    document.querySelectorAll('[data-quick-help]').forEach((button) => {
        button.addEventListener('click', () => {
            const helpType = document.getElementById('help-type');

            if (helpType) {
                helpType.value = button.dataset.quickHelp;
            }
        });
    });

    // Демонстрационная обработка форм
    document.querySelectorAll('.js-demo-form').forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!form.reportValidity()) return;

            const status = form.querySelector('[data-form-status]');

            if (status) {
                status.textContent =
                    'Спасибо! Заявка заполнена. В демонстрационной версии она не отправляется на сервер.';
                status.classList.remove('d-none');
            }
        });

        form.addEventListener('reset', () => {
            const status = form.querySelector('[data-form-status]');

            if (status) {
                status.classList.add('d-none');
            }
        });
    });

    // Минимальная дата в формах — сегодняшний день
    const dateInputs = document.querySelectorAll('input[type="date"]');

    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split('T')[0];

    dateInputs.forEach((input) => {
        input.min = localDate;
    });

    // Передача выбранного животного в форму заявки
    const params = new URLSearchParams(window.location.search);
    const animalSelect = document.getElementById('animal');

    if (animalSelect && params.has('animal')) {
        animalSelect.value = params.get('animal');
    }

    // Первоначальное обновление избранного
    updateFavoritesDisplay();
    renderFavoritesPage();

});