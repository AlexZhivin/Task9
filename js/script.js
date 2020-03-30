
window.addEventListener('DOMContentLoaded', function () {
    'use strict';
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

    info.addEventListener('click', function (event) {
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

    })
    // timer
    let deadLine = '2020-03-31';    // Переменная со значением даты в формате ISO 
    // Функция вычисляет сколько времени осталось до дедлайн
    function getTimeRemaining(endtime) {   // Функция вычисляет сколько времени осталось до дедлайн
        let t = Date.parse(endtime) - Date.parse(new Date());   // переводим дату из iso формата в програмные  - мс от 1970г и отнимаем от него текущую дату

        let seconds = Math.floor((t / 1000) % 60);  // получаем кол-во секунд, затем получаем кол-во целых секунд используя остаток от деления на 60 минут. Потому что остаток отделения и будет кол-во секунд. Например 15.18  остаток будет 18 секунд
        let minutes = Math.floor(((t / 1000) / 60) % 60); // получаем кол-во секунд из мс, затем получаем кол-во минут из сек, затем целых минут используя остаток от деления
        let hours = Math.floor(t / (1000 * 60 * 60)); // получаем кол-во часов из мс
        //let days = Math.floor(t/(1000*60*60*24)); // получаем кол-во дней из мс

        return {   // таким образом возращаем из функии объект
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    // Функция выставляет и запускает часы
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
        // Функция обновления вермени 
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            // Если таймер дойдет до - значения  то остановиться по этому условию
            if (t.total <= -1) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
            // Если таймер дойдет до 0 то остановиться по этому условию
            else if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock('timer', deadLine);  // timer это id блока из html

    console.log(getTimeRemaining(deadLine));
})
