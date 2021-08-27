/*icons*/
(function(d){var c="#c41508";var _arr=[{r:"shortcut icon",t:"image/x-icon",s:"",h:"https://lobe-dev-web01.squiz.cloud/__data/assets/file/0022/1957/favicon.ico"},{r:"apple-touch-icon",t:"image/png",s:"",h:"https://lobe-dev-web01.squiz.cloud/__data/assets/image/0016/1951/apple-touch-icon.png"},{r:"icon",t:"image/png",s:"32x32",h:"https://lobe-dev-web01.squiz.cloud/__data/assets/image/0019/1954/favicon-32x32.png"},{r:"icon",t:"image/png",s:"16x16",h:"https://lobe-dev-web01.squiz.cloud/__data/assets/image/0018/1953/favicon-16x16.png"},{r:"mask-icon",t:"image/svg+xml",s:"",h:"https://lobe-dev-web01.squiz.cloud/__data/assets/file/0021/1956/safari-pinned-tab.svg"}];for(i=0;i<_arr.length;i++){var link=d.createElement('link');link.rel=_arr[i].r;link.type=_arr[i].t;if(_arr[i].s!==''){link.sizes=_arr[i].s;}d.getElementsByTagName('head')[0].appendChild(link);link.href=_arr[i].h;if(_arr[i].r=='mask-icon'){link.setAttribute('color',c);}}})(document);
/*/icons*/
/**
=====================================
        Google Tag Manager - START
=====================================
**/
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})
(window,document,'script','dataLayer','GTM-N36QQRP');
/**
=====================================
        Google Tag Manager - END
=====================================
**/

/**
=====================================
        ACCORDION - START
=====================================
**/
function addAccordion(){
	console.log('accordion has started');
	var elements = $('.accordion');
	for (var i = 0; i < elements.length; i++) {
	    var element = elements[i];
	    var search_widget_name = $(element).find('fieldset[data-type="search"]').data('field');
	    var label;

	    if (search_widget_name.toLowerCase().indexOf("customer") >= 0) {
		label = "individual";
	    }
	    else if (search_widget_name.toLowerCase().indexOf("organization") >= 0) {
		label = "organization";
	    }
	    else if (search_widget_name.toLowerCase().indexOf("property") >= 0) {
		label = "property";
	    }
	    else {
		label = "street";
	    }

	    $(element).find('fieldset[data-type="search"]').wrap('<div class="accordion_container" data-for="' + search_widget_name + '"></div>');

	    $('.accordion_container[data-for="' + search_widget_name + '"]').prepend('<label class="accordion_label" data-for="' + search_widget_name + '">Search for ' + label + '</label>');

	    $(element).find('fieldset[data-type="search"]').wrap('<div class="accordion_content" data-for="' + search_widget_name + '" style></div>');

	    $('.accordion_label[data-for="' + search_widget_name + '"]').click(function () {
		$(this).toggleClass("closed");
		var data = $(this).data('for');
		var isClosed = $(this).hasClass('closed');
		if (isClosed) {
		    $('.accordion_content[data-for="' + data + '"]').hide();
		} else {
		    $('.accordion_content[data-for="' + data + '"]').show();
		}
	    });
	}
	if (KDF.getVal('txt_customer_id') !== '' && typeof KDF.getParams().customerid !== 'undefined') {
		$('.accordion_label[data-for="dform_widget_cs_customer_search_id"]').click();
// 		$('.accordion_label[data-for="dform_widget_ps_citizen_property_search_id"]').click();
	}
}//end addAccordion
/**
=====================================
        ACCORDION - END
=====================================
**/
/** 
=====================================
            STYLING - START
=====================================
**/

function toggleDebugStyle(){debugStyle = !debugStyle;} var debugStyle = false;
/*  //KS: put in _KDF_ready - uses all the reccomended styles - can add optional
applyStyle(['recommended']);
//KS: see 'Non-recommended defaults' within 'defaultNewStyle(elements)' for optional defaults */
function commonRegex() {
    //regexSearch("[0-9A-Za-z ]{2,}");
	regexSearch('[0-9A-Za-z ]{2,}', '.dform_widget_searchfield.txt-gov [data-customalias="name"]');
    regexSearch('[0-9A-Za-z ]{1,}',
        '.dform_widget_searchfield.txt-gov [data-customalias="forename"]');
    //regexSearch('^(EN|en|eN|En|N|n)[A-Za-z0-9 \\s]{0,6}$', '[name="txt_postcode"] input');
    //regexSearch('^(EN|en|eN|En|N|n)[A-Za-z0-9 \\s]{0,6}$', '.dform_widget_searchfield.txt-gov [data-customalias="postcode"]');//KS: Fikri to provide a more comprehensive version

	/*/KS: to quickly chnage the create new individual validation
	regexSearch('^([0-9A-Za-z ]{0,})(\S{1}$)',
		    '#dform_widget_txt_c_forename, #dform_widget_txt_c_addressnumber');
	regexSearch('^([0-9A-Za-z][0-9A-Za-z ]{0,})(\S{1}$)',
		    '#dform_widget_txt_c_surname, #dform_widget_txt_c_addressline1, #dform_widget_txt_c_town');
	regexSearch('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$',
		    '#dform_widget_txt_c_postcode');
	regexSearch('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
		    '#dform_widget_eml_c_email');
	regexSearch('^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$',
		    '#dform_widget_tel_c_telephone');*/
}

