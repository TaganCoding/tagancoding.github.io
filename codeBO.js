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
  showBazasList();
  
  Galleria.loadTheme('galleria.simplecoding.js');
  showDetailsByName(document.location.hash);
  //showDetails(4);
  
  var gallery = $("#gallery");
});

var bazas;

function showBazasList()
{
    oBazasList =  new BazasList();
    oBazasList.fill();
}


function showDetailsByName(name)
{
    var index = -1;

    for (var i = 0; i < bazas.length; i++) {
        if ("#" + bazas[i].Name == name) {
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

function showDetails(bazaIndex)
{
    if (bazas.length < bazaIndex)
        return;
    
    var baza = bazas[bazaIndex];
    $('#dataDetailsContainer').show();
    document.getElementById('bazaname').innerHTML = baza.Name;
    
    
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
    
    if (baza.Photos.length > 0)
    {
        initGallery(baza);
        $('#gallery').show();
    }
    else
    {
        $('#gallery').hide();    
    }
    //debugger;
    document.location.href = document.location.pathname + "#" + baza.Name;
    
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
        var baza = items[i];
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
            result.push(baza);
       /* }
        else
        {
            result.push(null);
        }*/
    }

    return result;
}


BazasList.prototype.fill = function ()
{
    bazas = doFilter(this.Items);
    var content = '<table class="tablesorter" id="bazas" cellspacing="0" cellpadding="0">';

	content += '<thead>';
	content += '<tr class="even">';
	content += '<th class="smallSizeColumn firstColumn"></th>';
	content += '<th class="middleSizeColumn">' + 'Название' + '</th>';
	content += '<th class="bigSizeIconColumn" colspan="11">Ссылки</th>';
	content += '<th class="middleSizeColumn ">' + 'Адрес' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Контакты' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Категория' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Расстояние' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Транспорт' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Стоимость' + '</th>';
	content += '<th class="lastHeaderColumn">' + 'Бонусы' + '</th>';
	content += '</tr>'; 
	content += '</thead>';
	
	var rowIndex = 0;
	for(var i = 0; i < bazas.length; i++)
	{
	    var baza = bazas[i];
	    if (baza == null)
	        continue;
	        
	    var colorStyle = rowIndex % 2 ? 'even' : 'odd';
	    rowIndex++;
	    var addr = '';
	    if (baza.AddressLink != '')
	    {
	        addr = '<a target="blank" href="' + baza.AddressLink + '"><img alt="' + baza.Name + '" class="smallSizeColumn" src="http://www.clker.com/cliparts/N/3/C/c/M/f/pin-point-location-marker-purple-md.png"></a>';
	    }
	    var name = baza.Name;


	    if (baza.OfSiteLink.length > 0)
	    {
	        name = '<a target="blank" href="' + baza.OfSiteLink + '">' + baza.Name + '</a>';
	    }

	    content += '<tr class="datarow ' + colorStyle + '" onclick="showDetails(' + i + ')";>';
	    content += '<td class="firstColumn smallSizeColumn">' + addr + '</td>';
	    content += '<td class="middleSizeColumn">' + name + '</td>';

		content += addImageLink("smallSizeIconColumn", "imageLinkWidth", baza.VkontakteLink, "http://cs10305.vkontakte.ru/g31480263/e_0c89034a.jpg");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", baza.NotOfSiteLink, "http://i.ytimg.com/vi/eP-MZAwut2o/hqdefault.jpg");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", baza.DonFisherLink, "http://www.krona.biz/everything/images/donfisher-nakley250.jpg");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", baza.BarschLink, "http://i.ytimg.com/vi/eP-MZAwut2o/hqdefault.jpg");
		content += addImageLink("middleSizeColumn", "imageLinkWidth", baza.VirtualTaganrogLink, "http://profile.ak.fbcdn.net/hprofile-ak-snc6/c0.0.160.160/p160x160/277137_209952092395461_4585352_n.jpg");

		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", baza.Video, "http://www.russia-on.ru/wp-content/uploads/2012/11/YouTube.jpg");
		
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", baza.TravelRostovLink, "http://cs409228.vk.me/v409228808/9a4e/cjFJME6z_Hg.jpg");
		if (baza.PanoramioLink == '')
		{
		    //if (baza.Latitude != '' && baza.Longitude != '')
		    //    content += addImageLink("middleSizeIconColumn", "imageLinkWidth", "http:////www.panoramio.com/map/#lt=" + baza.Latitude + "&ln=" + baza.Longitude + "&z=-1&k=1&a=1&tab=1&pl=all", "http://logonoid.com/images/panoramio-logo.png");
		    //else
		        content += '<td></td>'; 
		}
		else
		   //     content += '<td></td>'; 
		    content += addImageLink("middleSizeIconColumn", "imageLinkWidth", baza.PanoramioLink, "http://logonoid.com/images/panoramio-logo.png");

		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", baza.WikiMapiaLink, "http://irecommend.ru/sites/default/files/imagecache/200x200/product-images/15099/774267.jpeg");
		content += addImageLink("middleSizeIconColumn", "imageLinkWidth", baza.UniquePhotoLink, "http://iconizer.net/files/Mnml/orig/camera.png");
		
		/*if (baza.Photos == '')
		    content += '<td class="lastHeaderColumn"></td>'; 
		else
			content += '<td class="lastHeaderColumn"> <img class="imageLinkWidth" src="http://iconizer.net/files/Mnml/orig/camera.png"></td>';
			*/
			
		content += '<td class="lastHeaderColumn">' + baza.Photos.length + " фото" +'</td>'; 		

	    content += '<td class="middleSizeColumn">' + baza.Address + '</td>';
	    content += '<td class="middleSizeColumn">' + baza.Phones + '</td>';
	    content += '<td class="middleSizeColumn">' + baza.Category + '</td>';
	    content += '<td class="middleSizeColumn">' + baza.Distance + '</td>';
	    content += '<td class="middleSizeColumn">' + baza.Transport + '</td>';
	    content += '<td class="middleSizeColumn">' + baza.Cost + '</td>';
	    content += '<td class="middleSizeColumn">' + getBonus(baza) + '</td>';

		content += '</tr>'; 
	}

	content += '</table>'; 

	var dataListContainer = document.getElementById('dataListContainer');
	dataListContainer.innerHTML = content;
}

function getBonus(baza)
{
    var result = '';
    
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
    
    return result;
}

function getBonusText(bazaBonus, bonusText)
{
    var result = '';
    if (bazaBonus)
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
