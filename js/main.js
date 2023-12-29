
//Вызываю функцию отрисовки каталога
createCatalog();



//события для бургера

$(document).ready(function() {
   // Обработчик клика по бургеру
   $('.burger').on('click', function() {
       $('.burger_container').toggleClass('show_burger_container');
       setTimeout(() => {
         $('.burger_container').toggleClass('show_burger_container2');
       },100)
       setTimeout(() => {
         $('.burger_menu').toggleClass('show_burger_menu');
         $('.burger-close').toggleClass('show_burger-close');
       },300)
       
   });

   $('.burger_container, .burger-close').on('click', function() {
      $('.burger_menu').removeClass('show_burger_menu');
      $('.burger-close').removeClass('show_burger-close');
      $('.burger_container').removeClass('show_burger_container2');
      setTimeout(() => {
         $('.burger_container').removeClass('show_burger_container');
      },300)
   })


});


// Функция - Рисуем каталог аниме 
function createCatalog() {

//очищаем страницу
removeAll();

//получаем текст шаблона 
let template3 = document.getElementById('title-main-timplate').innerHTML;

document.getElementById('container2').innerHTML += template3;


//Отправляем запрос через функцию                
let json=sendRequestGet('https://kitsu.io/api/edge/anime');               

let array = JSON.parse(json);

for (let i=0; i < array['data'].length; i++) {
   //получаем текст шаблона 
   let template = document.getElementById('cards-template').innerHTML;
   //выводим данные 
   document.getElementById('box1').innerHTML += template.replace("${averageRating}", array['data'] [i] ["attributes"] ["averageRating"])
                                                         .replace("${episodeCount}", array['data'] [i] ["attributes"] ["episodeCount"]) 
                                                         .replace("${id}", array['data'] [i] ['id'])
                                                         .replace("${image}",array['data'] [i] ["attributes"] ["posterImage"]["small"])
                                                         .replace("${titles}",array['data'] [i] ["attributes"] ["titles"]["en_jp"]); 
   
}
}



// Рисуем карточку 

function createCard(id) {
  

   //очищаем страницу
   removeAll();

   //возвращаем карточку в топ страницы 
   window.scrollTo({
      top: 272,
      left: 0,
    });
   
   //делаем запрос
   let json=sendRequestGet('https://kitsu.io/api/edge/anime/' + id);   
   
   //раскодируем данные
   let array = JSON.parse (json);

   //получаем текст шаблона 
   let template = document.getElementById('one-card-template').innerHTML;

   //отрисовываем данные
   document.getElementById('container2').innerHTML += template.replace("${img}",array['data'] ["attributes"] ["posterImage"]["small"])
                                                               .replace("${titles2}",array['data']["attributes"] ["titles"]["en_jp"])
                                                               .replace("${startDate}",array['data'] ["attributes"] ["startDate"])
                                                               .replace("${episodeLength}",array['data'] ["attributes"] ["episodeLength"])
                                                               .replace("${episodeCount}",array['data'] ["attributes"] ["episodeCount"])
                                                               .replace("${averageRating}",array['data']["attributes"] ["averageRating"])
                                                               .replace("${ageRatingGuide}",array['data'] ["attributes"] ["ageRatingGuide"])
                                                               .replace("${userCount}",array['data']["attributes"] ["userCount"])
                                                               .replace("${favoritesCount}",array['data']["attributes"] ["favoritesCount"])
                                                               .replace("${description}",array['data']["attributes"] ["description"])
                                                               .replace("${titles}",array['data']["attributes"] ["titles"]["en_jp"])
                                                               .replace("${youtubeVideoId}",array['data']["attributes"] ["youtubeVideoId"])
                                                               ;
   
}


//удаляем карточку и контент 
function removeAll() {
   document.getElementById('container2').innerHTML = '';
}

 //создаем функцию для отправки запросов 
 function sendRequestGet(url){
      let requesObj = new XMLHttpRequest();
      requesObj.open('GET', url, false);
      requesObj.send();

      return requesObj.responseText
 } 
   