function defineDefaultStyle() {	
	/*CEC Accessibility Issue Fixing*/
	replaceHeader('header1','h1');
	replaceHeader('header2','h2');
	replaceHeader('header3','h3');
	replaceHeader('header4','h4');
	replaceHeader('header5','h5');
	replaceHeader('header6','h6');
	
	updateCPETitle();
	addAutoComplete();
	toggleNavigation();
	
    //KS: can define listeners here, but can't later on, need to call 
    //KS: adds the recommended default styling - and acts a single location to change them
    //KS: for the love of StackExchange don't put 'all' or 'recommended' in here
    var recommended = [
        'mchk', 'chk', 'rad', 'txt', 'dt', 'eml', 'num', 'pas', 'tel', 'time', 'txta', 'sel', 'file', 'btn', 'search', 'highlightRequired', 'search-no-results', 'field-label-right-align', 'txta-length', 'txta-length-listener', 'detailToggle', 'noResultsFound', 'selectResult', 'txt-enter-trigger-btn'
		, 'search-empty-search'
    ];
    if (debugStyle) console.debug('@defineDefaultStyle() the defined recommended styles that will be used [' + recommended.toString() + ']')
    defaultNewStyle(recommended);
    //KS: trigger: '_style_defultsProvided, [arrayOfRecomendedStyles]'
    $(formName()).trigger('_style_defultsProvided', [recommended]);
}

