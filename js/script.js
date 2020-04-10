/*Начало кода изменяющихся табов*/
window.addEventListener('DOMContentLoaded', function () { // Используем DOMContentLoaded  - событие возникает когда загружаются объекты dom (т.е. раньше чем css и другое)
    'use strict';
    /*Начало кода изменяющихся табов*/
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {  // .contains проверяет наличие или отсутствие, возвращает true/false
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    /*Конец кода изменяющихся табов*/

    /*  Начало кода таймера */


    let deadLine = '2020-04-05';    // Переменная со значением даты в формате ISO 
    // Функция вычисляет сколько времени осталось до дедлайн
    function getTimeRemaining(endtime) {   // Функция вычисляет сколько времени осталось до дедлайн
        let t = Date.parse(endtime) - Date.parse(new Date());   // переводим дату из iso формата в програмные  - мс от 1970г и отнимаем от него текущую дату

        let seconds = Math.floor((t / 1000) % 60);  // получаем кол-во секунд, затем получаем кол-во целых секунд используя остаток от деления на 60 минут. Потому что остаток отделения и будет кол-во секунд. Например 15.18  остаток будет 18 секунд
        let minutes = Math.floor(((t / 1000) / 60) % 60); // получаем кол-во секунд из мс, затем получаем кол-во минут из сек, затем целых минут используя остаток от деления
        let hours = Math.floor(t / (1000 * 60 * 60)); // получаем кол-во часов из мс
        //let days = Math.floor(t/(1000*60*60*24)); // получаем кол-во дней из мс

        return {   // таким образом возращаем из функии объект с параметрами времени
            'total': t,  // сколько всего мс осталось до дедлайн
            'hours': hours, // сколько часов
            'minutes': minutes, // сколько минут
            'seconds': seconds // сколько секунд
        }
    }
    // Функция выставляет и запускает часы
    let setClock = (id, endtime) => {  // id элемента обертки html таймера, endtime  это время дедлайн 
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000); // задаем интервал отсчтета таймера в 1 сек 
        // Функция обновления вермени 
        function updateClock() {
            let t = getTimeRemaining(endtime); // тут мы получаем объект с оставшимся временем в разных форматах (мс, часы,минуты, секунды)
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            // Если таймер дойдет до отрицательного значения  то остановиться по этому условию
            if (t.total <= -1) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
            // Если таймер дойдет до дедлайн то остановиться по этому условию
            else if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock('timer', deadLine);  // timer это id блока из html

    /*  Конец кода таймера */
    /* Начало modal */
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    more.addEventListener('click', (e) => {
        overlay.style.display = 'block';
        e.target.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; // запретить прокрутку страницы 
    });
    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';  // отменить запрет прокрутки
    });

    /* Конец modal */


    /* Начало form с promise */
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо, скоро мы с вами свяжемся!',
        filure: 'Что-то пошло не так...'
    }
    let form = document.querySelector('.main-form'),
        input = document.getElementsByTagName('input'),
        statusMesage = document.createElement('div');
        statusMesage.classList.add('status');


    form.addEventListener('submit', function (event) { // событие submit происходит тогда когда форма отправляется 
        event.preventDefault(); //отключаем отправку формы стандартными методами
        form.appendChild(statusMesage); // Добавляемый созданный div вконец блока формы

        function clearInput() {
            for (let i = 0; i < input.length; i++) {   // очистка формы
                input[i].value = '';                // берем каждый инпут и очищаем после отправки формы
            }
        }

        function reqResponse() {
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'aplication/json; charset=utf-8');
            let formData = new FormData(form); // формируем объект формы из html - встроенная функции js  -способ собрать данные с формы. Также можно использовать без формы из html и добавлять свои данные https://learn.javascript.ru/xmlhttprequest
            let obj = {};
            formData.forEach(function (value, key) {    // запомнить этот способ, он используется много где
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
            request.send(json);
            return new Promise(function (resolve, reject) {
                request.onreadystatechange = () => {
                    if (request.readyState < 4) {
                        resolve();
                    }
                    else if (request.readyState === 4 && request.status == 200) {
                        resolve();                    // сюда можно включить прогрессбар с анимацией или красивую картинку 
                    }
                    else {
                        reject();
                    }
                };
            })

        };

        reqResponse()
            .then(() => { statusMesage.innerHTML = message.loading; })
            .then(() => { statusMesage.innerHTML = message.success })
            .catch(() => { statusMesage.innerHTML = message.failure })
            .then(clearInput);
    });


    /* Конец form с  promise */


});