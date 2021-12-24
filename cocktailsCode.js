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
  	var alcoholicFilterContainer = document.getElementById('alcoholicFilter');
	var content = '';
    for (var i = 0; i < Alcoholic.length; i++)
    {
        content += '<input id="alcoholicFilter' + i +'" type="checkbox" onchange="showCocktailsList();" />\r\n';
        content += '<label for="alcoholicFilter' + i +'" onchange="showCocktailsList();" >' + Alcoholic[i].Name + '</label><br />';
    };
    
    alcoholicFilterContainer.innerHTML = alcoholicFilterContainer.innerHTML + content;
    
    AddIngredients("nonalcoholic");
    AddIngredients("juice");
    AddIngredients("fruit");
    AddIngredients("syrup");
    AddIngredients("ice");
    AddIngredients("sauce");
    AddIngredients("milk");
    AddIngredients("other");
    
    
 // addCustomSorters();
    showCocktailsList();
  
    //Galleria.loadTheme('galleria.simplecoding.js');
    //showDetailsByName(document.location.hash);
    //showDetails(4);
  
    //var gallery = $("#gallery");
});

function AddIngredients(ingredientType)
{
    var content = '';
	var container = document.getElementById(ingredientType + 'Filter');

    for (var i = 0; i < Ingredients.length; i++)
    {
        if (Ingredients[i].IngredientType == ingredientType)
        {
            content += '<input id="' + ingredientType + 'Filter' + i +'" type="checkbox" onchange="showCocktailsList();" />\r\n';
            content += '<label for="' + ingredientType + 'Filter' + i +'">' + Ingredients[i].Name + '</label><br />';
        }
    };
    
    container.innerHTML = container.innerHTML + content;
}

var cocktails;

function showCocktailsList()
{
    oCocktailsList =  new CocktailsList();
    oCocktailsList.fill();
}


