function calc(){
    const result = document.querySelector('.calculating__result span');
    //два елемента по умолчанию стоят
    let sex, height, weight, age, ratio;
     //условия,если в localStorage уже есть значение ,то будем использовать,а если нету заполненного sex & ratio,то ставим по умолчанию
     //для пола
        if(localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex','female');
        }
   
    //ratio
        if(localStorage.getItem('ratio')){
            ratio = localStorage.getItem('ratio');
        }else{
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }

    //функция для ratio(запоминает значение другие после перезагрузки и будет выдавать неправильные значения(фиксим это))
    //инициализация
    function initLocalSettings(selector,activeClass){
      const elements = document.querySelectorAll(selector);
        elements.forEach(elem =>{
        elem.classList.remove(activeClass);
        if(elem.getAttribute('id') === localStorage.getItem('sex')){
            elem.classList.add(activeClass);
        }
        //data-ratio
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
         elem.classList.add(activeClass);
        }
        });
    }
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');


    function calcTotal(){
    //проверка,чтобы все поля были заполнены
    if(!sex || !height || !weight || !age || !ratio){
        result.textContent = '____';
        return;
    }   
      if(sex === 'female'){
          //math.round() - округления чисел
          result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height )  - (4.3 * age)) * ratio);
      } else {//male
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
}
calcTotal();

function getStaticInformation(selector,activeClass){
    // const elements = document.querySelectorAll(`${parentSelector} div`);
     const elements = document.querySelectorAll(selector);

        //фиксим баг с подложками(ставим на елементи обработчики события)
        elements.forEach(elem =>{
            //подставляєм функционал
            elem.addEventListener('click',(e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));//запоминаются значение
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            // console.log(ratio,sex);
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
            calcTotal();
        });
    });
}
    getStaticInformation('#gender div','calculating__choose-item_active');//sex id,class
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');//ratio class + class sex
    //функция ддя всех ('инпутов')
    function getDynamicInformation(selector){
        const input = document.querySelector(selector);
        input.addEventListener('input',() =>{
        //2 часть проверка
            if (input.value.match(/\D/g)){//не число
                input.style.border = `1px solid red`;
            }else{
                input.style.border = 'none';//убираем красную обводку
            }
                switch(input.getAttribute('id')){
                //проверка на строку
                case 'height'://если эта строка рост(height)
                    height = +input.value;//то записываем
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;   
        }
        calcTotal();
        });
        
    }
    //вызов функции по id
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;