function addCustomSorters() {
    //helper for sorter
    $.tablesorter.addParser({
        // set a unique id 
        id: 'html',
        is: function (s) {
            // return false so this parser is not auto detected 
            return false;
        },
        format: function (s) {
            // format your data for normalization 
            return $(s).attr('alt');
        },
        // set type, either numeric or text 
        type: 'text'
    });

    $.tablesorter.addParser({
        // set a unique id 
        id: 'salary',
        is: function (s) {
            // return false so this parser is not auto detected 
            return false;
        },
        format: function (s) {
            // format your data for normalization 
            return $(s).attr('absMax');
        },
        // set type, either numeric or text 
        type: 'numeric'
    });
}


$(document).ready(function () {
  //addCustomSorters();
  var hash = window.location.hash.substr(1);
  
  if (hash == "cinema")
    $('#typeDosug').val('Кинотеатр');
  if (hash == "canteen")
    $('#typeDosug').val('Столовая');
  if (hash == "child")
    $('#typeDosug').val('Для детей');
  if (hash == "cafe")
    $('#typeDosug').val('Кафе');
  if (hash == "delivery")
    $('#typeDosug').val('Доставка');
  if (hash == "banket")
    $('#typeDosug').val('Банкетный зал');
  if (hash == "confectionery")
    $('#typeDosug').val('Кондитерская');
  if (hash == "hookahlounge")
    $('#typeDosug').val('Кальянбар');
  if (hash == "pub")
    $('#typeDosug').val('Бар');
  if (hash == "sportsbar")
    $('#typeDosug').val('Спортбар');
  if (hash == "billiard")
    $('#typeDosug').val('Бильярд');
  if (hash == "bowling")
    $('#typeDosug').val('Боулинг');
  if (hash == "paintball")
    $('#typeDosug').val('Пейнтбол');
  if (hash == "kart")
    $('#typeDosug').val('Картинг');
  if (hash == "pool")
    $('#typeDosug').val('Бассейн');
  if (hash == "bath")
    $('#typeDosug').val('Баня');
  if (hash == "timeclub")
    $('#typeDosug').val('Антикафе');
  if (hash == "nightclub")
    $('#typeDosug').val('Клуб');
  if (hash == "tennis")
    $('#typeDosug').val('Теннис');
  if (hash == "tabletennis")
    $('#typeDosug').val('Настольный теннис');
  if (hash == "kiker")
    $('#typeDosug').val('Кикер');
  if (hash == "remain")
    $('#typeDosug').val('Остальное');
  
  showPlacesList();
  
  Galleria.loadTheme('galleria.simplecoding.js');
  showDetailsByName(document.location.hash);
  //showDetails(4);
  
  var gallery = $("#gallery");
});

var bazas;

function showPlacesList()
{
    oPlacesList =  new PlacesList();
    oPlacesList.fill();
}


function showDetailsByName(name)
{
    var index = -1;

    for (var i = 0; i < places.length; i++) {
        if ("#" + places[i].Name == name) {
            index = i;
        }
    }

    if (index >= 0) {
        showDetails(index);
    }
    else {
        document.location.href = document.location.pathname + "#home";
    }
}

function showDetails(placeIndex)
{
    if (places.length < placeIndex)
        return;
    
    var place = places[placeIndex];
    $('#dataDetailsContainer').show();
    document.getElementById('placename').innerHTML = place.Name;
    document.getElementById('advantages').innerHTML = place.AdditionalInfo;
    
    
 //   var videosHTML = generateUnorderedArrayViewAsLinks(baza.Videos);
  //  if (baza.Videos.length > 0)
 //       videosHTML = '<h2>Видео</h2>' + videosHTML;
        
//    document.getElementById('videos').innerHTML = videosHTML;
   
 //   if (baza.Videos.length > 0)
 //   {
 //       $('#videos').show();
 //   }
 //   else
 //   {
 //       $('#videos').hide();    
 //   }
    
    if (place.Photos.length > 0)
    {
        initGallery(place);
        $('#gallery').show();
    }
    else
    {
        $('#gallery').hide();    
    }
    //debugger;
    document.location.href = document.location.pathname + "#" + place.Name;
    
    $('#dataDetailsContainer').reveal();
}

function initGallery(baza){
    $("#gallery").galleria({
        data_source: baza.Photos,
        width: 530,
        height: 500,
        clicknext: true
    });
}

function generatePhotosView(items)
{
    var result = '';
    
    for (var i = 0; i < 1 /*items.length*/; i++)
    {
        result += '<img class="officeImg" src="'+ items[i] + '"><br>';
    }

    return result;
}

function generateSequenceDelimetedByComma(items)
{
    var result = '';
    
    if (items.length > 0)
    {
        result += items[0];
        for (var i = 1; i < items.length; i++)
        {
            result += ', ' + items[i];
        }
    }
    
    return result;
}