function defaultNewStyle(elements) {
    //KS: adds styling to elemnts in an inefficent mannor but without the need to access custom.css
    //KS: adds the classes that are used for styling as well as for indication where functionility should be added in applyNewStyle
    if (elements === null) {
        return "Not valid - valid elements are ['mchk', 'chk', 'rad', 'txt', 'dt', 'eml', 'num', 'pas', 'tel', 'time', 'txta', 'sel', 'file', 'btn', 'txta-length','search','highlightRequired', 'file-progress',  'txt-no-min-height',  'sel-fill']";
    }
    if (elements == "all" || elements == "recommended") {
        //KS: adds the recommended default styling
        defineDefaultStyle();
        return;
    } else {
        /*TODO
        Add file-limt-#
        */
        elements.forEach(function (element) {
            var validStyle = true;
            switch (element) {
                case "all":
                case "recommended":
                    validStyle = false;
                    defineDefaultStyle();
                    break;
                case "mchk": $("[data-type='multicheckbox']").addClass('mchk-gov'); break;
                case "chk": $("[data-type='checkbox']").addClass('chk-gov'); break;
                case "rad": $("[data-type='radio']").addClass('rad-gov'); break;
                case "txt": $("[data-type='text']").addClass('txt-gov'); break;
                case "dt": $("[data-type='date']").addClass('dt-gov'); break;
                case "eml": $("[data-type='email']").addClass('eml-gov'); break;
                case "num": $("[data-type='number']").addClass('num-gov'); break;
                case "pas": $("[data-type='password']").addClass('pas-gov'); break;
                case "tel": $("[data-type='tel']").addClass('tel-gov'); break;
                case "time": $("[data-type='time']").addClass('time-gov'); break;
                case "txta": $("[data-type='textarea']").addClass('txta-gov'); break;
                case "sel": 
			$("[data-type='select']").addClass('sel-gov');
			break;
                case "file": $("[data-type='file']").addClass('file-gov'); break;
                case "btn": $("[data-type='button']").addClass('btn-gov'); break;
                case "search": $(".dform_widget_type_search").addClass('search-gov'); break;

                case "txta-length"://KS: allows optout of the maxchar feature as default
                    $("[data-type='textarea'] > div:last-child").addClass('txta-length');
                    break;
                case "highlightRequired"://KS: Ruths code to add required star
                    highlightRequired();
                    break;
                case "field-label-right-align"://KS: huge selector used to 
                    $(getFieldsLabels('left')).parent().parent().addClass('text-align-right');
                    break;

                //KS: Non-recommended defaults below
                case "sel-fill"://KS: mostly just an example of how to add optional default styles
                    $("[data-type='select']").addClass('sel-fill');
                    break;
                case "file-progress"://KS: add back the progress bar
                    $("[data-type='file']").addClass('file-progress');
                    break;
                case "txt-no-min-height"://KS: bobs request to remove margin on hidden left feilds
                    $("[data-type='text']").addClass('txt-no-min-height');
                    break;
                case "field-mob"://KS: 
                    $("[type='text'], [type='date'], [type='email'], [type='number'], [type='password'], [type='tel'], [type='time'], [type='textarea']").addClass('field-mob');
                    break;
                case "search-no-results":
                    $('.dform_widget_type_search').addClass('search-no-results');
                    break;

                case "rad-margin-8": $("[data-type='radio']").addClass('rad-margin-8'); break;
                case "mchk-margin-8": $("[data-type='multicheckbox']").addClass('mchk-margin-8'); break;
                case "btn-margin-8": $(".dform_widget_type_button").addClass('btn-margin-8'); break;
                case "rad-margin-16": $("[data-type='radio']").addClass('rad-margin-16'); break;
                case "mchk-margin-16": $("[data-type='multicheckbox']").addClass('mchk-margin-16'); break;
                case "btn-margin-16": $(".dform_widget_type_button").addClass('btn-margin-16'); break;
                case "rad-margin-25": $("[data-type='radio']").addClass('rad-margin-25'); break;
                case "mchk-margin-25": $("[data-type='multicheckbox']").addClass('mchk-margin-25'); break;
                case "btn-margin-25": $(".dform_widget_type_button").addClass('btn-margin-25'); break;
                case "rad-margin-33": $("[data-type='radio']").addClass('rad-margin-33'); break;
                case "mchk-margin-33": $("[data-type='multicheckbox']").addClass('mchk-margin-33'); break;
                case "btn-margin-33": $(".dform_widget_type_button").addClass('btn-margin-33'); break;
                case "rad-margin-41": $("[data-type='radio']").addClass('rad-margin-41'); break;
                case "mchk-margin-41": $("[data-type='multicheckbox']").addClass('mchk-margin-41'); break;
                case "btn-margin-41": $(".dform_widget_type_button").addClass('btn-margin-41'); break;
                case "rad-margin-50": $("[data-type='radio']").addClass('rad-margin-50'); break;
                case "mchk-margin-50": $("[data-type='multicheckbox']").addClass('mchk-margin-50'); break;
                case "btn-margin-50": $(".dform_widget_type_button").addClass('btn-margin-50'); break;
                case "rad-margin-58": $("[data-type='radio']").addClass('rad-margin-58'); break;
                case "mchk-margin-58": $("[data-type='multicheckbox']").addClass('mchk-margin-58'); break;
                case "btn-margin-58": $(".dform_widget_type_button").addClass('btn-margin-58'); break;
                case "rad-margin-66": $("[data-type='radio']").addClass('rad-margin-66'); break;
                case "mchk-margin-66": $("[data-type='multicheckbox']").addClass('mchk-margin-66'); break;
                case "btn-margin-66": $(".dform_widget_type_button").addClass('btn-margin-66'); break;
                case "rad-margin-75": $("[data-type='radio']").addClass('rad-margin-75'); break;
                case "mchk-margin-75": $("[data-type='multicheckbox']").addClass('mchk-margin-75'); break;
                case "btn-margin-75": $(".dform_widget_type_button").addClass('btn-margin-75'); break;
                case "rad-margin-83": $("[data-type='radio']").addClass('rad-margin-83'); break;
                case "mchk-margin-83": $("[data-type='multicheckbox']").addClass('mchk-margin-83'); break;
                case "btn-margin-83": $(".dform_widget_type_button").addClass('btn-margin-83'); break;
                case "rad-margin-91": $("[data-type='radio']").addClass('rad-margin-91'); break;
                case "mchk-margin-91": $("[data-type='multicheckbox']").addClass('mchk-margin-91'); break;
                case "btn-margin-91": $(".dform_widget_type_button").addClass('btn-margin-91'); break;

                case "field-text-align-left":
                    $("[type='text'], [type='date'], [type='email'], [type='number'], [type='password'], [type='tel'], [type='time']").addClass('text-align-left');
                    break;
                case "rad-text-align-left":
                    $("[data-type='multicheckbox']").addClass('text-align-left');
                    break;
                case "mchk-text-align-left":
                    $("[data-type='radio']").addClass('text-align-left');
                    break;
                case "field-text-align-center":
                    $("[type='text'], [type='date'], [type='email'], [type='number'], [type='password'], [type='tel'], [type='time']").addClass('text-align-center');
                    break;
                case "rad-text-align-center":
                    $("[data-type='multicheckbox']").addClass('text-align-center');
                    break;
                case "mchk-text-align-center":
                    $("[data-type='radio']").addClass('text-align-center');
                    break;
                case "rad-text-align-right":
                    $("[data-type='multicheckbox']").addClass('text-align-right');
                    break;
                case "mchk-text-align-right":
                    $("[data-type='radio']").addClass('text-align-right');
                    break;
                case "field-text-align-right":
                    $("[data-type='text'], [data-type='date'], [data-type='email'], [data-type='number'], [data-type='password'], [data-type='tel'], [data-type='time']").addClass('text-align-right');
                    break;
                //KS: LISTENERS - if after _KDF_ready, apply them with addStyleListeners(['a_listenerFunctions_property','it_supports_lists'])
                case 'txta-length-listener':
                    listenerFunctions['txta-length-listener']();
                    break;
                case 'detailToggle':
                    listenerFunctions['detailToggle']();
                    break;
                case 'noResultsFound':
                    listenerFunctions['noResultsFound']();
                    break;
                case 'selectResult':
                    listenerFunctions['selectResult']();
                    break;
                case 'txt-enter-trigger-btn':
                    listenerFunctions['txt-enter-trigger-btn']();
                    break;
                case'search-empty-search':
              			listenerFunctions['search-empty-search']()
              			break;
                default:
                    validStyle = false;
            }
            if (validStyle) {
                //KS: trigger: '_style_classOfOptionAdded, [optionName]'
                $(formName()).trigger('_style_classOfOptionAdded', [element]);
            }

        });
    }
}
function applyNewStyle() {
    //KS: since there is no overloading in JS - this is an alternitive
    var hasDefaultsInArguments = (typeof arguments[0] !== "undefined" && Array.isArray(arguments[0]));
    if (hasDefaultsInArguments) {
        if (debugStyle) console.debug('@applyNewStyle() since this was passed an array, will call defaultNewStyle() to add classes to relevent objects before continuing');
        //KS: i.e. if there is an array
        defaultNewStyle(arguments[0])
    }
    //KS: code for controlling what gets updated
    //KS: it's the JQuery selector then the function name from updateStyleFunctions that should be applied 
    //KS:- if there is no function name the it presumes the function name is the selector excluding the first (.)
    var elementsToUpdate = [
        //KS: single class name
        ['.rad-gov'], ['.chk-gov'], ['.mchk-gov'], ['.warning-notice'], ['.info-notice'], ['.txta-gov'], ['.file-gov'], ['.search-gov'], ['.detail-gov'], ['.search-no-results'],
	['.required-notice'], ['.sel-gov'],
        //KS: grouped class names
        ['.file-gov[class*="file-limit-"]','file-limit'],
        ['[data-type="text"] div:first-child .dform_hidden','txt-hidden'],
        ['.mchk-gov[class*="mchk-margin-"]','mchk-margin'],
        ['.rad-gov[class*="rad-margin-"]','rad-margin'],
    ];
    if (debugStyle) console.debug('@applyNewStyle() the list classes used as the selector and the name of the function are: '+JSON.stringify(elementsToUpdate))
    elementsToUpdate.forEach(function(item){
        var elements = $(item[0]);
        if (elements.length > 0){//KS: skip if none selected - improve performance
            if (item.length == 1){//KS: presumed the selector is the function name (with first '.' removed)
                updateStyle(elements, item[0].replace('.', ''));
            }else{//KS: the selector 
                updateStyle(elements, item[1]);
            }
        }
    });
	
	//KS: needs to be applied after styles are added
	commonRegex();
	
	//KS: trigger: '_style_styleApplied, [elementSelectorsUsed, hadDefaultsInArray]'
	$(formName()).trigger('_style_styleApplied',[elementsToUpdate, (hasDefaultsInArguments) ? arguments[0] : false]);
}


function applyNewerStyle(elements) { updateStyle(elements); }//KS: backwards compatability
function updateStyle(elements, optionalName) {
    //KS: used to apply the JS side of the new styles to elements
    //KS: call directly after _KDF_ready if you need to add the style JS to a new/chnaged element (like after adding a check in a rad)
    $.each(elements, function() {
        individualApplyStyle($(this), optionalName);
    });
	//KS: trigger: '_style_updateStyleDone, [elements, optionalName]'
	$(formName()).trigger('_style_updateStyleDone
