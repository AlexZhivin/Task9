window.addEventListener("DOMContentLoaded", function () {  //Весь код внутри события начнет выполняться когда DOM загрузится, благодара событию DOMContentLoaded
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
        if (target && target.classList.contains('info-header-tab'))
        {
            for( let i = 0; i < tab.length; i++){
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    })

})