function generateUnorderedArrayViewAsLinks(items)
{
    var result = '<UL>';
    
    for (var i = 0; i < items.length; i++)
    {
        result += '<LI><a href="' + items[i] + '">' + items[i] + '</a></LI>';
    }
    result += '</UL>';
    
    return result;
}

function generateUnorderedArrayView(items)
{
    var result = '<UL>';
    
    for (var i = 0; i < items.length; i++)
    {
        result += '<LI>' + items[i] + '</LI>';
    }
    result += '</UL>';
    
    return result;
}

IsCinemasLoaded = false;

function doFilter(items)
{
    var result = [];
    
    var typeDosug = document.getElementById('typeDosug').value;
    var district = document.getElementById('district').value;
    var food = document.getElementById('food').value;
    var typeKafe = document.getElementById('typeKafe').value;
    var typeDelivery = document.getElementById('typeDelivery').value;

    var isTypeDosugNotMeans = typeDosug == "all";
    var isDistrictNotMeans = district == "all";
    var isFoodNotMeans = food == "all" || typeDosug != "Кафе";
    var isTypeKafeNotMeans = typeKafe == "all" || typeDosug != "Кафе";
    var isTypeDeliveryNotMeans = typeDelivery == "all" || typeDosug != "Доставка";
    
    if (typeDosug == "Кинотеатр")
    {
        if (!IsCinemasLoaded)
        {
            $('#kinocharly').attr('src', "http://www.kinocharly.ru/cinemas/60/");
            $('#kinoneo').attr('src', "http://www.kinoneo.ru/schedule#all");
            IsCinemasLoaded = true;
        }
        
        $('#kinocharly').show();
        $('#kinoneo').show();
    }
    else
    {
        $('#kinocharly').hide();
        $('#kinoneo').hide();
    }
    
    if (typeDosug == "Доставка")
    {
        $('#deliveryFilter').show();
    }
    else
    {
        $('#deliveryFilter').hide();
    }
    
    if (typeDosug == "Кафе")
    {
        $('#kafeFilter').show();
        $('#foodFilter').show();
    }
    else
    {
        $('#kafeFilter').hide();
        $('#foodFilter').hide();
    }
    
    for (var i = 0; i < items.length; i++)
    {    
        var place = items[i];
        
        var isTypeDosugEquals = isTypeDosugNotMeans;
        var isDistrictEquals = isDistrictNotMeans || district == place.District;
        var isFoodEquals = isFoodNotMeans;
        var isTypeKafeEquals = isTypeKafeNotMeans;
        var isTypeDeliveryEquals = isTypeDeliveryNotMeans;
        
        if (!isTypeDosugEquals)
        {
            isTypeDosugEquals = checkValues(typeDosug, place.DosugType);
        }
        
        if (typeDosug == "Кафе" && (!isFoodEquals || !isTypeKafeEquals))
        {
            if (!isFoodEquals)
                isFoodEquals = checkValues(food, place.FoodType);
            if (!isTypeKafeEquals)
                isTypeKafeEquals = checkValues(typeKafe, place.TypeKafe);
        }
        if (typeDosug == "Доставка" && !isTypeDeliveryEquals)
        {
            isTypeDeliveryEquals = checkValues(typeDelivery, place.TypeDelivery);
        }
        
        if (isTypeDosugEquals && isDistrictEquals && isFoodEquals && isTypeKafeEquals && isTypeDeliveryEquals)
            result.push(place);
    }

    return result;
}

function checkValues(value, values)
{
    for (var i = 0; i < values.length; i++)
    {
        if (values[i] == value.replace("\\",""))
            return true;
    }

    return false;
}

