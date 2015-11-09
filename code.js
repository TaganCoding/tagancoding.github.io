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
  addCustomSorters();
  showFirmsList();
  
  Galleria.loadTheme('galleria.simplecoding.js');
  showDetailsByName(document.location.hash);
  //showDetails(4);
  
  var gallery = $("#gallery");
});

var firms;

function showFirmsList()
{
    oFirmsList =  new FirmsList();
    oFirmsList.fill();
}


function showDetailsByName(name)
{
    var index = -1;

    for (var i = 0; i < firms.length; i++) {
        if ("#" + firms[i].Name == name) {
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

function showDetails(firmIndex)
{
    if (firms.length < firmIndex)
        return;
    
    var firm = firms[firmIndex];
    $('#dataDetailsContainer').show();
    document.getElementById('firmname').innerHTML = firm.Name;
    
    if (firm.OfficialLogoLink != '')
    {
        document.getElementById('firmlogo').src = firm.OfficialLogoLink;
        $('#firmlogo').show();
    }
    else
    {
        $('#firmlogo').hide();    
    }
    
    var educationCenterHTML = generateEducationCenterView(firm.EducationCenterLink);
    document.getElementById('educationCenter').innerHTML = educationCenterHTML;
    
    var advantagesHTML = generateUnorderedArrayView(firm.Advantages);
    if (firm.Advantages.length > 0)
        advantagesHTML = '<h2>Бонусы</h2>' + advantagesHTML;
    
    document.getElementById('advantages').innerHTML = advantagesHTML; 
    
    if (firm.Advantages.length > 0)
    {
        $('#advantages').show();
    }
    else
    {
        $('#advantages').hide();    
    }
    
    var vacanciesHTML = generateVacanciesView(firm.Vacancies);
    document.getElementById('vacancies').innerHTML = vacanciesHTML;
    
    
    var videosHTML = generateUnorderedArrayViewAsLinks(firm.Videos);
    if (firm.Videos.length > 0)
        videosHTML = '<h2>Видео</h2>' + videosHTML;
        
    document.getElementById('videos').innerHTML = videosHTML;
   
    if (firm.Videos.length > 0)
    {
        $('#videos').show();
    }
    else
    {
        $('#videos').hide();    
    }
    
    if (firm.Photos.length > 0)
    {
        initGallery(firm);
        $('#gallery').show();
    }
    else
    {
        $('#gallery').hide();    
    }
    //debugger;
    document.location.href = document.location.pathname + "#" + firm.Name;
    
    // "показать все". Показывать\скрывать и обновлять данные.
    var salary = document.getElementById('salary').value;
    var direction = document.getElementById('directions').value;
    var vacancyActuality = document.getElementById('vacancyActuality').value;
    
    if (salary == "all" && direction == "all" && vacancyActuality == "all")
    {
        $("#showFilteredVacanciesContainer").hide();
    }
    else
    {
        $("#showFilteredVacanciesContainer").show();
    
        var filterText = "Показывать только по условию: ";
        if (salary != "all")
            filterText += "зп от " + document.getElementById('salary').value + ", ";
        if (direction != "all")
            filterText += document.getElementById('directions').value + ", ";
        if (vacancyActuality != "all")
            filterText += "Актуальность " + document.getElementById('vacancyActuality').value     + ", ";
            
        document.getElementById('showFilteredVacanciesText').innerHTML = filterText;
        
        document.getElementById('showFilteredVacancies').onclick=function(){
            var firm = firms[firmIndex];
            
            var vacanciesHTML = generateVacanciesView(firm.Vacancies);
            document.getElementById('vacancies').innerHTML = vacanciesHTML;
	    }
    }

    $('#dataDetailsContainer').reveal();
};

function initGallery(firm){
    $("#gallery").galleria({
        data_source: firm.Photos,
        width: 530,
        height: 500,
        clicknext: true
    });
}

function generateEducationCenterView(educationCenterLink)
{
    var result = '';
    
    if (educationCenterLink != '')
    {
        result = '<a href="' + educationCenterLink + '"><img src="http://it.verych.ru/education.jpg"/><br>Центр обучения</a> ';
    }
    
    return result;
}

function getMinActialityDate(vacancyActuality)
{
    var currentDate = new Date();
    var minActialityDate = currentDate;
    if (vacancyActuality == 'Год')
        minActialityDate.setYear(currentDate.getYear() - 1);
    else if (vacancyActuality == '3 месяца')
        minActialityDate.setMonth(currentDate.getMonth() - 3);
    else if (vacancyActuality == 'Месяц')
        minActialityDate.setMonth(currentDate.getMonth() - 1);
    else if (vacancyActuality == 'Неделя')
        minActialityDate.setDate(currentDate.getDate() - 7);
    
    return minActialityDate;
}

function getVacancySalaryText(vacancy)
{
    var salary;
    if (vacancy.ExpectedSalary == '0')
    {
        salary = '';
    }
    else if (vacancy.MaxSalary == '0')
    {
        salary = 'от ' + vacancy.MinSalary + ' т.р.';
    }
    else if (vacancy.MinSalary == '0')
    {
        salary = 'до ' + vacancy.MaxSalary + ' т.р.';
    }
    else if (vacancy.MaxSalary > vacancy.MinSalary)
    {
        salary = vacancy.MinSalary + ' - ' + vacancy.MaxSalary + ' т.р.';
    }
    else 
    {
        salary = vacancy.ExpectedSalary + ' т.р.';
    }
    
    return salary;
}

function generateVacanciesView(items)
{
    var result = '<table id="vacancies" cellspacing="0" cellpadding="0">';
    result += '<thead><tr class ="even"><th>Языки платформы</th><th>Зарплата</th><th>Дата</th><th class="largeSizeColumn">Ссылки</th><th>Уровень</th></tr>';

    // Фильтрация вакансий
    var salary = document.getElementById('salary').value;
    var direction = document.getElementById('directions').value;
    var vacancyActuality = document.getElementById('vacancyActuality').value;
    
    var isShowAllVacancies = !document.getElementById('showFilteredVacancies').checked;
    
    var isSalaryNotMeans = salary == "all";
    var isDirectionNotMeans = direction == "all";
    var isVacancyActualityNotMeans = vacancyActuality == "all";
    
    var minActialityDate = getMinActialityDate(vacancyActuality);

    for (var i = 0; i < items.length; i++)
    {
        var vacancy = items[i];
        
        var isSalaryEquals = isSalaryEquals = isSalaryNotMeans || (vacancy.MinSalary > salary || (vacancy.ExpectedSalary != 0 && vacancy.ExpectedSalary > salary) || vacancy.MaxSalary > salary);
        var isDirectionEquals = isDirectionNotMeans || checkDirection(direction, vacancy.Directions);
        var isVacancyActual = isVacancyActualityNotMeans || minActialityDate < vacancy.PublishDate;
            
        if (isShowAllVacancies || (isSalaryEquals && isDirectionEquals && isVacancyActual))
        {
        }
        else
        {
            continue;
        }

        
        var salary = getVacancySalaryText(vacancy);
        
	    var colorStyle = i % 2 ? 'even' : 'odd';
        result += '<tr class="' + colorStyle +'">';
        result += '<td>' + generateUnorderedArrayView(vacancy.Directions) + '</td>';
        
        result += '<td>' + salary + '</td>';
        result += '<td>' + vacancy.PublishDate.toLocaleDateString() + '</td>';
        
        result += '<td class="largeSizeColumn">' + generateUnorderedArrayViewAsLinks(vacancy.Links) + '</td>';
        
        if (vacancy.Level != 'All')
        {
            result += '<td>' + vacancy.Level + '</td>';
        }
        else
        {
            result += '<td></td>';
        }

        result += '</tr>';
    }

    result += '</table>';
		
    return result;
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

function checkDirection(direction, directions)
{
    for (var i = 0; i < directions.length; i++)
    {
        if (directions[i] == direction)
            return true;
    }

    return false;
}

function doFilter(items)
{
    var result = [];

    var salary = document.getElementById('salary').value;
    var direction = document.getElementById('directions').value;
    var district = document.getElementById('district').value;
    var vacancyActuality = document.getElementById('vacancyActuality').value;
    
    var kikerInput = document.getElementById('kikerInput').checked;
    var tableTennisInput = document.getElementById('tableTennisInput').checked;
    var tableGamesInput = document.getElementById('tableGamesInput').checked;
    var languageInput = document.getElementById('languageInput').checked;
    var gamesInput = document.getElementById('gamesInput').checked;          
    var sportInput = document.getElementById('sportInput').checked;          
    var zabugorInput = document.getElementById('zabugorInput').checked;                

    var isSalaryNotMeans = salary == "all";
    var isDirectionNotMeans = direction == "all";
    var isDistrictNotMeans = district == "all";
    var isVacancyActualityNotMeans = vacancyActuality == "all";
    
    var minActialityDate = getMinActialityDate(vacancyActuality);

    for (var i = 0; i < items.length; i++)
    {    
        var firm = items[i];
        
        var isSalaryEquals = isSalaryNotMeans;
        var isDirectionEquals = isDirectionNotMeans;
        var isDistrictEquals = isDistrictNotMeans || district == firm.District;
        var isVacancyActual = isVacancyActualityNotMeans;
        var isBonusActual;
        
        if (!isDirectionEquals)
        {
            isDirectionEquals = checkDirection(direction, firm.Directions);
        }
    
        var isVacancyFilterPassed = firm.Vacancies.length == 0 && isVacancyActualityNotMeans && isSalaryNotMeans && isDirectionNotMeans;
        for (var j = 0; j < firm.Vacancies.length; j++)
        {
            var vacancy = firm.Vacancies[j];
            
            if (!isVacancyFilterPassed)
            {
                isVacancyFilterPassed = (isDirectionNotMeans || checkDirection(direction, vacancy.Directions)) &&
                    (isVacancyActualityNotMeans || minActialityDate < vacancy.PublishDate) &&
                    (isSalaryNotMeans || vacancy.MinSalary > salary || (vacancy.ExpectedSalary != 0 && vacancy.ExpectedSalary > salary) || vacancy.MaxSalary > salary);
            }
        }
        
        isBonusActual = (!tableTennisInput || tableTennisInput && firm.TableTennis) &&
            (!kikerInput || kikerInput && firm.Kiker) &&
            (!tableGamesInput || tableGamesInput && firm.TableGames) &&
            (!languageInput || languageInput && firm.English) &&
            (!gamesInput || gamesInput && firm.Games)&&
            (!sportInput || sportInput && firm.Sport)&&
            (!zabugorInput || zabugorInput && firm.Zabugor);
    
    
        if (isVacancyFilterPassed && isDistrictEquals && isBonusActual)
        {
            result.push(firm);
            setTimeout((function(firm, i){
                return function () {
                    var salaryCell = getSalaryValue(firm, salary, direction, vacancyActuality, minActialityDate);
                    document.getElementById('salaryCell' + i).innerHTML = salaryCell;
                };
	        })(firm, i),1);
        }
        else
        {
            result.push(null);
        }
    }

    return result;
}

function getSalaryValue(firm, salary, direction, vacancyActuality, minActialityDate)
{
    var salaryText = 'xз';

    var minSalary = 0;
    var maxSalary = 0;
    var avgSalary = 0;
    var absMax = 0;
    
    var isSalaryNotMeans = salary == "all";
    var isDirectionNotMeans = direction == "all";
    var isVacancyActualityNotMeans = vacancyActuality == "all";

    for (var j = 0; j < firm.Vacancies.length; j++) {
        var vacancy = firm.Vacancies[j];
        var isVacancyFilterPassed = (isDirectionNotMeans || checkDirection(direction, vacancy.Directions) &&
                    (isVacancyActualityNotMeans || minActialityDate < vacancy.PublishDate) &&
                    (isSalaryNotMeans || vacancy.MinSalary > salary || (vacancy.ExpectedSalary != 0 && vacancy.ExpectedSalary > salary) || vacancy.MaxSalary > salary));
        if (!isVacancyFilterPassed)
            continue;
                    
        if (minSalary == 0) {
            minSalary = vacancy.MinSalary;
        }
        else {
            minSalary = Math.min(minSalary, vacancy.MinSalary);
        }
        maxSalary = Math.max(maxSalary, vacancy.MaxSalary);
        avgSalary = Math.max(avgSalary, vacancy.ExpectedSalary);
    }

    if ((minSalary > 0) && (maxSalary > 0)) {
        salaryText = minSalary + ' &ndash; ' + maxSalary;
        absMax = maxSalary;
    }
    else if (minSalary > 0) {
        salaryText = minSalary + '++';
        absMax = minSalary;
    }
    else if (maxSalary > 0) {
        salaryText = '--' + maxSalary;
        absMax = maxSalary;
    }
    else if (avgSalary > 0) {
        salaryText = '~' + avgSalary;
        absMax = avgSalary;
    }
    
    salaryContainer = '<div><div absMax="' + absMax + '">' + salaryText + '</div></div>';
    
    return salaryContainer;
}

FirmsList.prototype.fill = function ()
{
    firms = doFilter(this.Items);
    var content = '<table class="tablesorter" id="firms" cellspacing="0" cellpadding="0">';

	content += '<thead>';
	content += '<tr class="even">';
	content += '<th class="smallSizeColumn firstColumn"></th>';
	content += '<th class="middleSizeColumn">' + 'Название' + '</th>';
	content += '<th class="middleSizeColumn ">' + 'ЗП' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Языки платформы' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Направления' + '</th>';
	content += '<th class="bigSizeIconColumn" colspan="10">Ссылки</th>';
	content += '<th class="lastHeaderColumn">' + 'Фото' + '</th>';
	content += '</tr>'; 
	content += '</thead>';
	
	
    var salary = document.getElementById('salary').value;
    var direction = document.getElementById('directions').value;
    var vacancyActuality = document.getElementById('vacancyActuality').value;    
    var minActialityDate = getMinActialityDate(vacancyActuality);

	var rowIndex = 0;
	for(var i = 0; i < firms.length; i++)
	{
	    var firm = firms[i];
	    if (firm == null)
	        continue;
	        
	    var colorStyle = rowIndex % 2 ? 'even' : 'odd';
	    rowIndex++;
	    var addr = '';
	    if (firm.AddressLink != '')
	    {
	        addr = '<a target="blank" href="' + firm.AddressLink + '"><img alt="' + firm.Name + '" class="smallSizeColumn" src="http://www.clker.com/cliparts/N/3/C/c/M/f/pin-point-location-marker-purple-md.png"></a>';
	    }
	    var name = firm.Name;

	    var salaryCell = getSalaryValue(firm, salary, direction, vacancyActuality, minActialityDate);

	    if (firm.OfficialSiteLink.length > 0)
	    {
	        name = '<a target="blank" href="' + firm.OfficialSiteLink + '">' + firm.Name + '</a>';
	    }

	    content += '<tr class="datarow ' + colorStyle + '" onclick="showDetails(' + i + ')";>';
	    content += '<td class="firstColumn smallSizeColumn">' + addr + '</td>';
	    content += '<td class="middleSizeColumn">' + name + '</td>';
	    content += '<td id="salaryCell' + i +'" class="middleSizeColumn">' + salaryCell + '</td>';

		content += '<td class="middleSizeColumn">' + generateSequenceDelimetedByComma(firm.Directions) + '</td>';		
		content += '<td class="bigSizeColumn">' + firm.Regions + '</td>';			
		content += addImageLink("middleSizeIconColumn", "imageLink", firm.ODeskLink, "http://www.crowdconf2010.com/images/oDeskimg2.png");
		content += addImageLink("middleSizeIconColumn", "imageLink", firm.LinkedInLink, "http://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/200px-LinkedIn_Logo.svg.png");
		content += addImageLink("middleSizeIconColumn", "imageLink", firm.MoiKrugLink, "http://magazeta.com/wp-content/uploads/2007/11/moikrug.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLink", firm.TwitterLink, "http://i1181.photobucket.com/albums/x427/kartnix/twitter-1.png");
		content += addImageLink("smallSizeIconColumn", "imageLink", firm.FacebookLink, "http://tb.ziareromania.ro/De-ce-nu-va-avea-Facebook-succes-in-China/7f66010028270c5649/240/0/1/70/De-ce-nu-va-avea-Facebook-succes-in-China.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLink", firm.VkontakteLink, "http://cs10305.vkontakte.ru/g31480263/e_0c89034a.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLink", firm.HeadHunterLink, "http://i.hh.ru/css/ambient/blocks/head/logo.png");
		content += addImageLink("middleSizeColumn", "imageLink", firm.EducationCenterLink, "http://it.verych.ru/education.jpg");
		content += addImageLink("middleSizeColumn", "imageLink", firm.VirtualTaganrogLink, "http://profile.ak.fbcdn.net/hprofile-ak-snc6/c0.0.160.160/p160x160/277137_209952092395461_4585352_n.jpg");

		if (firm.Videos == '')
		    content += '<td class="smallSizeIconColumn"></td>'; 
		else
			content += '<td class="smallSizeIconColumn"> <img class="smallSizeColumn" src="http://www.russia-on.ru/wp-content/uploads/2012/11/YouTube.jpg"></td>';	

		if (firm.Photos == '')
		    content += '<td class="lastHeaderColumn"></td>'; 
		else
			content += '<td class="lastHeaderColumn"> <img class="smallSizeColumn" src="http://iconizer.net/files/Mnml/orig/camera.png"></td>';		

		content += '</tr>'; 
	}

	content += '</table>'; 

	var dataListContainer = document.getElementById('dataListContainer');
	dataListContainer.innerHTML = content;

    //add sorter
	$('#firms').tablesorter({
	    // передаем аргументы для заголовков и назначаем объект 
	    headers: {
	        0: {
	            sorter: false
	        },
	        1: {
	            sorter: 'text',
	        },
	        2: {
	            sorter: 'salary',
	        },
	        3: {
	            sorter: 'text',
	        },
	        4: {
	            sorter: 'text',
	        },
	        5: {
	            sorter: false
	        },
	        6: {
	            sorter: false
	        }
        }
	});

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
