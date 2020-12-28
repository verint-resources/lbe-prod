 var target_tab_selector;

//Live chat
(function() {
    var se = document.createElement('script');
    se.type = 'text/javascript';
    se.async = true;
    se.src = '//storage.googleapis.com/snapengage-eu/js/3814bfa5-90f5-46df-8c6b-5b79156b1aa9.js';
    var done = false;
    se.onload = se.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true;
        /* Place your SnapEngage JS API code below */
        /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
      }
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(se, s);
  })();
//Live chat 
 
//Rate this page 
function showDoorbellModal() 
{ doorbell.show(); // The doorbell object gets created by the doorbell.js script 
} 
window.doorbellOptions = {
        id: '1608',
        appKey: '19OAfQTCoxmEYMi9eKo5tu88vwgOcrwEGCH1v2de3msWiGkH5tgu2dhaSv8MU4uj',
        hideButton: true
    };
    (function(w, d, t) {
        var hasLoaded = false;
        function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/'+window.doorbellOptions['id']+'?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); }
        if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); }
        if (d.readyState == 'complete') { l(); }
    }(window, document, 'script'));
//Rate this page 

//Language translate  
function googleTranslateElementInit() {
    if ($(window).width() < 991) {
      var layout_responsive = google.translate.TranslateElement.InlineLayout.HORIZONTAL;
    } else {
      var layout_responsive = google.translate.TranslateElement.InlineLayout.SIMPLE;
    }
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      autoDisplay: false,
      gaTrack: true,
      gaId: 'UA-9328688-1',
      layout: layout_responsive
    }, 'google_translate_element');
}
//Language translate  

//Swiftype search engine
(function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
  (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
  e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
  })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');
  
  _st('install','N-e4hyfg25R5-TsUEJ8z','2.0.0');
//Swiftype search engine

//Current year in footer  		
$(window).on('load', function () {
	//add placeholder text to the search box
	var dteNow = new Date(); 
	var intYear = dteNow.getFullYear(); 
	$('#currentYear').html(intYear);
});
//Current year in footer  
 
$(document).ready(function() {
	
	var includes = $('[data-include]');
	jQuery.each(includes, function(){
		var file = 'EnfieldSkinPack/'+$(this).data('include') + '.txt';
		$(this).load(file);
	});
	
    if ($(window).width() < 991) {
      $("#google_translate_element").prependTo("#mobile_google_translate");
    }
	
    $('.mobile_google_translate').click(function(e) {
      e.stopPropagation();
    });
	
	//back to top
	$('#back-to-top').click(function (e) {
		console.log("inside back to top click");
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop:0
		}, 1000);
	});

	//Tab code: new design
	//tab click
	$('.nav-tabs a').click(function (e) {
		console.log("inside nav tab click")
		if ($(".newtabbedcontent").length > 0) {
			target_tab_selector = $(this).attr('href');
			location.hash = $(target_tab_selector).attr('id');
		}
	});

	//accordion show
	$('#accordion').on('show.bs.collapse', function (e) {
		if ($(".newtabbedcontent").length > 0) {
			$(e.target).prev('.panel-heading').addClass('active');
			location.hash = $(e.target).attr('id');
		}
	});

	//accordion hide
	$('#accordion').on('hide.bs.collapse', function (e) {
		if ($(".newtabbedcontent").length > 0) {
			$(e.target).prev('.panel-heading').removeClass('active');
		}
	});
});


$(document).scroll(function () {
	var y = $(this).scrollTop();
	if (y > 25) {
		$('#back-to-top').fadeIn();
	} else {
		$('#back-to-top').fadeOut();
	}

});

//Tab code: new design  
//URL hash change
$(window).on('hashchange load resize', function (e) {
    if ($(".newtabbedcontent").length > 0) {
        e.preventDefault();
        $('.nav-tabs li').removeClass('active');
        $(".tab-pane").removeClass('active');
        $(".tab-pane").removeClass('in');
        $(".panel-heading").removeClass('active');
		$(".panel-body h2.temp").remove();
        if (location.hash === '') {
            $('.nav-tabs li:first-child').addClass('active');
            $('.nav-tabs a:first').tab('show');
			//console.log($(window).innerWidth);
            if (window.innerWidth > 991) {
                $('.panel-collapse:first').addClass("in");
                $('.panel-heading:first').addClass("active");
				if($("#newsTabContent").length == 0)
					$( ".panel-body:first" ).prepend( "<h2 class='temp'>"+$('.panel-heading:first').text()+"</h2>" );
            }
        }
        else {
            $('.nav-tabs a[href="' + location.hash + '"]').parent().addClass('active');
            $('.nav-tabs a[href="' + location.hash + '"]').tab('show');
            $(location.hash).prev('.panel-heading').addClass('active');
			$(location.hash).collapse('show');
			if (window.innerWidth > 991 && $("#newsTabContent").length == 0) {
                $(location.hash+" .panel-body").prepend( "<h2 class='temp'>"+$(location.hash).prev('.panel-heading').text()+"</h2>" );
            }
			
        }
    }
});
