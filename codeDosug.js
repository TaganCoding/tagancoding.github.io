$(document).ready(function () {
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
  if (hash == "karaoke")
    $('#typeDosug').val('Караоке');
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
  if (hash == "lasertag")
    $('#typeDosug').val('Лазертаг');
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
  if (hash == "consoles")
    $('#typeDosug').val('Игровые приставки');
  if (hash == "quiz")
    $('#typeDosug').val('Барная викторина');
  if (hash == "remain")
    $('#typeDosug').val('Остальное');
  if (hash == "recent")
    $('#opening').val('3');
  if (hash == "year")
    $('#opening').val('12');
  if (hash == "opening")
    $('#opening').val('0');
  if (hash == "withalcohol")
    $('#withAlcoholInput').attr("checked","checked");;
  if (hash == "night")
    $('#nightInput').attr("checked","checked");;
  
  showPlacesList();
  
  Galleria.loadTheme('galleria.simplecoding.js');
  //showDetailsByName(document.location.hash);
  
  var gallery = $("#gallery");
  
  var rollsIngredientsFilter = "";
  var rollsIngredientsDenyFilter = "";
  /*for (var i = 0; i < RollsIngredients.length; i++) {
    rollsIngredientsFilter += '<div class=""><input id="rollsIngredientsFilter' + i + '" onchange="refreshRollDelivery();" type="checkbox"><label>' + RollsIngredients[i] + '</label></div>';
  }
  document.getElementById('rollIngredientPanel').innerHTML = rollsIngredientsFilter;*/
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
    var opening = document.getElementById('opening').value;
    var food = document.getElementById('food').value;
    var typeKafe = document.getElementById('typeKafe').value;
    var banketValue = document.getElementById('banketzal').value;
    var typeDelivery = document.getElementById('typeDelivery').value;
    
    var isWithAlcohol = document.getElementById('withAlcoholInput').checked;
    var isNight = document.getElementById('nightInput').checked;
    var letnik = document.getElementById('letnikInput').checked;
    var danceFloor = document.getElementById('danceFloorInput').checked;
    var discounts = document.getElementById('discountsInput').checked;

    var isTypeDosugNotMeans = typeDosug == "all";
    var isOpeningNotMeans = opening == "all";
    var isDistrictNotMeans = district == "all";
    var isFoodNotMeans = food == "all" || typeDosug != "Кафе";
    var isBanketNotMeans = banketValue == "all" || typeDosug != "Банкетный зал";
    var isTypeKafeNotMeans = typeKafe == "all" || typeDosug != "Кафе";
    var isTypeDeliveryNotMeans = typeDelivery == "all" || typeDosug != "Доставка";
    var isWithAlcoholNotMeans = !isWithAlcohol;
    var isNightNotMeans = !isNight;
    var letnikNotMeans = !letnik;
    var danceFloorNotMeans = !danceFloor;
    var discountsNotMeans = !discounts;
    
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
        $('#letnikFilter').show();
        $('#danceFloorFilter').show();
    }
    else
    {
        $('#kafeFilter').hide();
        $('#foodFilter').hide();
        $('#letnikFilter').hide();
        $('#danceFloorFilter').hide();
    }
    
    if (typeDosug == "Банкетный зал")
    {
        $('#banketFilter').show();
    }
    else
    {
        $('#banketFilter').hide();
    }
    
    for (var i = 0; i < items.length; i++)
    {    
        var place = items[i];
        
        var isTypeDosugEquals = isTypeDosugNotMeans;
        var isDistrictEquals = isDistrictNotMeans || district == place.District;
        var isOpeningEquals = isOpeningNotMeans;
        var isFoodEquals = isFoodNotMeans;
        var isBanketEquals = isBanketNotMeans;
        var isTypeKafeEquals = isTypeKafeNotMeans;
        var isTypeDeliveryEquals = isTypeDeliveryNotMeans;
        var isWithAlcoholEquals = isWithAlcoholNotMeans;
        var isNightEquals = isNightNotMeans;
        var letnikEquals = letnikNotMeans;
        var danceFloorEquals = danceFloorNotMeans;
        var discountsEquals = discountsNotMeans;
        
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
        if (typeDosug == "Банкетный зал" && !isBanketEquals)
        {
            isBanketEquals = place.Capacity.length > 0 && checkCapacity(banketValue, place.Capacity);
        }
        
        if (opening != "all")
        {
            if (place.OpeningDate === undefined)
                continue;
                
            var filterDate = new Date();
            isOpeningEquals = opening == "0" && place.OpeningDate > filterDate;
            if (opening == "3")
                filterDate.setMonth(filterDate.getMonth() - 3);
            if (opening == "12")
                filterDate.setMonth(filterDate.getMonth() - 12);
            if (place.OpeningDate >= filterDate && new Date() > place.OpeningDate)
                 isOpeningEquals = true;            
        }
        
        if (!isWithAlcoholEquals)
        {
            isWithAlcoholEquals = place.WithAlcohol != '';
        }
        if (!isNightEquals)
        {
            isNightEquals = place.IsNight;
        }
        if (!letnikEquals)
        {
            letnikEquals = place.Letnik;
        }
        if (!danceFloorEquals)
        {
            danceFloorEquals = place.DanceFloor;
        }
        if (!discountsEquals)
        {
            discountsEquals = place.Discounts;
        }
        
        if (isTypeDosugEquals && isDistrictEquals && isOpeningEquals && isFoodEquals && isBanketEquals && isTypeKafeEquals && 
            isTypeDeliveryEquals && isWithAlcoholEquals && isNightEquals && letnikEquals && danceFloorEquals && discountsEquals)
            result.push(place);
    }

    return result;
}

