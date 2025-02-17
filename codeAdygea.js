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
    //alert(Ingredients);
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
        $('#withAlcoholInput').attr("checked", "checked");;
    if (hash == "night")
        $('#nightInput').attr("checked", "checked");;

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

function showPlacesList() {
    oPlacesList = new PlacesList();
    oPlacesList.fill();
}


function showDetailsByName(name) {
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

function showDetails(placeIndex) {
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

    if (place.Photos.length > 0) {
        initGallery(place);
        $('#gallery').show();
    }
    else {
        $('#gallery').hide();
    }
    //debugger;
    document.location.href = document.location.pathname + "#" + place.Name;

    $('#dataDetailsContainer').reveal();
}

function initGallery(baza) {
    $("#gallery").galleria({
        data_source: baza.Photos,
        width: 530,
        height: 500,
        clicknext: true
    });
}

function generatePhotosView(items) {
    var result = '';

    for (var i = 0; i < 1 /*items.length*/; i++) {
        result += '<img class="officeImg" src="' + items[i] + '"><br>';
    }

    return result;
}

function generateSequenceDelimetedByComma(items) {
    var result = '';

    if (items.length > 0) {
        result += items[0];
        for (var i = 1; i < items.length; i++) {
            result += ', ' + items[i];
        }
    }

    return result;
}

function generateUnorderedArrayViewAsLinks(items) {
    var result = '<UL>';

    for (var i = 0; i < items.length; i++) {
        result += '<LI><a href="' + items[i] + '">' + items[i] + '</a></LI>';
    }
    result += '</UL>';

    return result;
}

function generateUnorderedArrayView(items) {
    var result = '<UL>';

    for (var i = 0; i < items.length; i++) {
        result += '<LI>' + items[i] + '</LI>';
    }
    result += '</UL>';

    return result;
}

IsCinemasLoaded = false;

function doFilter(items) {
    var result = [];

    var typeDosug = $("#typeDosug").val();
    var district = $("#district").val();
    var opening = document.getElementById('opening').value;
    var food = $("#food").val();
    var typeKafe = document.getElementById('typeKafe').value;
    var typeDelivery = document.getElementById('typeDelivery').value;

    var isWithAlcohol = document.getElementById('withAlcoholInput').checked;
    var isNight = document.getElementById('nightInput').checked;

    var isTypeDosugNotMeans = typeDosug == "all";
    var isOpeningNotMeans = opening == "all";
    var isDistrictNotMeans = district == "all";
    var isFoodNotMeans = food == "all" || (typeDosug != "Кафе" && typeDosug != "Ресторан");
    var isTypeKafeNotMeans = typeKafe == "all" || (typeDosug != "Кафе" && typeDosug != "Ресторан");
    var isTypeDeliveryNotMeans = typeDelivery == "all" || typeDosug != "Доставка";
    var isWithAlcoholNotMeans = !isWithAlcohol;
    var isNightNotMeans = !isNight;

    if (typeDosug == "Кинотеатр") {
        if (!IsCinemasLoaded) {
           // $('#kinocharly').attr('src', "http://www.kinocharly.ru/cinemas/60/");
           // $('#kinoneo').attr('src', "http://www.kinoneo.ru/schedule#all");
            IsCinemasLoaded = true;
        }

        //$('#kinocharly').show();
        //$('#kinoneo').show();
    }
    else {
        $('#kinocharly').hide();
        $('#kinoneo').hide();
    }

    if (typeDosug == "Доставка") {
        $('#deliveryFilter').show();
    }
    else {
        $('#deliveryFilter').hide();
    }

    var showFood = false;
    $('#typeDosug option:selected').each(function () {
        for (var dt = 0; dt < typeDosug.length; dt++)
            showFood = showFood || (this.value == "Кафе") || (this.value == "Ресторан");
    });
    if (showFood) {
        $('#kafeFilter').show();
        $('#foodFilter').show();
    }
    else {
        $('#kafeFilter').hide();
        $('#foodFilter').hide();
    }

    for (var i = 0; i < items.length; i++) {
        var place = items[i];

        var typeDosugMulty = false;
        $('#typeDosug option:selected').each(function () {
            for (var dt = 0; dt < place.DosugType.length; dt++)
                typeDosugMulty = typeDosugMulty || (this.value == place.DosugType[dt]);
        });
        var isTypeDosugEquals = typeDosugMulty || isTypeDosugNotMeans;

        var districtMulty = false;
        $('#district option:selected').each(function () {
            districtMulty = districtMulty || (this.value == place.District);
        });
        var isDistrictEquals = isDistrictNotMeans || district == place.District || districtMulty;
        var isOpeningEquals = isOpeningNotMeans;
        var isFoodEquals = isFoodNotMeans;
        var isTypeKafeEquals = isTypeKafeNotMeans;
        var isTypeDeliveryEquals = isTypeDeliveryNotMeans;
        var isWithAlcoholEquals = isWithAlcoholNotMeans;
        var isNightEquals = isNightNotMeans;


        //if (!isTypeDosugEquals) {
        //    isTypeDosugEquals = checkValues(typeDosug, place.DosugType);
        //}

        if ((typeDosug == "Кафе" || typeDosug == "Ресторан") && (!isFoodEquals || !isTypeKafeEquals)) {
            var typeFoodMulty = false;
            $('#food option:selected').each(function () {
                for (var dt = 0; dt < place.FoodType.length; dt++)
                    typeFoodMulty = typeFoodMulty || (this.value == place.FoodType[dt]);
            });
            var isFoodEquals = typeFoodMulty; // && isFoodNotMeans; ??????????
           /* if (!isTypeKafeEquals)
                isTypeKafeEquals = checkValues(typeKafe, place.TypeKafe);*/
        }
        if (typeDosug == "Доставка" && !isTypeDeliveryEquals) {
            isTypeDeliveryEquals = checkValues(typeDelivery, place.TypeDelivery);
        }

        if (opening != "all") {
            if (place.OpeningDate === undefined)
                continue;

            var filterDate = new Date();
            isOpeningEquals = opening == "0" && place.OpeningDate > filterDate;
            if (opening == "3")
                filterDate.setMonth(filterDate.getMonth() - 3);
            if (opening == "6")
                filterDate.setMonth(filterDate.getMonth() - 6);
            if (opening == "12")
                filterDate.setMonth(filterDate.getMonth() - 12);
            if (opening == "24")
                filterDate.setMonth(filterDate.getMonth() - 24);
            if (opening == "36")
                filterDate.setMonth(filterDate.getMonth() - 36);
            if (place.OpeningDate >= filterDate && new Date() > place.OpeningDate)
                isOpeningEquals = true;
        }

        if (!isWithAlcoholEquals) {
            isWithAlcoholEquals = place.WithAlcohol != '';
        }
        if (!isNightEquals) {
            isNightEquals = place.IsNight;
        }

        if (isTypeDosugEquals && isDistrictEquals && isOpeningEquals && isFoodEquals && isTypeKafeEquals && isTypeDeliveryEquals && isWithAlcoholEquals && isNightEquals)
            result.push(place);
    }

    return result;
}

function checkValues(value, values) {
    for (var i = 0; i < values.length; i++) {
        if (values[i] == value.replace("\\", ""))
            return true;
    }

    return false;
}

PlacesList.prototype.fill = function () {
    places = doFilter(this.Items);
    var content = '<table class="tablesorter" id="places" cellspacing="0" cellpadding="0">';

    var isKafe = document.getElementById('typeDosug').value == "Кафе" || document.getElementById('typeDosug').value == "Ресторан";
    var isDelivery = document.getElementById('typeDosug').value == "Доставка";
   // var isDetailed = document.getElementById('typeDosug').value != "all" && !isKafe && !isDelivery;
    var isBilliard = document.getElementById('typeDosug').value == "Бильярд";
    var isBath = document.getElementById('typeDosug').value == "Баня";
    var isSPA = document.getElementById('typeDosug').value == "Баня" || document.getElementById('typeDosug').value == "SPA";
    var isBanket = document.getElementById('typeDosug').value == "Банкетный зал";
    var isWithAlcohol = document.getElementById('withAlcoholInput').checked;

    content += '<thead>';
    content += '<tr class="even">';
    content += '<th class="" style="max-width:15px"></th>';
    content += '<th class="middleSizeColumn" style="text-align: left;">' + 'Название' + '</th>';
    content += '<th class="bigSizeIconColumn" colspan="8" style="text-align: left;">Ссылки</th>';
    content += '<th class="middleSizeColumn " style="text-align: left;">' + 'Адрес' + '</th>';
    content += '<th class="middleSizeColumn" style="text-align: left;">' + 'Контакты' + '</th>';
    //content += '<th class="middleSizeColumn">' + 'Категория' + '</th>';
    //content += '<th class="middleSizeColumn">' + 'Стоимость' + '</th>';
    content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Тип' + '</th>';
    content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Время работы' + '</th>';
    content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Услуги' + '</th>';
    if (isKafe) {
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Кухня' + '</th>';
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Средний чек' + '</th>';
    }
    if (isDelivery) {
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Доставка' + '</th>';
    }
    /*if (isDetailed) {
        content += '<th class="lastHeaderColumn">' + '' + '</th>';
    }*/
    if (isBilliard) {
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Бильярд' + '</th>';
    }
    if (isBath) {
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Баня' + '</th>';
    }
    if (isSPA) {
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Баня' + '</th>';
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'SPA и Термальные Источники' + '</th>';
    }
    if (isBanket) {
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Зал' + '</th>';
    }
    if (isWithAlcohol) {
        content += '<th class="lastHeaderColumn" style="text-align: left;">' + 'Со своим' + '</th>';
    }
    content += '</tr>';
    content += '</thead>';

    var rowIndex = 0;
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        if (place == null)
            continue;

        var colorStyle = rowIndex % 2 ? 'even' : 'odd';
        rowIndex++;
        var addr = '';
        if (place.AddressLink != '') {
            addr = '<a target="blank" href="' + place.AddressLink + '"><img alt="' + place.Name + '" class="smallSizeColumn" src="http://www.clker.com/cliparts/N/3/C/c/M/f/pin-point-location-marker-purple-md.png"></a>';
        }
        var name = place.Name;

        if (place.OfSiteLink.length > 0) {
            name = '<a target="blank" href="' + place.OfSiteLink + '">' + place.Name + '</a>';
        }

        content += '<tr class="datarow ' + colorStyle + '"";>';
        content += '<td class="" style="max-width:15px">' + addr + '</td>';
        content += '<td class="middleSizeColumn">' + name + '</td>';

        content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.VkontakteLink, "https://bobr.by/data/internet95.gif");
        content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.TripadvisorLink, "https://www.clipartmax.com/png/middle/109-1095841_testimonial-avatar-tripadvisor-icon.png");
        content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.InstaLink, "https://bikeparkatuitsig.co.za/wp-content/uploads/2016/03/instagram-logo.png");
        content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.ZoonLink, "https://rostov.zoon.ru/images/logo.svg");
        content += addImageLink("smallSizeIconColumn", "imageLinkWidth", "https://untappd.com/" + place.UntappdLink, "https://avatars.mds.yandex.net/get-entity_search/26124/197671017/S122x122Fit_2x");
        /*content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.UgostiLink, "https://lh6.ggpht.com/TYwsfAVYqlG8QRvTUDS2S3oFH-eK5t6UR5u4ixSbwupjk97IbSSq0fFkwnUAfGxM-GwA=w300");
        content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.FoursquareLink, "http://www.google.com/s2/favicons?domain=https://ru.foursquare.com/");
        content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.TraveltipzLink, "http://www.google.com/s2/favicons?domain=http://traveltipz.ru/");
        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.KafeTaganrogLink, "https://www.google.com/s2/favicons?domain=http://kafe-taganrog.ru");
        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.SpravkerLink, "http://www.google.com/s2/favicons?domain=taganrog.spravker.ru/");
        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.InfotaganrogLink, "https://www.google.com/s2/favicons?domain=http://www.infotaganrog.ru");
        content += addImageLink("middleSizeColumn", "imageLinkWidth", place.VirtualTaganrogLink, "http://profile.ak.fbcdn.net/hprofile-ak-snc6/c0.0.160.160/p160x160/277137_209952092395461_4585352_n.jpg");
        content += addImageLink("smallSizeIconColumn", "imageLinkWidth", place.LocalwayLink, "https://www.google.com/s2/favicons?domain=http://localway.ru");

        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.Video, "http://www.russia-on.ru/wp-content/uploads/2012/11/YouTube.jpg");
        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.UniquePhotoLink, "http://iconizer.net/files/Mnml/orig/camera.png");*/

		/*if (baza.Photos == '')
		    content += '<td class="lastHeaderColumn"></td>'; 
		else
			content += '<td class="lastHeaderColumn"> <img class="imageLinkWidth" src="http://iconizer.net/files/Mnml/orig/camera.png"></td>';
			*/

        /*content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.WineLink, "https://avatanplus.com/files/resources/small/57377ac05ab2b154b0b77f74.png");
        */content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.BeerLink, "https://data.ac-illust.com/data/thumbnails/0b/0bc3ba31ac50a6bc912dfb118ade6405_t.jpeg");
        /*content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.CocktailsLink, "https://image.flaticon.com/icons/png/512/281/281638.png");
        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.TeeLink, "https://i.dlpng.com/static/png/297050_thumb.png");
        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.CoffeeLink, "https://image.freepik.com/free-icon/no-translate-detected_318-114790.jpg");*/
        content += '<td>';
        if (place.MenuLink)
            content += '<a target="blank" href="' + place.MenuLink + '">Меню</a>';

        content += addImageLink("middleSizeIconColumn", "imageLinkWidth", place.CameraLink, "https://2.bp.blogspot.com/-AcRzGZLTxJc/W7I0KWRgJFI/AAAAAAAAALo/IFVr-v1Gq1cPxed8mxmAkNC1PCYxvaCTQCK4BGAYYCw/s1600/camera_web.png");
        content += '</td>';

        //content += '<td class="lastHeaderColumn">' + place.Photos.length + " фото" +'</td>'; 		

        content += '<td class="middleSizeColumn">' + place.Address + '</td>';
        content += '<td class="middleSizeColumn">' + place.Phones + '</td>';
        content += '<td class="middleSizeColumn">' + getValues(place.DosugType) + '</td>';

        content += '<td class="middleSizeColumn">' + place.WorkTime + '</td>';
        if (isBanket) {
            content += '<td class="lastHeaderColumn">' + getValues(place.Capacity) + '</td>';
        }

        content += '<td class="middleSizeColumn">' + place.Services + '</td>';
        if (isKafe) {
            content += '<td class="middleSizeColumn">' + getValues(place.FoodType) + '</td>';
            content += '<td class="middleSizeColumn">' + place.AverageBill + '</td>';
        }
        if (isDelivery) {
            content += '<td class="middleSizeColumn">' + getValues(place.TypeDelivery) + '</td>';
        }
        /*if (isDetailed) {
            content += '<td class="lastHeaderColumn">' + place.AdditionalInfo + '</td>';
        }*/
        if (isBilliard) {
            content += '<td class="lastHeaderColumn">' + getValues(place.BilliardType) + '</td>';
        }
        if (isBath) {
            content += '<td class="lastHeaderColumn">' + getValues(place.BathType) + '</td>';
        }
        if (isSPA) {
            content += '<td class="middleSizeColumn">' + getValues(place.BathType) + '</td>';
            content += '<td class="lastHeaderColumn">' + getValues(place.SPAType) + '</td>';
        }
        if (isWithAlcohol) {
            content += '<th class="lastHeaderColumn">' + place.WithAlcohol + '</th>';
        }

        content += '</tr>';
    }

    content += '</table>';

    var dataListContainer = document.getElementById('dataListContainer');
    dataListContainer.innerHTML = content;
}

function getValues(values) {
    var result = '';
    for (var i = 0; i < values.length; i++) {
        if (i != 0)
            result += '<br/>';

        result += values[i];
    }
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

function getBonusText(placeBonus, bonusText) {
    var result = '';
    if (placeBonus)
        result = bonusText + "<br>";
    return result;
}


function addImageLink(tdClass, imageClass, link, imageLink) {
    var result;
    if (link != '')
        result = '<td class="' + tdClass + '"><a target="blank" href="' + link + '"/><img class="' + imageClass + '" src="' + imageLink + '"></img></a></td>';
    else
        result = '<td class="' + tdClass + '"></td>';
    return result;
}