
document.addEventListener('DOMContentLoaded', () => {

    // Фильтрация животных в каталоге
    const filterButtons = document.querySelectorAll('[data-filter]');
    const petCards = document.querySelectorAll('[data-category]');

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

            // Обновляем оформление активной кнопки
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

            if (!form.reportValidity()) {
                return;
            }

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

});