function checkCapacity(banketValue, capacity)
{
    if (banketValue == "all")
        return true;
    if (banketValue == "30")
    {
        for(var i = 0; i < capacity.length; i++)
            if (0 + capacity[i]  <= 30)
                return true;
    }
    if (banketValue == "60")
    {
        for(var i = 0; i < capacity.length; i++)
            if (0 + capacity[i] >= 30 && 0 + capacity[i] <= 60)
                return true;
    }
    if (banketValue == "90")
    {
        for(var i = 0; i < capacity.length; i++)
            if (0 + capacity[i]  >= 60 && 0 + capacity[i] <= 90)
                return true;
    }
    if (banketValue == "100")
    {
        for(var i = 0; i < capacity.length; i++)
            if (0 + capacity[i]  >= 90)
                return true;
    }
    
    return false;
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

    var isKafe = document.getElementById('typeDosug').value == "Кафе";
    var isDelivery = document.getElementById('typeDosug').value == "Доставка";
    var isDetailed = document.getElementById('typeDosug').value != "all" && !isKafe && !isDelivery;
    var isBilliard = document.getElementById('typeDosug').value == "Бильярд";
    var isBath = document.getElementById('typeDosug').value == "Баня";
    var isBanket = document.getElementById('typeDosug').value == "Банкетный зал";
    var isWithAlcohol = document.getElementById('withAlcoholInput').checked;
    var discounts = document.getElementById('discountsInput').checked;
    
	content += '<thead>';
	content += '<tr class="even">';
	content += '<th class="" style="max-width:15px"></th>';
	content += '<th class="middleSizeColumn">' + 'Название' + '</th>';
	content += '<th class="bigSizeIconColumn" colspan="14">Ссылки</th>';
	content += '<th class="middleSizeColumn ">' + 'Адрес' + '</th>';
	//content += '<th class="middleSizeColumn">' + 'Категория' + '</th>';
	//content += '<th class="middleSizeColumn">' + 'Стоимость' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Тип' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Время работы' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Услуги' + '</th>';
	if(isKafe)
	{
	    content += '<th class="lastHeaderColumn">' + 'Кухня' + '</th>';
	    content += '<th class="lastHeaderColumn">' + 'Средний чек' + '</th>';
	}
	if (isDelivery)
	{
	    content += '<th class="lastHeaderColumn">' + 'Доставка' + '</th>';
	}
	if (isDetailed)
	{
	    content += '<th class="lastHeaderColumn">' + '' + '</th>';
	}
	if (isBilliard)
	{
	    content += '<th class="lastHeaderColumn">' + 'Бильярд' + '</th>';
	}
	if (isBath)
	{
	    content += '<th class="lastHeaderColumn">' + 'Баня' + '</th>';
	}
	if (isBanket)
	{
	    content += '<th class="lastHeaderColumn">' + 'Зал' + '</th>';
	}
	if (isWithAlcohol)
	{
	    content += '<th class="lastHeaderColumn">' + 'Со своим' + '</th>';
	}
	if (discounts)
	{
	    content += '<th class="lastHeaderColumn">' + 'Скидки' + '</th>';
	}
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
	        addr = '<a target="blank" href="' + place.AddressLink + '"><img alt="' + place.Name.replace("\"", "").replace("<br>", "") + '" class="smallSizeColumn" src="http://www.clker.com/cliparts/N/3/C/c/M/f/pin-point-location-marker-purple-md.png"></a>';
	    }
	    var name = place.Name;

	    if (place.OfSiteLink.length > 0)
	    {
	        name = '<a target="blank" href="' + place.OfSiteLink + '">' + place.Name + '</a>';
	    }

	    content += '<tr class="datarow ' + colorStyle + '";>';
	    content += '<td class="" style="max-width:15px">' + addr + '</td>';
	    content += '<td class="middleSizeColumn">' + name + '</td>';

		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.VkontakteLink, "https://bobr.by/data/internet95.gif");
		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.TripadvisorLink, "https://www.clipartmax.com/png/middle/109-1095841_testimonial-avatar-tripadvisor-icon.png");
		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.InstaLink, "https://img2.freepng.ru/20180713/lxp/kisspng-logo-computer-icons-social-media-advertising-instagram-neon-5b4907bde7b0e6.349129711531512765949.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.UgostiLink, "https://lh6.ggpht.com/TYwsfAVYqlG8QRvTUDS2S3oFH-eK5t6UR5u4ixSbwupjk97IbSSq0fFkwnUAfGxM-GwA=w300");
		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.FoursquareLink, "http://www.google.com/s2/favicons?domain=https://ru.foursquare.com/"); 
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.SpravkerLink, "http://www.google.com/s2/favicons?domain=taganrog.spravker.ru/");
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
		content += '<td>';
		if (place.SteaksLink)
		    content += '<a target="blank" href="' + place.SteaksLink + '"/><img style="max-width:25px" class="middleSizeColumn" src="https://png.pngtree.com/png_detail/20181017/steak-png-clipart_889623.png"></img></a>';
		    
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.CameraLink, "https://2.bp.blogspot.com/-AcRzGZLTxJc/W7I0KWRgJFI/AAAAAAAAALo/IFVr-v1Gq1cPxed8mxmAkNC1PCYxvaCTQCK4BGAYYCw/s1600/camera_web.png");
		content += '</td>';
		content += addImageLinks("middleSizeIconColumn", "imageLinkWidth", place.Geometry, "https://geometria.ru/favicon.ico");
		
		
		/*if (place.Photos.length > 0)
		    content += '<td class="lastHeaderColumn" onclick="showDetails(' + i + ')">' + place.Photos.length+ " фото" +'</td>'; 
		else
		    content += '<td class="lastHeaderColumn"></td>'; */
				

	    content += '<td class="middleSizeColumn">' + place.Address + '</td>';
	    content += '<td class="middleSizeColumn">' + getValues(place.DosugType) + '</td>';

	    content += '<td class="middleSizeColumn">' + place.WorkTime + '</td>';

	    content += '<td class="middleSizeColumn">' + place.Services + '</td>';
	    if(isKafe)
	    {
	        content += '<td class="middleSizeColumn">' + getValues(place.FoodType) + '</td>';
	        content += '<td class="middleSizeColumn">' + place.AverageBill + '</td>';
	    }
	    if (isDelivery)
	    {
	        content += '<td class="middleSizeColumn">' + getValues(place.TypeDelivery) + '</td>';
	    }
	    if (isDetailed)
	    {
	        content += '<td class="lastHeaderColumn">' + place.AdditionalInfo + '</td>';
	    }
	    if (isBanket)
	    {
	        content += '<td class="middleSizeColumn">' + getValues(place.Capacity) + '</td>';
	    }
	    if (isBilliard)
	    {
	        content += '<td class="lastHeaderColumn">' + getValues(place.BilliardType) + '</td>';
	    }
	    if (isBath)
	    {
	        content += '<td class="lastHeaderColumn">' + getValues(place.BathType) + '</td>';
	    }
	    if (isWithAlcohol)
	    {
	        content += '<th class="lastHeaderColumn">' + place.WithAlcohol + '</th>';
	    }
	    if (discounts)
	    {
	        content += '<th class="lastHeaderColumn">' + place.Discounts + '</th>';
	    }
	    
		content += '</tr>'; 
	}

	content += '</table>'; 

	var dataListContainer = document.getElementById('dataListContainer');
	dataListContainer.innerHTML = content;
}

function getValues(values)
{
    var result = '';
    for(var i = 0; i < values.length; i++)
    {
        if (i != 0)
            result += '<br/>';
            
        result += values[i];
    }
    
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

function addImageLinks(tdClass, imageClass, links, imageLink)
{
    var result;
	if (links.length > 0){
	    result ='<td class="' + tdClass + '">';
	    for(var i = 0; i < links.length; i++)
	        result +='<a target="blank" href="' + links[i] + '"/><img style="margin-left:4px" class="' + imageClass + '" src="' +imageLink + '"></img></a>';
	    result += '</td>';
	}
	else
	    result = '<td class="' + tdClass + '"></td>';
    return result;
}
