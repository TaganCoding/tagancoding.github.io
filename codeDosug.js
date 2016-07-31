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


function doFilter(items)
{
    var result = [];

    /*
    var kikerInput = document.getElementById('kikerInput').checked;
    var tableTennisInput = document.getElementById('tableTennisInput').checked;
    var tableGamesInput = document.getElementById('tableGamesInput').checked;
    var languageInput = document.getElementById('languageInput').checked;
    var gamesInput = document.getElementById('gamesInput').checked;          
    var sportInput = document.getElementById('sportInput').checked;                
    
    var minActialityDate = getMinActialityDate(vacancyActuality);
*/
    for (var i = 0; i < items.length; i++)
    {    
        var place = items[i];
        /*
        var isBonusActual;
        
        
        isBonusActual = (!tableTennisInput || tableTennisInput && baza.TableTennis) &&
            (!kikerInput || kikerInput && baza.Kiker) &&
            (!tableGamesInput || tableGamesInput && baza.TableGames) &&
            (!languageInput || languageInput && baza.English) &&
            (!gamesInput || gamesInput && baza.Games)&&
            (!sportInput || sportInput && baza.Sport);
    
    
        if (isBonusActual)
        {*/
            result.push(place);
       /* }
        else
        {
            result.push(null);
        }*/
    }

    return result;
}


PlacesList.prototype.fill = function ()
{
    places = doFilter(this.Items);
    var content = '<table class="tablesorter" id="places" cellspacing="0" cellpadding="0">';

	content += '<thead>';
	content += '<tr class="even">';
	content += '<th class="smallSizeColumn firstColumn"></th>';
	content += '<th class="middleSizeColumn">' + 'Название' + '</th>';
	content += '<th class="bigSizeIconColumn" colspan="9">Ссылки</th>';
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
	    content += '<td class="firstColumn smallSizeColumn">' + addr + '</td>';
	    content += '<td class="middleSizeColumn">' + name + '</td>';

        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.OfSiteLink, "http://i.ytimg.com/vi/eP-MZAwut2o/hqdefault.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.VkontakteLink, "http://cs10305.vkontakte.ru/g31480263/e_0c89034a.jpg");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.KafeTaganrogLink, "http://i.ytimg.com/vi/eP-MZAwut2o/hqdefault.jpg");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.SpravkerLink, "http://www.krona.biz/everything/images/donfisher-nakley250.jpg");
		content += addImageLink("middleSizeColumn", "imageLinkWidth", place.VirtualTaganrogLink, "http://profile.ak.fbcdn.net/hprofile-ak-snc6/c0.0.160.160/p160x160/277137_209952092395461_4585352_n.jpg");
		content += addImageLink("middleSizeColumn", "imageLinkWidth", place.TCLink, "http://profile.ak.fbcdn.net/hprofile-ak-snc6/c0.0.160.160/p160x160/277137_209952092395461_4585352_n.jpg");

		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.Video, "http://www.russia-on.ru/wp-content/uploads/2012/11/YouTube.jpg");
				content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.UniquePhotoLink, "http://iconizer.net/files/Mnml/orig/camera.png");
		
		/*if (baza.Photos == '')
		    content += '<td class="lastHeaderColumn"></td>'; 
		else
			content += '<td class="lastHeaderColumn"> <img class="imageLinkWidth" src="http://iconizer.net/files/Mnml/orig/camera.png"></td>';
			*/
			
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