PlacesList.prototype.fill = function ()
{
    places = doFilter(this.Items);
    var content = '<table class="tablesorter" id="places" cellspacing="0" cellpadding="0">';

	content += '<thead>';
	content += '<tr class="even">';
	content += '<th class="" style="max-width:15px"></th>';
	content += '<th class="middleSizeColumn">' + 'Название' + '</th>';
	content += '<th class="bigSizeIconColumn" colspan="13">Ссылки</th>';
	content += '<th class="middleSizeColumn ">' + 'Адрес' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Контакты' + '</th>';
	//content += '<th class="middleSizeColumn">' + 'Категория' + '</th>';
	//content += '<th class="middleSizeColumn">' + 'Стоимость' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Тип' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Средний чек' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Время работы' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Услуги' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Бонусы' + '</th>';
	content += '</tr>'; 
	content += '</thead>';
	
	var rowIndex = 0;
	for(var i = 0; i < places.length; i++)
	{
	    var place = places[i];
	    if (place == null)
	        continue;
	        
	    var colorStyle = rowIndex % 2 ? 'even' : 'odd';
	    rowIndex++;
	    var addr = '';
	    if (place.AddressLink != '')
	    {
	        addr = '<a target="blank" href="' + place.AddressLink + '"><img alt="' + place.Name + '" class="smallSizeColumn" src="http://www.clker.com/cliparts/N/3/C/c/M/f/pin-point-location-marker-purple-md.png"></a>';
	    }
	    var name = place.Name;

	    if (place.OfSiteLink.length > 0)
	    {
	        name = '<a target="blank" href="' + place.OfSiteLink + '">' + place.Name + '</a>';
	    }

	    content += '<tr class="datarow ' + colorStyle + '" onclick="showDetails(' + i + ')";>';
	    content += '<td class="" style="max-width:15px">' + addr + '</td>';
	    content += '<td class="middleSizeColumn">' + name + '</td>';

		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.VkontakteLink, "http://cs10305.vkontakte.ru/g31480263/e_0c89034a.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.FoursquareLink, "http://www.google.com/s2/favicons?domain=https://ru.foursquare.com/");
		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.TraveltipzLink, "http://www.google.com/s2/favicons?domain=http://traveltipz.ru/");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.KafeTaganrogLink, "https://www.google.com/s2/favicons?domain=http://kafe-taganrog.ru");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.SpravkerLink, "http://www.google.com/s2/favicons?domain=taganrog.spravker.ru/");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.TagfindLink, "https://www.google.com/s2/favicons?domain=http://tagfind.ru");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.InfotaganrogLink, "https://www.google.com/s2/favicons?domain=http://www.infotaganrog.ru");
		content += addImageLink("middleSizeColumn", "imageLinkWidth", place.VirtualTaganrogLink, "http://profile.ak.fbcdn.net/hprofile-ak-snc6/c0.0.160.160/p160x160/277137_209952092395461_4585352_n.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.LocalwayLink, "https://www.google.com/s2/favicons?domain=http://localway.ru");

		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.Video, "http://www.russia-on.ru/wp-content/uploads/2012/11/YouTube.jpg");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.UniquePhotoLink, "http://iconizer.net/files/Mnml/orig/camera.png");
		
		/*if (baza.Photos == '')
		    content += '<td class="lastHeaderColumn"></td>'; 
		else
			content += '<td class="lastHeaderColumn"> <img class="imageLinkWidth" src="http://iconizer.net/files/Mnml/orig/camera.png"></td>';
			*/
			
		content += '<td>';
		if (place.MenuLink)
		    content += '<a target="blank" href="' + place.MenuLink + '">Меню</a>';
		content += '</td>';
		
		content += '<td class="lastHeaderColumn">' + place.Photos.length + " фото" +'</td>'; 		

	    content += '<td class="middleSizeColumn">' + place.Address + '</td>';
	    content += '<td class="middleSizeColumn">' + place.Phones + '</td>';
	    content += '<td class="middleSizeColumn">' + place.PlaceType + '</td>';
	    content += '<td class="middleSizeColumn">' + place.AverageBill + '</td>';
	    content += '<td class="middleSizeColumn">' + place.WorkTime + '</td>';
	    content += '<td class="middleSizeColumn">' + place.Services + '</td>';
	    content += '<td class="middleSizeColumn">' + getBonus(place) + '</td>';

		content += '</tr>'; 
	}

	content += '</table>'; 

	var dataListContainer = document.getElementById('dataListContainer');
	dataListContainer.innerHTML = content;
}

function getBonus(baza)
{
    var result = '';
    /*
    result += getBonusText(baza.TableTennis, "Настольный теннис");
    result += getBonusText(baza.Tennis, "Теннис");
    result += getBonusText(baza.Football, "Футбол");
    result += getBonusText(baza.Basketball, "Баскетбол");
    result += getBonusText(baza.Volleyball, "Волейбол");
    result += getBonusText(baza.Billiard, "Бильярд");
    result += getBonusText(baza.Besedki, "Беседки");
    result += getBonusText(baza.Fishing, "Рыбалка");
    result += getBonusText(baza.Pool, "Бассейн");
    result += getBonusText(baza.Bath, "Баня");
    result += getBonusText(baza.Banket, "Зал");
    result += getBonusText(baza.Disco, "Дискотека");
    result += getBonusText(baza.Playground, "Детская площадка");
    
    if (result.length > 0)
        result = baza.Bonuses + '<br/>' + result;
    else
        result = baza.Bonuses;
    */
    return result;
}

function getBonusText(placeBonus, bonusText)
{
    var result = '';
    if (placeBonus)
        result = bonusText  + "<br>";
    return result;
}


function addImageLink(tdClass, imageClass, link, imageLink)
{
    var result;
	if (link != '')
	    result = '<td class="' + tdClass + '"><a target="blank" href="' + link + '"/><img class="' + imageClass + '" src="' +imageLink + '"></img></a></td>';
	else
	    result = '<td class="' + tdClass + '"></td>';
    return result;
}