function showDetailsByName(name)
{
    var index = -1;

    for (var i = 0; i < cocktails.length; i++) {
        if ("#" + cocktails[i].Name == name) {
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

function showDetails(cocktailIndex)
{
    if (cocktails.length < cocktailIndex)
        return;
    
    var cocktail = cocktails[cocktailIndex];
    $('#dataDetailsContainer').show();
    document.getElementById('cocktailname').innerHTML = cocktail.Name;
    
    if (cocktail.OfficialLogoLink != '')
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
        result = '<a href="' + educationCenterLink + '"><img src="http://trop-nikul.zao.mos.ru/upload/iblock/478/cwilbkbn.jpg"/><br>Центр обучения</a> ';
    }
    
    return result;
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

function generateCocktailParts(items)
{
    var result = '';
    
    if (items.length > 0)
    {
        for (var i = 0; i < items.length; i++)
        {
            result += items[i].Ingredients[0];
            for (var j = 1; j < items[i].Ingredients.length; j++)
            {
                result += '/ ' + items[i].Ingredients[j];
            }

            result += " " + items[i].Count + items[i].UnitType + '<br />';
        }
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

var alcoholicChecked;
var nonalcoholicChecked;
var juiceChecked;
var fruitChecked;
var syrupChecked;
var iceChecked;
var sauceChecked;
var milkChecked;
var otherChecked;

function doFilter(items)
{
    alcoholicChecked = pickChecked('alcoholic');
    nonalcoholicChecked = pickChecked('nonalcoholic');
    juiceChecked = pickChecked('juice');
    fruitChecked = pickChecked('fruit');
    syrupChecked = pickChecked('syrup');
    iceChecked = pickChecked('ice');
    sauceChecked = pickChecked('sauce');
    milkChecked = pickChecked('milk');
    otherChecked = pickChecked('other');
    
    var result = [];

    var ABV = document.getElementById('ABV').value;
    var constructionType = document.getElementById('constructionType').value;
    var bokal = document.getElementById('bokal').value;
    var cost = document.getElementById('cost').value;
    var time = document.getElementById('time').value;
    
    var burn = document.getElementById('burn').checked;
    var original = document.getElementById('original').checked;
    var visualeffect = document.getElementById('visualeffect').checked;          

    var isABVNotMeans = ABV == "all";
    var isConstructionTypeNotMeans = constructionType == "all";
    var isBokalNotMeans = bokal == "all";
    var isCostNotMeans = cost == "all";
    var isTimeNotMeans = time == "all";

    for (var i = 0; i < items.length; i++)
    {    
        var cocktail = items[i];
       
        var isABVEquals = isABVNotMeans;
        var isConstructionTypeEquals = isConstructionTypeNotMeans;
        var isBokalEquals = isBokalNotMeans;
        var isCostEquals = isCostNotMeans;
        var isTimeEquals = isTimeNotMeans;
        
        var isTopFilterEquals = (isABVNotMeans || ABV == cocktail.ABV) &&
            (isConstructionTypeNotMeans || constructionType == cocktail.ConstructionType) &&
            (isBokalNotMeans || bokal == cocktail.Bokal) &&
            (isCostNotMeans || cost == cocktail.Cost) &&
            (isTimeNotMeans || time == cocktail.Time) &&
            (!burn || burn && cocktail.Burn) &&
            (!original || original && cocktail.Original) &&
            (!visualeffect || visualeffect && cocktail.VisualEffect);
    
/* 
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
        
        isCheckedActual = (!burn || burn && cocktail.Burn) &&
            (!original || original && cocktail.Original) &&
            (!visualeffect || visualeffect && cocktail.VisualEffect);
    
    */
        var isMultiFilterPassed = CheckMultiFilter(cocktail, "alcoholic", this.Alcoholic, alcoholicChecked);
        var isMultiFilterPassed = isMultiFilterPassed && CheckMultiFilter(cocktail, "nonalcoholic", this.Ingredients, nonalcoholicChecked);
        var isMultiFilterPassed = isMultiFilterPassed && CheckMultiFilter(cocktail, "juice", this.Ingredients, juiceChecked);
        var isMultiFilterPassed = isMultiFilterPassed && CheckMultiFilter(cocktail, "fruit", this.Ingredients, fruitChecked);
        var isMultiFilterPassed = isMultiFilterPassed && CheckMultiFilter(cocktail, "syrup", this.Ingredients, syrupChecked);
        var isMultiFilterPassed = isMultiFilterPassed && CheckMultiFilter(cocktail, "ice", this.Ingredients, iceChecked);
        var isMultiFilterPassed = isMultiFilterPassed && CheckMultiFilter(cocktail, "sauce", this.Ingredients, sauceChecked);
        var isMultiFilterPassed = isMultiFilterPassed && CheckMultiFilter(cocktail, "milk", this.Ingredients, milkChecked);
        var isMultiFilterPassed = isMultiFilterPassed && CheckMultiFilter(cocktail, "other", this.Ingredients, otherChecked);
        
        if (isTopFilterEquals && isMultiFilterPassed)
        {
            result.push(cocktail);
            /*
            setTimeout((function(firm, i){
                return function () {
                    var salaryCell = getSalaryValue(firm, salary, direction, vacancyActuality, minActialityDate);
                    document.getElementById('salaryCell' + i).innerHTML = salaryCell;
                };
	        })(firm, i),1);*/
        }
        else
        {
            result.push(null);
        }
    }

    return result;
}

function pickChecked(filterType)
{
    var result = [];
    
    $('#' + filterType + 'Filter :input[type=checkbox]:checked').each(function() {
        result.push($(this).next().text());
    });
    
    return result;
}

function CheckMultiFilter(cocktail, filterType, data, checkedData)
{
    var filterTypeValue = document.getElementById(filterType + 'FilterType').value;
    
    if (filterTypeValue == "all")
        return true;

    if (checkedData.length == 0)
        return false;

    if (filterTypeValue == "contains")
    {
        return isFilteredByContains(cocktail, filterType, data, checkedData);
    }
    else if (filterTypeValue == "include")
    {
        return isFilteredByIncludeOnly(cocktail, filterType, data, checkedData);
    }
    else if (filterTypeValue == "includeatleastone")
    {
        return isFilteredByIncludesAtLeastOne(cocktail, filterType, data, checkedData);
    }
    else if (filterTypeValue == "notinclude")
    {
        return isFilteredByNotInclude(cocktail, filterType, data, checkedData);    
    }
    else if (filterTypeValue == "containswithout1")
    {
        return isFilteredByContainsWithout(cocktail, filterType, data, checkedData, 1);
    }
    else if (filterTypeValue == "containswithout2")
    {
        return isFilteredByContainsWithout(cocktail, filterType, data, checkedData, 2);
    }
    else 
    {
        alert('filter');
        return false;
    }
}

function isFilteredByContains(cocktail, filterType, data, checkedData)
{
    var isAtLeastOneIngredientFound = false;
    for (var i = 0; i < cocktail.CocktailParts.length; i++)
    {
        var cocktailPart = cocktail.CocktailParts[i];
        var isAtLeastOneChecked = -1;
        for (var j = 0; j < cocktailPart.Ingredients.length; j++)
        {
            var ingredient = cocktailPart.Ingredients[j];
            isAtLeastOneChecked = isIngredientChecked(ingredient, filterType, data, checkedData);
            
            if (isAtLeastOneChecked > -1)
                isAtLeastOneIngredientFound = true;
                
            if (isAtLeastOneChecked == 1)
                break;
        }

        if (isAtLeastOneChecked == 0)
            return false;
    }
    
    return isAtLeastOneIngredientFound;
}

function isFilteredByIncludeOnly(cocktail, filterType, data, checkedData)
{
    // Если по выбранному типу ингредиентов ничего не найдено. Например чекнута водка и не отобразились безалкогольные
    var isAtLeastOneIngredientFound = false;
    var foundComponentsCount = 0;
    
    for (var i = 0; i < cocktail.CocktailParts.length; i++)
    {
        var cocktailPart = cocktail.CocktailParts[i];
        var isAtLeastOneChecked = -1;
        for (var j = 0; j < cocktailPart.Ingredients.length; j++)
        {
            var ingredient = cocktailPart.Ingredients[j];
            isAtLeastOneChecked = isIngredientChecked(ingredient, filterType, data, checkedData);
            
            if (isAtLeastOneChecked > -1)
                isAtLeastOneIngredientFound = true;
            
            if (isAtLeastOneChecked == 1)
            {
                foundComponentsCount++;
                break;
            }
        }

        if (isAtLeastOneChecked == 0)
            return false;
    }
    
    return isAtLeastOneIngredientFound && foundComponentsCount == checkedData.length;
}

function isFilteredByIncludesAtLeastOne(cocktail, filterType, data, checkedData)
{
    var isFoundButNotChecked = false;
    
    for (var i = 0; i < cocktail.CocktailParts.length; i++)
    {
        var cocktailPart = cocktail.CocktailParts[i];
        for (var j = 0; j < cocktailPart.Ingredients.length; j++)
        {
            var ingredient = cocktailPart.Ingredients[j];
            var isAtLeastOneChecked = isIngredientChecked(ingredient, filterType, data, checkedData);
            if (isAtLeastOneChecked == 1)
                return true;
            else if (isFoundButNotChecked == 0)
                isFoundButNotChecked = true;
        }
    }
    
    return !isFoundButNotChecked;
}


function isFilteredByNotInclude(cocktail, filterType, data, checkedData)
{
    for (var i = 0; i < cocktail.CocktailParts.length; i++)
    {
        var cocktailPart = cocktail.CocktailParts[i];
        var isAtLeastOneChecked;
        for (var j = 0; j < cocktailPart.Ingredients.length; j++)
        {
            var ingredient = cocktailPart.Ingredients[j];
            isAtLeastOneChecked = isIngredientChecked(ingredient, filterType, data, checkedData);
            if (isAtLeastOneChecked != 1)
                break;
        }
            
        if (isAtLeastOneChecked == 1)
            return false;
    }
    
    return true;
}

function isFilteredByContainsWithout(cocktail, filterType, data, checkedData, withoutCount)
{
    var absentIngredientCount = 0;
    for (var i = 0; i < cocktail.CocktailParts.length; i++)
    {
        var cocktailPart = cocktail.CocktailParts[i];
        var isAtLeastOneChecked = -1;
        for (var j = 0; j < cocktailPart.Ingredients.length; j++)
        {
            var ingredient = cocktailPart.Ingredients[j];
            isAtLeastOneChecked = isIngredientChecked(ingredient, filterType, data, checkedData);
            if (isAtLeastOneChecked == 1)
                return true;
            else if (isAtLeastOneChecked == 0)
                break;
        }

        if (isAtLeastOneChecked == 0)
        {
            absentIngredientCount++;
            continue;
        }
    }
    
    return absentIngredientCount == withoutCount;
}        
        
function isIngredientChecked(ingredient, filterType, data, checkedData)
{
    for (var i = 0; i < data.length; i++)
    {
        if (data[i].IngredientType == filterType && data[i].Name == ingredient)
        {
            for (var j = 0; j < checkedData.length; j++)
            {
                if (checkedData[j] == ingredient)
                {
                    // Ingredient checked
                    return 1;
                }
            }
            
            // Ingredient not checked
            return 0;
        }
    }
    
    // Not found
    return -1;
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

CocktailsList.prototype.fill = function ()
{
    cocktails = doFilter(this.Items);
    var content = '<table class="tablesorter" id="cocktails" cellspacing="0" cellpadding="0">';

	content += '<thead class="fixedheader">';
	content += '<tr class="even">';
	content += '<th class="middleSizeColumn firstColumn">' + 'Название' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Фото' + '</th>';
	content += '<th class="largeSizeColumn">' + 'Состав' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Бокал' + '</th>';
	content += '<th class="middleSizeColumn">' + 'Метод' + '</th>';
	content += '<th class="smallSizeColumn">' + 'Крепость' + '</th>';
	content += '<th class="smallSizeColumn">' + 'Стоимость' + '</th>';
	content += '<th class="smallSizeColumn">' + 'Сложность и время приготовления' + '</th>';
	content += '<th class="bigSizeIconColumn">Рецепт</th>';
	content += '<th class="middleSizeColumn">Примечание</th>';
	content += '<th class="lastHeaderColumn">' + '' + '</th>';
	content += '</tr>'; 
	content += '</thead>';
	content += '<tbody style="overflow:scroll;">'; 
	/*
    var salary = document.getElementById('salary').value;
    var direction = document.getElementById('directions').value;
    var vacancyActuality = document.getElementById('vacancyActuality').value;    
    var minActialityDate = getMinActialityDate(vacancyActuality);
*/

	var rowIndex = 0;
	for(var i = 0; i < cocktails.length; i++)
	{
	    var cocktail = cocktails[i];
	    if (cocktail == null)
	        continue;
	        
	    var colorStyle = rowIndex % 2 ? 'even' : 'odd';
	    rowIndex++;
/*	    var addr = '';
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
		*/
		
		
	    content += '<tr class="datarow ' + colorStyle + '" onclick="showDetails(' + i + ');" style="height:100px;">';
	    content += '<td class="firstColumn middleSizeColumn"><a href="' + cocktail.URL + '">' + cocktail.Name + '</a></td>';
	    content += '<td class="middleSizeColumn"><img class="sizePhotoColumn" src="' + cocktail.PhotoUrl + '"></td>';
		content += '<td class="largeSizeColumn">' + generateCocktailParts(cocktail.CocktailParts) + '</td>';
		content += '<td class="middleSizeColumn">' + cocktail.Bokal + '</td>';
		content += '<td class="middleSizeColumn">' + cocktail.ConstructionType + '</td>';
		content += '<td class="smallSizeColumn">' + cocktail.ABV + '</td>';
		content += '<td class="smallSizeColumn">' + cocktail.CostStr + '</td>';
		content += '<td class="smallSizeColumn">' + 'ща забодяжу. как два дэша брызнуть' + '</td>';
		content += '<td class="bigSizeColumn">' + cocktail.Recipe + '</td>';
		
		var additional = '';
		if (cocktail.Burn)
		    additional += 'Горящий<br />'; 
		if (cocktail.Original)
		    additional += 'Оригинальная подача<br />'; 
		if (cocktail.VisualEffect)
		    additional += 'Эффектный<br />'; 
	    content += '<td class="middleSizeColumn">' + additional + '</td>';
	
	
		if (cocktail.VideoUrl != '')
		    content += '<td class="lastHeaderColumn smallSizeIconColumn"><a href="' + cocktail.VideoUrl +'"><img class="sizeVideoColumn" src="http://www.russia-on.ru/wp-content/uploads/2012/11/YouTube.jpg"></a></td>'; 
		else
		    content += '<td class="lastHeaderColumn smallSizeIconColumn"></td>'; 
		
		
		/*		
		content += addImageLink("middleSizeIconColumn", "imageLink", firm.ODeskLink, "http://www.crowdconf2010.com/images/oDeskimg2.png");
		content += addImageLink("middleSizeIconColumn", "imageLink", firm.LinkedInLink, "http://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/200px-LinkedIn_Logo.svg.png");
		content += addImageLink("middleSizeIconColumn", "imageLink", firm.MoiKrugLink, "http://magazeta.com/wp-content/uploads/2007/11/moikrug.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLink", firm.TwitterLink, "http://i1181.photobucket.com/albums/x427/kartnix/twitter-1.png");
		content += addImageLink("smallSizeIconColumn", "imageLink", firm.FacebookLink, "http://tb.ziareromania.ro/De-ce-nu-va-avea-Facebook-succes-in-China/7f66010028270c5649/240/0/1/70/De-ce-nu-va-avea-Facebook-succes-in-China.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLink", firm.VkontakteLink, "http://cs10305.vkontakte.ru/g31480263/e_0c89034a.jpg");
		content += addImageLink("smallSizeIconColumn", "imageLink", firm.HeadHunterLink, "http://i.hh.ru/css/ambient/blocks/head/logo.png");
		content += addImageLink("middleSizeColumn", "imageLink", firm.EducationCenterLink, "http://trop-nikul.zao.mos.ru/upload/iblock/478/cwilbkbn.jpg");
		content += addImageLink("bigSizeColumn", "imageLink", firm.VirtualTaganrogLink, "http://profile.ak.fbcdn.net/hprofile-ak-snc6/c0.0.160.160/p160x160/277137_209952092395461_4585352_n.jpg");

		if (firm.Videos == '')
		    content += '<td class="smallSizeIconColumn"></td>'; 
		else
			content += '<td class="smallSizeIconColumn"> <img class="smallSizeColumn" src="http://www.russia-on.ru/wp-content/uploads/2012/11/YouTube.jpg"></td>';	

		if (firm.Photos == '')
		    content += '<td class="lastHeaderColumn"></td>'; 
		else
			content += '<td class="lastHeaderColumn"> <img class="smallSizeColumn" src="http://iconizer.net/files/Mnml/orig/camera.png"></td>';		
*/
		content += '</tr>'; 
	}

	content += '</tbody></table>'; 

	var dataListContainer = document.getElementById('dataListContainer');
	dataListContainer.innerHTML = content;
/*
    //add sorter
	$('#cocktails').tablesorter({
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
*/
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
