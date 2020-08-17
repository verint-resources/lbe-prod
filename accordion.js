/**
=====================================
        ACCORDION - START
=====================================
**/
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

    $(element).find('fieldset[data-type="search"').wrap('<div class="accordion_container" data-for="' + search_widget_name + '"></div>');

    $('.accordion_container[data-for="' + search_widget_name + '"]').prepend('<label class="accordion_label" data-for="' + search_widget_name + '">Search for ' + label + '</label>');

    $(element).find('fieldset[data-type="search"').wrap('<div class="accordion_content" data-for="' + search_widget_name + '" style="display:none;"></div>');

    $('.accordion_label[data-for="' + search_widget_name + '"]').click(function () {
        $(this).toggleClass("open");
        var data = $(this).data('for');
        var isOpen = $(this).hasClass('open');
        if (isOpen) {
            $('.accordion_content[data-for="' + data + '"]').show();
        } else {
            $('.accordion_content[data-for="' + data + '"]').hide();
        }
    });
}

/**
=====================================
        ACCORDION - END
=====================================
**/