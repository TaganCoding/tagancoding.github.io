<html>
  <head>
    <title>Досуг\Рестораны\Кафе\Столовые\Спорт\Развлечения\Детские игровые клубы\Бани в Таганроге и окрестностях</title>
    <meta content="text/html;charset=UTF-8" http-equiv="Content-Type" />
    <link type="text/css" rel="stylesheet" href="style.css"/>
    <link type="text/css" rel="stylesheet" href="themes/sorter/blue/style.css"/>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js""></script> 
    <script type="text/javascript" src="dataDosug.js"></script>
    <script type="text/javascript" src="codeDosug.js"></script>
    <script type="text/javascript" src="galleria-1.2.2.js"></script>
    <script type="text/javascript" src="jquery.tablesorter.min.js"></script>
    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-42850927-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>
	<link rel="stylesheet" href="reveal.css" />	
	<script type="text/javascript" src="jquery.reveal.js"></script>
  </head>
  <body>
    <div class="adder">
        <div class="addthis_toolbox addthis_default_style addthis_32x32_style">
            <a class="addthis_button_vk"></a>
            <a class="addthis_button_odnoklassniki_ru"></a>
            <a class="addthis_button_google_plusone_share"></a>
            <a class="addthis_button_facebook"></a>
            <a class="addthis_button_twitter"></a>
            <a class="addthis_button_livejournal"></a>
            <a class="addthis_button_digg"></a>
            <a class="addthis_button_mymailru"></a>
        </div>
    </div>
    <script type="text/javascript">var addthis_config = { "data_track_addressbar": true };</script>
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51f8f00354e29ca4"></script>
<br/>
<br/>
        <div class="logo">
            <h1>Досуг\Рестораны\Кафе\Столовые\Спорт\Развлечения\Детские игровые клубы\Бани в Таганроге и окрестностях</h1>
        </div>
        <div id="filterContainer">  
            <div id="districtFilter" class="filter">
                <label>Открытие</label>
                <select id="opening" onchange="showPlacesList();">
                    <option value="all" selected="selected">любое</option>
                    <option value="3">3 месяца назад</option>
                    <option value="12">год назад</option>
                </select>
            </div>
            <div id="districtFilter" class="filter">
                <label>Район</label>
                <select id="district" onchange="showPlacesList();">
                    <option value="all" selected="selected">любой</option>
                    <option value="Центр">Центр</option>
                    <option value="Набережная">Набережная</option>
                    <option value="Мармелад">Мармелад</option>
                    <option value="Русское поле">Русское поле</option>
                    <option value="Западный">Западный</option>
                    <option value="Котельщик">Котельщик</option>
                    <option value="Новый вокзал">Новый вокзал</option>
                    <option value="Северный">Северный</option>
                    <option value="Дзержинка">Дзержинка</option>
                    <option value="Свобода">Свобода</option>
                    <option value="За городом">За городом</option>
                </select>
            </div>
            <div id="typeFilter" class="filter">
                <label>Тип</label>
                <select id="typeDosug" onchange="showPlacesList();">
                    <option value="all" selected="selected">любой</option>
                    <option value="Кафе">Кафе\Ресторан</option>
                    <option value="Кинотеатр">Кинотеатр</option>
                    <option value="Доставка">Доставка</option>
                    <option value="Столовая">Столовая\Бизнесланч\ФастФуд</option>
                    <option value="Для детей">Для детей</option>
                    <option value="Банкетный зал">Банкетный зал</option>
                    <option value="Кондитерская">Кондитерская</option>
                    <option value="Кофейня">Кофейня</option>
                    <option value="Кальянбар">Кальян-бар</option>
                    <option value="Бар">Бар\Паб</option>
                    <option value="Спортбар">Спортбар</option>
                    <option value="Спорт">Спорт</option>
                    <option value="Бильярд">Бильярд</option>
                    <option value="Боулинг">Боулинг</option>
                    <option value="Пейнтбол">Пейнтбол</option>
                    <option value="Лазертаг">Лазертаг</option>
                    <option value="Картинг">Картинг</option>
                    <option value="Бассейн">Бассейн</option>
                    <option value="Баня">Баня</option>
                    <option value="Антикафе">Антикафе</option>
                    <option value="Клуб">Клуб</option>
                    <option value="Теннис">Теннис</option>
                    <option value="Настольный теннис">Настольный теннис</option>
                    <option value="Футбол">Футбол</option>
                    <option value="Кикер">Кикер</option>
                    <option value="Остальное">Остальное</option>
                </select>
            </div>
            <div id="foodFilter" class="filter" style="display: none">
                <label>Кухня</label>
                <select id="food" onchange="showPlacesList();">
                    <option value="all" selected="selected">любая</option>
                    <option value="Европейская">Европейская</option>
                    <option value="Итальянская">Итальянская</option>
                    <option value="Пицца">Пицца</option>
                    <option value="Роллы">Роллы</option>
                    <option value="Японская">Японская</option>
                    <option value="Русская">Русская</option>
                    <option value="Французская">Французская</option>
                    <option value="Кондитерская">Кондитерская</option>
                    <option value="Авторская">Авторская</option>
                    <option value="Домашняя">Домашняя</option>
                    <option value="Экзотическая">Экзотическая</option>
                    <option value="Вегетарианская">Вегетарианская</option>
                    <option value="Кавказская">Кавказская</option>
                    <option value="Восточная">Восточная</option>
                    <option value="Американская">Американская</option>
                    <option value="Китайская">Китайская</option>
                    <option value="Грузинская">Грузинская</option>
                    <option value="Азербайджанская">Азербайджанская</option>
                    <option value="Узбекская">Узбекская</option>
                    <option value="Фаст Фуд">Фаст Фуд</option>
                    <option value="Армянская">Армянская</option>
                    <option value="Немецкая">Немецкая</option>
                    <option value="Украинская">Украинская</option>
                </select>
            </div>
            <div id="kafeFilter" class="filter" style="display: none">
                <label>Тип</label>
                <select id="typeKafe" onchange="showPlacesList();">
                    <option value="all" selected="selected">любой</option>
                    <option value="Караоке">Караоке</option>
                    <option value="Летняя веранда">Летняя веранда</option>
                    <option value="Детская комната">Детская комната</option>
                    <option value="VIP комната">VIP комната</option>
                    <option value="Живая музыка">Живая музыка</option>
                </select>
            </div>
            <div id="deliveryFilter" class="filter" style="display: none">
                <label>Тип</label>
                <select id="typeDelivery" onchange="showPlacesList();">
                    <option value="all" selected="selected">любой</option>
                    <option value="Роллы">Роллы</option>
                    <option value="Пицца">Пицца</option>
                    <option value="Шашлык">Шашлык</option>
                    <option value="Обед">Обед</option>
                    <option value="Ресторанная еда">Ресторанная еда</option>
                </select>
            </div>
        </div>
    <div style="clear: both"></div>
    <div style="text-align:center;">
        <a href="http://twitter.com/#!/TaganCoding" target=_blank>Следите за обновлениями в твиттере</a>
    </div>
    <br /> 
    <div id="deliveryPanel" style="display:none">
        <div id="deliveryRollsPanel" style="display:">
            <div id="rollFilterPanel" style="float:left">
                <div>
                    <input id="rollCheckAllInput" onchange="rollCheckAllInput();" type="checkbox"/>
                    <label>Выбрать все</label>
                </div>
                <div>
                    <input id="simpleRollInput" onchange="refreshRollDelivery();" type="checkbox"/>
                    <label>Классические</label>
                </div>
                <div>
                    <input id="standartRollInput" onchange="refreshRollDelivery();" type="checkbox"/>
                    <label>Стандартные</label>
                </div>
                <div>
                    <input id="crispyRollInput" onchange="refreshRollDelivery();" type="checkbox"/>
                    <label>Жареные</label>
                </div>
                <div>
                    <input id="bakedRollInput" onchange="refreshRollDelivery();" type="checkbox"/>
                    <label>Запеченные</label>
                </div>
            </div>
            <div id="rollIngredientPanel" style="float:left">
            
            </div>
            <div id="rollIngredientDenyPanel" style="float:left">
            
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <div id="topPanel">
        <div class="clear"></div>
        <div id="dataListContainer">
        </div>
        <iframe id="kinocharly" style="display: none; width:100%; min-height:900px; max-width:1100px;">
        </iframe>
    <div class="clear"></div>
        <iframe id="kinoneo" style="display: none; width:100%; min-height:1200px; max-width:1100px;">
        </iframe>
    </div>
    <div class="clear"></div>
    <div id="bottomPanel">
        <div id="dataDetailsContainer" class="reveal-modal">
            <div id="bottomLeft">
                <h1 id="placename"></h1>
            </div>
            <div id="bottomMiddle">
                <div id="advantages"></div>
                <div id="cost"></div>
                <div id="videos"></div>
            </div>
            <div id="bottomRight">
            </div>
            <div id="gallery"></div>
        </div>
        <div class="clear"></div>
        <br />
        
    </div>
    <div class="clear"></div>
    <br />
    Пожелания, замечания, предложения и уточнения присылайте на <a href="mailto:TaganCoding@yandex.ru">TaganCoding@yandex.ru</a>
    <br />
    Обновлено 16 января 22:00.
    <br />  
  </body>
</html>
