var ONLINE = navigator.onLine;
window.addEventListener("offline", function() {
    ONLINE = false;
});
window.addEventListener("online", function() {
    ONLINE = true;
});
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
;
String.prototype.titleize = function() {
    var string_array = this.split(" ");
    string_array = string_array.map(function(str) {
        return str.capitalize();
    });
    return string_array.join(" ");
}
;
Array.prototype.moveInArray = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
}
;
$.urlParam = function(name) {
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}
;
var isJson = {
    init: function(str) {
        if (typeof str === "object") {
            return str;
        }
        try {
            var data = JSON.parse(str);
        } catch (e) {
            return false;
        }
        return data;
    }
};
jQuery.validator.addMethod("preventXss", function(value, element) {
    var regex = /[^\' a-zA-Z0-9&!#$%()"+:?/@,_\.\-]/g;
    if (regex.test(value) === true) {
        return false;
    }
    return true;
}, "Incorrect input value. Please use only valid characters.");
var isLocalStorageAvailable = {
    init: function() {
        try {
            localStorage.setItem("testLocalStorage", "test");
            localStorage.removeItem("testLocalStorage");
            return true;
        } catch (e) {
            return false;
        }
    }
};
var isSessionStorageAvailable = {
    init: function() {
        try {
            sessionStorage.setItem("testLocalStorage", "test");
            sessionStorage.removeItem("testLocalStorage");
            return true;
        } catch (e) {
            return false;
        }
    }
};
var options = {
    key: "9319099168"
};
var js_api = {};
if (typeof Squiz_Matrix_API === "function") {
    js_api = new Squiz_Matrix_API(options);
}
var autoAjaxContent = {
    sel: ".js-cp-ajax-content",
    debug: false,
    init: function() {
        if (jQuery(autoAjaxContent.sel).length === 0) {
            return false;
        }
        return autoAjaxContent.loadContent();
    },
    loadContent: function() {
        var hThisEl = null;
        var hAjaxUrl = "";
        jQuery(autoAjaxContent.sel).each(function() {
            hThisEl = jQuery(this);
            hAjaxUrl = hThisEl.attr("data-url");
            if (typeof (hAjaxUrl) !== "undefined" && hAjaxUrl.length > 0) {
                autoAjaxContent.loadThisItem(hThisEl, hAjaxUrl);
            }
        });
    },
    loadThisItem: function(thisEl, ajaxUrl) {
        jQuery.ajax(ajaxUrl).done(function(resp) {
            thisEl.html(resp);
        }).fail(function(resp) {
            if (autoAjaxContent.debug === true) {
                console.log(resp);
            }
        });
    }
};
var fixLinks = {
    defaults: {
        contentContaier: ".asset-contents",
        iframeUrl: "SQ_DESIGN_NAME=iframe"
    },
    init: function(contContainer) {
        if ($.urlParam("SQ_DESIGN_NAME") == "iframe") {
            if (contContainer === undefined) {
                contContainer = fixLinks.defaults.contentContaier;
            }
            fixLinks.fix(contContainer);
        }
    },
    fix: function(contContainer) {
        var thisHref = "";
        var h = false;
        jQuery(contContainer).find("a").each(function() {
            thisHref = jQuery(this).attr("href");
            if (thisHref !== undefined && thisHref !== "") {
                thisHref = thisHref.split("#");
                if (thisHref[0] !== "") {
                    h = fixLinks.generateUrl(thisHref, jQuery(this));
                    if (h !== false) {
                        jQuery(this).attr("href", h);
                    }
                    h = fixLinks.generateTarget(thisHref, jQuery(this));
                    if (h !== false) {
                        jQuery(this).attr("target", h);
                    }
                }
            }
        });
    },
    generateUrl: function(thisHref, thisLinkObj) {
        var newHref = "";
        if (thisHref[0].indexOf(location.host) !== -1 && thisLinkObj.hasClass("js-never-frame") === false) {
            newHref = thisHref[0] + "?" + fixLinks.defaults.iframeUrl;
            if (thisHref[1] !== undefined) {
                newHref += "#" + thisHref[1];
            }
            return newHref;
        }
        return false;
    },
    generateTarget: function(thisHref, thisLinkObj) {
        if (thisHref[0].indexOf(location.host) !== -1 && thisLinkObj.hasClass("js-never-frame") === false) {
            return false;
        }
        return "_blank";
    }
};
var filterInputs = {
    init: function() {
        if (jQuery(".js-filter-inputs").length > 0) {
            filterInputs.hideFilters();
        }
    },
    hideFilters: function() {
        var filter = "";
        var thisVal = "";
        jQuery(".js-filter-inputs").each(function() {
            filter = $(this).data("show-value");
            jQuery(this).find("input").each(function() {
                thisVal = $(this).val();
                if (filter.indexOf(thisVal) < 0) {
                    jQuery(this).parent().hide();
                }
            });
            jQuery(this).show();
        });
    }
};
var handleGlobalEvents = {
    init: function() {
        handleGlobalEvents.jsToggle();
    },
    jsToggle: function() {
        $(document).on("click", ".js-toggle", function(e) {
            e.preventDefault();
        });
    }
};
var formTags = {
    init: function() {
        if (jQuery(".js-form-tags").length > 0) {
            initFormTags.applyEvents();
        }
    },
    applyEvents: function() {
        var thisList = "";
        var target = "";
        var urlParam = "";
        var newValue = "";
        $(".js-form-tags").each(function() {
            thisList = this;
            target = $("#" + $(thisList).data("target"));
            $(this).find("a").each(function() {
                urlParam = $.urlParam($(thisList).data("target"));
                if (urlParam) {
                    urlParam = urlParam.replace(/\+/g, " ");
                    if (urlParam.indexOf($(this).text()) > -1) {
                        $(this).addClass("active");
                    }
                }
                $(this).click(function() {
                    $(this).toggleClass("active");
                    newValue = "";
                    $(thisList).find(".active").each(function() {
                        newValue = newValue + " " + $(this).text();
                    });
                    $(target).val(newValue);
                    return false;
                });
            });
        });
    }
};
var loadAjaxContent = {
    defaults: {
        sel: ".ajax-load-wrapper",
        errorMsg: "There was an error trying to load this content. Please try again later."
    },
    init: function(sel) {
        if (sel === undefined) {
            sel = loadAjaxContent.defaults.sel;
        }
        if (jQuery(sel).length === 0) {
            return false;
        }
        loadAjaxContent.loadContent(sel);
        return true;
    },
    loadContent: function(sel) {
        var thisEl = null;
        var ajaxUrl = "";
        jQuery(sel).each(function() {
            thisEl = jQuery(this);
            ajaxUrl = thisEl.attr("data-url");
            if (ajaxUrl !== undefined && ajaxUrl.length > 0) {
                loadAjaxContent.showLoader(thisEl);
                jQuery.ajax(ajaxUrl).done(function(data) {
                    loadAjaxContent.loadSuccess(thisEl, data);
                }).fail(function(data) {
                    loadAjaxContent.loadError(thisEl);
                });
            }
        });
    },
    showLoader: function(el) {
        el.append('<span class="ajax-loader"></span>');
    },
    loadSuccess: function(el, data) {
        el.html(data);
    },
    loadError: function(el) {
        el.html('<div class="form-message errors"><p>' + loadAjaxContent.defaults.err + "</p></div>");
    }
};
autoAjaxContent.init();
fixLinks.init();
filterInputs.init();
handleGlobalEvents.init();
formTags.init();
loadAjaxContent.init();
var bootstrapSlider = {
    init: function() {
        if ($('.carousel.slide').length == 0) {
            return false;
        }
        bootstrapSlider.startCarousel();
    },
    startCarousel: function() {
        $("#bootstrap-carousel").carousel({
            interval: 6000,
            pause: "hover"
        });
        $('#services-carousel').carousel({
            pause: true,
            interval: false
        });
        $('#services-carousel').on('slide.bs.carousel', function(e) {
            var $e = $(e.relatedTarget);
            var idx = $e.index();
            var itemsPerSlide = 3;
            var totalItems = $('#services-carousel .item').length;
            if (idx >= totalItems - (itemsPerSlide - 1)) {
                var it = itemsPerSlide - (totalItems - idx);
                for (var i = 0; i < it; i++) {
                    if (e.direction == "left") {
                        $('#services-carousel .item').eq(i).appendTo('#services-carousel .carousel-inner');
                    } else {
                        $('#services-carousel .item').eq(0).appendTo('#services-carousel .carousel-inner');
                    }
                }
            }
        });
    }
};
var sliderSwipe = {
    init: function() {
        if ($('#services-carousel').length == 0) {
            return false;
        }
        document.addEventListener('touchstart', sliderSwipe.handleTouchStart, false);
        document.addEventListener('touchmove', sliderSwipe.handleTouchMove, false);
        var xDown = null;
        var yDown = null;
    },
    getTouches: function(evt) {
        return evt.touches || evt.originalEvent.touches;
    },
    handleTouchStart: function(evt) {
        const firstTouch = sliderSwipe.getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    },
    handleTouchMove: function(evt) {
        if (!xDown || !yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                $('#services-carousel .right.carousel-control').trigger('click')
            } else {
                $('#services-carousel .left.carousel-control').trigger('click')
            }
        } else {
            if (yDiff > 0) {} else {}
        }
        xDown = null;
        yDown = null;
    }
};
var navCategories = {
    init: function() {
        this.showCategories();
        this.hideCategories();
    },
    showCategories: function() {
        $(".show-categories-responsive").on("click", function(e) {
            e.preventDefault();
            $(this).addClass("hide");
            $(".section-nav").addClass("show-all", 400);
            $(".hide-categories-responsive").removeClass("hide", 400);
        });
    },
    hideCategories: function() {
        $(".hide-categories-responsive").on("click", function(e) {
            e.preventDefault();
            $(this).addClass("hide");
            $(".show-categories-responsive").removeClass("hide", 400);
            $("body").animate({
                scrollTop: 0
            }, "slow");
            $(".section-nav").removeClass("show-all", 400);
        });
    }
};
var requestFeedback = {
    suffix: "?SQ_DESIGN_NAME=iframe&hide_tags=true",
    init: function() {
        if (jQuery("a.comment-trigger, .leave-feedback-link").length === 0) {
            return false;
        }
        setTimeout(function() {
            requestFeedback.start();
        }, 250);
        return true;
    },
    start: function() {
        var $commentBtn = jQuery("a.comment-trigger, .leave-feedback-link");
        requestFeedback.btnRight($commentBtn);
        var rightOffset = $commentBtn.css("right");
        $commentBtn.off("click.openFeedbackForm");
        $commentBtn.on("click.openFeedbackForm", function(e) {
            e.preventDefault();
            if ($('.pwa-settings.pwa-item.active').length > 0) {
                $('.pwa-settings.pwa-item').removeClass('active')
            }
            if (jQuery("#comment-overlay").length === 0) {
                var iframeSrc = jQuery(this).attr("href");
                iframeSrc += requestFeedback.suffix;
                requestFeedback.templates.overlay = requestFeedback.templates.overlay.replace("{{TITLE}}", $commentBtn.text().trim()).replace("{{SRC", iframeSrc);
                jQuery("body").append(requestFeedback.templates.overlay);
                console.log(requestFeedback.templates.overlay)
                jQuery("#comment-overlay").find("button.close-overlay").off("click.close").on("click.close", function(e) {
                    e.preventDefault();
                    jQuery("#comment-overlay").fadeOut(function() {
                        jQuery("#search-overlay").fadeOut();
                    });
                });
            }
            jQuery("#search-overlay").fadeIn(function() {
                jQuery("#comment-overlay").fadeIn();
                var position = jQuery("#comment-overlay").offset().top;
                jQuery('html, body').animate({
                    scrollTop: position
                }, 800);
            });
        });
    },
    btnRight: function(thisBtn) {
        setTimeout(function() {
            var rightOffset = thisBtn.width() - 30;
            rightOffset = "-" + rightOffset + "px";
            thisBtn.css("right", rightOffset);
        }, 500);
    }
};
requestFeedback.templates = {};
requestFeedback.templates.overlay = "" + "\n <div id='comment-overlay'>" + "\n   <button class='close-overlay btn btn-primary'>X</button>" + "\n   <div class='clearfix'></div>" + "\n   <div class='overlay-content iframe-placeholder'>" + "\n     <iframe src='{{SRC}}' seamless='seamless' title='{{TITLE}}'>Browser not compatible.</iframe>" + "\n   </div>" + "\n </div>";
var articleTools = {
    articleId: null,
    init: function() {
        articleTools.articleId = $(".inside.hide-side-col").attr("data-asset-id");
        articleTools.printArticle();
    },
    printArticle: function() {
        if ($(".article-tools .cp-tools a.article-print-link").length === 0) {
            return false;
        }
        $(".article-tools .cp-tools a.article-print-link").on("click", function(e) {
            e.preventDefault();
            window.print();
        });
        $('.additional-information .accordion-title a').click(function() {
            $(this).find('svg[data-fa-i2svg]').toggleClass('fas fa-plus-circle').toggleClass('fas fa-minus-circle');
        });
    }
};
var relatedContent = {
    init: function() {
        if ($('.related-content').length === 0) {
            return false;
        }
        relatedContent.changeView();
    },
    changeView: function() {
        $(".related-content-navigation li a").click(function(e) {
            e.preventDefault();
            var activeBox = $(".related-content-navigation li a.active").attr("href");
            var box = $(this).attr("href");
            $(".related-content-navigation li a.active").removeClass("active");
            $(this).addClass("active");
            $(activeBox).fadeOut(function() {
                $(box).fadeIn();
            });
        });
        if (jQuery("body").hasClass("iframe") === true) {
            relatedContent.fixAgentDesktop();
        }
    },
    fixAgentDesktop: function() {
        jQuery(".related-content .tab-content").find("div:eq(0)").show().addClass("active");
        jQuery(".related-content .related-content-navigation").find("li:eq(0) a").trigger("click");
    }
};
var ratingUnderContent = {
    init: function() {
        ratingUnderContent.addRating();
    },
    addRating: function() {
        if ($('.article-bottom').length === 0) {
            return false;
        }
        var ratingHtml = $('.article-bottom');
        if ($('.article-container-private-content').length === 1) {
            $('.article-container-private-content').after(ratingHtml);
        } else {
            if ($('.never-in-iframe').length === 1) {
                $('.never-in-iframe').after(ratingHtml);
            } else {
                $('.article-container-public-content').after(ratingHtml);
            }
        }
    }
};
var translationMenu = {
    init: function() {
        translationMenu.dropDown();
        translationMenu.fixSearchLangSwitch();
        translationMenu.reccurringEventFix();
    },
    dropDown: function() {
        if (jQuery(".translate .rd-dropdown-list").length === 0) {
            return false;
        }
        jQuery(".translate").click(function() {
            $(this).find(".rd-dropdown-list").toggle();
            $(this).find(".menu-element-inner svg[data-fa-i2svg]").toggleClass('fas fa-chevron-up').toggleClass('fas fa-chevron-down');
            if ($(this).find(".menu-element-inner").hasClass("active")) {
                $(this).find(".menu-element-inner").removeClass("active");
            } else {
                $(this).find(".menu-element-inner").addClass("active");
            }
        });
    },
    reccurringEventFix: function() {
        var langLinks = jQuery(".translate").find("li a.item-link");
        if (langLinks.length === 0) {
            return false;
        }
        dParam = $.urlParam("d");
        if (dParam === null) {
            return false;
        }
        var hUrl = "";
        langLinks.each(function() {
            hUrl = jQuery(this).attr("href");
            hUrl = hUrl.split("?")[0] + "?d=" + dParam;
            jQuery(this).attr("href", hUrl);
        });
        return true;
    },
    fixSearchLangSwitch: function() {
        var langLinks = jQuery(".translate").find("li a.item-link");
        if (langLinks.length === 0) {
            return false;
        }
        if (jQuery("#search-container").length === 0) {
            return false;
        }
        translationMenu.fixLangHref(langLinks);
        jQuery(document).off("__CP_Query_Changed.updateLangLinks");
        jQuery(document).on("__CP_Query_Changed.updateLangLinks", function() {
            translationMenu.fixLangHref(langLinks);
        });
    },
    fixLangHref: function(langLinks) {
        var hUrl = "";
        langLinks.each(function() {
            hUrl = jQuery(this).attr("href");
            hUrl = hUrl.split("?")[0] + window.location.search;
            hUrl = translationMenu.removeParam("query", hUrl);
            hUrl = translationMenu.removeParam("within", hUrl);
            hUrl = translationMenu.removeParam("lang", hUrl);
            jQuery(this).attr("href", hUrl);
        });
    },
    removeParam: function(key, sourceURL) {
        var rtn = sourceURL.split("?")[0], param, params_arr = [], queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    }
};
var recenltyVisitedPublishDate = {
    init: function() {
        if ($('.my-recent-articles').length === 0) {
            return false
        }
        ;recenltyVisitedPublishDate.formatDate();
    },
    formatDate: function() {
        $('.timeline-heading').each(function() {
            var dataVal = $(this).find('p').attr('data-val');
            dataVal = parseInt(dataVal, 10);
            var dataFormat = $(this).find('p').attr('data-format');
            var published = new Date(dataVal).toString(dataFormat);
            $(this).find('p').append(published);
        });
    }
};
var toogleTags = {
    init: function() {
        toogleTags.start();
    },
    start: function() {
        $('.tags li:first-child').click(function() {
            $(this).find('svg[data-fa-i2svg]').toggleClass('fas fa-minus-circle').toggleClass('as fa-plus-circle');
            if ($(this).closest('.tags').hasClass('active')) {
                $(this).closest('.tags').removeClass('active')
            } else {
                $(this).closest('.tags').addClass('active');
            }
        });
        $('.departaments li:first-child').click(function() {
            $(this).find('svg[data-fa-i2svg]').toggleClass('fas fa-minus-circle').toggleClass('as fa-plus-circle');
            if ($(this).closest('.departaments').hasClass('active')) {
                $(this).closest('.departaments').removeClass('active')
            } else {
                $(this).closest('.departaments').addClass('active');
            }
        });
    }
};
var mostPopularHeight = {
    init: function() {
        if ($('#services-carousel').length === 0) {
            return false
        }
        mostPopularHeight.addHeight();
    },
    addHeight: function() {
        var h = 0;
        jQuery("#services-carousel").each(function() {
            h = 0;
            jQuery(this).find('.service-title').each(function() {
                if (jQuery(this).height() > h) {
                    h = jQuery(this).height();
                }
            }).height(h);
        });
        jQuery("#services-carousel").each(function() {
            h = 0;
            jQuery(this).find('.service-body p').each(function() {
                if (jQuery(this).height() > h) {
                    h = jQuery(this).height();
                }
            }).height(h);
        });
    }
};
bootstrapSlider.init();
navCategories.init();
requestFeedback.init();
articleTools.init();
relatedContent.init();
ratingUnderContent.init();
translationMenu.init();
recenltyVisitedPublishDate.init();
toogleTags.init();
mostPopularHeight.init();
sliderSwipe.init();
var loginAndCreateAccount = {
    $loginEmailField: $("#SQ_LOGIN_USERNAME"),
    $createEmailField: $("div[data-name=emailCreate] input"),
    $resetEmailField: $("div[data-name=resetEmail] input"),
    $currentAccountButton: $("#SQ_LOGIN_SUBMIT"),
    init: function() {
        this.loginAndCreateAccountActions();
        this.loginActions();
        this.resetPasswordActions();
    },
    loginAndCreateAccountActions: function() {
        if ($("[name='main_form']").length == 1) {
            $("#SQ_LOGIN_USERNAME").on("focus", function(e) {
                loginAndCreateAccount.$currentAccountButton = $("#SQ_LOGIN_SUBMIT");
            });
            $("#create-account-form input").on("focus", function(e) {
                loginAndCreateAccount.$currentAccountButton = $("#sq_commit_button");
            });
            loginAndCreateAccount.$loginEmailField.on("keyup paste change", function(e) {
                if (e.type === "paste") {
                    $that = $(this);
                    setTimeout(function() {
                        $that.val($that.val().toLowerCase());
                    }, 100);
                }
                if (e.keyCode !== 91 && e.keyCode !== 224 && e.keyCode !== 17 && e.keyCode !== 37 && e.keyCode !== 39) {
                    var start = this.selectionStart;
                    var end = this.selectionEnd;
                    $(this).val($(this).val().toLowerCase());
                    this.setSelectionRange(start, end);
                }
            });
            loginAndCreateAccount.$createEmailField.on("keyup paste change", function(e) {
                if (e.type === "paste") {
                    $that = $(this);
                    setTimeout(function() {
                        $that.val($that.val().toLowerCase());
                    }, 100);
                }
                if (e.keyCode !== 91 && e.keyCode !== 224 && e.keyCode !== 17 && e.keyCode !== 37 && e.keyCode !== 39) {
                    var start = this.selectionStart;
                    var end = this.selectionEnd;
                    $(this).val($(this).val().toLowerCase());
                    this.setSelectionRange(start, end);
                }
            });
            $(document).keypress(function(e) {
                if (e.keyCode == 13) {
                    if ($("#search-overlay").css("display") != "block") {
                        e.preventDefault();
                        loginAndCreateAccount.$currentAccountButton.click();
                    }
                }
            });
        }
    },
    resetPasswordActions: function() {
        if ($("[data-name=reset-password]").length == 1) {
            loginAndCreateAccount.$resetEmailField.on("keyup", function() {
                $(this).val($(this).val().toLowerCase());
            });
        }
    },
    loginActions: function() {
        if ($("body").hasClass("login")) {
            loginAndCreateAccount.$loginEmailField.on("keyup paste change", function(e) {
                if (e.type === "paste") {
                    $that = $(this);
                    setTimeout(function() {
                        $that.val($that.val().toLowerCase());
                    }, 100);
                }
                if (e.keyCode !== 91 && e.keyCode !== 224 && e.keyCode !== 17 && e.keyCode !== 37 && e.keyCode !== 39) {
                    var start = this.selectionStart;
                    var end = this.selectionEnd;
                    $(this).val($(this).val().toLowerCase());
                    this.setSelectionRange(start, end);
                }
            });
        }
    }
};
var dualAuthCallback = {
    cont: "#auth-2fa",
    alreadyTried: false,
    errorText: "An error has occurred, please try again later",
    init: function(authResult) {
        if (jQuery(".two-auth-intro-text .le-content").length > 0) {
            jQuery(".two-auth-intro-text .le-content").remove();
        }
        setTimeout(function() {
            dualAuthCallback.lock();
        }, 300);
        if (typeof authResult !== "object") {
            return dualAuthCallback.err("E01");
        }
        if (authResult.success === true) {
            return dualAuthCallback.waitForMtx();
        }
        return dualAuthCallback.err("E0X");
    },
    err: function(errCode) {
        dualAuthCallback.unlock();
        var errorWrapper = document.createElement("div");
        var errorDiv = document.createElement("div");
        errorWrapper.classList.add("le-content");
        errorDiv.classList.add("le-error-message");
        errorDiv.innerHTML = dualAuthCallback.errorText;
        errorWrapper.appendChild(errorDiv);
        var target = document.querySelector(".two-auth-intro-text");
        target.insertBefore(errorWrapper, target.lastChild);
        jQuery("body").animate({
            scrollTop: 0
        }, "slow");
        dualAuthCallback.alreadyTried = false;
    },
    waitForMtx: function() {
        setTimeout(function() {
            dualAuthCallback.testMtx();
        }, 2500);
    },
    testMtx: function() {
        var authUrl = jQuery(dualAuthCallback.cont).attr("data-v");
        jQuery.ajax({
            url: authUrl,
            error: function() {
                dualAuthCallback.err("E10");
            },
            success: function(data, statusText, xhr) {
                dualAuthCallback.testMtxCallback(xhr, data);
            }
        });
    },
    testMtxCallback: function(xhr, data) {
        if (typeof xhr !== "object" || data === undefined) {
            return dualAuthCallback.err("E11");
        }
        if (xhr.status !== 200) {
            return dualAuthCallback.err("E12");
        }
        data = isJson.init(data);
        if (data === false) {
            return dualAuthCallback.err("E13");
        }
        if (data["2FA"] === false) {
            if (dualAuthCallback.alreadyTried !== true) {
                dualAuthCallback.alreadyTried = true;
                return dualAuthCallback.waitForMtx();
            } else {
                return dualAuthCallback.err("E14");
            }
        }
        if (data["2FA"] === true) {
            return dualAuthCallback.success();
        }
        return dualAuthCallback.err("E1X");
    },
    success: function() {
        dualAuthCallback.unlock();
        dualAuthCallback.alreadyTried = false;
        window.location.reload();
    },
    lock: function() {
        jQuery(".le-content .le-lock").addClass("locked-loader");
        jQuery(".le-content .le-lock, .le-content .le-lock-msg").show();
    },
    unlock: function() {
        jQuery(".le-content .le-lock").removeClass("locked-loader");
        jQuery(".le-content .le-lock, .le-content .le-lock-msg").hide();
    }
};
var socialMediaButtons = {
    init: function() {
        $(".sign-in-facebook").on("click", function(e) {
            document.cookie = "facebook_redirect=" + $(this).data("facebook-redirect") + "; path=/";
        });
        $(".sign-in-google").on("click", function(e) {
            document.cookie = "google_redirect=" + $(this).data("google-redirect") + "; path=/";
        });
    }
};
var FadeInFadeOutMyAccount = {
    init: function() {
        if ($('.my-account-forms').length === 0) {
            return false
        }
        this.fadeOutSignIn();
        this.fadeOutRegistration();
        this.tooltipassword();
    },
    fadeOutSignIn: function() {
        $(".create-account-btn").find("a:not(.button-create-two)").click(function(e) {
            e.preventDefault();
            $("#sign-in").fadeOut("slow", function() {
                $("#registration").css("display", "none").removeClass("hide");
                $("#registration").fadeIn("slow");
                $("#SQ_LOGIN_USERNAME").val("");
                $("#SQ_LOGIN_PASSWORD").val("");
            });
            var thisAction = $(this).closest("form").attr("action");
            if (thisAction.indexOf("?") === -1) {
                thisAction += "?";
            } else {
                if (thisAction.slice(-1) !== "?") {
                    thisAction += "&";
                }
            }
            thisAction = thisAction.replace("error=lerest", "");
            thisAction = thisAction.replace("?&", "?").replace("&&", "&");
            thisAction += "register=true";
            $(this).closest("form").attr("action", thisAction);
        });
        $(".create-account-btn").click(function() {
            $("#account-form-error-message").fadeOut("slow", function() {
                $("#account-form-error-message").css("display", "none");
            });
        });
    },
    fadeOutRegistration: function() {
        $(".info_sign-in").find("a").click(function(e) {
            e.preventDefault();
            $("#registration").fadeOut("slow", function() {
                $("#account-form-error-message").css("display", "none");
                $("#account-form-error-message").fadeOut("slow");
                $("#sign-in").css("display", "none").removeClass("hide");
                $("#sign-in").fadeIn("slow");
                $(".First-Name").val("");
                $(".Last-Name").val("");
                $(".E-mail").val("");
                $(".password").val("");
                $(".confirm-password").val("");
                $(".terms-checkbox").prop("checked", false);
            });
            var thisAction = $(this).closest("form").attr("action");
            if (thisAction.indexOf("&register=true") !== -1) {
                thisAction = thisAction.replace("&register=true", "");
            }
            if (thisAction.indexOf("?register=true") !== -1) {
                thisAction = thisAction.replace("?register=true", "?");
            }
            thisAction = thisAction.replace("error=lerest", "");
            thisAction = thisAction.replace("?&", "?").replace("&&", "&");
            $(this).closest("form").attr("action", thisAction);
        });
        $(".info_sign-in").click(function() {
            $("#account-form-error-message").fadeOut("slow", function() {
                $("#account-form-error-message").css("display", "none");
            });
        });
    },
    tooltipassword: function() {
        $(".tooltipimg").click(function(e) {
            e.preventDefault();
        });
    }
};
loginAndCreateAccount.init();
socialMediaButtons.init();
FadeInFadeOutMyAccount.init();
var servicesCards = {
    animatedView: null,
    animatedCard: null,
    mutant: null,
    fontAwesomeReadyClass: "fontawesome-i2svg-complete",
    init: function() {
        if ($('.services-header').length === 0) {
            return false
        }
        servicesCards.views();
        servicesCards.servicesCategory();
        servicesCards.cardsNav();
        servicesCards.servicesMobileTitle();
        servicesCards.servicesLandingInitTweaks();
    },
    servicesLandingInitTweaks: function() {
        servicesCards.mutant = new MutationObserver(function(mutations, observer) {
            servicesCards.servicesLandingTweaksHeights();
        }
        );
        var mutantCfg = {
            attributes: true,
            attributeFilter: ["class"],
            childList: false,
            characterData: false
        };
        var mutantSel = document.querySelector("html");
        servicesCards.mutant.observe(mutantSel, mutantCfg);
    },
    servicesLandingTweaksHeights: function() {
        if (jQuery("html").hasClass(servicesCards.fontAwesomeReadyClass) === false) {
            return false;
        }
        servicesCards.mutant.disconnect();
        servicesCards.mutant = null;
        var cardsNavHeight = 0;
        if (jQuery("#services-tab-nav nav").is(":visible") === true) {
            cardsNavHeight = jQuery("#services-tab-nav nav").height();
        } else {
            cardsNavHeight = servicesCards.getNavHeight("#services-tab-nav nav");
        }
        jQuery(".tags-grouped-services.with-cards").css("min-height", cardsNavHeight + "px");
        jQuery(".services-header .hamburger-button a").click(function(e) {
            e.preventDefault();
            if ($('.card-button').hasClass('active') && $(window).width() > 600) {
                $(this).find('svg[data-fa-i2svg]').toggleClass('fas fa-times').toggleClass('fas fa-bars');
                if ($('.navigation').hasClass('active')) {
                    $('.navigation').removeClass('active');
                } else {
                    $('.navigation').addClass('active');
                }
            }
        });
    },
    cardsNav: function() {
        jQuery("#services-tab-nav .nav a").click(function(e) {
            e.preventDefault();
            if (jQuery(this).closest("li").hasClass("active") === true) {
                return false;
            }
            if (servicesCards.animatedCard === null) {
                servicesCards.animatedCard = jQuery(".card-items-list:visible");
            }
            servicesCards.animatedCard.finish();
            var thidCardId = jQuery(this).attr("data-id");
            servicesCards.animatedCard.fadeOut(function() {
                servicesCards.animatedCard = jQuery("#" + thidCardId);
                servicesCards.animatedCard.fadeIn();
            });
            jQuery("#services-tab-nav .nav li").removeClass("active");
            jQuery(this).closest("li").addClass("active");
        });
    },
    getNavHeight: function(sel) {
        if (typeof (jQuery.fn.actual) !== "function") {
            return 0;
        }
        var thisHeight = jQuery(sel).actual("height");
        return thisHeight;
    },
    views: function() {
        jQuery(".services-views li a").click(function(e) {
            e.preventDefault();
            if ((jQuery(this).hasClass("active") === true) && (jQuery(".services-search-results:visible").length === 0)) {
                return false;
            }
            servicesCards.animatedView = jQuery(".tags-grouped-services.with-cards:visible, .a-z-list-container:visible, .services-search-results:visible").eq("0");
            servicesCards.animatedView.finish();
            var viewToShow = jQuery(this).attr("data-for");
            servicesCards.animatedView.fadeOut(function() {
                servicesCards.animatedView = jQuery(viewToShow);
                servicesCards.animatedView.fadeIn();
            });
            jQuery(".services-views li a").removeClass("active");
            jQuery(this).addClass("active");
            if ($('.az-button').hasClass('active')) {
                $('.mobile-category').removeClass('active');
                $('.mobile-a-z-list').addClass('active');
            } else {
                $('.mobile-category').addClass('active');
                $('.mobile-a-z-list').removeClass('active')
            }
        });
    },
    servicesCategory: function() {
        $('.services-header .hamburger-button .mobile-category').click(function(e) {
            e.preventDefault;
            if ($('.navigation').hasClass('active')) {
                $('.navigation').removeClass('active');
                if ($('.mobile-category').is(':visible')) {
                    $('.mobile-category').text(servicesButton.showCategory);
                }
            } else {
                $('.navigation').addClass('active');
                if ($('.mobile-category').is(':visible')) {
                    $('.mobile-category').text(servicesButton.hideCategory);
                }
            }
        });
        $('.navigation li').click(function() {
            if ($('.navigation').hasClass('active')) {
                if ($('.mobile-category').is(':visible')) {
                    $('.navigation').removeClass('active');
                    $('.mobile-category').text(servicesButton.showCategory);
                }
            } else {
                if ($('.mobile-category').is(':visible')) {
                    $('.navigation').addClass('active');
                    $('.mobile-category').text(servicesButton.hideCategory);
                }
            }
        });
        $('.mobile-a-z-list').click(function() {
            if ($('.a-z-list-container .main-menu').hasClass('active')) {
                $('.a-z-list-container .main-menu').removeClass('active');
                $('.mobile-a-z-list').text(servicesButton.showAZList);
            } else {
                $('.a-z-list-container .main-menu').addClass('active');
                $('.mobile-a-z-list').text(servicesButton.hideAZList);
            }
        });
        $('.main-menu li a').click(function() {
            if ($('.mobile-a-z-list').is(':visible')) {
                $('.main-menu').removeClass('active');
                $('.mobile-a-z-list').text(servicesButton.showAZList);
            }
        })
    },
    servicesMobileTitle: function() {
        $(".tags-grouped-services .section-tab-nav .navbar-brand").click(function(e) {
            e.preventDefault();
        });
        var title;
        $(".section-tab-nav .nav .navbar-item.normal  a").click(function() {
            if ($(".tags-grouped-services .section-tab-nav .navbar-toggler").is(":visible") == true) {
                $(".tags-grouped-services .section-tab-nav .navbar-toggler").trigger("click");
            }
            title = $(this).text().trim();
            $(".tags-grouped-services .section-tab-nav .title-service").fadeOut(function() {
                $(this).text("Category: " + title + "").fadeIn();
            });
        });
    }
};
var servicesSearchResults = {
    list: [],
    minResultsLength: 3,
    resultsLabel: servicesButton.resultsFor,
    animationFlag: null,
    init: function() {
        if (jQuery("#services-input").length === 0) {
            return false;
        }
        servicesSearchResults.attachEvents();
        servicesSearchResults.searchBox();
        return true;
    },
    attachEvents: function() {
        var customCharsVal = jQuery("#services-input").attr("data-minchars");
        customCharsVal = parseInt(customCharsVal, 10);
        if (isNaN(customCharsVal) === false) {
            servicesSearchResults.minResultsLength = customCharsVal;
        }
        jQuery("#services-input").on("keyup", function() {
            servicesSearchResults.results();
        });
        jQuery("#services-input").keypress(function(e) {
            var key = e.which;
            if (key === 13) {
                servicesSearchResults.results();
            }
        });
        servicesSearchResults.searchResults();
    },
    results: function() {
        var hActiveView = "";
        var queryStr = jQuery("#services-input").val();
        jQuery(".s-results").text(servicesSearchResults.resultsLabel + " " + queryStr);
        servicesSearchResults.animationFlag = jQuery(".tags-grouped-services.with-cards:visible, .a-z-list-container:visible, .services-search-results:visible").eq("0");
        servicesSearchResults.animationFlag.finish();
        if (jQuery("#services-input").val().length > servicesSearchResults.minResultsLength) {
            if (jQuery(".services-search-results").is(":visible") === true) {
                return true;
            }
            servicesSearchResults.animationFlag.finish().fadeOut(function() {
                servicesSearchResults.animationFlag = jQuery(".services-search-results");
                servicesSearchResults.animationFlag.fadeIn();
            });
        } else {
            if (jQuery(".services-search-results").is(":visible") === false) {
                return false;
            }
            hActiveView = jQuery(".services-views li a.active").attr("data-for");
            servicesSearchResults.animationFlag.finish().fadeOut(function() {
                servicesSearchResults.animationFlag = jQuery(hActiveView);
                servicesSearchResults.animationFlag.fadeIn();
            });
        }
    },
    searchBox: function() {
        jQuery('.a-z-list-services li a').each(function() {
            servicesSearchResults.list.push({
                label: jQuery(this).text().trim(),
                value: jQuery(this).attr("href"),
                icon: jQuery(this).attr("data-icon").trim()
            });
        });
        jQuery("#services-input").blur(function() {
            if (jQuery(this).val() === "") {
                if ($('.services-views .az-button').hasClass('active')) {
                    jQuery(".services-search-results").fadeOut(function() {
                        jQuery(".a-z-list-container").fadeIn();
                    });
                } else {
                    jQuery(".services-search-results").fadeOut(function() {
                        jQuery(".tags-grouped-services.with-cards").fadeIn();
                    });
                }
            }
        });
    },
    searchResults: function() {
        jQuery.widget("ui.autocomplete", $.ui.autocomplete, {
            options: {
                renderItem: null,
                renderMenu: null
            },
            _renderItem: function(ul, item) {
                if ($.isFunction(this.options.renderItem))
                    return this.options.renderItem(ul, item);
                else
                    return this._super(ul, item);
            },
            _renderMenu: function(ul, items) {
                if ($.isFunction(this.options.renderMenu)) {
                    this.options.renderMenu(ul, items);
                }
                this._super(ul, items);
            }
        });
        var Menu_Base = function(ul, items) {
            $(".services-search-results .col-md-12 .a-z-list-results").append(ul);
            $(".ui-menu").addClass("dropdown");
        }
          , Item_Initialize = function(ul, item) {
            return $("<li>").append($("<a>").html("<i class='" + item.icon + "'></i>" + item.label + "")).appendTo(ul);
        };
        jQuery("#services-input").autocomplete({
            source: servicesSearchResults.list,
            minLength: servicesSearchResults.minResultsLength,
            select: function(event, ui) {
                event.preventDefault();
                window.location = ui.item.value;
            },
            response: function(event, ui) {
                if (ui.content.length === 0) {
                    $('.a-z-list-results .dropdown').css('display', 'none');
                    $(".a-z-list-results .no-result").remove();
                    $(".a-z-list-results").append('<ul class="no-result"></ul>');
                    $(".a-z-list-results .no-result").append("<li></li>");
                    $(".a-z-list-results .no-result li").html("No Result");
                } else {
                    $(".a-z-list-results .no-result").remove();
                }
            },
            change: function() {
                if ($("#services-input").val().length >= servicesSearchResults.minResultsLength && $(".a-z-list-results .no-result").length !== 1) {
                    $(".ui-autocomplete").show();
                } else {
                    $(".ui-autocomplete").hide();
                }
            },
            close: function() {
                if ($("#services-input").val().length >= servicesSearchResults.minResultsLength && $(".a-z-list-results .no-result").length !== 1) {
                    $(".ui-autocomplete").show();
                } else {
                    $(".ui-autocomplete").hide();
                }
            },
            renderMenu: Menu_Base,
            renderItem: Item_Initialize
        });
    }
};
servicesCards.init();
servicesSearchResults.init();
var dforms = {
    formDetails: {
        dFormObj: null,
        form: null,
        type: null,
        custom: null,
        locale: "en",
        ref: null,
        query: null
    },
    options: {
        formAjaxUrl: "/form/widget/{{type}}{{form}}{{custom}}?token={{token}}&locale={{loc}}{{ref}}{{query}}",
        errorMsg: "Something went wrong and the form could not be loaded. Please try again later.",
        errorPattern: "<div class='error-message'><p>{{errorMsg}}</p></div>"
    },
    init: function() {
        if (jQuery("#dform_squiz").length === 0) {
            return false;
        }
        jQuery(document).on("__CP_User_Ready", function() {
            jQuery("#dform_squiz").each(function() {
                dforms.startForm(jQuery(this));
            });
        });
        return true;
    },
    startForm: function(thisForm) {
        dforms.formDetails.dFormObj = thisForm;
        dforms.formDetails.form = thisForm.data("form");
        dforms.formDetails.type = thisForm.data("type");
        dforms.formDetails.locale = thisForm.data("locale");
        dforms.formDetails.custom = thisForm.data("custom");
        dforms.formDetails.ref = thisForm.data("ref");
        dforms.formDetails.query = thisForm.data("query");
        if (dforms.formDetails.query === undefined || dforms.formDetails.query === null) {
            dforms.formDetails.query = "";
        } else {
            if (dforms.formDetails.query.charAt(0) !== "&" && dforms.formDetails.query !== "") {
                dforms.formDetails.query = "&" + dforms.formDetails.query;
            }
        }
        if (dforms.formDetails.custom !== "" && dforms.formDetails.type === "auto/") {
            dforms.formDetails.custom = "/custom/" + dforms.formDetails.custom;
        } else {
            dforms.formDetails.custom = "";
        }
        var ajaxURL = dforms.buildAjaxUrl();
        jQuery.ajax({
            url: ajaxURL
        }).done(function(data) {
            dforms.formDetails.dFormObj.html(data);
        }).fail(function(data) {
            var msg = dforms.options.errorPattern;
            msg = msg.replace("{{errorMsg}}", dforms.options.errorMsg);
            dforms.formDetails.dFormObj.html(msg);
        });
    },
    buildAjaxUrl: function() {
        var url = dforms.options.formAjaxUrl;
        url = url.replace("{{type}}", dforms.formDetails.type).replace("{{form}}", dforms.formDetails.form);
        url = url.replace("{{custom}}", dforms.formDetails.custom).replace("{{ref}}", dforms.formDetails.ref);
        url = url.replace("{{loc}}", dforms.formDetails.locale);
        url = url.replace("{{query}}", dforms.formDetails.query);
        var token = "";
        if (wssUserDetails !== undefined && wssUserDetails.userToken !== undefined) {
            token = wssUserDetails.userToken;
        }
        url = url.replace("{{token}}", token);
        return url;
    }
};
dforms.init();
var sessionTimeout = {
    sessionTime: 1200,
    currentTime: 0,
    sessionStatus: true,
    mainInterval: null,
    init: function() {
        if ($('#user-data').attr('data-user-type') === 'System Administrator') {
            return false;
        }
        if ($('#user-data').attr('data-user-type') === 'Backend User') {
            return false;
        }
        if ($('#user-data').attr('data-user-type') === 'Simple Edit User') {
            return false;
        }
        if (wssUserDetails.userLoggedIn === false) {
            return false;
        }
        if ($('#user-data').length === 0) {
            return false;
        }
        if (userSessionMsg.enableNotifications === "false") {
            return false;
        }
        var messages = userSessionMsgDefault;
        if (typeof (userSessionMsg) === "object") {
            messages = userSessionMsg;
        }
        localStorage.setItem('-cp-st-', new Date().getTime());
        if (typeof window.addEventListener === "function" && typeof window.removeEventListener === "function") {
            window.removeEventListener("storage", sessionTimeout.checklocalStorage, false);
            window.addEventListener("storage", sessionTimeout.checklocalStorage, false);
        }
        sessionTimeout.checkTabActive(messages);
        sessionTimeout.counter(sessionTimeout.sessionTime, messages);
    },
    counter: function(sessionTime, messages) {
        sessionTimeout.currentTime = sessionTime;
        var displayText = messages.sessionNotification.description;
        const mainInterval = setInterval(function() {
            sessionTimeout.currentTime--;
            if (sessionTimeout.currentTime == 60) {
                sessionTimeout.willexpirePopup(mainInterval, messages, displayText);
            }
            if (sessionTimeout.currentTime <= 60) {
                $('.sweet-alert > p').text(displayText.replace(/#time/, sessionTimeout.currentTime));
            }
            if (sessionTimeout.currentTime == 1) {
                swal.close();
            }
            if (sessionTimeout.currentTime == 0) {
                sessionTimeout.expiredPopup(messages);
                sessionTimeout.sessionStatus = false;
                clearInterval(mainInterval);
                if (document.hidden === true) {
                    sessionTimeout.activeTab = "expired";
                }
            }
        }, 1000);
        sessionTimeout.mainInterval = mainInterval;
    },
    willexpirePopup: function(mainInterval, messages, displayText) {
        sessionTimeout.requestDetected(mainInterval, messages);
        if (typeof swal !== "function") {
            return false;
        }
        swal({
            title: messages.sessionNotification.title,
            text: displayText.replace(/#time/, sessionTimeout.currentTime),
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#55b8cf",
            confirmButtonText: messages.sessionNotification.refreshBtnText,
            closeOnConfirm: false
        }, function(inputValue) {
            if (inputValue === true) {
                swal.close();
                var href = messages.refreshSessionUrl;
                jQuery.ajax({
                    url: href,
                    success: function() {
                        return true;
                    },
                    error: function() {
                        return false;
                    }
                });
            }
        });
    },
    expiredPopup: function(messages) {
        swal({
            title: messages.sessionExpired.title,
            text: messages.sessionExpired.description,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#55b8cf",
            confirmButtonText: messages.sessionExpired.loginBtnText,
            cancelButtonText: messages.sessionExpired.cancelBtnText,
            closeOnConfirm: false
        }, function(inputData) {
            if (inputData === true) {
                window.location = $('#user-data').attr('data-my-account-url');
                sessionTimeout.sessionStatus = false;
                localStorage.setItem('-cp-st-', new Date().getTime());
            } else {
                sessionTimeout.sessionStatus = false;
                localStorage.setItem('-cp-st-', new Date().getTime());
                window.location = window.location.href;
            }
        });
    },
    requestDetected: function(mainInterval, messages) {
        var oldXHR = window.XMLHttpRequest;
        function newXHR() {
            var realXHR = new oldXHR();
            realXHR.addEventListener("readystatechange", function() {
                if (realXHR.readyState == 2) {
                    var requestUrl = realXHR.responseURL.split("/").slice(1);
                    var siteUrl = messages.refreshSessionUrl.split("/").slice(1);
                    if (requestUrl[1] == siteUrl[1]) {
                        sessionTimeout.currentTime = sessionTimeout.sessionTime;
                        localStorage.setItem('-cp-st-', new Date().getTime());
                    }
                }
            }, false);
            return realXHR;
        }
        window.XMLHttpRequest = newXHR;
    },
    checkTabActive: function(messages) {
        $(window).on("blur focus", function(e) {
            var prevType = $(this).data("prevType");
            if (prevType != e.type) {
                switch (e.type) {
                case "blur":
                    break;
                case "focus":
                    if ($('.sweet-alert').length > 0) {
                        return false;
                    }
                    if (sessionTimeout.activeTab === "expired") {
                        sessionTimeout.expiredPopup(messages)
                    }
                    break;
                }
            }
            $(this).data("prevType", e.type);
        })
    },
    checklocalStorage: function(e) {
        var changedItem = e.key;
        if (changedItem.indexOf("-cp-st-") !== -1) {
            swal.close();
            sessionTimeout.currentTime = sessionTimeout.sessionTime;
            if (sessionTimeout.sessionStatus == false) {
                window.location = window.location.href;
            }
        }
    }
};
var userSessionMsgDefault = {
    "sessionExpired": {
        "title": "That session already expired",
        "description": "A user’s session already expired and the user needs to login to the MyAccount Portal again",
        "cancelBtnText": "Confirm",
        "loginBtnText": "Log In"
    },
    "sessionNotification": {
        "title": "That session will expire in",
        "description": "#time seconds down to session expiry",
        "refreshBtnText": "Refresh Session"
    }
};
var wssUserDetails = {
    userLoggedIn: null,
    userData: null,
    userId: null,
    userJSON: null,
    userToken: "",
    fbid: false
};
var wssUpdateUsername = {
    defaults: {
        usernameFieldClass: ".real-username-field"
    },
    init: function(field) {
        var thisVal = jQuery(field).val();
        jQuery(field).closest("form").find(wssUpdateUsername.defaults.usernameFieldClass).val(thisVal);
    }
};
function updateUsername(field) {
    wssUpdateUsername.init(field);
}
var autoFillFields = {
    init: function() {
        var currentVal = "";
        $(".auto-fill").each(function() {
            currentVal = $(this).data("current-val");
            $(this).val(currentVal);
        });
    }
};
var wssUserData = {
    options: {
        userDataWrapperSel: "#user-data"
    },
    init: function() {
        var usrDataObj = jQuery(wssUserData.options.userDataWrapperSel);
        if (usrDataObj !== undefined) {
            wssUserData.loadData();
        } else {
            if (typeof dforms === "object") {
                dforms.init();
            }
        }
    },
    loadData: function() {
        wssUserDetails.userData = jQuery("#user-data");
        wssUserDetails.userLoggedIn = jQuery(wssUserDetails.userData).length === 1 ? true : false;
        if (wssUserDetails.userData !== null) {
            wssUserDetails.userId = jQuery(wssUserDetails.userData).attr("data-id");
            wssUserDetails.userJSON = jQuery(wssUserDetails.userData).attr("data-user-json");
            wssUserDetails.userToken = jQuery(wssUserDetails.userData).attr("data-matrix-token");
            wssUserDetails.accountUser = jQuery(wssUserDetails.userData).attr("data-account-user");
            wssUserDetails.fbid = jQuery(wssUserDetails.userData).attr("data-fbid");
            wssUserDetails.ll = jQuery(wssUserDetails.userData).attr("data-ll");
        }
        jQuery(document).ready(function() {
            jQuery(document).trigger("__CP_User_Ready");
        });
        if (wssUserDetails.userLoggedIn === true) {
            wssUserData.loadForLoggedIn();
        } else {
            wssUserData.loadForNotLoggedIn();
        }
        return true;
    },
    loadForLoggedIn: function() {
        jQuery(document).ready(function() {
            jQuery(document).trigger("__CP_User_LoggedIn");
        });
        sessionTimeout.init();
    },
    loadForNotLoggedIn: function() {
        jQuery(document).ready(function() {
            jQuery(document).trigger("__CP_User_NotLoggedIn");
        });
    }
};
var wssUserPersonalisation = {
    sel: {
        articleSel: ".js-article-page",
        dformSel: "#dform_squiz"
    },
    defaults: {
        userJSONFieldID: 183
    },
    init: function() {
        jQuery(document).on("__CP_User_LoggedIn", function() {
            wssUserPersonalisation.start();
        });
    },
    start: function() {
        if (wssUserDetails.userJSON === "" || wssUserDetails.userJSON === undefined) {
            wssUserDetails.userJSON = {};
        } else {
            wssUserDetails.userJSON = JSON.parse(wssUserDetails.userJSON);
        }
        if (wssUserDetails.userLoggedIn === true) {
            if (jQuery(wssUserPersonalisation.sel.articleSel).length > 0) {
                wssUserPersonalisation.addRecentAsset("articles");
            } else if (jQuery(wssUserPersonalisation.sel.dformSel).length > 0) {
                wssUserPersonalisation.addRecentAsset("forms");
            }
        }
    },
    addRecentAsset: function(assetType) {
        if (typeof js_api !== "object") {
            return false;
        }
        var currentAssetID = jQuery("body").data("asset-id");
        var notFoundAsset = jQuery("#footer-scripts").data("nf");
        if (currentAssetID !== notFoundAsset) {
            wssUserPersonalisation.saveRecentAsset(assetType, currentAssetID);
        }
    },
    saveRecentAsset: function(assetType, currentAssetID) {
        if (typeof wssUserDetails.userJSON.recent_assets === "undefined") {
            wssUserDetails.userJSON = {
                recent_assets: {
                    forms: [],
                    articles: []
                }
            };
        }
        var assetsArray = wssUserDetails.userJSON.recent_assets[assetType];
        var inArray = false;
        var inArrayIndex = 0;
        assetsArray.some(function(entry) {
            if (entry == currentAssetID) {
                inArray = true;
                inArrayIndex = assetsArray.indexOf(entry);
                return true;
            }
        });
        if (inArray === true) {
            assetsArray.moveInArray(inArrayIndex, 0);
        } else {
            assetsArray.unshift(currentAssetID);
            assetsArray.splice(3, 4);
        }
        wssUserDetails.userJSON.recent_assets[assetType] = assetsArray;
        var userJsonFieldId = wssUserPersonalisation.defaults.userJSONFieldID;
        if (typeof (jQuery("#user-data").attr("data-ujson")) !== "undefined") {
            if (jQuery("#user-data").attr("data-ujson").length > 0) {
                userJsonFieldId = jQuery("#user-data").attr("data-ujson");
            }
        }
        js_api.setMetadata({
            asset_id: wssUserDetails.userId,
            field_id: userJsonFieldId,
            field_val: JSON.stringify(wssUserDetails.userJSON),
            dataCallback: function(data) {}
        });
    }
};
var myServiceRequestsFix = {
    sel: {
        introText: ".my-services-intro-text",
        widgetSel: "div.js-wss-widget.wss-widget-wrapper",
        lerest: {
            list: ".le-request-list-complete li.le-request-item",
            item: "div.js-wss-widget.wss-widget-wrapper .le-request-item",
            itemLink: ".le-request-item-holder .le-request-list-link a"
        }
    },
    m: null,
    init: function() {
        if (jQuery(myServiceRequestsFix.sel.widgetSel).length === 0) {
            return false;
        }
        myServiceRequestsFix.start();
    },
    start: function() {
        myServiceRequestsFix.fixIntroText();
    },
    fixIntroText: function() {
        if (jQuery(myServiceRequestsFix.sel.introText).length === 0) {
            return false;
        }
        if (typeof MutationObserver !== "function") {
            return false;
        }
        var cfg = {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        };
        myServiceRequestsFix.m = new MutationObserver(function(mutations, observer) {
            myServiceRequestsFix.introTextCallback(observer);
        }
        );
        var elTarget = document.querySelector(myServiceRequestsFix.sel.widgetSel);
        myServiceRequestsFix.m.observe(elTarget, cfg);
        return true;
    },
    introTextCallback: function(observer) {
        if (jQuery(myServiceRequestsFix.sel.lerest.list).length === 0) {
            return false;
        }
        jQuery(myServiceRequestsFix.sel.lerest.item).off("click.open");
        jQuery(myServiceRequestsFix.sel.lerest.item).on("click.open", function() {
            jQuery(myServiceRequestsFix.sel.introText).fadeOut();
        });
        jQuery(myServiceRequestsFix.sel.widgetSel).on("click.close", myServiceRequestsFix.sel.lerest.itemLink, function() {
            if (jQuery(this).text().trim() === "Back to list") {
                jQuery(myServiceRequestsFix.sel.introText).fadeIn();
            }
        });
        myServiceRequestsFix.m.disconnect();
        myServiceRequestsFix.m = null;
        return true;
    }
};
var browserNavFix = {
    logoutBtn: ".login-bar li a",
    init: function() {
        if (wssUserDetails.userLoggedIn !== true) {
            return false;
        }
        browserNavFix.logoutAction();
        if (!!window.performance !== true) {
            return false;
        }
        if (window.performance.navigation.type !== 2) {
            return false;
        }
        if (isSessionStorageAvailable.init() !== true) {
            return false;
        }
        if (sessionStorage.getItem("cp-logged-out") === "1") {
            sessionStorage.removeItem("cp-logged-out");
            window.location.reload();
        }
        return true;
    },
    logoutAction: function() {
        var logoutLink = jQuery(browserNavFix.logoutBtn).filter(function() {
            if (jQuery(this).attr("href").indexOf("?SQ_ACTION=logout") !== -1) {
                return true;
            }
            return false;
        });
        if (logoutLink.length === 0) {
            return false;
        }
        logoutLink.click(function() {
            if (isSessionStorageAvailable.init() == true) {
                sessionStorage.setItem("cp-logged-out", "1");
            }
        });
    }
};
autoFillFields.init();
wssUserData.init();
wssUserPersonalisation.init();
myServiceRequestsFix.init();
jQuery(document).ready(function() {
    browserNavFix.init();
});
var dynamicSeachPage = {
    checkedPublishedDateInput: $("#facet-date_published").find("input:checked").first(),
    prevQuery: "",
    init: function() {
        if (jQuery("#search-container") !== undefined && jQuery("#search-container").hasClass("agent-desktop") === true) {
            return false;
        }
        if (jQuery("form#form-search").length > 0) {
            dynamicSeachPage.attachEvents();
            dynamicSeachPage.overlay.init();
            dynamicSeachPage.overlayFilters.init();
            jQuery("body > .searchbox-trigger").fadeOut(function() {
                jQuery(this).remove();
            });
            dynamicSeachPage.storeInitState();
            return true;
        }
    },
    attachEvents: function() {
        dynamicSeachPage.prevQuery = jQuery("#search-terms").val();
        jQuery("form#form-search ul.nice-checkboxes li input[type='radio']").off("change.submitSection");
        jQuery("form#form-search ul.tags li input[type='checkbox']").off("change.submitTopic");
        jQuery("form#form-search button[type='submit']").off("click.submitForm");
        jQuery("form#form-search .pagination-container li a").off("click.paginate");
        jQuery("body").off("click.autocomplete", ".ui-autocomplete .ui-menu-item");
        jQuery("form#form-search #related_searches a").off("click.loadResults");
        jQuery("button.within-submit").off("click.submitQuery");
        jQuery("#search-spelling a").off('click.spelling');
        jQuery('.show-filters').off('click.showFilters');
        jQuery('.filters-head button').off('click.filtersButton')
        $(window).scroll(function() {
            if ($(document).scrollTop() >= 375 && $(document).scrollTop() <= $('footer').position().top - 100) {
                $(".show-filters").addClass('is-fixed')
            }
            if ($(document).scrollTop() < 375 || $(document).scrollTop() >= $('footer').position().top - 100) {
                $(".show-filters").removeClass('is-fixed');
            }
        });
        jQuery('.show-filters').on('click.showFilters', function(e) {
            e.preventDefault();
            $('.filters-container').addClass('active');
            $('body').addClass('overflow-off')
        });
        jQuery('.filters-head button').on('click.filtersButton', function(e) {
            e.preventDefault();
            $('.filters-container').removeClass('active');
            $('body').removeClass('overflow-off')
        });
        jQuery("#search-spelling a").on('click.spelling', function(e) {
            e.preventDefault();
            var relUrl = jQuery("#search-container").attr("data-url") + "/" + jQuery(this).attr("href").split('search')[1];
            console.log(relUrl)
            dynamicSeachPage.loadRelSearch(relUrl);
        });
        jQuery("form#form-search #related_searches a").on("click.loadResults", function(e) {
            e.preventDefault();
            var relUrl = jQuery("#search-container").attr("data-url") + jQuery(this).attr("href");
            dynamicSeachPage.loadRelSearch(relUrl);
        });
        jQuery("form#form-search ul.nice-checkboxes li input[type='radio']").on("change.submitSection", function(e) {
            dynamicSeachPage.loadResults($(this));
        });
        jQuery("form#form-search ul.tags li input[type='checkbox']").on("change.submitTopic", function(e) {
            if ($(this).parents('#trending').length > 0) {
                var trending = true;
            }
            dynamicSeachPage.loadResults($(this), trending);
        });
        jQuery("form#form-search button[type='submit']").on("click.submitForm", function(e) {
            e.preventDefault();
            dynamicSeachPage.loadResults($(this));
        });
        jQuery("button.within-submit").on("click.submitQuery", function(e) {
            e.preventDefault();
            dynamicSeachPage.loadResults($(this));
        });
        jQuery("form#form-search .pagination-container li a").on("click.paginate", function(e) {
            e.preventDefault();
            var url = jQuery(this).attr("href");
            dynamicSeachPage.paginate(url);
        });
        jQuery(window).off("popstate.search");
        jQuery(window).on("popstate.search", function(e) {
            if (e.originalEvent.state !== null) {
                if (typeof e.originalEvent.state !== "undefined") {
                    dynamicSeachPage.popResults(e.originalEvent.state);
                }
            }
        });
        var autocompleteURL = $("#search-container").attr("data-autocompletion-url");
        if (!(autocompleteURL === "" || autocompleteURL === undefined)) {
            jQuery("#search-container").on("keyup", "input.query", function(e) {
                $(this).fbcompletion({
                    enabled: "enabled",
                    standardCompletionEnabled: true,
                    collection: "",
                    program: autocompleteURL,
                    format: "extended",
                    alpha: "0.5",
                    show: "10",
                    sort: "0",
                    length: "3",
                    delay: "0",
                    profile: "auto-completion",
                    searchBasedCompletionEnabled: false,
                    searchBasedCompletionProgram: "../s/search.json",
                    loggin: "disabled",
                    selectLogging: "disabled",
                    dwellLogging: "disabled",
                    interactionLog: ""
                });
            });
        }
        jQuery("body").on("click.autocomplete", ".ui-autocomplete .ui-menu-item", function(e) {
            var query = $(this).text();
            $("#search-container input.query").val(query);
            dynamicSeachPage.loadResults();
        });
    },
    loadRelSearch: function(relUrl) {
        if (typeof relUrl !== "string") {
            return false;
        }
        dynamicSeachPage.overlay.show();
        jQuery.ajax({
            url: relUrl,
            error: function() {
                dynamicSeachPage.overlay.hide();
            },
            success: function(content) {
                dynamicSeachPage.showResults(content, relUrl);
            }
        });
        return true;
    },
    loadResults: function(element, trending) {
        if (element != undefined) {
            dynamicSeachPage.datePublishedFacetHandling(element);
        }
        if (dynamicSeachPage.prevQuery !== jQuery("#search-terms").val()) {
            jQuery("input.search-input.search-within").val("");
        }
        if (trending === true) {
            var formData = jQuery("#form-search").find('#trending input').serialize();
        } else {
            var formData = jQuery("#form-search").serialize();
        }
        var actionUrl = jQuery("#search-container").attr("data-url");
        if (actionUrl === undefined || actionUrl === "") {
            actionUrl = window.location.href.split("#")[0].split("?")[0];
            formData = "&SQ_ASSET_CONTENTS_RAW";
        }
        formData = formData.replace("&gscope1=0", "");
        dynamicSeachPage.overlay.show();
        dynamicSeachPage.overlayFilters.show();
        jQuery.ajax({
            url: actionUrl,
            data: formData,
            error: function() {
                dynamicSeachPage.overlay.hide();
            },
            success: function(content) {
                dynamicSeachPage.showResults(content, formData, element);
            }
        });
    },
    paginate: function(url) {
        var suffix = "SQ_ASSET_CONTENTS_RAW";
        if (url.indexOf(suffix) !== -1) {
            suffix = "";
        }
        var query = url.split("?")[1];
        if (query.indexOf("form=wss") !== -1) {
            query = query.replace("form=wss&", "");
        }
        var h = jQuery("#search-container").attr("data-url");
        if (h !== undefined || h !== "") {
            url = h + "?" + query;
            suffix = "";
        }
        dynamicSeachPage.overlay.show();
        jQuery.ajax({
            url: url,
            data: suffix,
            error: function() {
                dynamicSeachPage.overlay.hide();
            },
            success: function(content) {
                dynamicSeachPage.showResults(content, url);
            }
        });
    },
    showResults: function(content, formData, targetElement) {
        jQuery("#main-col section.asset-contents-section").html(content);
        $('body').removeClass('overflow-off');
        jQuery(".filters-panel").append(dynamicSeachPage.overlayFilters.html);
        window.location.hash = '#form-search';
        if (targetElement != undefined && targetElement.parents("#facet-date_published").length != 0) {
            dynamicSeachPage.datePublishedFacetHandling(targetElement);
        }
        dynamicSeachPage.overlay.hide();
        dynamicSeachPage.overlayFilters.hide();
        dynamicSeachPage.attachEvents();
        if (typeof wssP === "object" && typeof pcfg === "object") {
            if (typeof wssP.reloadSearchResults === "function") {
                wssP.reloadSearchResults();
            }
        }
        dynamicSeachPage.updateUrlState(formData);
        dynamicSeachPage.bookmarkFix();
    },
    datePublishedFacetHandling: function(element) {
        var targetId = element.attr("id");
        var targetValue = element.val();
        var facetDatePublished = $("#facet-date_published");
        $(facetDatePublished).find("input").each(function() {
            if ($(this).attr("id") != targetId && $(this).val() == targetValue) {
                $(this).attr("checked", false);
            } else if ($(this).attr("id") != targetId) {
                if (element.closest(".panel-default").attr("id") != "facet-date_published") {
                    if ($(this).attr("id") != dynamicSeachPage.checkedPublishedDateInput.attr("id")) {
                        $(this).attr("checked", false);
                    }
                } else {
                    $(this).attr("checked", false);
                }
            }
        });
        dynamicSeachPage.checkedPublishedDateInput = facetDatePublished.find("input:checked");
    },
    overlay: {
        html: "<div id='search-page-overlay' style='display: none'></div>",
        init: function() {
            jQuery("#main-col").append(dynamicSeachPage.overlay.html);
        },
        show: function() {
            jQuery("#search-page-overlay").show();
        },
        hide: function() {
            jQuery("#search-page-overlay").hide();
        }
    },
    overlayFilters: {
        html: "<div id='search-page-overlay-filters' style='display: none'></div>",
        init: function() {
            jQuery(".filters-panel").append(dynamicSeachPage.overlayFilters.html);
        },
        show: function() {
            jQuery("#search-page-overlay-filters").show();
        },
        hide: function() {
            jQuery("#search-page-overlay-filters").hide();
        }
    },
    updateUrlState: function(queryString) {
        if (typeof queryString !== "string") {
            return false;
        }
        if (queryString.indexOf("?") !== -1) {
            queryString = queryString.split("?")[1];
        }
        if (typeof history.pushState !== "function") {
            return false;
        }
        var newUrl = window.location.href.split("#")[0];
        newUrl = newUrl.split("?")[0];
        newUrl = newUrl + "?" + queryString;
        var data = {
            path: newUrl,
            html: jQuery("#main-col section.asset-contents-section").html()
        };
        window.history.pushState(data, "", newUrl);
        jQuery(document).trigger("__CP_Query_Changed");
        return true;
    },
    popResults: function(popItem) {
        if (typeof popItem === "undefined") {
            location.reload();
        }
        if (typeof popItem.html === "undefined") {
            location.reload();
        }
        jQuery("#main-col section.asset-contents-section").html(popItem.html);
        dynamicSeachPage.attachEvents();
    },
    storeInitState: function() {
        if (typeof history.replaceState !== "function") {
            return false;
        }
        var data = {
            path: window.location.href,
            html: jQuery("#main-col section.asset-contents-section").html()
        };
        history.replaceState(data, document.title, document.location.href);
    },
    bookmarkFix: function() {
        if (typeof fbSearchCart !== "object") {
            return false;
        }
        if (typeof fbSearchCart.searchPageSetup !== "function") {
            return false;
        }
        fbSearchCart.searchPageSetup();
    }
};
dynamicSeachPage.init();
var accordion = {
    expandLink: ".expand-all",
    collapseLink: ".collapse-all",
    init: function() {
        if ($('.accordion-container').length == 0) {
            return false;
        }
        $(".accordion").addClass("js-enabled");
        $('.accordion-container .accordion-title a').click(function() {
            $(this).find('svg[data-fa-i2svg]').toggleClass('fas fa-plus-circle').toggleClass('fas fa-minus-circle');
        });
        accordion.removeSpaces();
        accordion.anchorScroll();
        accordion.collapseAndExpand();
    },
    removeSpaces: function() {
        $('.accordionItems .accordion-title a').html(function(i, h) {
            return h.replace(/&nbsp;/g, '');
        });
    },
    anchorScroll: function() {
        $(".back-top-link").on("click", function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: $($.attr(this, "href")).offset().top
            }, 500);
        });
        $(".anchor-item").on("click", function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: $($.attr(this, "href")).offset().top
            }, 500);
        });
    },
    expandAll: function() {
        $(accordion.expandLink).on("click", function(e) {
            e.preventDefault();
            $('.accordionItems .accordion-title a').each(function() {
                if ($(this).hasClass("collapsed")) {
                    $(this).trigger('click');
                }
            });
            $('.accordion-title a').removeClass('collapsed');
            $(this).css("display", "none");
            $(this).parents(".accordion").find(accordion.collapseLink).css("display", "inline");
        });
    },
    collapseAll: function() {
        $(accordion.collapseLink).on("click", function(e) {
            e.preventDefault();
            $('.accordionItems .accordion-title a').each(function() {
                if (!$(this).hasClass("collapsed")) {
                    $(this).trigger('click');
                }
            });
            $(this).css("display", "none");
            $(this).parents(".accordion").find(accordion.expandLink).css("display", "inline");
        });
    },
    collapseAndExpand: function() {
        accordion.expandAll();
        accordion.collapseAll();
    }
};
accordion.init();
var wssP = {
    usr: null,
    whoami: "",
    ug: "",
    setOnInit: false,
    sel: {
        article: ".js-article-page",
        service: "#dform_squiz",
        search: "#search-container"
    },
    init: function() {
        if (typeof pcfg === "undefined" || typeof js_api === "undefined") {
            return false;
        }
        if (pcfg.enable !== true) {
            return false;
        }
        if (jQuery("#psv-component").length > 0) {
            return false;
        }
        jQuery(document).on("__CP_User_Ready", function() {
            wssP.start();
        });
        return true;
    },
    start: function() {
        var testMode = wssP.checkUrl();
        if (testMode === false) {
            return false;
        }
        if (pcfg.debug === true) {
            if (jQuery("#wssp-debug").length > 0) {
                jQuery("#wssp-debug").remove();
            }
            wssP_debug.init();
        }
        if (pcfg.enableGeo === true && pcfg.func.setAddressUrl !== "") {
            wssP_Geo.init();
        }
        var ext = wssP.getExistingData();
        if (ext === true) {
            wssP_debug.updateDebug();
        }
        return wssP.track();
    },
    reloadSearchResults: function() {
        wssP_debug.log("Search Results Reloaded...");
        wssP.track();
    },
    checkUrl: function() {
        var thisUrl = window.location.href;
        if (thisUrl.indexOf("/_admin") !== -1) {
            return false;
        }
        if (thisUrl.indexOf("/_edit") !== -1) {
            return false;
        }
        return true;
    },
    track: function() {
        var trackDetails = {};
        if (jQuery(wssP.sel.article).length === 0 && jQuery(wssP.sel.service).length === 0 && jQuery(wssP.sel.search).length === 0) {
            wssP_debug.updateDebug();
            return false;
        }
        if (jQuery(wssP.sel.article).length > 0 || jQuery(wssP.sel.service).length > 0) {
            trackDetails.tags = wssP.trackTags();
            trackDetails.keywords = wssP.trackKeywords();
            trackDetails.title = wssP.trackTitle();
        }
        if (jQuery(wssP.sel.search).length > 0) {
            trackDetails = wssP.trackSearch();
        }
        trackDetails = wssP_dataAnalyze.init(trackDetails);
        return wssP.saveData(trackDetails);
    },
    trackTags: function() {
        var tags = [];
        if (jQuery("meta[name='func.tags.names']").length > 0) {
            tags = jQuery("meta[name='func.tags.names']").attr("content").split(";");
        }
        return tags;
    },
    trackTitle: function() {
        var title = [];
        if (jQuery("h1.page-title").length > 0) {
            title = jQuery("h1.page-title").text().split(" ");
        }
        return title;
    },
    trackKeywords: function() {
        var keywords = [];
        if (jQuery("meta[name='keywords']").length > 0) {
            keywords = jQuery("meta[name='keywords']").attr("content").split(";");
        }
        return keywords;
    },
    trackSearch: function() {
        var searchQuery = jQuery("#search-container form").serialize();
        searchQuery = wssP.extractValues(searchQuery);
        var ret = {
            query: "",
            title: [],
            keywords: [],
            tags: []
        };
        for (var i in searchQuery) {
            if (typeof (searchQuery[i].name) === "undefined") {
                continue;
            }
            if (searchQuery[i].name.indexOf("query") > -1) {
                ret.query = searchQuery[i].value;
            }
            if (searchQuery[i].name.indexOf("tags") > -1) {
                ret.tags.push(searchQuery[i].value.replace(/_/g, " "));
            }
        }
        ret.keywords = ret.query.split(" ");
        return ret;
    },
    extractValues: function(query) {
        var match = null;
        var pl = /\+/g;
        var search = /([^&=]+)=?([^&]*)/g;
        var decodeParams = function(s) {
            return decodeURIComponent(s.replace(pl, " "));
        };
        var urlParams = [];
        while ((match = search.exec(query))) {
            urlParams.push({
                name: decodeParams(match[1]),
                value: decodeParams(match[2])
            });
        }
        return urlParams;
    },
    saveData: function(dataToStore) {
        if (wssUserDetails === undefined) {
            return wssP_public.init(dataToStore);
        }
        if (wssUserDetails.userLoggedIn === true && wssUserDetails.userId !== null) {
            return wssP_loggedin.init(dataToStore);
        }
        return wssP_public.init(dataToStore);
    },
    saveDataCallback: function(data) {
        wssP_debug.updateDebug();
        if (typeof data === "undefined") {
            return false;
        }
        if (typeof data.currentPersona === "undefined") {
            return false;
        }
        if (data.currentPersona === "") {
            return false;
        }
        if (data.currentPersona !== wssP.whoami) {
            wssP.whoami = data.currentPersona;
            wssP.ug = wssP.getUG(wssP.whoami);
            wssP.setSessionPersona(data.currentPersona, wssP.ug);
        }
        return true;
    },
    setSessionPersona: function(activePersona, ug) {
        if (typeof (activePersona) === "undefined") {
            return false;
        }
        if (activePersona === "") {
            return false;
        }
        if (typeof (ug) === "undefined") {
            return false;
        }
        if (ug === "") {
            return false;
        }
        wssP_debug.log("Setting active persona: " + activePersona);
        var reqUrl = pcfg.func.setPersonaUrl.replace("{{P}}", activePersona);
        reqUrl = reqUrl.replace("{{UG}}", ug);
        jQuery.ajax({
            url: reqUrl,
            success: function(data) {
                wssP_debug.log(data);
                jQuery(document).trigger("__CP_Persona_updated");
            }
        });
    },
    getExistingData: function() {
        if (wssP.usr !== null) {
            return false;
        }
        var existingDataReady = false;
        if (wssUserDetails.userLoggedIn === true && wssUserDetails.userId !== null) {
            existingDataReady = wssP_loggedin.getData();
        } else {
            existingDataReady = wssP_public.getData();
        }
        if (existingDataReady === true) {
            wssP.getPersonaOnInitSession();
        }
    },
    getPersonaOnInitSession: function() {
        if (wssP.setOnInit !== true) {
            return false;
        }
        if (wssP.usr.currentPersona === "") {
            return false;
        }
        wssP.ug = wssP.getUG(wssP.usr.currentPersona);
        wssP.setSessionPersona(wssP.usr.currentPersona, wssP.ug);
        wssP.setOnInit = false;
    },
    getUG: function(currentPersona) {
        if (typeof pcfg !== "object") {
            return "";
        }
        if (typeof pcfg.personas !== "object") {
            return "";
        }
        for (var i in pcfg.personas) {
            if (pcfg.personas[i].value === currentPersona) {
                return pcfg.personas[i].ug;
            }
        }
        return "";
    }
};
var wssP_loggedin = {
    getData: function() {
        var ret = jQuery("#user-data").attr("data-wssp");
        wssP_debug.log("Data stored for user so far: " + ret);
        if (typeof ret === "undefined") {
            ret = "";
        }
        if (ret === "") {
            ret = {
                pts: {},
                currentPersona: ""
            };
        }
        if (typeof ret === "string") {
            ret = JSON.parse(ret);
        }
        wssP.usr = ret;
        wssP.whoami = jQuery("#user-data").attr("data-whoami");
        if (typeof wssP.usr.currentPersona !== "undefined") {
            if (wssP.whoami !== wssP.usr.currentPersona) {
                wssP.setOnInit = true;
                wssP.whoami = wssP.usr.currentPersona;
                jQuery("#user-data").attr("data-whoami", wssP.usr.currentPersona);
            }
        }
        return true;
    },
    init: function(dataToStore) {
        wssP_debug.log("LoggedIn User: " + JSON.stringify(dataToStore));
        js_api.setMetadata({
            asset_id: wssUserDetails.userId,
            field_id: pcfg.func.userMetaId,
            field_val: JSON.stringify(dataToStore),
            dataCallback: function(data) {
                wssP.saveDataCallback(dataToStore);
            }
        });
    }
};
var wssP_public = {
    getData: function() {
        var cookieData = jQuery.cookie("wsspd");
        if (typeof cookieData === "undefined" || typeof jQuery.base64 !== "function") {
            wssP_debug.log("No data for Public user yet.");
            wssP.usr = {
                pts: {},
                currentPersona: ""
            };
            return true;
        }
        var ret = jQuery.base64("decode", cookieData);
        wssP_debug.log("Data stored for user so far: " + ret);
        wssP.usr = JSON.parse(ret);
        wssP.whoami = jQuery("#public-user-data").attr("data-whoami");
        if (typeof wssP.usr.currentPersona !== "undefined") {
            if (wssP.whoami !== wssP.usr.currentPersona) {
                wssP_debug.log("Personas Looks different");
                wssP_debug.log("|" + wssP.whoami + "|" + wssP.usr.currentPersona + "|");
                wssP.setOnInit = true;
                wssP.whoami = wssP.usr.currentPersona;
                jQuery("#public-user-data").attr("data-whoami", wssP.usr.currentPersona);
            }
        }
        return true;
    },
    init: function(dataToStore) {
        wssP_debug.log("Public User: " + JSON.stringify(dataToStore));
        if (typeof jQuery.base64 !== "function") {
            return false;
        }
        var dataEncoded = jQuery.base64("encode", JSON.stringify(dataToStore));
        jQuery.cookie("wsspd", dataEncoded, {
            expires: pcfg.cookieLength,
            path: "/"
        });
        wssP_debug.log("Cookie update status: success.");
        wssP.saveDataCallback(dataToStore);
    }
};
var wssP_Geo = {
    init: function() {
        if (jQuery.cookie("wsspgeo") !== "true") {
            wssP_Geo.start();
        }
    },
    start: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(wssP_Geo.getAddress, wssP_Geo.declined);
        } else {
            wssP_debug.log("Geolocation is not supported by this browser.");
            wssP_Geo.setCookie();
        }
    },
    declined: function(error) {
        wssP_Geo.setCookie();
    },
    getAddress: function(position) {
        var pos = position.coords.latitude + "," + position.coords.longitude;
        wssP_debug.log("User Coorditanes: " + pos);
        var thisUrl = pcfg.func.getAddressUrl.replace("{{LATLONG}}", pos);
        jQuery.ajax({
            url: thisUrl,
            success: function(data) {
                if (data.status !== "OK") {
                    wssP_Geo.setCookie();
                } else {
                    wssP_Geo.setAddress(data);
                }
            }
        });
    },
    setAddress: function(data) {
        wssP_debug.log("Address Returned from Google:");
        wssP_debug.log(data);
        if (data.results.length === 0) {
            return wssP_Geo.setCookie();
        }
        if (typeof data.results[0].formatted_address === "undefined") {
            return wssP_Geo.setCookie();
        }
        var thisAddress = data.results[0].formatted_address;
        if (typeof data.results[1].formatted_address !== "undefined") {
            thisAddress += " | " + data.results[1].formatted_address;
        }
        jQuery.ajax({
            url: pcfg.func.setAddressUrl,
            type: "POST",
            data: "address=" + thisAddress,
            success: function(data) {
                wssP_debug.log("Set Address done.");
                wssP_debug.log(data);
                wssP_Geo.setCookie();
            }
        });
        return true;
    },
    setCookie: function() {
        jQuery.cookie("wsspgeo", "true", {
            path: "/"
        });
    }
};
var wssP_dataAnalyze = {
    init: function(data) {
        wssP_debug.log("Data to analyze: " + JSON.stringify(data));
        var ret = {};
        if (typeof pcfg.personas !== "object") {
            return {};
        }
        if (typeof data.tags === "object") {
            ret.tagsPts = wssP_dataAnalyze.getTagsPts(data.tags);
        }
        if (typeof data.keywords === "object") {
            ret.keywordsPts = wssP_dataAnalyze.getKeywordsPts(data.keywords, pcfg.pts.keyword);
        }
        if (typeof data.title === "object") {
            ret.titlePts = wssP_dataAnalyze.getKeywordsPts(data.title, pcfg.pts.title);
        }
        wssP_debug.addPts(ret);
        ret = wssP_dataAnalyze.countPts(ret);
        wssP.usr = ret;
        wssP_debug.log("Points after analyzing the data: " + JSON.stringify(ret));
        return ret;
    },
    getTagsPts: function(tagsArr) {
        var pts = {};
        for (var t in tagsArr) {
            if (typeof tagsArr[t] !== "string") {
                continue;
            }
            tagsArr[t] = tagsArr[t].toLowerCase().trim();
        }
        var h = [];
        var personas = pcfg.personas;
        for (var i in personas) {
            if (typeof personas[i].tags !== "string") {
                continue;
            }
            h = personas[i].tags.split(";");
            if (typeof pts[personas[i].value] === "undefined") {
                pts[personas[i].value] = 0;
            }
            for (var j in h) {
                if (typeof h[j] !== "string") {
                    continue;
                }
                if (h[j].length === 0) {
                    continue;
                }
                h[j] = h[j].trim().toLowerCase();
                for (var k in tagsArr) {
                    if (tagsArr[k] === h[j]) {
                        pts[personas[i].value] = pts[personas[i].value] + pcfg.pts.tags;
                    }
                }
            }
        }
        return pts;
    },
    getKeywordsPts: function(keywordsArr, thisPts) {
        var pts = {};
        var kArr = [];
        for (var t in keywordsArr) {
            if (typeof keywordsArr[t] !== "string") {
                continue;
            }
            if (keywordsArr[t].length < 2) {
                continue;
            }
            kArr.push(keywordsArr[t].toLowerCase().trim());
        }
        var h = [];
        var personas = pcfg.personas;
        for (var i in personas) {
            if (typeof personas[i].keywords !== "string") {
                continue;
            }
            h = personas[i].keywords.split(";");
            if (typeof pts[personas[i].value] === "undefined") {
                pts[personas[i].value] = 0;
            }
            for (var j in h) {
                if (typeof h[j] !== "string") {
                    continue;
                }
                if (h[j].length === 0) {
                    continue;
                }
                h[j] = h[j].trim().toLowerCase();
                for (var k in kArr) {
                    if (kArr[k].length === 0) {
                        continue;
                    }
                    if (kArr[k] === h[j]) {
                        pts[personas[i].value] = pts[personas[i].value] + thisPts;
                    }
                }
            }
        }
        return pts;
    },
    countPts: function(pts) {
        var userPts = {};
        var personas = pcfg.personas;
        var h = 0;
        for (var i in personas) {
            if (typeof personas[i] !== "object") {
                continue;
            }
            h = 0;
            if (typeof pts.tagsPts[personas[i].value] !== "undefined") {
                h += pts.tagsPts[personas[i].value];
            }
            if (typeof pts.keywordsPts[personas[i].value] !== "undefined") {
                h += pts.keywordsPts[personas[i].value];
            }
            if (typeof pts.titlePts[personas[i].value] !== "undefined") {
                h += pts.titlePts[personas[i].value];
            }
            if (typeof wssP.usr.pts[personas[i].value] !== "undefined") {
                h += wssP.usr.pts[personas[i].value];
            }
            userPts[personas[i].value] = h;
        }
        var ret = {
            pts: userPts,
            currentPersona: ""
        };
        h = 0;
        for (var key in ret.pts) {
            if (ret.pts[key] > h && ret.pts[key] >= pcfg.pts.minPts) {
                h = ret.pts[key];
                ret.currentPersona = key;
            }
        }
        return ret;
    }
};
var wssP_debug = {
    log: function(msg) {
        if (pcfg.debug === true) {
            if (typeof msg === "object") {
                msg = JSON.stringify(msg);
            }
            console.log(msg);
        }
    },
    init: function() {
        if (pcfg.debug === true) {
            wssP_debug.log("Start debug...");
            jQuery("body").append(wssP_debug.html);
            wssP_debug.generatePsvLink();
            wssP_debug.addColor();
            wssP_debug.personasConfig();
            jQuery("#wssp-debug .close").click(function(e) {
                e.preventDefault();
                jQuery("#wssp-debug").hide();
            });
        }
    },
    generatePsvLink: function() {
        if (typeof pcfg.psv === "undefined") {
            return false;
        }
        if (pcfg.psv.length === 0) {
            return false;
        }
        var output = wssP_debug.psv_html;
        output = output.replace("{{HREF}}", pcfg.psv);
        jQuery("#wssp-debug .debug-helper").html(output);
        return true;
    },
    addColor: function() {
        if (typeof pcfg.color === "undefined") {
            return false;
        }
        if (pcfg.color.length === 0) {
            return false;
        }
        jQuery("#wssp-debug").addClass(pcfg.color);
        return true;
    },
    personasConfig: function() {
        if (typeof pcfg.personas === "undefined") {
            return false;
        }
        var ret = "<p>Personas Configuration: </p>";
        ret += "<ul class='cfg'>";
        for (var i in pcfg.personas) {
            if (typeof pcfg.personas[i] !== "object") {
                continue;
            }
            ret += "<li><strong>" + pcfg.personas[i].name + "</strong>";
            ret += "<ul>";
            ret += "<li>Tags: " + pcfg.personas[i].tags.replace(/;/g, " | ") + "</li>";
            ret += "<li>Keywords: " + pcfg.personas[i].keywords.replace(/;/g, " | ") + "</li>";
            ret += "</ul>";
            ret += "</li>";
        }
        jQuery("#wssp-debug .personas-cfg").html(ret);
        return true;
    },
    addPts: function(data) {
        if (pcfg.debug !== true) {
            return false;
        }
        var ret = "<p>Points added from this page:</p>";
        ret += "<ul class='add-pts'>";
        for (var i in pcfg.personas) {
            if (pcfg.personas[i].name === "") {
                continue;
            }
            ret += "<li>" + pcfg.personas[i].name + ": ";
            if (typeof data.tagsPts === "undefined") {
                ret += "| Tags: 0";
            } else {
                if (typeof data.tagsPts[pcfg.personas[i].value] === "undefined") {
                    ret += "| Tags: 0";
                } else {
                    ret += "| Tags: " + data.tagsPts[pcfg.personas[i].value];
                }
            }
            if (typeof data.titlePts === "undefined") {
                ret += "| Title: 0";
            } else {
                if (typeof data.titlePts[pcfg.personas[i].value] === "undefined") {
                    ret += "| Title: 0";
                } else {
                    ret += "| Title: " + data.titlePts[pcfg.personas[i].value];
                }
            }
            if (typeof data.keywordsPts === "undefined") {
                ret += "| Keywords: 0";
            } else {
                if (typeof data.keywordsPts[pcfg.personas[i].value] === "undefined") {
                    ret += "| Keywords: 0";
                } else {
                    ret += "| Keywords: " + data.keywordsPts[pcfg.personas[i].value];
                }
            }
        }
        ret += "</ul>";
        jQuery("#wssp-debug .pts-to-add").html(ret);
        return true;
    },
    updateDebug: function() {
        if (pcfg.debug !== true) {
            return false;
        }
        var output = "";
        if (typeof wssP.usr.pts === "object") {
            output = "<p>Summary of points:</p>";
            output += "<ul class='summary-pts'>";
            var names = wssP_debug.getNames(wssP.usr.pts);
            for (var key in wssP.usr.pts) {
                output += "<li>" + names[key] + ": " + wssP.usr.pts[key] + "</li>";
            }
            output += "</ul>";
        }
        jQuery("#wssp-debug .pts-total").html(output);
        var currentPersona = "<p><em>No active persona</em></p>";
        if (typeof wssP.usr.currentPersona !== "undefined") {
            if (wssP.usr.currentPersona.length > 0) {
                var cPersona = wssP.usr.currentPersona;
                if (typeof names[wssP.usr.currentPersona] !== "undefined") {
                    cPersona = names[wssP.usr.currentPersona];
                }
                currentPersona = "<p>Active Persona: <strong>" + cPersona + "</strong></p>";
            }
        }
        jQuery("#wssp-debug .active-persona").html(currentPersona);
        return true;
    },
    getNames: function(arr) {
        var ret = {};
        for (var key in arr) {
            for (var i in pcfg.personas) {
                if (key === pcfg.personas[i].value) {
                    ret[key] = pcfg.personas[i].name;
                }
            }
        }
        return ret;
    }
};
wssP_debug.html = "\n" + "\n<div id='wssp-debug' class='alert alert-success alert-dismissable psv'>" + "\n <a class='close'>×</a>" + "\n  <h2>Personalization Debug</h2>" + "\n  <div class='debug-helper'></div>" + "\n  <div class='personas-cfg'></div>" + "\n  <div class='pts-to-add'></div>" + "\n  <div class='pts-total'></div>" + "\n  <div class='active-persona'></div>" + "</div>";
wssP_debug.psv_html = "<a href='{{HREF}}' target='_blank' class='btn btn-psvh'>Manage Session Variables</a>";
wssP.init();
var KBHelpfulRating = {
    debug: false,
    ajaxURL: null,
    articleID: null,
    loginRedirectURL: null,
    yesValue: 0,
    noValue: 0,
    onVoting: false,
    allowedToVote: false,
    init: function() {
        if (jQuery("#kb-rating").length === 0) {
            return false;
        }
        jQuery(document).on("__CP_User_Ready", function() {
            KBHelpfulRating.start();
        });
    },
    start: function() {
        if (typeof aidRating !== "object") {
            KBHelpfulRating.log("No aidRating object available. Please check the user status endpoint why this is missing.");
            return KBHelpfulRating.blockRating();
        }
        KBHelpfulRating.voteEvents();
        return KBHelpfulRating.getRatingInfo();
    },
    getCountryCode: function() {
        var ccode = jQuery("html").attr("lang");
        if (typeof (ccode) !== "string") {
            return "en";
        }
        if (ccode.length === 0) {
            return "en";
        }
        return ccode;
    },
    getRatingInfo: function() {
        KBHelpfulRating.articleID = jQuery(".js-article-page").data("id");
        KBHelpfulRating.ajaxURL = jQuery("#kb-rating").attr("data-ws");
        KBHelpfulRating.loginRedirectURL = jQuery(".js-article-page").data("login-redirect");
        KBHelpfulRating.countryCode = KBHelpfulRating.getCountryCode();
        KBHelpfulRating.yesValue = parseInt(aidRating.y, 10);
        KBHelpfulRating.noValue = parseInt(aidRating.n, 10);
        jQuery("#kb-rating .helpful-yes-value").text(KBHelpfulRating.yesValue);
        jQuery("#kb-rating .helpful-no-value").text(KBHelpfulRating.noValue);
        KBHelpfulRating.allowedToVote = aidRating.v.toUpperCase();
    },
    blockRating: function() {
        jQuery("#kb-rating .helpful-yes, #kb-rating .helpful-no").off("click.vote");
        jQuery("#kb-rating .helpful-yes, #kb-rating .helpful-no").on("click.vote", function(e) {
            e.preventDefault();
        });
    },
    voteEvents: function() {
        jQuery("#kb-rating .helpful-yes").off("click.vote");
        jQuery("#kb-rating .helpful-no").off("click.vote");
        jQuery("#kb-rating .helpful-yes").on("click.vote", function(e) {
            e.preventDefault();
            KBHelpfulRating.testVoting("yes");
        });
        jQuery("#kb-rating .helpful-no").on("click.vote", function(e) {
            e.preventDefault();
            KBHelpfulRating.testVoting("no");
        });
    },
    testVoting: function(voteValue) {
        switch (KBHelpfulRating.allowedToVote) {
        case "P":
            KBHelpfulRating.requestLogin();
            break;
        case "N":
            KBHelpfulRating.userAlreadyVoted();
            break;
        case "Y":
            KBHelpfulRating.sendVote(voteValue);
            break;
        default:
            break;
        }
    },
    sendVote: function(voteValue) {
        if (KBHelpfulRating.onVoting !== true) {
            KBHelpfulRating.onVoting = true;
            jQuery.ajax({
                url: KBHelpfulRating.ajaxURL + "?context=" + KBHelpfulRating.countryCode,
                type: "POST",
                data: {
                    articleID: KBHelpfulRating.articleID,
                    cAritcleID: KBHelpfulRating.countryCode + "" + KBHelpfulRating.articleID,
                    vote: voteValue
                },
                success: function(res) {
                    KBHelpfulRating.allowedToVote = "N";
                    if (voteValue === "yes") {
                        jQuery(".helpful-yes-value").text(++KBHelpfulRating.yesValue);
                    } else {
                        jQuery(".helpful-no-value").text(++KBHelpfulRating.noValue);
                    }
                    KBHelpfulRating.thankYouPopup();
                    KBHelpfulRating.onVoting = false;
                }
            });
        }
    },
    thankYouPopup: function() {
        if (typeof swal !== "function") {
            return false;
        }
        swal({
            title: editPopupArticleRating.title_succes_message_after_vote,
            text: editPopupArticleRating.succes_message_after_vote,
            timer: 3000,
            showConfirmButton: false,
            type: "success"
        });
        return true;
    },
    userAlreadyVoted: function() {
        if (typeof swal !== "function") {
            return false;
        }
        swal({
            title: editPopupArticleRating.title_failure_message_after_vote,
            text: editPopupArticleRating.failure_message_after_vote,
            timer: 3000,
            showConfirmButton: false,
            type: "error"
        });
        return true;
    },
    requestLogin: function() {
        if (typeof swal !== "function") {
            return false;
        }
        swal({
            title: editPopupArticleRating.title_message_not_logged_in,
            text: editPopupArticleRating.message_not_logged_in,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#55b8cf",
            confirmButtonText: editPopupArticleRating.sign_in_button,
            cancelButtonText: editPopupArticleRating.cancel_button_text,
            closeOnConfirm: false
        }, function() {
            window.location.href = KBHelpfulRating.loginRedirectURL;
        });
        return true;
    },
    log: function(msg) {
        if (KBHelpfulRating.debug !== true) {
            return false;
        }
        console.log(msg);
    }
};
KBHelpfulRating.init();
jQuery.validator.addMethod("passwordFormat", function(value, element) {
    if ((value.length < 8) || (value.length > 16)) {
        return false;
    }
    if (/\d/.test(value) === false) {
        return false;
    }
    if (/[a-z]/.test(value) === false) {
        return false;
    }
    if (/[A-Z]/.test(value) === false) {
        return false;
    }
    return true;
}, "Password format is incorrect");
jQuery.validator.addMethod("customEmail", function(value, element) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value)
}, "Email format is incorrect");
var myAccountValidation = {
    debug: false,
    validator: null,
    sel: {
        switchButtons: "#sign-in .pwa-create-account, #registration .sign-in-switch",
        signIn: ".asset-contents #sign-in-form",
        register: ".asset-contents #registration",
        signInSubmit: "#SQ_LOGIN_SUBMIT[name='SQ_LOGIN_SUBMIT']",
        registerSubmit: "#sq_commit_button[name='sq_commit_button']"
    },
    init: function() {
        if (document.location.href.indexOf("/_admin") !== -1) {
            return false;
        }
        if (document.location.href.indexOf("/_edit") !== -1) {
            return false;
        }
        if (jQuery(myAccountValidation.sel.signIn).length === 0) {
            return false;
        }
        if (typeof (jQuery().validate) !== "function") {
            return false;
        }
        if (typeof cMsgValidation === "undefined") {
            return false;
        }
        myAccountValidation.prepareForm();
        return myAccountValidation.start();
    },
    prepareForm: function() {
        jQuery(myAccountValidation.sel.signIn).closest("form").removeAttr("onsubmit");
    },
    start: function() {
        var myAccountForm = jQuery(myAccountValidation.sel.signIn).closest("form");
        if (myAccountForm.length === 0) {
            return false;
        }
        var options = {
            ignore: ":not(:visible)",
            submitHandler: function(form) {
                form.submit();
            },
            errorPlacement: function(error, element) {
                var elType = jQuery(element).attr("type");
                if (elType === "checkbox") {
                    var h = jQuery(element).closest("div.row").find(".terms-and-conditions");
                    if (h.length > 0) {
                        error.insertAfter(h);
                    } else {
                        error.insertAfter(element)
                    }
                } else {
                    error.insertAfter(element);
                }
            }
        };
        myAccountValidation.validator = myAccountForm.validate(options)
        if (jQuery(myAccountValidation.sel.signIn).is(":visible") === true) {
            signInValidation.init();
        } else {
            registerValidation.init();
        }
        jQuery(myAccountValidation.sel.switchButtons).off("click.bindValidator");
        jQuery(myAccountValidation.sel.switchButtons).on("click.bindValidator", function() {
            console.log('switch')
            setTimeout(function() {
                myAccountValidation.restart();
            }, 1000);
        });
        jQuery(myAccountValidation.sel.signInSubmit).removeAttr("onclick").off("click.formSubmit");
        jQuery(myAccountValidation.sel.signInSubmit).on("click.formSubmit", function(e) {
            e.preventDefault();
            var isFormValid = myAccountForm.valid();
            if (isFormValid === false) {
                return false;
            }
            jQuery("input[id$='_ASSET_BUILDER_ACTION']").val("login");
            jQuery("input#SQ_ACTION").val("login");
            myAccountForm.submit();
        });
        jQuery(myAccountValidation.sel.registerSubmit).removeAttr("onclick").off("click.formSubmit");
        jQuery(myAccountValidation.sel.registerSubmit).on("click.formSubmit", function(e) {
            e.preventDefault();
            var isFormValid = myAccountForm.valid();
            if (isFormValid === false) {
                return false;
            }
            jQuery("input[id$='_ASSET_BUILDER_ACTION']").val("create");
            jQuery("input#SQ_ACTION").val("");
            myAccountForm.submit();
        });
        $('.my-account-forms input').keyup(function() {
            console.log($(this).attr('id'));
            var input = String('#' + $(this).attr('id'))
            if (myAccountValidation.validator.element(input) === true) {
                if ($(this).parent().find('i').length == 0) {
                    $(this).after('<i class="fas fa-check"></i>')
                }
            } else {
                $(this).parent().find('i').remove();
            }
        })
        return true;
    },
    restart: function() {
        if (myAccountValidation.validator !== null) {
            myAccountValidation.validator.destroy();
            myAccountValidation.validator = null;
        }
        myAccountValidation.log("Initial validator destroyed... re-initializing validator.");
        myAccountValidation.init();
    },
    log: function(msg) {
        if (myAccountValidation.debug !== true) {
            return false;
        }
        console.log(msg);
    }
};
var signInValidation = {
    init: function() {
        myAccountValidation.log("Applying Sign In rules...");
        var messages = messagesValidation.getMessages("signIn");
        jQuery("#SQ_LOGIN_USERNAME").rules("add", {
            "required": true,
            "messages": {
                "required": messages["SQ_LOGIN_USERNAME"].required
            }
        });
        jQuery("#SQ_LOGIN_PASSWORD").rules("add", {
            "required": true,
            "messages": {
                "required": messages["SQ_LOGIN_PASSWORD"].required
            }
        });
    }
};
var registerValidation = {
    init: function() {
        var messages = messagesValidation.getMessages("registration");
        jQuery("input[name='user_0_591']").rules("add", {
            "required": true,
            "messages": {
                "required": messages["fname"].required
            }
        });
        jQuery("input[name='user_0_592']").rules("add", {
            "required": true,
            "messages": {
                "required": messages["lname"].required
            }
        });
        jQuery("input[name='user_0_593']").rules("add", {
            "required": true,
            "customEmail": true,
            "messages": {
                "required": messages["email"].required,
                "customEmail": messages["email"].email
            }
        });
        jQuery("input[name='user_0_590_one']").rules("add", {
            "required": true,
            "minlength": 8,
            "passwordFormat": false,
            "messages": {
                "required": messages["pwd"].required,
                "minlength": messages["pwd"].minlength,
                "passwordFormat": messages["pwd"].passwordFormat,
            }
        });
        jQuery("input[name='user_0_590_two']").rules("add", {
            "required": true,
            "equalTo": "#user_0_590_one",
            "messages": {
                "required": messages["confirmPwd"].required,
                "equalTo": messages["confirmPwd"].equalTo
            }
        });
        jQuery("#t_and_c").rules("add", {
            "required": true,
            "messages": {
                "required": messages["t_and_c"].required
            }
        });
    }
};
var resetPassword = {
    sel: {
        resetPwdForm: "form[id^='page_password_reset_']"
    },
    init: function() {
        if ((jQuery(resetPassword.sel.resetPwdForm).length > 0) && (jQuery("#username").length > 0)) {
            resetPassword.initScreenValidation();
        }
        if ((jQuery(resetPassword.sel.resetPwdForm).length > 0) && (jQuery("#confirm-password").length > 0)) {
            resetPassword.pwdScreenValidation();
        }
    },
    initScreenValidation: function() {
        var messages = messagesValidation.getMessages("resetPwd");
        jQuery(resetPassword.sel.resetPwdForm).validate({
            rules: {
                username: {
                    required: true,
                    customEmail: true
                }
            },
            messages: {
                username: {
                    required: messages.username.required,
                    customEmail: messages.username.email
                }
            },
            submitHandler: function(form) {
                form.submit();
                jQuery(resetPassword.sel.resetPwdForm).find("input[type='submit']").attr("disabled", "disabled");
            }
        });
    },
    pwdScreenValidation: function() {
        var messages = messagesValidation.getMessages("resetPwd");
        jQuery(resetPassword.sel.resetPwdForm).validate({
            submitHandler: function(form) {
                form.submit();
                jQuery(resetPassword.sel.resetPwdForm).find("input[type='submit']").attr("disabled", "disabled");
            }
        });
        jQuery("input#password").rules("add", {
            "required": true,
            "minlength": 8,
            "passwordFormat": true,
            "messages": {
                "required": messages["pwd"].required,
                "minlength": messages["pwd"].minlength,
                "passwordFormat": messages["pwd"].passwordFormat,
            }
        });
        jQuery("input#confirm-password").rules("add", {
            "required": true,
            "equalTo": "#password",
            "messages": {
                "required": messages["confirmPwd"].required,
                "equalTo": messages["confirmPwd"].equalTo
            }
        });
    }
};
var messagesValidation = {
    getMessages: function(formType) {
        if (typeof formType === "undefined") {
            return {};
        }
        var allMessages = {};
        allMessages["signIn"] = {
            "SQ_LOGIN_USERNAME": {
                "required": cMsgValidation.email
            },
            "SQ_LOGIN_PASSWORD": {
                "required": cMsgValidation.pasword
            }
        };
        allMessages["registration"] = {
            "fname": {
                "required": cMsgValidation.firstName
            },
            "lname": {
                "required": cMsgValidation.lastName
            },
            "email": {
                "required": cMsgValidation.email,
                "email": cMsgValidation.emailFormat
            },
            "pwd": {
                "required": cMsgValidation.pasword,
                "minlength": cMsgValidation.passwordMinLength,
                "passwordFormat": cMsgValidation.passwordFormat
            },
            "confirmPwd": {
                "required": cMsgValidation.confirmPassword,
                "equalTo": cMsgValidation.passwordEqualTo
            },
            "t_and_c": {
                "required": cMsgValidation.termsandConditions
            }
        };
        allMessages["resetPwd"] = {
            "username": {
                "required": cMsgValidation.email,
                "email": cMsgValidation.emailFormat
            },
            "pwd": {
                "required": cMsgValidation.pasword,
                "minlength": cMsgValidation.passwordMinLength,
                "passwordFormat": cMsgValidation.passwordFormat
            },
            "confirmPwd": {
                "required": cMsgValidation.confirmPassword,
                "equalTo": cMsgValidation.passwordEqualTo
            }
        };
        return allMessages[formType];
    }
};
var contextableRegistration = {
    contentOnlySuffix: "?SQ_ASSET_CONTENTS_RAW",
    init: function() {
        jQuery(document).on("__CP_User_NotLoggedIn", function() {
            contextableRegistration.start();
        });
    },
    start: function() {
        if (jQuery("#registration").length === 0) {
            return false;
        }
        if (jQuery.cookie("wssrfix") === "true") {
            return false;
        }
        var pageDetails = contextableRegistration.getDetails();
        if (typeof (pageDetails.url) === "undefined") {
            return false;
        }
        if (typeof (pageDetails.fixcontext) === "undefined") {
            return false;
        }
        if (pageDetails.url.length === 0) {
            return false;
        }
        if (pageDetails.fixcontext === "false") {
            return false;
        }
        jQuery.ajax({
            url: pageDetails.url + "" + contextableRegistration.contentOnlySuffix,
            success: function() {
                jQuery.cookie("wssrfix", "true", {
                    path: "/"
                });
            }
        });
        return true;
    },
    getDetails: function() {
        var details = {};
        details.url = jQuery("#public-user-data").attr("data-regurl");
        details.fixcontext = jQuery("#public-user-data").attr("data-fixcontext");
        return details;
    }
};
myAccountValidation.init();
resetPassword.init();
contextableRegistration.init();
var searchOverlay = {
    init: function() {
        if (jQuery("#search-form").length === 0) {
            return false;
        }
        searchOverlay.attachGlobalEvents();
        if (jQuery("body").hasClass("home") === true) {
            searchOverlay.attachOutsideHomeEvents();
        } else {
            searchOverlay.attachOutsideEvents();
        }
    },
    attachOutsideEvents: function(isThisHome) {
        jQuery("body").on("focus.showOverlay", ".search-box input", function(e) {
            console.log('test')
            e.preventDefault();
            setTimeout(function() {
                jQuery("#search-form .query").trigger("focus");
            }, 10);
            jQuery('html, body').animate({
                scrollTop: 0
            }, 800);
            searchOverlay.showOverlay(false);
        });
    },
    attachOutsideHomeEvents: function() {
        jQuery("body").on("focus.showOverlay, click.showOverlay", ".carousel-form-wrapper input", function(e) {
            if (jQuery(this).hasClass("ov") === false) {
                var position = $(this).offset().top;
                jQuery('html, body').animate({
                    scrollTop: position - 100
                }, 800);
                searchOverlay.showOverlay(true, $(this));
            }
        });
        jQuery("body").on("keyup.searchOverlay", ".carousel-form-wrapper input", function(e) {
            var keycode = e.keyCode;
            var validKeyCode = (keycode > 47 && keycode < 58) || (keycode > 64 && keycode < 91) || (keycode > 95 && keycode < 112) || (keycode > 185 && keycode < 193) || (keycode > 218 && keycode < 223);
            if (keycode === 8) {
                validKeyCode = true;
            }
            if ((jQuery(this).hasClass("ov") === false) && (validKeyCode === true)) {
                searchOverlay.showOverlay(true, $(this));
            }
        });
    },
    attachGlobalEvents: function() {
        jQuery(".navbar-header .btn.search-toggle").on("click.showOverlay", function(e) {
            e.preventDefault();
            searchOverlay.showOverlay(false);
        });
        jQuery("body").on("click.closeOverlay", "#search-form .close-search", function(e) {
            e.preventDefault();
            searchOverlay.closeOverlay(jQuery("body").hasClass("home"));
        });
        jQuery("body").on("mouseenter.showClear", "#search-form .clear-query.show", function(e) {
            jQuery(this).addClass("hover");
        });
        jQuery("body").on("mouseleave.hideClear", "#search-form .clear-query.show", function(e) {
            jQuery(this).removeClass("hover");
        });
        jQuery("body").on("click.clearQuery", "#search-form .clear-query.show", function(e) {
            e.preventDefault();
            jQuery("#search-form .query").val("").trigger("focus");
            jQuery(this).removeClass("show hover");
            jQuery("#search-form .results-placeholder").html("");
        });
        jQuery("body").on("keyup.showClear", "#search-form .query", function(e) {
            searchOverlay.showClear();
        });
        jQuery("#search-form input.query").autocomplete({
            source: function(request, response) {
                var thisQuery = jQuery("#search-form input.query").val();
                jQuery.ajax({
                    url: search_settings.ajaxUrl,
                    type: "GET",
                    data: "query=" + thisQuery,
                    success: function(data) {
                        searchOverlay.showResults(data);
                    },
                    error: function() {
                        searchOverlay.showError();
                    }
                });
            },
            delay: 300,
            search: function(event, ui) {
                jQuery("#search-form .loading-results").show();
            },
            open: function(event, ui) {
                jQuery("#search-form .loading-results").hide();
            },
            close: function(event, ui) {
                jQuery("#search-form .loading-results").hide();
            },
            minLength: 3
        });
    },
    showOverlay: function(isThisHome, input) {
        jQuery("#search-form .close-search").hide().fadeIn();
        jQuery("#search-overlay").fadeIn();
        jQuery("#search-form .loading-results").hide();
        jQuery("#search-form .results-placeholder").fadeIn();
        jQuery("#search-form .query").addClass("ov");
        if (isThisHome === true) {
            jQuery("#search-form").removeClass("homepage").css("display", "block");
            var height = $(input).parent().height();
            jQuery("#search-form input,#search-form .submit-button").css("height", height);
            jQuery("#search-form").fadeIn(function() {
                $('.carousel').carousel('pause');
                var position = input.offset().top;
                $('.search #search-form').css('top', position);
            });
            setTimeout(function() {
                jQuery("#search-form .query").trigger("focus");
            }, 10);
            jQuery("body").on("keyup.searchOverlay", "#search-form input", function(e) {
                var value = $("this").val();
                $('.carousel-form-wrapper input').val(value);
            });
        } else {
            jQuery("#search-form").fadeIn(function() {});
        }
    },
    closeOverlay: function(isThisHome) {
        if (jQuery(".search-overlay input.search-input-overlay").hasClass("ui-autocomplete-input") === true) {
            jQuery(".search-overlay input.search-input-overlay").autocomplete("close");
        }
        searchOverlay.showClear();
        setTimeout(function() {
            jQuery("#search-form .loading-results").stop().hide().removeAttr("style");
            jQuery("#search-form .results-placeholder").stop().removeAttr("style").hide();
            jQuery("#search-form .close-search").fadeOut();
            jQuery("#search-form .query").removeClass("ov");
            if (isThisHome === true) {
                jQuery("#search-form").addClass("close-form");
                jQuery("#search-overlay").fadeOut(function() {
                    jQuery("#search-form").addClass("homepage");
                    jQuery("#search-form").removeClass("close-form");
                    if (jQuery("#search-form")[0].style.removeProperty) {
                        jQuery("#search-form")[0].style.removeProperty("display");
                    } else {
                        jQuery("#search-form")[0].style.removeAttribute("display");
                    }
                    jQuery("#search-form").css('display', 'none');
                });
            } else {
                jQuery("#search-form").fadeOut();
                jQuery("#search-overlay").fadeOut();
            }
        }, 200);
    },
    showResults: function(data) {
        jQuery("#search-form .results-placeholder").hide();
        jQuery("#search-form .results-placeholder").html(data);
        jQuery("#search-form .loading-results").hide();
        if (jQuery("#search-overlay").is(":visible") === true) {
            jQuery("#search-form .results-placeholder").fadeIn();
            jQuery("#search-form").addClass("results-displayed");
        }
    },
    showError: function() {},
    showClear: function() {
        if (jQuery("#search-form input.query").val().length > 0) {
            jQuery("#search-form .clear-query").addClass("show");
        } else {
            jQuery("#search-form .clear-query").removeClass("show");
        }
    },
};
var focusTabindex = {
    prevInput: null,
    prevButton: null,
    init: function() {
        focusTabindex.setfocus();
    },
    setfocus: function() {
        if ($('.carousel-inner .item').length === 1) {
            $('.carousel-indicators li').attr('tabindex', '-1')
        }
        $("#close-search").on("focusout.next", function() {
            if ($(".show-all-container").is(":visible")) {
                $("#search-form #overlay-query").focus();
            } else {
                $("#search-form #overlay-query").focus();
            }
        });
        $("#close-search").click(function() {
            $("#overlay-query").focusout();
            $('.carousel-form-wrapper input').focusout();
            $("#close-search").focusout();
            $('.carousel-caption .carousel-text').keyup(function(e) {
                var code = e.keyCode || e.which;
                if (code == '9') {
                    $(focusTabindex.prevInput).attr('tabindex', '0');
                    $(focusTabindex.prevButton).attr('tabindex', '0');
                }
            });
            $('.banner-forms form button').keyup(function(e) {
                var code = e.keyCode || e.which;
                if (code == '9') {
                    $('.banner-forms input').attr('tabindex', '0');
                }
            });
            $('.banner-forms input').each(function() {
                $(this).attr('tabindex', '-1');
            });
            $('.carousel-inner input').each(function() {
                if ($(this).is(':visible')) {
                    $(focusTabindex.prevButton).attr('tabindex', '0');
                    $(focusTabindex.prevInput).attr('tabindex', '0');
                    $(this).attr('tabindex', '-1');
                    $(this).next('button').attr('tabindex', '-1');
                    focusTabindex.prevButton = $(this).next('button');
                    focusTabindex.prevInput = $(this);
                }
            });
        });
    }
};
focusTabindex.init();
searchOverlay.init();
var kbLanding = {
    sel: {
        lhsSel: "#kb-nav",
        subPageSel: ".items-list.kb-promoted",
        linkSel: ".navbar-item a",
        listings: ".landing",
        contentWrappper: ".asset-contents",
        backBtn: "a.close-kb-content",
        noResults: "li.article-item.no-results",
        showAll: "a.kb-show-all",
        animationFlag: null
    },
    settings: {
        reqSuffix: "SQ_DESIGN_NAME=blank&mode=landing&show=0"
    },
    init: function() {
        if ((jQuery(kbLanding.sel.lhsSel).length > 0) && (jQuery(kbLanding.sel.subPageSel).length === 0)) {
            kbLanding.attachLhsEvents();
        } else {
            var lhsObj = jQuery(kbLanding.sel.lhsSel)
            lhsObj.find(kbLanding.sel.linkSel).click(function() {
                var url = $(this).attr('href');
                window.location.href = url;
            });
        }
    },
    attachLhsEvents: function() {
        var lhsObj = jQuery(kbLanding.sel.lhsSel);
        if (typeof (lhsObj.attr("data-req")) !== "undefined") {
            kbLanding.settings.reqSuffix = lhsObj.attr("data-req");
        }
        lhsObj.find(kbLanding.sel.linkSel).click(function(e) {
            e.preventDefault();
            kbLanding.handleLhsClick(jQuery(this))
        });
    },
    handleLhsClick: function(linkObj) {
        var linkId = linkObj.closest("li").attr("data-id");
        if (linkId === undefined) {
            return false;
        }
        var linkUrl = linkObj.attr("href");
        if (jQuery("#c-" + linkId).length > 0) {
            return kbLanding.showContent(linkId);
        }
        return kbLanding.loadContent(linkId, linkUrl);
    },
    loadContent: function(linkId, linkUrl) {
        jQuery.ajax({
            url: linkUrl,
            data: kbLanding.settings.reqSuffix,
            success: function(resp) {
                kbLanding.loadContentCallback(resp, linkId);
            }
        });
        return true;
    },
    loadContentCallback: function(content, linkId) {
        jQuery(kbLanding.sel.contentWrappper).find(kbLanding.sel.listings + ":last").after(content);
        kbLanding.showContent(linkId);
        jQuery("#c-" + linkId).find(kbLanding.sel.backBtn).click(function(e) {
            e.preventDefault();
            jQuery(this).closest(kbLanding.sel.listings).fadeOut(function() {
                jQuery(kbLanding.sel.contentWrappper).find(kbLanding.sel.listings + ":first").fadeIn();
                $('#kb-nav .nav li').removeClass('active');
            });
        });
        if (jQuery("#c-" + linkId).find(kbLanding.sel.noResults).length === 2) {
            jQuery("#c-" + linkId).find(kbLanding.sel.showAll).hide();
        }
    },
    showContent: function(linkId) {
        var thidCardId = linkId;
        if (kbLanding.sel.animationFlag !== null) {
            kbLanding.sel.animationFlag.stop().fadeOut("fast", function() {
                jQuery(kbLanding.sel.listings).stop().hide();
                kbLanding.sel.animationFlag = jQuery("#c-" + thidCardId);
                kbLanding.sel.animationFlag.fadeIn(function() {
                    jQuery(this).removeClass("loading");
                    kbLanding.sel.animationFlag = null;
                });
            });
        } else {
            jQuery(kbLanding.sel.listings).filter(function() {
                kbLanding.sel.animationFlag = jQuery("#c-" + thidCardId);
                return jQuery(this).is(":visible");
            }).fadeOut(function() {
                kbLanding.sel.animationFlag.fadeIn(function() {
                    jQuery(this).removeClass("loading");
                    kbLanding.sel.animationFlag = null;
                    if ($("#kb-nav .navbar-toggler").is(":visible") == true) {
                        var position = $('.dynamic-content.landing.kb-promoted:visible').offset().top;
                        jQuery('html, body').animate({
                            scrollTop: position
                        }, 800);
                    }
                });
            });
        }
        return true;
    },
    showLoading: function() {
        jQuery(kbLanding.sel.listings).filter(function() {
            return jQuery(this).is(":visible");
        }).addClass("loading");
    },
};
var knowledgeCategory = {
    init: function() {
        knowledgeCategory.changeActive();
    },
    changeActive: function() {
        $("#kb-nav .nav li a").click(function(e) {
            e.preventDefault();
            $("#kb-nav .nav li").removeClass("active");
            $(this).closest("li").addClass("active");
        });
    },
    removeActive: function() {
        $(".kb-promoted .close-kb-content").click(function(e) {
            e.preventDefault();
        });
    }
};
var kblandingPage = {
    init: function() {
        this.loadLhs();
        this.selectCategory();
    },
    loadLhs: function() {
        jQuery("#section-nav li a").click(function(e) {
            e.preventDefault();
            var thisContent = jQuery(this).attr("data-id");
            if (jQuery(".latest.reload").is(":visible") === true) {
                jQuery(".latest.reload").fadeOut(function() {
                    jQuery("#" + thisContent).fadeIn();
                });
            } else {
                jQuery(".dynamic-content:visible").fadeOut(function() {
                    jQuery("#" + thisContent).fadeIn();
                });
            }
        });
        jQuery(".close-dynamic-content").click(function(e) {
            e.preventDefault();
            jQuery(this).closest(".dynamic-content").fadeOut(function() {
                jQuery(".latest.reload").fadeIn();
            });
        });
        $(".section-nav .navbar-brand").click(function(e) {
            e.preventDefault();
        });
    },
    selectCategory: function() {
        $("#kb-nav .navbar-item a ").click(function(e) {
            if ($("#kb-nav .navbar-toggler").is(":visible") == true) {
                $("#kb-nav .navbar-toggler").trigger("click");
            }
        });
    }
};
kbLanding.init();
knowledgeCategory.init();
kblandingPage.init();
var keepLocalStorageTidy = {
    init: function(prefix, itemToKeep) {
        if (prefix === undefined) {
            return false;
        }
        var arr = [];
        for (var key in localStorage) {
            if (key.substring(0, prefix.length) === prefix) {
                if (itemToKeep !== undefined && key !== itemToKeep) {
                    arr.push(key);
                }
            }
        }
        for (var i = 0; i < arr.length; i++) {
            localStorage.removeItem(arr[i]);
        }
    }
};
var fbSearchCart = {
    listenersApplied: false,
    isThisSearch: false,
    metaTimeout: 2000,
    attempts: 0,
    metaAttempts: 0,
    countryCode: "en",
    delClass: "remove",
    delIconClass: "fas fa-trash",
    addIconClass: "far fa-bookmark",
    titles: {
        del: "Remove from Reading List",
        add: "Add to Reading List"
    },
    linkSel: "div.cp-tools .rl-bookmark",
    articleSel: "div.js-article-page",
    articleHeader: "div.cp-tools",
    searchItemHeader: "#search-container .search-item-button",
    searchLinkSel: "#search-container .search-item-button a.rl-bookmark",
    searchPageDS: "#search-container",
    sortSel: "#sort-items",
    urls: {
        setSearchCart: "",
        updateCart: "",
        removeCart: ""
    },
    init: function() {
        fbSearchCart.getCountryCode();
        jQuery(document).on("__CP_User_LoggedIn", function() {
            fbSearchCart.start();
        });
    },
    start: function() {
        if (wssUserDetails.userLoggedIn === true && wssUserDetails.fbid === "true") {
            fbSearchCart.getCurrentList();
        }
        if (jQuery(fbSearchCart.articleSel).length > 0) {
            fbSearchCart.startArticle();
        }
        fbSearchCart.searchPageSetup();
    },
    getCountryCode: function() {
        var countryCode = jQuery("html").attr("lang");
        if ((typeof (countryCode) !== "undefined") && (countryCode.length > 0)) {
            fbSearchCart.countryCode = countryCode;
        }
    },
    getEndpoints: function(bookmarkItem) {
        fbSearchCart.urls.setSearchCart = bookmarkItem.attr("data-fbs");
        fbSearchCart.urls.updateCart = bookmarkItem.attr("data-fbc");
        fbSearchCart.urls.removeCart = bookmarkItem.attr("data-fbd");
    },
    getCurrentList: function() {
        var lastLogin = localStorage.getItem("cp-ll");
        if (lastLogin === null || lastLogin === undefined || lastLogin !== wssUserDetails.ll) {
            localStorage.setItem("cp-ll", wssUserDetails.ll);
            keepLocalStorageTidy.init("cp-fbid--", "cp-fbid--" + wssUserDetails.userId);
            if (typeof cpWS.rlIds === "undefined") {
                return false;
            }
            jQuery.ajax({
                url: cpWS.rlIds,
                success: function(json) {
                    fbSearchCart.getCurrentListCallback(json);
                }
            });
            return true;
        }
        return true;
    },
    getCurrentListCallback: function(json) {
        json = isJson.init(json);
        if (json === false) {
            return false;
        }
        if (json.success === false) {
            return false;
        }
        if (typeof json.items === "undefined") {
            return false;
        }
        var items = "|" + json.items.join("|") + "|";
        localStorage.setItem("cp-rl--" + wssUserDetails.userId, items);
        keepLocalStorageTidy.init("cp-rl--", "cp-rl--" + wssUserDetails.userId);
        fbSearchCart.reviewLinks();
        return true;
    },
    reviewLinks: function() {
        var storedIds = localStorage.getItem("cp-rl--" + wssUserDetails.userId);
        if (storedIds === null || storedIds === undefined) {
            return false;
        }
        var h = "";
        jQuery(fbSearchCart.linkSel + ", " + fbSearchCart.searchLinkSel).each(function() {
            if (jQuery(this).closest("li.search-item").length > 0) {
                h = jQuery(this).closest("li.search-item").attr("data-id");
            } else {
                h = jQuery("body").attr("data-asset-id");
            }
            if (h !== undefined) {
                h = fbSearchCart.countryCode + h;
                if (storedIds.indexOf("|" + h + "|") !== -1) {
                    jQuery(this).addClass(fbSearchCart.delClass);
                    jQuery(this).find("i").removeClass(fbSearchCart.addIconClass).addClass(fbSearchCart.delIconClass);
                } else {
                    jQuery(this).removeClass(fbSearchCart.delClass);
                    jQuery(this).find("i").removeClass(fbSearchCart.delIconClass).addClass(fbSearchCart.addIconClass);
                }
            }
        });
        if (fbSearchCart.listenersApplied !== true) {
            fbSearchCart.listenersApplied = true;
            fbSearchCart.applyChangeListeners();
        }
    },
    startArticle: function() {
        jQuery(fbSearchCart.articleHeader).append(fbSearchCart.linkHtmlTemplate);
        fbSearchCart.reviewLinks();
        fbSearchCart.getEndpoints(jQuery(fbSearchCart.articleSel));
        fbSearchCart.attachEvents(jQuery(fbSearchCart.linkSel));
    },
    searchPageSetup: function() {
        if (wssUserDetails.userLoggedIn !== true) {
            return false;
        }
        if (jQuery(fbSearchCart.searchPageDS).length > 0) {
            jQuery(fbSearchCart.searchItemHeader).append(fbSearchCart.linkHtmlTemplate);
            fbSearchCart.getEndpoints(jQuery(fbSearchCart.searchPageDS));
            fbSearchCart.isThisSearch = true;
            fbSearchCart.attachEvents(jQuery(fbSearchCart.searchLinkSel));
            fbSearchCart.reviewLinks();
        }
    },
    setNewSearchCart: function(itemLink) {
        jQuery.ajax({
            url: fbSearchCart.urls.setSearchCart,
            error: function() {
                fbSearchCart.error("Error: Cannot identify user");
            },
            success: function(resp) {
                fbSearchCart.setCookie(resp, itemLink);
            }
        });
    },
    setCookie: function(resp, itemLink) {
        if (resp.success === false) {
            fbSearchCart.error(resp.error);
        } else {
            if (typeof jQuery("#user-data").attr("data-fbmetaid") === "undefined" || wssUserDetails.userId === null) {
                fbSearchCart.error(fbCartMsg.metaError.text);
            } else {
                var metaId = jQuery("#user-data").attr("data-fbmetaid");
                var tokenVal = resp.userid;
                js_api.setMetadata({
                    asset_id: wssUserDetails.userId,
                    field_id: metaId,
                    field_val: tokenVal,
                    dataCallback: function(jsApiResp) {
                        fbSearchCart.setCookieCallback(jsApiResp, itemLink, tokenVal);
                    }
                });
            }
        }
    },
    setCookieCallback: function(resp, itemLink, tokenVal) {
        if (typeof resp.error !== "undefined") {
            fbSearchCart.refreshToken(itemLink, tokenVal);
        } else {
            localStorage.setItem("cp-fbid--" + wssUserDetails.userId, tokenVal);
            keepLocalStorageTidy.init("cp-fbid--", "cp-fbid--" + wssUserDetails.userId);
            wssUserDetails.fbid = "true";
            setTimeout(function() {
                fbSearchCart.updateCart(itemLink);
            }, fbSearchCart.metaTimeout);
        }
    },
    refreshToken: function(itemLink, fbTokenVal) {
        if (fbSearchCart.metaAttempts > 3) {
            return fbSearchCart.error(fbCartMsg.tokenError.text);
        }
        fbSearchCart.metaAttempts++;
        var fbResp = {
            success: true,
            userid: fbTokenVal
        };
        if (jQuery("#js-api").length === 0) {
            return fbSearchCart.error(fbCartMsg.tokenError.text);
        }
        if (typeof js_api !== "object") {
            return fbSearchCart.error(fbCartMsg.tokenError.text);
        }
        var jsApiSrc = jQuery("#js-api").attr("src");
        jQuery.ajax({
            url: jsApiSrc + "?SQ_ACTION=getToken",
            headers: {
                "X-SquizMatrix-JSAPI-Key": js_api.key
            },
            success: function(resp) {
                if (resp.length > 0) {
                    js_api.nonceToken = resp;
                    fbSearchCart.setCookie(fbResp, itemLink);
                } else {
                    fbSearchCart.error(fbCartMsg.tokenError.text);
                }
            }
        });
        return true;
    },
    attachEvents: function(bookmarkItem) {
        bookmarkItem.off("click.add");
        bookmarkItem.on("click.add", function(e) {
            e.preventDefault();
            fbSearchCart.startFunctionality(jQuery(this));
        });
    },
    startFunctionality: function(itemLink) {
        if (wssUserDetails.fbid === "true") {
            fbSearchCart.updateCart(itemLink);
        } else {
            fbSearchCart.setNewSearchCart(itemLink);
        }
    },
    updateCart: function(itemLink) {
        var thisUrl = window.location.href.split("#")[0];
        if (thisUrl.indexOf("?d=") === -1) {
            thisUrl = thisUrl.split("?")[0];
        }
        thisUrl = thisUrl.split("/_nocache")[0];
        thisUrl = thisUrl.split("/_recache")[0];
        var hUrl = null;
        var thisId = null;
        if (fbSearchCart.isThisSearch === true) {
            hUrl = itemLink.closest("li.search-item").find("small:eq(0)").text();
            if (hUrl !== undefined && hUrl !== "") {
                thisUrl = hUrl;
            }
            thisId = itemLink.closest("li.search-item").attr("data-id");
        } else {
            thisId = jQuery("body").attr("data-asset-id");
        }
        thisId = fbSearchCart.countryCode + thisId;
        var action = "add";
        var fbUrl = fbSearchCart.urls.updateCart;
        if (itemLink.hasClass(fbSearchCart.delClass) === true) {
            action = "del";
            fbUrl = fbSearchCart.urls.removeCart;
        }
        jQuery.ajax({
            url: fbUrl,
            data: "url=" + thisUrl,
            error: function() {
                fbSearchCart.error(fbCartMsg.cannotAdd.text);
            },
            success: function(resp) {
                if (resp.success === true) {
                    fbSearchCart.success(thisId, itemLink, action);
                } else {
                    fbSearchCart.updateErrorCallback(resp, itemLink);
                }
            }
        });
    },
    updateErrorCallback: function(resp, articleUrl) {
        if (typeof resp.code === "undefined") {
            return fbSearchCart.error(resp.error);
        }
        if (resp.code !== "01") {
            return fbSearchCart.error(resp.error);
        }
        if (fbSearchCart.attempts > 3) {
            return fbSearchCart.error(fbCartMsg.tokenError.text);
        }
        fbSearchCart.attempts++;
        setTimeout(function() {
            fbSearchCart.updateCart(articleUrl);
        }, 500);
        return true;
    },
    error: function(msg) {
        if (typeof swal === "function") {
            swal({
                title: fbCartMsg.title,
                text: msg,
                showConfirmButton: true,
                type: "error"
            });
        } else {
            alert(msg);
        }
    },
    success: function(id, itemLink, action) {
        fbSearchCart.attempt = 0;
        if (action === "add") {
            if (typeof swal === "function") {
                swal({
                    title: fbCartMsg.add.title,
                    text: fbCartMsg.add.text,
                    showConfirmButton: true,
                    type: "success"
                });
            } else {
                alert(fbCartMsg.add.text);
            }
            fbSearchCart.addToStorage(id, itemLink);
        } else {
            if (typeof swal === "function") {
                swal({
                    title: fbCartMsg.del.title,
                    text: fbCartMsg.del.text,
                    showConfirmButton: true,
                    type: "success"
                });
            } else {
                alert(fbCartMsg.del.text);
            }
            fbSearchCart.delFromStorage(id, itemLink);
        }
        jQuery(document).trigger("__CP_ReadingList_Updated");
    },
    addToStorage: function(id, itemLink) {
        if (typeof id === "undefined" || id === null) {
            return false;
        }
        if (id.length === 0) {
            return false;
        }
        var storedIds = localStorage.getItem("cp-rl--" + wssUserDetails.userId);
        if (storedIds === null || storedIds === undefined) {
            storedIds = "|";
        }
        if (storedIds.indexOf("|" + id + "|") === -1) {
            storedIds += id + "|";
            localStorage.setItem("cp-rl--" + wssUserDetails.userId, storedIds);
        }
        itemLink.attr("title", fbSearchCart.titles.del);
        itemLink.addClass(fbSearchCart.delClass);
        itemLink.find("i").removeClass(fbSearchCart.addIconClass).addClass(fbSearchCart.delIconClass);
    },
    delFromStorage: function(id, itemLink) {
        if (typeof id === "undefined" || id === null) {
            return false;
        }
        if (id.length === 0) {
            return false;
        }
        var storedIds = localStorage.getItem("cp-rl--" + wssUserDetails.userId);
        if (storedIds === null || storedIds === undefined) {
            storedIds = "|";
        }
        if (storedIds.indexOf("|" + id + "|") !== -1) {
            storedIds = storedIds.replace("|" + id + "|", "|");
            localStorage.setItem("cp-rl--" + wssUserDetails.userId, storedIds);
        }
        itemLink.attr("title", fbSearchCart.titles.add);
        itemLink.removeClass(fbSearchCart.delClass);
        itemLink.find("i").removeClass(fbSearchCart.delIconClass).addClass(fbSearchCart.addIconClass);
    },
    applyChangeListeners: function() {
        if (typeof window.addEventListener === "function" && typeof window.removeEventListener === "function") {
            window.removeEventListener("storage", fbSearchCart.listenForChanges, false);
            window.addEventListener("storage", fbSearchCart.listenForChanges, false);
        }
    },
    listenForChanges: function(e) {
        if (typeof (e) === "undefined") {
            return false;
        }
        var changedItem = e.key;
        if (changedItem === null || changedItem === undefined) {
            return false;
        }
        if (changedItem.indexOf("cp-rl--") !== -1) {
            fbSearchCart.reviewLinks();
        }
        return true;
    }
};
var fbSearchCartDel = {
    wsUrl: null,
    listenersApplied: false,
    sel: {
        linkSel: "a.reading-article-delete",
        sectionSel: "#my-reading-articles",
        pageContent: ".my-reading-list-page-content"
    },
    init: function() {
        if (jQuery(fbSearchCartDel.sel.sectionSel).length > 0) {
            fbSearchCartDel.attachEvents();
            fbSearchCartDel.wsUrl = jQuery(fbSearchCartDel.sel.sectionSel).attr("data-fbd");
        }
        if (fbSearchCartDel.listenersApplied === false) {
            fbSearchCartDel.listenersApplied = true;
            fbSearchCartDel.applyChangeListeners();
        }
    },
    attachEvents: function() {
        jQuery(fbSearchCartDel.sel.sectionSel).on("click.del", fbSearchCartDel.sel.linkSel, function(e) {
            e.preventDefault();
            fbSearchCartDel.removeItem(jQuery(this));
        });
    },
    removeItem: function(linkObj) {
        var thisUrl = linkObj.attr("data-del");
        if (thisUrl === undefined || thisUrl.length === 0) {
            return false;
        }
        if (fbSearchCartDel.wsUrl === null || fbSearchCartDel.wsUrl === undefined) {
            return false;
        }
        var thisId = linkObj.attr("data-id");
        thisId = fbSearchCart.countryCode + thisId;
        jQuery.ajax({
            url: fbSearchCartDel.wsUrl,
            data: "url=" + thisUrl,
            success: function(resp) {
                fbSearchCartDel.removeCallback(resp, thisId);
            },
            error: function() {
                fbSearchCartDel.err();
            }
        });
        return true;
    },
    removeCallback: function(resp, thisId) {
        if (typeof resp === "string") {
            resp = JSON.parse(resp);
        }
        if (resp.success !== true) {
            return fbSearchCartDel.err();
        }
        fbSearchCartDel.updatePage();
        if (thisId !== undefined) {
            fbSearchCartDel.updateStorage(thisId);
        }
    },
    updatePage: function() {
        var thisUrl = window.location.href;
        thisUrl = thisUrl.split("#")[0];
        thisUrl = thisUrl.split("?")[0];
        thisUrl += "?SQ_ASSET_CONTENTS_RAW";
        jQuery.ajax({
            url: thisUrl,
            success: function(newHtml) {
                jQuery(fbSearchCartDel.sel.sectionSel).find(fbSearchCartDel.sel.pageContent).fadeOut(function() {
                    var view = $(".reading-view").attr("data-u");
                    jQuery(this).html(newHtml);
                    readingList.init();
                    if (view == "card") {
                        $(".list-container").css("display", "none");
                        $(".card-container").css("display", "flex");
                        $(".reading-view a").removeClass("active");
                        $(".reading-view .card-view").addClass("active");
                        $(".reading-view").attr("data-u", "card");
                    } else {
                        $(".card-container").css("display", "none");
                        $(".list-container").css("display", "block");
                        $(".reading-view a").removeClass("active");
                        $(".reading-view .list-view").addClass("active");
                        $(".reading-view").attr("data-u", "list");
                    }
                    jQuery(this).fadeIn();
                });
            },
            error: function() {
                window.location.reload();
            }
        });
    },
    updateStorage: function(id) {
        if (typeof id === "undefined" || id === null) {
            return false;
        }
        if (id.length === 0) {
            return false;
        }
        if (wssUserDetails.userId === null) {
            return false;
        }
        var storedIds = localStorage.getItem("cp-rl--" + wssUserDetails.userId);
        if (storedIds === null || storedIds === undefined) {
            storedIds = "";
        }
        if (storedIds.indexOf("|" + id + "|") !== -1) {
            storedIds = storedIds.replace("|" + id + "|", "|");
            localStorage.setItem("cp-rl--" + wssUserDetails.userId, storedIds);
        }
        return true;
    },
    err: function() {
        if (typeof swal === "function") {
            swal({
                title: fbCartMsg.err.title,
                text: fbCartMsg.err.text,
                showConfirmButton: true,
                type: "error"
            });
        } else {
            alert(fbCartMsg.err.text);
        }
    },
    applyChangeListeners: function() {
        if (typeof window.addEventListener === "function" && typeof window.removeEventListener === "function") {
            window.removeEventListener("storage", fbSearchCartDel.listenForChanges, false);
            window.addEventListener("storage", fbSearchCartDel.listenForChanges, false);
        }
    },
    listenForChanges: function(e) {
        if (typeof (e) === "undefined") {
            return false;
        }
        var changedItem = e.key;
        if (changedItem === null || changedItem === undefined) {
            return false;
        }
        if (changedItem.indexOf("cp-rl--") !== -1) {
            fbSearchCartDel.updatePage();
        }
        return true;
    }
};
var readingList = {
    sel: {
        section: ".reading-list-articles",
        sortSel: "#sort-items",
        viewSel: ".reading-view a.active"
    },
    init: function() {
        readingList.attachEvents();
    },
    attachEvents: function() {
        jQuery(readingList.sel.section).off("change.sort", readingList.sel.sortSel);
        jQuery(readingList.sel.section).on("change.sort", readingList.sel.sortSel, function(e) {
            e.preventDefault();
            readingList.updatePage();
        });
        var animationFlag = null
        $('.reading-view a').click(function(e) {
            e.preventDefault();
            if (animationFlag !== null) {
                $('.reading-view a').removeClass("active");
                jQuery(this).addClass("active");
                animationFlag.stop().fadeOut("fast", function() {
                    if ($('.reading-view a.active').hasClass("list-view") === true) {
                        animationFlag = jQuery(".list-container");
                        jQuery(".reading-view").attr('data-u', 'list');
                        jQuery(".card-container").fadeOut(function() {
                            animationFlag.fadeIn(function() {
                                animationFlag = null;
                            });
                        });
                    } else {
                        animationFlag = jQuery(".card-container");
                        jQuery(".reading-view").attr('data-u', 'card');
                        jQuery(".list-container").fadeOut(function() {
                            animationFlag.fadeIn(function() {
                                animationFlag = null;
                            });
                        });
                    }
                });
            } else {
                $('.reading-view a').removeClass("active");
                jQuery(this).addClass("active");
                if (jQuery(this).hasClass("list-view") === true) {
                    animationFlag = jQuery(".list-container");
                    jQuery(".reading-view").attr('data-u', 'list');
                    jQuery(".card-container").fadeOut(function() {
                        animationFlag.fadeIn(function() {
                            animationFlag = null;
                        });
                    });
                } else {
                    animationFlag = jQuery(".card-container");
                    jQuery(".reading-view").attr('data-u', 'card');
                    jQuery(".list-container").fadeOut(function() {
                        animationFlag.fadeIn(function() {
                            animationFlag = null;
                        });
                    });
                }
            }
        });
    },
    updatePage: function() {
        var thisUrl = window.location.href;
        thisUrl = thisUrl.split("#")[0];
        thisUrl = thisUrl.split("?")[0];
        thisUrl += "?SQ_ASSET_CONTENTS_RAW";
        if (jQuery(readingList.sel.sortSel).val() !== undefined) {
            thisUrl += "&sort=" + jQuery(readingList.sel.sortSel).val();
        }
        if (jQuery(readingList.sel.viewSel).length > 0) {
            thisUrl += "&view=" + jQuery(readingList.sel.viewSel).attr("data-view");
        }
        jQuery.ajax({
            url: thisUrl,
            success: function(newHtml) {
                readingList.updatePageSuccess(newHtml);
            },
            error: function() {
                window.location.reload();
            }
        });
    },
    updatePageSuccess: function(newHtml) {
        var htmlObj = jQuery(newHtml);
        jQuery(readingList.sel.section).fadeOut(function() {
            jQuery(".my-reading-list-page-content").html(htmlObj);
            if (jQuery(readingList.sel.sortSel).length > 0) {
                jQuery(readingList.sel.sortSel).val(jQuery(readingList.sel.sortSel).attr("data-active"));
                jQuery(readingList.sel.sortSel).val(jQuery(readingList.sel.sortSel).attr("data-active")).attr("selected");
            }
            var view = $(".reading-view").attr("data-u");
            if (view == "card") {
                $(".list-container").css("display", "none");
                $(".card-container").css("display", "flex");
                $(".reading-view a").removeClass("active");
                $(".reading-view .card-view").addClass("active");
            } else {
                $(".card-container").css("display", "none");
                $(".list-container").css("display", "block");
                $(".reading-view a").removeClass("active");
                $(".reading-view .list-view").addClass("active");
            }
            $(this).fadeIn();
            readingList.attachEvents();
        });
    }
};
fbSearchCart.linkHtmlTemplate = "" + "\n <a href='#' title='Add to Reading List' class='rl-bookmark'>" + "\n  <i class='far fa-bookmark'></i>" + "\n </a>";
fbSearchCart.init();
fbSearchCartDel.init();
readingList.init();
var myFeeds = {
    init: function() {
        if (jQuery("#my-feeds").length === 0) {
            return false;
        }
        if (jQuery(myFeedsmessages).length === 0) {
            return false;
        }
        return myFeeds.start();
    },
    start: function() {
        jQuery(".personal-feed a.url-copy").on("click.copy", function(e) {
            e.preventDefault();
            var inputField = jQuery(this).closest('tr').find('.other-feeds-url, .personal-feed-url').text();
            $(this).append('<input class="clipboard-fix" type="text" value="' + inputField + '" />')
            inputField = $('.clipboard-fix');
            inputField.select();
            if (typeof (document.execCommand) !== "function") {
                return myFeeds.err();
            }
            if (inputField.val().trim() === "") {
                return myFeeds.err(myFeedsmessages.msg.url.msg);
            }
            document.execCommand("copy");
            myFeeds.success(inputField.val());
            $('.clipboard-fix').remove();
        });
        if (typeof (myFeedsToken) === "object") {
            myFeedsToken.init();
        }
        return true;
    },
    err: function(msg) {
        if (typeof (msg) === "undefined") {
            msg = myFeedsmessages.msg.err.msg;
        }
        if (typeof (swal) === "function") {
            swal({
                title: myFeedsmessages.msg.err.title,
                text: msg,
                showConfirmButton: true,
                type: "error"
            });
        } else {
            alert(myFeeds.msg.err.msg);
        }
    },
    success: function(copiedValue) {
        var msgText = myFeedsmessages.msg.success.msg;
        msgText = msgText.replace("{{URL}}", copiedValue);
        if (typeof (swal) === "function") {
            swal({
                title: myFeedsmessages.msg.success.title,
                text: msgText,
                showConfirmButton: true,
                type: "success"
            });
        } else {
            alert(msgText);
        }
    }
};
var myFeedsToken = {
    sel: {
        myFeedsWrapper: "#my-feeds",
        regenBtn: ".regen-token",
        personalFeedField: ".personal-feed-url",
        inputWrapper: ".private-feed"
    },
    init: function() {
        jQuery(myFeedsToken.sel.myFeedsWrapper).off("click.regen", myFeedsToken.sel.regenBtn);
        jQuery(myFeedsToken.sel.myFeedsWrapper).on("click.regen", myFeedsToken.sel.regenBtn, function(e) {
            e.preventDefault();
            if (jQuery(this).attr("data-inprogresss") !== "true") {
                jQuery(this).attr("data-inprogresss", "true");
                myFeedsToken.regenerateToken(jQuery(this).attr("href"));
            }
        });
    },
    regenerateToken: function(regenUrl) {
        if (typeof (regenUrl) === "undefined") {
            return false;
        }
        jQuery.ajax({
            url: regenUrl,
            error: function() {
                myFeedsToken.err();
            },
            success: function(resp) {
                myFeedsToken.successCallback(resp);
            }
        });
    },
    successCallback: function(resp) {
        jQuery(myFeedsToken.sel.myFeedsWrapper).find(myFeedsToken.sel.regenBtn).attr("data-inprogresss", "false");
        resp = isJson.init(resp);
        if (resp === false) {
            return myFeedsToken.err();
        }
        if (resp.success !== true) {
            return myFeedsToken.err();
        }
        if (resp.feedToken.length === 0) {
            return myFeedsToken.err();
        }
        var personalFeedInput = jQuery(myFeedsToken.sel.myFeedsWrapper).find(myFeedsToken.sel.personalFeedField);
        var personalFeedUrl = "" + personalFeedInput.attr("data-src") + "?t=" + resp.feedToken;
        personalFeedInput.text(personalFeedUrl);
        personalFeedInput.closest(myFeedsToken.sel.inputWrapper).removeClass("error").addClass("success");
    },
    err: function() {
        if (typeof (swal) === "function") {
            swal({
                title: myFeedsmessages.const.errMsg.title,
                text: myFeedsmessages.const.errMsg.msg,
                showConfirmButton: true,
                type: "error"
            });
        } else {
            alert(myFeedsmessages.const.errMsg.msg);
        }
    }
};
myFeeds.init();
var eventDetails = {
    sel: {
        mapContainer: ".event-container-content .map",
        addressSource: "#event-page"
    },
    const: {
        mapZoom: 12,
        mapsSrc: "https://www.google.com/maps/embed/v1/place?key={{APIKEY}}&q={{ADDRESS}}&attribution_source=Google+Maps+Embed+API&zoom={{ZOOM}}",
        mapCenter: {
            lat: -122.419416,
            lng: 37.774929
        },
        currentIframe: null
    },
    init: function() {
        if (jQuery("#event-page").length === 0) {
            return false;
        }
        return eventDetails.start();
    },
    start: function() {
        eventDetails.buildIframeMap();
        if (typeof (icsForRecurring) === "object") {
            icsForRecurring.init();
        }
    },
    buildIframeMap: function() {
        var apiKey = jQuery(eventDetails.sel.mapContainer).attr("data-key");
        if (typeof (apiKey) === "undefined") {
            apiKey = "";
        }
        var locationAddress = jQuery(eventDetails.sel.addressSource).attr('data-location').trim();
        if ((typeof (locationAddress) === "undefined") || (locationAddress.trim().length === 0)) {
            return false;
        }
        locationAddress = locationAddress.trim();
        locationAddress = locationAddress.trim().replace(/ /g, "+");
        var iframeSrc = eventDetails.const.mapsSrc;
        iframeSrc = iframeSrc.replace("{{APIKEY}}", apiKey).replace("{{ZOOM}}", eventDetails.const.mapZoom);
        iframeSrc = iframeSrc.replace("{{ADDRESS}}", locationAddress);
        var mapIframe = document.createElement('iframe');
        mapIframe.id = 'location-map';
        mapIframe.src = iframeSrc;
        jQuery(eventDetails.sel.mapContainer).append(mapIframe);
        jQuery(eventDetails.sel.mapContainer).addClass("js-visible");
        return true;
    },
    printMapFix: function(thisAddress, thisApiKey) {
        if (typeof (window.onbeforeprint) !== "object") {
            return false;
        }
        window.onbeforeprint = function() {
            var mapImg = '<img src="{{URL}}" />';
            mapUrl = "https://maps.googleapis.com/maps/api/staticmap";
            mapUrl += "?center={{ADDRESS}}&zoom={{ZOOM}}&scale=1&size={{W}}x{{H}}&maptype=roadmap&key={{APIKEY}}";
            mapUrl += "&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C{{ADDRESS}}";
            mapUrl = mapUrl.replace(/\{\{ADDRESS\}\}/g, thisAddress);
            mapUrl = mapUrl.replace("{{APIKEY}}", thisApiKey);
            mapUrl = mapUrl.replace("{{W}}", "600").replace("{{H}}", "400");
            mapUrl = mapUrl.replace("{{ZOOM}}", eventDetails.const.mapZoom);
            mapImg = mapImg.replace("{{URL}}", mapUrl);
            jQuery(eventDetails.sel.mapContainer).html(mapImg)
        }
        ;
    }
};
var icsForRecurring = {
    sel: {
        recurringStartDate: "#recurring-start-date",
        icsLink: ".ics-download a.download"
    },
    init: function() {
        var recDate = jQuery(icsForRecurring.sel.recurringStartDate);
        if (typeof (recDate) === "undefined") {
            return false;
        }
        return icsForRecurring.tweakIcsLink(recDate);
    },
    tweakIcsLink: function(recDate) {
        var startDateGet = recDate.attr("data-rec");
        if (typeof (startDateGet) === "undefined") {
            return false;
        }
        if (startDateGet.trim().length === 0) {
            return false;
        }
        var icsLink = jQuery(icsForRecurring.sel.icsLink);
        if (typeof (icsLink) === "undefined") {
            return false;
        }
        var hHref = icsLink.attr("href") + "&d=" + startDateGet;
        icsLink.attr("href", hHref);
        return true;
    }
};
eventDetails.init();
var dynamicDatepicker = {
    searchUrl: null,
    selectDate: null,
    init: function() {
        if (jQuery("#search-results-page").length === 0) {
            return false;
        }
        dynamicDatepicker.loadDatepicker();
        dynamicDatepicker.searchUrl = jQuery("#search-results-page #search-container.datepicker").attr("data-url");
        dynamicDatepicker.attachEvents();
        dynamicDatepicker.overlay.init();
        dynamicDatepicker.overlayFilters.init();
        dynamicDatepicker.seeMoreInit();
        dynamicDatepicker.storeInitState();
        $(".content-container").addClass("results-background");
        return true;
    },
    seeMoreInit: function() {
        var h = null;
        jQuery("#search-results-page .datepicker .left-column .panel.panel-default a.see-more").each(function() {
            h = jQuery(this).prev("ul");
            if (h.find("> li").length > 5) {
                if (h.find("> li:gt(4) ").length === 0) {
                    jQuery(this).hide();
                } else {
                    h.find("> li:gt(4)").closest("li").hide();
                }
            } else {
                jQuery(this).hide();
            }
        });
    },
    attachEvents: function() {
        jQuery("#search-results-page .datepicker .left-column .tags li a").off("click.facetChange");
        jQuery("#search-results-page .datepicker .left-column .reset-filters a").off("click.resetFilters");
        jQuery("#search-results-page .datepicker #select-founded-results").off("change.changeSorting");
        jQuery("#search-results-page .datepicker #search-spelling a").off("click.spelling");
        jQuery("#search-results-page .datepicker .related-searches-wrapper a").off("click.getRelated");
        jQuery("#search-results-page .datepicker  a.load-more-results").off("click.loadMore");
        jQuery("#search-results-page .datepicker .right-column .pagination-container li a").off("click.paginate");
        jQuery("#search-results-page .datepicker .left-column .panel.panel-default a.see-more").off("click.seeMore");
        jQuery("#search-results-page .datepicker .people-searched a").off("click.peopleSearched");
        jQuery("#search-results-page .datepicker .search-within-results button").off("click.searchWithin");
        jQuery('#search-container').off('input.query');
        jQuery("body").off("click.autocompleteEvents");
        jQuery('.show-filters').off('click.showFilters');
        jQuery('.filters-head button').off('click.filtersButton');
        $(window).scroll(function() {
            if ($(document).scrollTop() >= 375) {
                $(".show-filters").addClass('is-fixed');
                console.log('fixed');
            }
            if ($(document).scrollTop() < 375) {
                $(".show-filters").removeClass('is-fixed');
                console.log('fixed');
            }
        });
        jQuery('.show-filters').on('click.showFilters', function(e) {
            e.preventDefault();
            $('.filters-container').addClass('active');
            $('body').addClass('overflow-off')
        });
        jQuery('.filters-head button').on('click.filtersButton', function(e) {
            e.preventDefault();
            $('.filters-container').removeClass('active');
            $('body').removeClass('overflow-off')
        });
        jQuery(".datepicker .right-column form").off("submit.events");
        jQuery(".datepicker .right-column form").on("submit.events", function(e) {
            e.preventDefault();
            dynamicDatepicker.getResults();
            return false;
        });
        jQuery("#search-results-page .datepicker  .left-column .tags li a").on("click.facetChange", function(e) {
            e.preventDefault();
            dynamicDatepicker.loadFacet(jQuery(this).attr("href"));
        });
        jQuery("#search-results-page .datepicker  .left-column input[type='checkbox']").on("change.facetChange", function() {
            dynamicDatepicker.getResults();
        });
        jQuery("#search-results-page .datepicker  .right-column .pagination.pagination-sm li a").on("click.facetChange", function(e) {
            e.preventDefault();
            dynamicDatepicker.loadFacet(jQuery(this).attr("href"));
        });
        jQuery("#search-results-page .datepicker  .left-column .reset-filters a").on("click.resetFilters", function(e) {
            e.preventDefault();
            dynamicDatepicker.loadFacet(jQuery(this).attr("href"));
        });
        jQuery("#search-results-page .datepicker  #select-founded-results").on("change.changeSorting", function(e) {
            dynamicDatepicker.getResults();
        });
        jQuery("#search-results-page .datepicker  #search-spelling a").on("click.spelling", function(e) {
            e.preventDefault();
            dynamicDatepicker.getLinkTypeResults(jQuery(this).attr("href"), jQuery(this).text());
        });
        jQuery("#search-results-page .datepicker  .related-searches-wrapper a").on("click.getRelated", function(e) {
            e.preventDefault();
            dynamicDatepicker.getLinkTypeResults(jQuery(this).attr("href"), jQuery(this).text());
        });
        jQuery("#search-results-page .datepicker  a.load-more-results ").on("click", function(e) {
            e.preventDefault();
            dynamicDatepicker.loadMore(jQuery(this).attr("href"));
        });
        jQuery("#search-results-page .datepicker .left-column .panel.panel-default a.see-more").on("click.seeMore", function(e) {
            e.preventDefault();
            dynamicDatepicker.seeMore(jQuery(this));
        });
        jQuery("#search-results-page .datepicker  .people-searched a").on("click.peopleSearched", function(e) {
            e.preventDefault();
            var getText = $(this).text().trim();
            var Text = "`" + getText + "`";
            jQuery(".right-column .query").val(Text);
            dynamicDatepicker.getResults();
        });
        jQuery("#search-results-page .datepicker .right-column .pagination-container li a").on("click.paginate", function(e) {
            e.preventDefault();
            var url = jQuery(this).attr("href");
            dynamicDatepicker.paginate(url);
        });
        jQuery("#search-results-page .datepicker  .search-within-results button").on("click.searchWithin", function(e) {
            e.preventDefault();
        });
        jQuery(window).off("popstate.search")
        jQuery(window).on("popstate.search", function(e) {
            if (e.originalEvent.state !== null) {
                if (typeof (e.originalEvent.state) !== "undefined") {
                    dynamicDatepicker.popResults(e.originalEvent.state);
                }
            }
        });
        var autocompleteURL = $("#search-container").attr("data-autocompletion-url");
        if (!(autocompleteURL === "" || autocompleteURL === undefined)) {
            jQuery('#search-container').on("keyup", 'input.query', function(e) {
                $(this).fbcompletion({
                    'enabled': 'enabled',
                    'standardCompletionEnabled': true,
                    'program': autocompleteURL,
                    'format': 'extended',
                    'alpha': '0.5',
                    'show': '10',
                    'sort': '0',
                    'length': '3',
                    'delay': '0',
                    'profile': '_default',
                    'itemGroup': 'category',
                    'searchBasedCompletionEnabled': false,
                    'searchBasedCompletionProgram': '../s/suggest.json',
                    'loggin': 'disabled',
                    'selectLogging': 'disabled',
                    'dwellLogging': 'disabled',
                    'interactionLog': '',
                })
            });
        }
        jQuery('#search-container').on("click", 'input.query', function(e) {
            if ($('.ui-menu.ui-widget.ui-widget-content').length > 0) {
                $('body').css('position', 'relative')
            }
        });
        if (jQuery("#search-container.datepicker").length > 0) {
            jQuery("body").on("click.autocompleteEvents", ".ui-autocomplete .ui-menu-item .ui-menu-item-wrapper", function(e) {
                e.preventDefault();
                if ($(this).children('.header-results').length > 0) {} else {
                    var query = $(this).text().trim();
                    $("#search-container input.query").val(query);
                    dynamicDatepicker.getResults();
                }
            });
        }
    },
    gatherData: function() {
        var ret = jQuery("#search-results-page .datepicker ").find("select, textarea, input").serialize();
        if (window.location.search.indexOf("f.Day|days") > -1) {
            var retDate = "";
            if (ret.length > 0) {
                retDate += "&";
            }
            retDate += "f.Day|days=" + dynamicDatepicker.getUrlParameter('f.Day|days');
            retDate += "&f.Month|months=" + dynamicDatepicker.getUrlParameter('f.Month|months');
            retDate += "&f.Year|years=" + dynamicDatepicker.getUrlParameter('f.Year|years');
            if (window.location.search.indexOf("daterange=today") > -1) {
                retDate += "&daterange=" + dynamicDatepicker.getUrlParameter('daterange');
            }
            ret = ret + retDate;
        }
        if (window.location.search.indexOf("f.Week|weeks") > -1) {
            var retDate = "";
            if (ret.length > 0) {
                retDate += "&";
            }
            retDate += "f.Week|weeks=" + dynamicDatepicker.getUrlParameter('f.Week|weeks');
            retDate += "&f.Year|years=" + dynamicDatepicker.getUrlParameter('f.Year|years');
            if (window.location.search.indexOf("daterange=week") > -1) {
                retDate += "&daterange=" + dynamicDatepicker.getUrlParameter('daterange');
            }
            ret = ret + retDate;
        }
        if (window.location.search.indexOf("f.Month|months") > -1 && window.location.search.indexOf("f.Day|days") == -1) {
            var retDate = "";
            if (ret.length > 0) {
                retDate += "&";
            }
            retDate += "f.Month|months=" + dynamicDatepicker.getUrlParameter('f.Month|months');
            retDate += "&f.Year|years=" + dynamicDatepicker.getUrlParameter('f.Year|years');
            if (window.location.search.indexOf("daterange=month") > -1) {
                retDate += "&daterange=" + dynamicDatepicker.getUrlParameter('daterange');
            }
            ret = ret + retDate;
        }
        return ret;
    },
    showResults: function(resp, fullQueryString, query) {
        jQuery("#search-results-page").html(resp);
        $('body').removeClass('overflow-off');
        jQuery(".filters-panel").append(dynamicDatepicker.overlayFilters.html);
        if (typeof (query) !== "undefined") {
            if (query.length > 0) {
                jQuery("input.right-column form").val(query);
            }
        }
        dynamicDatepicker.seeMoreInit();
        dynamicDatepicker.overlay.hide();
        dynamicDatepicker.overlayFilters.hide();
        dynamicDatepicker.bookmarksFix();
        dynamicDatepicker.attachEvents();
        dynamicDatepicker.updateUrl(fullQueryString);
        dynamicDatepicker.loadDatepicker();
        $(".content-container").addClass("results-background");
    },
    loadContent: function(resp, query) {
        jQuery("#search-results-page").html(resp);
        $('body').removeClass('overflow-off');
        jQuery(".filters-panel").append(dynamicDatepicker.overlayFilters.html);
        if (typeof (query) !== "undefined") {
            if (query.length > 0) {
                jQuery("input.right-column form").val(query);
            }
        }
        dynamicDatepicker.seeMoreInit();
        dynamicDatepicker.overlay.hide();
        dynamicDatepicker.overlayFilters.hide();
        dynamicDatepicker.bookmarksFix();
        dynamicDatepicker.attachEvents();
        dynamicDatepicker.updateUrl(query);
        dynamicDatepicker.loadDatepicker();
    },
    getLinkTypeResults: function(href, query) {
        dynamicDatepicker.overlay.show();
        href = href.split("?")[1];
        if (typeof (query) === "string") {
            query = query.trim();
        }
        jQuery.ajax({
            url: dynamicDatepicker.searchUrl,
            data: href,
            success: function(resp) {
                dynamicDatepicker.showResults(resp, href, query)
            },
            error: function() {
                dynamicDatepicker.overlay.hide();
            }
        });
    },
    getResults: function() {
        dynamicDatepicker.overlay.show();
        dynamicDatepicker.overlayFilters.show();
        var thisData = dynamicDatepicker.gatherData();
        jQuery.ajax({
            url: dynamicDatepicker.searchUrl,
            data: thisData,
            success: function(resp) {
                dynamicDatepicker.showResults(resp, thisData);
            },
            error: function() {
                dynamicDatepicker.overlay.hide();
            }
        });
    },
    loadFacet: function(thisQuery) {
        dynamicDatepicker.selectDate = null;
        dynamicDatepicker.overlay.show();
        dynamicDatepicker.overlayFilters.show();
        if (typeof ("href") !== "string") {
            return false;
        }
        if (thisQuery.indexOf("?") !== -1) {
            thisQuery = thisQuery.split("?")[1];
        }
        thisQuery = thisQuery.replace(/past=true&/g, '');
        jQuery.ajax({
            url: dynamicDatepicker.searchUrl,
            data: thisQuery,
            success: function(resp) {
                dynamicDatepicker.loadContent(resp, thisQuery);
            },
            error: function() {
                dynamicDatepicker.overlay.hide();
            }
        });
        return true;
    },
    loadMore: function(thisQuery) {
        dynamicDatepicker.overlay.show();
        if (typeof ("href") !== "string") {
            return false;
        }
        if (thisQuery.indexOf("?") !== -1) {
            thisQuery = thisQuery.split("?")[1];
        }
        jQuery.ajax({
            url: dynamicDatepicker.searchUrl,
            data: thisQuery,
            success: function(resp) {
                dynamicDatepicker.loadMoreCallback(resp, thisQuery);
            },
            error: function() {
                dynamicDatepicker.overlay.hide();
            }
        });
        return true;
    },
    loadMoreCallback: function(html, thisQuery) {
        var htmlObj = jQuery(html);
        var ret = [];
        htmlObj.find(".right-column .search-result, .right-column .search-result-banner").each(function() {
            ret.push(jQuery(this));
        });
        ret.push(htmlObj.find(".right-column .load-more"));
        jQuery("#search-results-page .right-column .load-more").remove();
        jQuery("#search-results-page .right-column ").append(ret);
        dynamicDatepicker.overlay.hide();
        dynamicDatepicker.bookmarksFix();
        dynamicDatepicker.attachEvents();
        dynamicDatepicker.updateUrl(thisQuery);
    },
    seeMore: function(item) {
        var h = item.prev("ul");
        if (item.attr("data-all") === "true") {
            h.find("> li:gt(4)").closest("li").hide();
            item.attr("data-all", "false");
            item.text("See more").removeClass("less");
            item.append("<i class='fa arrow'></i>");
        } else {
            h.find("li").show();
            item.attr("data-all", "true");
            item.text("See less").addClass("less");
            item.append("<i class='fa arrow'></i>");
        }
    },
    updateUrl: function(queryString) {
        if (typeof (queryString) !== "string") {
            return false;
        }
        if (queryString.indexOf("?") !== -1) {
            queryString = queryString.split("?")[1];
        }
        if (typeof (history.pushState) !== "function") {
            return false;
        }
        var newUrl = window.location.href.split("#")[0];
        newUrl = newUrl.split("?")[0]
        newUrl = newUrl + "?" + queryString;
        var data = {
            path: newUrl,
            html: jQuery("#search-results-page").html()
        };
        window.history.pushState(data, '', newUrl);
        jQuery(document).trigger("__CP_Query_Changed");
        if (typeof (customDesignLinks) === "object") {
            if (typeof (customDesignLinks.siteSearch) === "function") {
                customDesignLinks.siteSearch();
            }
        }
        return true;
    },
    overlay: {
        html: "<div id='search-page-overlay' style='display: none'></div>",
        init: function() {
            jQuery("#search-results-page").append(dynamicDatepicker.overlay.html);
        },
        show: function() {
            jQuery("#search-results-page").append("<div id='search-page-overlay'></div>");
            jQuery("#search-page-overlay").show();
        },
        hide: function() {
            jQuery("#search-page-overlay").hide();
        }
    },
    overlayFilters: {
        html: "<div id='search-page-overlay-filters' style='display: none'></div>",
        init: function() {
            jQuery(".filters-panel").append(dynamicDatepicker.overlayFilters.html);
        },
        show: function() {
            jQuery("#search-page-overlay-filters").show();
        },
        hide: function() {
            jQuery("#search-page-overlay-filters").hide();
        }
    },
    bookmarksFix: function() {
        if (typeof (fbSearchCart) === "object") {
            if (typeof (fbSearchCart.searchPageSetup) === "function") {
                fbSearchCart.searchPageSetup();
            }
        }
    },
    storeInitState: function() {
        if (typeof (history.replaceState) !== "function") {
            return false;
        }
        var data = {
            path: window.location.href,
            html: jQuery("#search-results-page").html()
        };
        history.replaceState(data, document.title, document.location.href);
    },
    popResults: function(popItem) {
        if (typeof (popItem) === "undefined") {
            location.reload();
        }
        if (typeof (popItem.html) === "undefined") {
            location.reload();
        }
        jQuery("#search-results-page").html(popItem.html);
        dynamicDatepicker.attachEvents();
        dynamicDatepicker.bookmarksFix();
    },
    paginate: function(url) {
        var suffix = "SQ_ASSET_CONTENTS_RAW";
        if (url.indexOf(suffix) !== -1) {
            suffix = "";
        }
        var query = url.split("?")[1];
        if (query.indexOf("form=wss") !== -1) {
            query = query.replace("form=wss-events&", "");
        }
        var h = jQuery("#search-container").attr("data-url");
        if ((h !== undefined) || (h !== "")) {
            url = h + "?" + query;
            suffix = "";
        }
        dynamicDatepicker.overlay.show();
        jQuery.ajax({
            url: url,
            data: suffix,
            error: function() {
                dynamicDatepicker.overlay.hide();
            },
            success: function(content) {
                dynamicDatepicker.showResults(content, url);
            }
        });
    },
    disableDays: function(date) {
        var sdate = $.datepicker.formatDate('yymmdd', date)
        if ($.inArray(sdate, array) != -1) {
            return [true];
        }
        return [false];
    },
    loadDatepicker: function() {
        var thisDefaultDate = new Date();
        if (window.location.search.indexOf(".Day|days") > -1) {
            thisDefaultDate = dynamicDatepicker.getDateFromURL();
        }
        $('#datepicker').datepicker({
            dateFormat: 'dd-mm-yy',
            defaultDate: thisDefaultDate,
            beforeShowDay: dynamicDatepicker.disableDays,
            onSelect: function(val) {
                if (dynamicDatepicker.selectDate != val) {
                    dynamicDatepicker.selectDate = val;
                    var valArr = val.split("-");
                    var thisQuery = 'f.Day|days=' + valArr[0] + '&f.Month|months=' + valArr[1] + '&f.Year|years=' + valArr[2];
                    var d = new Date();
                    var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                    var date = [];
                    date[0] = valArr[2];
                    date[1] = valArr[1];
                    date[2] = valArr[0];
                    if (new Date(Date.parse(today)) > new Date(Date.parse(date.join("-")))) {
                        if (window.location.href.indexOf('past') == -1)
                            thisQuery += '&past=true';
                    }
                    thisQuery += '&' + dynamicDatepicker.gatherDataCalendar();
                    dynamicDatepicker.overlay.show();
                    dynamicDatepicker.overlayFilters.show();
                    $.ajax({
                        url: dynamicDatepicker.searchUrl,
                        data: thisQuery,
                        success: function(resp) {
                            dynamicDatepicker.showResults(resp, thisQuery, "");
                        }
                    });
                } else {
                    thisDefaultDate = dynamicDatepicker.removeDate();
                    dynamicDatepicker.overlay.show();
                    dynamicDatepicker.overlayFilters.show();
                    $.ajax({
                        url: dynamicDatepicker.searchUrl,
                        data: thisDefaultDate,
                        success: function(resp) {
                            dynamicDatepicker.showResults(resp, thisDefaultDate, "");
                            dynamicDatepicker.selectDate = null;
                        }
                    });
                }
            }
        });
    },
    getDateFromURL: function() {
        var date = [];
        date[0] = dynamicDatepicker.getUrlParameter('f.Day|days');
        date[1] = dynamicDatepicker.getUrlParameter('f.Month|months');
        date[2] = dynamicDatepicker.getUrlParameter('f.Year|years');
        return date.join("-");
    },
    getUrlParameter: function(Param) {
        var PageURL = decodeURIComponent(window.location.search.substring(1)), URLVariables = PageURL.split('&'), ParameterName, i;
        console.log(PageURL);
        for (i = 0; i < URLVariables.length; i++) {
            ParameterName = URLVariables[i].split('=');
            if (ParameterName[0] === Param) {
                return ParameterName[1] === undefined ? true : ParameterName[1];
            }
        }
    },
    removeDate: function() {
        var URLVariables = jQuery("#search-results-page .datepicker ").find("select, textarea, input").serialize(), i;
        URLVariables = URLVariables.split('&');
        for (i = 0; i < URLVariables.length; i++) {
            if (URLVariables[i].indexOf('past') > -1) {
                URLVariables.splice([i], 1)
                i--;
            }
        }
        return URLVariables.join('&')
    },
    gatherDataCalendar: function() {
        var ret = jQuery("#search-results-page .datepicker ").find("select, textarea, input").serialize();
        return ret;
    }
};
dynamicDatepicker.init();
var termsandConditions = {
    ajaxURL: null,
    init: function() {
        jQuery(document).on("__CP_User_Ready", function() {
            termsandConditions.start();
        });
    },
    start: function() {
        if (termsandConditions.validateTerms() === false) {
            return false;
        }
        termsandConditions.ajaxURL = termsPopup.ajaxurl;
        termsandConditions.popupInitialize();
        return true;
    },
    validateTerms: function() {
        if (wssUserDetails.userLoggedIn === false) {
            return false;
        }
        if (typeof (termsPopup) !== "object") {
            return false;
        }
        if (termsPopup.accountUser !== "true") {
            return false;
        }
        if (termsPopup.value !== "false") {
            return false;
        }
        if (window.location.href === termsPopup.buttonNotAgreeLink) {
            return false;
        }
        if (window.location.href.indexOf("/_admin") !== -1) {
            return false;
        }
        if (window.location.href.indexOf("/_edit") !== -1) {
            return false;
        }
        return true;
    },
    attachEvents: function() {
        $('#terms-popup .buttons-terms #btn-agree').click(function(e) {
            e.preventDefault();
            termsandConditions.changeMeta('true');
        });
        $('#terms-popup .close').click(function(e) {
            e.preventDefault();
            $('#terms-overlay').css('display', 'none');
            $('#search-form').css('z-index', "999");
        });
    },
    changeMeta: function(value) {
        jQuery.ajax({
            url: termsandConditions.ajaxURL,
            type: "POST",
            data: {
                "value": value
            },
            success: function(res) {
                termsandConditions.disableOverlay();
                termsandConditions.thankYouPopup();
            }
        });
    },
    disableOverlay: function() {
        $('#terms-overlay').css('display', 'none');
        $('#search-form').css('z-index', "999");
    },
    popupInitialize: function() {
        var overlay = [];
        overlay.push('<div id="terms-overlay"></div>');
        $('body').prepend(overlay);
        $('#search-form').css('z-index', "1");
        var content = [];
        content.push('<div id="terms-popup"><a class="close" href="#">×</a><h3>' + termsPopup.header + '</h3><div class="term-content">' + termsPopup.content + '</div><div class="buttons-terms text-right"><a id="btn-not-agree" class="btn btn-primary btn-form-submit" href=' + termsPopup.buttonNotAgreeLink + '>' + termsPopup.buttonNotAgreeText + '</a><a id="btn-agree" class="btn btn-primary btn-form-submit" href="#">' + termsPopup.buttonAgreeText + '</a></div></div>');
        $('#terms-overlay').append(content);
        termsandConditions.attachEvents();
    },
    thankYouPopup: function() {
        if (typeof (swal) !== "function") {
            return false;
        }
        swal({
            title: termsPopup.thtitle,
            text: termsPopup.thcontent,
            timer: 3000,
            showConfirmButton: false,
            type: "success"
        });
        return true;
    },
};
var socialmediaValidation = {
    validator: null,
    debug: false,
    sel: {
        socialMediaRegistration: ".asset-contents .social-media-registration",
        signInSubmit: "#SQ_LOGIN_SUBMIT[name='SQ_LOGIN_SUBMIT']",
        registerSubmit: "#sq_commit_button[name='sq_commit_button']"
    },
    init: function() {
        if (document.location.href.indexOf("/_admin") !== -1) {
            return false;
        }
        if (document.location.href.indexOf("/_edit") !== -1) {
            return false;
        }
        if (jQuery(socialmediaValidation.sel.socialMediaRegistration).length === 0) {
            return false;
        }
        if (typeof (jQuery().validate) !== "function") {
            return false;
        }
        var ccode = socialmediaValidation.getCountryCode();
        socialmediaValidation.prepareForm();
        return socialmediaValidation.start(ccode);
    },
    prepareForm: function() {
        jQuery(socialmediaValidation.sel.socialMediaRegistration).closest("form").removeAttr("onsubmit");
    },
    getCountryCode: function() {
        return "EN";
    },
    log: function(msg) {
        if (socialmediaValidation.debug !== true) {
            return false;
        }
    },
    start: function(ccode) {
        if (jQuery(socialmediaValidation.sel.socialMediaRegistration).is(":visible")) {
            var socialMediaForm = jQuery(socialmediaValidation.sel.socialMediaRegistration).closest("form");
        }
        if (socialMediaForm.length === 0) {
            return false;
        }
        var socialoptions = {
            submitHandler: function(form) {
                form.submit();
            },
            errorPlacement: function(error, element) {
                var elType = jQuery(element).attr("type");
                if (elType === "checkbox") {
                    var h = jQuery(element).closest("div.row").find("span.required");
                    if (h.length > 0) {
                        error.insertAfter(h);
                    } else {
                        error.insertAfter(element)
                    }
                } else {
                    error.insertAfter(element);
                }
            }
        };
        socialmediaValidation.validator = socialMediaForm.validate(socialoptions)
        if (jQuery(socialmediaValidation.sel.socialMediaRegistration).is(":visible") === true) {
            socialMediaSignInValidation.init(ccode);
        } else {
            return false;
        }
        jQuery(socialmediaValidation.sel.registerSubmit).removeAttr("onclick").off("click.formSubmit");
        jQuery(socialmediaValidation.sel.registerSubmit).on("click.formSubmit", function(e) {
            e.preventDefault();
            var isFormValid = socialMediaForm.valid();
            if (isFormValid === false) {
                return false;
            }
            jQuery("input[id$='_ASSET_BUILDER_ACTION']").val("create");
            jQuery("input#SQ_ACTION").val("");
            socialMediaForm.submit();
        });
        return true;
    },
};
var socialMediaSignInValidation = {
    init: function(ccode) {
        if (typeof (ccode) === "undefined") {
            ccode = "EN";
        }
        socialmediaValidation.log("Applying Registration rules...");
        var messages = vSignInCfgsocial[ccode];
        jQuery("#t_and_c").rules("add", {
            "required": true,
            "messages": {
                "required": messages["t_and_c"].required
            }
        });
    }
};
var vSignInCfgsocial = {
    "EN": {
        "t_and_c": {
            "required": "Please accept Terms and Conditions"
        }
    }
};
var socialMediaLogin = {
    init: function() {
        socialMediaLogin.socialMedia();
    },
    socialMedia: function() {
        $('.social-media-registration').find("input[type='password']").val(socialMediaLogin.generate());
    },
    generate: function() {
        var length = 8
          , charSet = "abcdefghijklmnopqrstuvwxyz"
          , capitalCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          , numberSet = "0123456789"
          , symbolsSet = "@#$%"
          , punctationSet = "{}[]()/\~,;:.<>"
          , retVal = "";
        for (var i = 0, n = charSet.length; i < length; ++i) {
            retVal += charSet.charAt(Math.floor(Math.random() * n));
            retVal += capitalCharSet.charAt(Math.floor(Math.random() * n));
            retVal += numberSet.charAt(Math.floor(Math.random() * n));
            retVal += symbolsSet.charAt(Math.floor(Math.random() * n));
            retVal += punctationSet.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
};
socialmediaValidation.init();
socialMediaLogin.init();
termsandConditions.init();
var pwaStatic = {
    extFiles: "extfiles",
    intFiles: "intfiles",
    content: "content",
    img: "img",
    indexPage: "index",
    rl: "rl",
    search: "search",
    imgMaxItems: 10,
    contentMaxItems: 10,
    iosPrompt: {
        cookieName: "cp_ios_prompt",
        cookieLength: 7
    }
};
var pwaCore = {
    debug: true,
    deferredPrompt: null,
    log: function(msg) {
        if (pwaCore.debug !== true) {
            return false;
        }
        console.log(msg);
        return true;
    },
    test: {
        isIos: function() {
            var userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        },
        isInStandaloneMode: function() {
            return ('standalone'in window.navigator) && (window.navigator.standalone);
        },
        iframeMode: function() {
            return /SQ_DESIGN_NAME=iframe/.test(window.location.href);
        }
    },
    init: function() {
        var isSwSupported = "serviceWorker"in navigator;
        if (isSwSupported !== true) {
            return false;
        }
        pwaCore.log("This browser supports service workers...");
        var inIframeMode = pwaCore.test.iframeMode();
        if (inIframeMode === true) {
            return false;
        }
        var iOS = pwaCore.test.isIos();
        var standalone = pwaCore.test.isInStandaloneMode();
        if (iOS === true) {
            pwaCore.initIos(standalone);
        } else {
            pwaCore.initStandard(standalone);
        }
        return true;
    },
    initIos: function(isStandalone) {
        if (isStandalone === false) {
            pwaCore.startIosBanner();
        } else {
            jQuery(document).trigger("__CP_PWA_IOS");
        }
    },
    initStandard: function(isStandalone) {
        if (isStandalone === false) {
            pwaCore.startAndroidBanner();
        } else {
            jQuery(document).trigger("__CP_PWA_AND");
        }
    },
    startIosBanner: function() {
        var promptState = jQuery.cookie(pwaStatic.iosPrompt.cookieName);
        if (promptState === "1") {
            return false;
        }
        var iosPrompt = document.querySelector(".ios-prompt");
        if (iosPrompt === null) {
            return false;
        }
        iosPrompt.style.display = "block";
        iosPrompt.addEventListener("click", function() {
            iosPrompt.style.display = "none";
        });
        var cookieExpDate = new Date().getTime();
        cookieExpDate = cookieExpDate + pwaStatic.iosPrompt.cookieLength * 24 * 60 * 60 * 1000;
        cookieExpDate = new Date(cookieExpDate);
        jQuery.cookie(pwaStatic.iosPrompt.cookieName, "1", {
            expires: cookieExpDate,
            path: "/"
        });
        return true;
    },
    startAndroidBanner: function() {
        window.addEventListener("beforeinstallprompt", function(event) {
            pwaCore.log("BeforeInstallPrompt event triggered...");
            event.preventDefault();
            pwaCore.deferredPrompt = event;
            if (jQuery(".pwa-banner").length === 0) {
                return false;
            }
            var addBtn = document.querySelector(".add-app");
            var getObject = JSON.parse(localStorage.getItem('pwa-app'));
            if (getObject === null || typeof (getObject) === "object") {
                if (getObject === null) {
                    getObject = {
                        time: 0
                    };
                }
                if (new Date().getTime() - getObject.time >= 3600000) {
                    setTimeout(function() {
                        jQuery(".pwa-banner").removeClass("no-active");
                        jQuery(".close-pwa-baner").click(function(e) {
                            e.preventDefault();
                            jQuery(".pwa-banner").addClass("no-active");
                            var pwaBanner = {
                                "display": "false",
                                "time": new Date().getTime()
                            };
                            localStorage.setItem("pwa-app", JSON.stringify(pwaBanner));
                        });
                        jQuery(".add-app").click(function(e) {
                            e.preventDefault();
                            jQuery(".pwa-banner").addClass("no-active");
                        });
                    }, 2500);
                }
            }
            addBtn.addEventListener("click", function(event) {
                event.preventDefault();
                pwaCore.deferredPrompt.prompt();
                pwaCore.deferredPrompt.userChoice.then(function(choiceResult) {
                    if (choiceResult.outcome === "accepted") {
                        pwaCore.log("A2HS prompt accepted");
                    } else {
                        pwaCore.log("A2HS prompt dismissed");
                    }
                    pwaCore.deferredPrompt = null;
                });
            });
        });
    }
};
var pwaCache = {
    init: function() {
        jQuery(document).on("__CP_ReadingList_Updated", function() {
            pwaCache.getNewReadingList();
        });
        if (sessionStorage.getItem('offlineSearch') === null) {
            pwaCache.getNewSearchList();
            sessionStorage.setItem('offlineSearch', 'true');
        }
    },
    getNewReadingList: function() {
        pwaCore.log("[PWA] Reading List Update Event triggered");
        if (typeof (cpOffline) !== "object") {
            return false;
        }
        if (typeof (cpOffline.rl) !== "object") {
            return false;
        }
        if (typeof (cpOffline.rl.url) !== "string") {
            return false;
        }
        pwaCache.updateReadingListPage();
        fetch(cpOffline.rl.url + "?SQ_DESIGN_NAME=json").then(function(resp) {
            return resp.json();
        }).then(function(data) {
            pwaCache.cacheReadingListArticles(data);
        }).catch(function(err) {
            pwaCore.log("[PWA] Error while retrieving Reading List. Please see the error below");
            pwaCore.log(err);
        });
    },
    updateReadingListPage: function() {
        fetch(cpOffline.rl.url).then(function(resp) {
            return caches.open(pwaStatic.indexPage).then(function(cache) {
                cache.put(cpOffline.rl.url, resp);
                return true;
            });
        }).catch(function(err) {
            pwaCore.log("[PWA] Reading List landing page could not be added to cache.");
        });
    },
    cacheReadingListArticles: function(itemsToCache) {
        itemsToCache = isJson.init(itemsToCache);
        if (itemsToCache === false) {
            return false;
        }
        caches.delete(pwaStatic.rl).then(function() {
            caches.open(pwaStatic.rl).then(function(cache) {
                return cache.addAll(itemsToCache);
            });
        }).catch(function(err) {
            pwaCore.log("[PWA] It was not possible to add Reading List items to cache");
        });
    },
    getNewSearchList: function() {
        pwaCore.log("[PWA] Search / Most Visited Update Event triggered");
        if (typeof (cpOffline) !== "object") {
            return false;
        }
        if (typeof (cpOffline.search) !== "object") {
            return false;
        }
        if (typeof (cpOffline.search.url) !== "string") {
            return false;
        }
        pwaCache.updateSearchListPage();
        fetch(cpOffline.search.url + "?SQ_DESIGN_NAME=json").then(function(resp) {
            return resp.json();
        }).then(function(data) {
            pwaCache.cacheSearchListArticles(data);
        }).catch(function(err) {
            pwaCore.log("[PWA] Error while retrieving Search / Most Visited. Please see the error below");
            pwaCore.log(err);
        });
    },
    updateSearchListPage: function() {
        fetch(cpOffline.search.url).then(function(resp) {
            return caches.open(pwaStatic.indexPage).then(function(cache) {
                cache.put(cpOffline.search.url, resp);
                return true;
            });
        }).catch(function(err) {
            pwaCore.log("[PWA] Search / Most Visited landing page could not be added to cache.");
        });
    },
    cacheSearchListArticles: function(itemsToCache) {
        itemsToCache = isJson.init(itemsToCache);
        if (itemsToCache === false) {
            return false;
        }
        caches.delete(pwaStatic.search).then(function() {
            caches.open(pwaStatic.search).then(function(cache) {
                return cache.addAll(itemsToCache);
            });
        }).catch(function(err) {
            pwaCore.log("[PWA] It was not possible to add Reading List items to cache");
        });
    }
}
var loadServiceWorker = {
    init: function() {
        if ("serviceWorker"in navigator === false) {
            return false;
        }
        if (typeof (cpPwaEnabled) === "undefined") {
            return loadServiceWorker.unregisterSw();
        }
        if (cpPwaEnabled !== true) {
            return loadServiceWorker.unregisterSw();
        }
        if (jQuery("#onesignal_js").length === 0) {
            return loadServiceWorker.startPlainServiceWorker();
        }
        if (jQuery("#onesignal_js").attr("data-onesignal") === undefined) {
            return loadServiceWorker.startPlainServiceWorker();
        }
        return loadServiceWorker.start();
    },
    start: function() {
        navigator.serviceWorker.register("/OneSignalSDKWorker.js").then(function(reg) {
            reg.addEventListener('updatefound', function() {
                var installingWorker = reg.installing;
                pwaCore.log("[SW] OneSignal :: A new service worker is being installed:", installingWorker);
            });
        }).catch(function(err) {
            pwaCore.log("[SW] Error while installing new service worker");
            pwaCore.log(err);
        });
        var OneSignal = window.OneSignal || [];
        var OneSignalID = jQuery("#onesignal_js").attr("data-onesignal");
        var OneSignalWebID = jQuery("#onesignal_js").attr("data-safariwebid");
        OneSignal.push(function() {
            OneSignal.init({
                appId: OneSignalID,
                safari_web_id: OneSignalWebID,
                autoResubscribe: true,
                notifyButton: {
                    enable: true
                }
            });
            OneSignal.showNativePrompt();
            jQuery(document).trigger("__CP_OneSignal_Ready");
        });
        return true;
    },
    startPlainServiceWorker: function() {
        navigator.serviceWorker.register("/NoSignalWorker.js").then(function(reg) {
            reg.addEventListener('updatefound', function() {
                var installingWorker = reg.installing;
                pwaCore.log("[SW] Plain :: A new service worker is being installed:", installingWorker);
            });
        }).catch(function(err) {
            pwaCore.log("[SW] Error while installing new service worker");
            pwaCore.log(err);
        });
    },
    unregisterSw: function() {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            if (registrations.length === 0) {
                return false;
            }
            for (var i in registrations) {
                registrations[i].unregister();
            }
            pwaCore.log("[PWA] Service workers unregisted...!");
        }).catch(function(err) {
            pwaCore.log("[PWA] Cannot unregister service workers... because of the error:");
            pwaCore.log(err);
        });
        return false;
    }
};
pwaCore.init();
pwaCache.init();
window.addEventListener("load", function() {
    loadServiceWorker.init();
});
var pwaNavigation = {
    init: function() {
        if (window.matchMedia('(display-mode: standalone)').matches === true) {
            pwaNavigation.showNavigation();
            pwaNavigation.attachEvents();
            pwaNavigation.prepareNavigation();
        } else {
            pwaNavigation.desktopNavigationFix();
        }
    },
    prepareNavigation: function() {
        pwaNavigation.prepereMenu();
        pwaNavigation.prepereSettings();
        pwaNavigation.prepereLanguages();
        pwaNavigation.prepereSearch();
    },
    showNavigation: function() {
        var isThisIos = pwaCore.test.isIos()
        if (isThisIos === false) {
            jQuery(".pwa-navigation .pwa-back.pwa-item").remove();
            jQuery(".pwa-navigation .pwa-separator:eq(0)").remove();
            jQuery(".pwa-navigation").removeClass("ios");
        }
        jQuery("body").addClass("pwa");
        if ($('.my-account-forms').length > 0) {
            jQuery("body").addClass("sign-in-page");
        }
        jQuery(".pwa-settings a").append(jQuery(".translate .menu-element-inner img"));
        jQuery(".pwa-navigation").css("display", "flex")
    },
    attachEvents: function() {
        jQuery(".pwa-back").click(function(e) {
            e.preventDefault();
            window.history.back();
        });
        jQuery(".pwa-home a").click(function(e) {
            e.preventDefault();
            window.location = jQuery(".navbar-brand").attr("href")
        });
        jQuery(".close-search").click(function() {
            jQuery(".pwa-search").removeClass("active");
        });
        jQuery(".pwa-navigation .pwa-item a").click(function(e) {
            e.preventDefault();
            if (jQuery(this).closest(".pwa-item").hasClass("pwa-search") === true) {
                if (jQuery(this).closest(".pwa-item").hasClass("active") === true) {
                    jQuery(".close-search").trigger("click");
                    jQuery(".pwa-navigation .pwa-item").removeClass("active");
                } else {
                    jQuery(".search-toggle").trigger("click");
                    jQuery('.Navigation').removeClass('active');
                    var position = jQuery("#overlay-query").offset().top - 300;
                    jQuery("html, body").animate({
                        scrollTop: position
                    }, 800);
                    jQuery(".pwa-navigation .pwa-item").removeClass("active");
                    jQuery(this).closest(".pwa-item").addClass("active");
                }
            } else if (jQuery(this).closest(".pwa-item").hasClass("pwa-menu") === true) {
                if (jQuery(this).closest(".pwa-item").hasClass("active") === true) {
                    jQuery('.Navigation').removeClass('active');
                    jQuery(".pwa-navigation .pwa-item").removeClass("active");
                } else {
                    jQuery('.Navigation').addClass('active');
                    jQuery(".close-search").trigger("click");
                    jQuery(".pwa-navigation .pwa-item").removeClass("active");
                    jQuery(this).closest(".pwa-item").addClass("active");
                }
            } else {
                if (jQuery(this).closest(".pwa-item").hasClass("active") === true) {
                    jQuery(".pwa-navigation .pwa-item").removeClass("active");
                } else {
                    jQuery(".Navigation").removeClass("active");
                    jQuery(".close-search").trigger("click");
                    jQuery(".pwa-navigation .pwa-item").removeClass("active");
                    jQuery(this).closest(".pwa-item").addClass("active");
                }
            }
        });
    },
    prepereMenu: function() {
        var menu = [];
        jQuery('.navbar .navbar-nav li a').each(function() {
            menu.push({
                url: jQuery(this).attr("href").trim(),
                text: jQuery(this).text().trim()
            });
        });
        var liHtmlPattern = "\n<li class='Navigation-list-item nav-item'><a class='Navigation-link nav-link' href='{{URL}}'>{{NAME}}</a></li>";
        var h = "";
        for (var i in menu) {
            if (typeof (menu[i].url) === "undefined") {
                continue;
            }
            h = liHtmlPattern;
            h = h.replace("{{URL}}", menu[i].url).replace("{{NAME}}", menu[i].text);
            jQuery('.Navigation-list').append(h);
        }
    },
    prepereSettings: function() {
        var settings = [];
        jQuery('.login-bar li a').each(function() {
            settings.push({
                url: jQuery(this).attr("href").trim(),
                text: jQuery(this).text().trim(),
                icon: jQuery(this).find('i').attr('class').trim()
            });
        });
        var linkHtmlPattern = "\n<li><a href='{{URL}}'><i class='{{ICON}}'></i> {{NAME}}</a></li>";
        var h = "";
        if (ONLINE === false) {
            pwaNavigation.addReadingList(settings);
            jQuery('.AvatarMenu-menu ul li').remove();
            h = linkHtmlPattern;
            h = h.replace("{{URL}}", settings[0].url).replace("{{ICON}}", settings[0].icon).replace("{{NAME}}", settings[0].text);
            jQuery('.AvatarMenu-menu ul').append(h);
        } else {
            for (var i in settings) {
                if (typeof (settings[i].url) === "undefined") {
                    continue;
                }
                h = linkHtmlPattern;
                h = h.replace("{{URL}}", settings[i].url).replace("{{ICON}}", settings[i].icon).replace("{{NAME}}", settings[i].text);
                jQuery('.AvatarMenu-menu ul').append(h);
            }
        }
        if ($('.comment-trigger').length > 0) {
            $('.AvatarMenu-menu ul').append('<li class="leave-feedback"><i class="fas fa-at"></i></li>');
            $('.comment-trigger').appendTo('.AvatarMenu-menu ul .leave-feedback')
            $('.comment-trigger').addClass('pwa-feedback')
        }
    },
    prepereSearch: function() {
        if (ONLINE === false) {
            if (typeof (cpOffline) !== "object") {
                return false;
            }
            var rlLinkHtml = "\n<a href='{{URL}}'><i class='fas fa-search'></i></a>";
            rlLinkHtml = rlLinkHtml.replace("{{URL}}", cpOffline.search.url)
            $('.pwa-search.pwa-item a').replaceWith(rlLinkHtml)
        }
    },
    prepereLanguages: function() {
        var languages = [];
        jQuery('.translate ul li a').each(function() {
            languages.push(jQuery(this)[0])
        });
        jQuery('.AvatarMenu-menu ul').append('<li class="language-switcher"></li>');
        for (var i in languages) {
            if (typeof (languages[i]) !== "object") {
                continue;
            }
            jQuery('.AvatarMenu-menu .language-switcher').append(languages[i]);
        }
    },
    addReadingList: function(settingsArray) {
        if (typeof (cpOffline) !== "object") {
            return settingsArray;
        }
        if (typeof (cpOffline.rl) !== "object") {
            return settingsArray;
        }
        settingsArray.unshift(cpOffline.rl);
        return settingsArray;
    },
    desktopNavigationFix: function() {
        if (ONLINE === true) {
            return false;
        }
        if (typeof (cpOffline) !== "object") {
            return false;
        }
        var rlLinkHtml = "\n<li class='rl-offline'><a href='{{URL}}'><i class='icon {{ICON}}' aria-hidden='true'></i>{{TEXT}}</a></li>";
        rlLinkHtml = rlLinkHtml.replace("{{URL}}", cpOffline.rl.url).replace("{{ICON}}", cpOffline.rl.icon).replace("{{TEXT}}", cpOffline.rl.text);
        jQuery(".login-bar").fadeOut(function() {
            jQuery(".login-bar li").hide();
            jQuery(".login-bar ul").append(rlLinkHtml);
            jQuery(".login-bar").fadeIn();
        });
    }
};
pwaNavigation.init();
var serviceFeatures = {
    fileUploadUrl: "/api/attachfiles?ref=&field=image&locale=en",
    ratio: 1.77,
    debug: true,
    picture: null,
    camerasAmount: null,
    currentFacingMode: "environment",
    sel: {
        service: "#dform_squiz",
        navButtons: "button.dform_widget_type_button",
        navItems: "ul#dform_navigation li a",
        fileUpload: "input[type='file'][id*='image']",
        mainForm: "form.dform"
    },
    log: function(msg) {
        if (serviceFeatures.debug !== true) {
            return false;
        }
        console.log(msg);
        return true;
    },
    init: function() {
        if (window.location.href.indexOf("/my-account/") > -1) {
            return false;
        }
        if (jQuery(serviceFeatures.sel.service).length === 0) {
            return false;
        }
        serviceFeatures.getListOfCameras();
        serviceFeatures.attachEvents();
        return true;
    },
    attachEvents: function() {
        jQuery(document).on("_KDF_ready", function(event, kdf) {
            serviceFeatures.log("KDF is Ready!");
            serviceFeatures.mediaDevicesFallback();
            serviceFeatures.handleImages();
        });
    },
    handleImages: function() {
        if (jQuery(serviceFeatures.sel.fileUpload).length === 0) {
            return false;
        }
        serviceFeatures.log("There are img fields on this form: " + jQuery(serviceFeatures.sel.fileUpload).length);
        var imgInputs = jQuery(serviceFeatures.sel.fileUpload);
        var thisId = "";
        var cHTML = "";
        var thisVideoPlayer = null;
        imgInputs.each(function() {
            thisId = jQuery(this).attr("id");
            cHTML = serviceFeatures.HTML.imgCapture;
            cHTML = cHTML.replace("{{ID}}", thisId);
            jQuery(this).closest("div.box").before(cHTML);
            if (serviceFeatures.camerasAmount > 1) {
                jQuery(".capture-image .switch-camera").show();
            }
            jQuery(this).closest("div.box").hide();
        });
        jQuery(".controls .upload-image").click(function(e) {
            e.preventDefault();
            thisId = jQuery(this).closest("div.capture-image").attr("data-for");
            jQuery(this).closest("div.capture-image").find(".controls").fadeOut(function() {
                jQuery("#" + thisId).closest("div.box").fadeIn();
            });
        });
        jQuery(".controls .upload-photo").click(function(e) {
            e.preventDefault();
            jQuery(this).closest("div.capture-image").find(".controls").fadeOut(function() {
                jQuery(this).closest("div.capture-image").find(".video-player").fadeIn();
                thisVideoPlayer = jQuery(this).closest("div.capture-image").find(".video-player video")[0];
                serviceFeatures.startStreaming(thisVideoPlayer);
            });
        });
        jQuery(".capture-image .capture-btn").click(function(e) {
            e.preventDefault();
            serviceFeatures.makePhoto(jQuery(this));
        });
        jQuery(".capture-image .save-photo").click(function(e) {
            e.preventDefault();
            thisId = jQuery(this).closest(".capture-image").attr("data-for");
            serviceFeatures.sendImage(thisId);
        });
        jQuery(".capture-image .retake-photo").click(function(e) {
            e.preventDefault();
            serviceFeatures.retakePhoto(jQuery(this));
        });
        jQuery(".capture-image .switch-camera").click(function(e) {
            e.preventDefault();
            serviceFeatures.switchCamera(jQuery(this));
        });
        jQuery(".capture-image .rotate-img").click(function(e) {
            e.preventDefault();
            var canvas = jQuery(this).closest(".capture-image").find("canvas");
            var degree = parseInt(jQuery(this).attr("data-rot"), 10);
            serviceFeatures.rotateImg(canvas, degree);
        });
    },
    startStreaming: function(vPlayer, facingMode) {
        if (typeof (facingMode) === "undefined") {
            facingMode = "environment";
        }
        var videoConstraints = {
            "video": {
                "width": {
                    "min": 280,
                    "ideal": 720,
                    "max": 1080
                },
                "height": {
                    "min": 320,
                    "ideal": 1280,
                    "max": 1920
                },
                "facingMode": {
                    "ideal": facingMode
                }
            }
        };
        var videoConstraintsMobile = {
            "video": {
                "facingMode": {
                    "ideal": facingMode
                }
            }
        };
        if (serviceFeatures.isMobileDevice() === true) {
            videoConstraints = videoConstraintsMobile;
        }
        navigator.mediaDevices.getUserMedia(videoConstraints).then(function(stream) {
            vPlayer.srcObject = stream;
            vPlayer.style.display = "block";
        }).catch(function(err) {
            serviceFeatures.log("[PWA] No Access to the camera or no player on the page...");
            serviceFeatures.log(err);
            jQuery(body).append(err);
        });
    },
    switchCamera: function(btnObj) {
        var videoPlayer = btnObj.closest(".capture-image").find("video")[0];
        videoPlayer.srcObject.getVideoTracks().forEach(function(track) {
            track.stop();
        });
        videoPlayer.srcObject = null;
        if (serviceFeatures.currentFacingMode === "user") {
            serviceFeatures.startStreaming(videoPlayer, "environment");
            serviceFeatures.currentFacingMode = "environment";
        } else {
            serviceFeatures.startStreaming(videoPlayer, "user");
            serviceFeatures.currentFacingMode = "user";
        }
    },
    retakePhoto: function(btnEl) {
        if (typeof (btnEl) === "undefined") {
            return false;
        }
        serviceFeatures.picture = null;
        btnEl.closest(".capture-image").find(".canvas-area").fadeOut(function() {
            btnEl.closest(".capture-image").find(".video-player").fadeIn();
        });
        var videoPlayer = btnEl.closest(".capture-image").find("video");
        if (typeof (videoPlayer) === "undefined") {
            return false;
        }
        if (videoPlayer.length === 0) {
            return false;
        }
        serviceFeatures.startStreaming(videoPlayer[0]);
    },
    makePhoto: function(captureBtn) {
        var canvasEl = captureBtn.closest(".capture-image").find("canvas");
        var playerEl = captureBtn.closest(".capture-image").find("video");
        playerEl.closest(".video-player").fadeOut(function() {
            canvasEl.closest(".canvas-area").fadeIn();
        });
        var playerHeight = playerEl.height();
        var playerWidth = playerEl.width();
        canvasEl.attr("width", playerWidth);
        canvasEl.attr("height", playerHeight);
        var context = canvasEl[0].getContext("2d");
        context.drawImage(playerEl[0], 0, 0, playerWidth, playerHeight);
        playerEl[0].srcObject.getVideoTracks().forEach(function(track) {
            track.stop();
        });
        playerEl[0].srcObject = null;
        serviceFeatures.picture = serviceFeatures.dataURItoBlob(canvasEl[0].toDataURL());
    },
    sendImage: function(inputId) {
        if (serviceFeatures.picture === null) {
            return false;
        }
        if (typeof (KDF) === "undefined") {
            return false;
        }
        if (typeof (KDF.kdf()) === "undefined") {
            return false;
        }
        if (typeof (KDF.kdf().auth) === "undefined") {
            return false;
        }
        var fieldName = jQuery("#" + inputId).attr("name");
        var imageName = "img_" + new Date().getTime() + ".png";
        var postData = new FormData();
        postData.append(fieldName, serviceFeatures.picture, imageName);
        var fields = jQuery(serviceFeatures.sel.mainForm).serializeArray();
        for (var i in fields) {
            postData.append(fields[i].name, fields[i].value);
        }
        var reqOptions = {
            method: "POST",
            body: postData,
            headers: {
                "Accept": "application/json",
                "Authorization": KDF.kdf().auth
            }
        };
        fetch(serviceFeatures.fileUploadUrl, reqOptions).then(function(resp) {
            serviceFeatures.updateKdfAuth(resp.headers.get("Authorization"));
            return resp.json();
        }).then(function(data) {
            serviceFeatures.log("[PWA] Image upload success:");
            serviceFeatures.log(data);
            serviceFeatures.sendImageCallback(data, inputId);
        }).catch(function(err) {
            serviceFeatures.log("[PWA] Image upload failed");
            serviceFeatures.log(err);
        });
    },
    updateKdfAuth: function(authToken) {
        if (typeof (authToken) !== "string") {
            return false;
        }
        serviceFeatures.log("New KDF Token: " + authToken);
        KDF.kdf().auth = authToken;
        return true;
    },
    sendImageCallback: function(data, inputId) {
        data = data[0];
        if (data.token === undefined) {
            return false;
        }
        if (data.filename === undefined) {
            return false;
        }
        if (typeof (KDF.kdf().form.filetokens) === "undefined") {
            KDF.kdf().form.filetokens = [];
        }
        KDF.kdf().form.filetokens.push(data.token);
        var output = serviceFeatures.HTML.imgPostUpload;
        output = output.replace("{{TOKEN}}", data.token);
        output = output.replace(/\{\{FILENAME\}\}/g, data.filename);
        var container = jQuery("div.box.capture-image").filter(function() {
            if (jQuery(this).attr("data-for") === inputId) {
                return true;
            }
            return false;
        });
        container.after(output);
        serviceFeatures.picture = null;
        container.find(".canvas-area").fadeOut(function() {
            container.find(".controls").fadeIn();
            container.next(".photo-details").fadeIn();
        });
    },
    rotateImg: function(canvasEl, degree) {
        if (typeof (canvasEl) === "undefined") {
            return false;
        }
        if (typeof (degree) === "undefined") {
            return false;
        }
        var context = canvasEl[0].getContext("2d");
        var tempCanvas = document.createElement("canvas");
        var tempContext = tempCanvas.getContext("2d");
        tempCanvas.width = canvasEl[0].height;
        tempCanvas.height = canvasEl[0].width;
        tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempContext.translate(tempCanvas.width / 2, tempCanvas.height / 2);
        tempContext.rotate(degree * Math.PI / 180);
        tempContext.translate(-tempCanvas.height / 2, -tempCanvas.width / 2);
        tempContext.drawImage(canvasEl[0], 0, 0, canvasEl[0].width, canvasEl[0].height);
        canvasEl.after(tempCanvas);
        canvasEl.remove();
        serviceFeatures.picture = serviceFeatures.dataURItoBlob(tempCanvas.toDataURL());
        return true;
    },
    mediaDevicesFallback: function() {
        if ('mediaDevices'in navigator === true) {
            return true;
        }
        navigator.mediaDevices = {};
        if ('getUserMedia'in navigator.mediaDevices === true) {
            return true;
        }
        navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented!'));
            }
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            }
            );
        }
        return true;
    },
    getListOfCameras: function() {
        serviceFeatures.log("Getting list of cameras... ");
        if ('enumerateDevices'in navigator.mediaDevices === false) {
            return 0;
        }
        return navigator.mediaDevices.enumerateDevices().then(function(devices) {
            var camerasAmount = 0
            for (var i in devices) {
                if (devices[i].kind === "videoinput") {
                    camerasAmount++;
                }
            }
            serviceFeatures.camerasAmount = camerasAmount;
            serviceFeatures.log("Cameras Amount = " + serviceFeatures.camerasAmount);
        }).catch(function(err) {
            serviceFeatures.log("[PWA] Could not enumerate devices...");
            return 0;
        });
    },
    dataURItoBlob: function(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab],{
            type: mimeString
        });
        return blob;
    },
    isMobileDevice: function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }
};
serviceFeatures.HTML = {};
serviceFeatures.HTML.imgCapture = "" + "\n<div data-for='{{ID}}' class='box twelve capture-image'>" + "\n  <div class='controls'>" + "\n    <button class='btn upload-photo'>Upload Photo</button>" + "\n    <button class='btn upload-image'>Upload Image</button>" + "\n  </div>" + "\n  <div class='video-player' style='display: none;'>" + "\n    <video autoplay></video>" + "\n    <button class='dform_widget green dform_widget_type_button capture-btn'>Capture</button>" + "\n    <button style='display: none;' class='dform_widget green dform_widget_type_button switch-camera'>Switch Camera</button>" + "\n  </div>" + "\n  <div class='canvas-area' style='display: none;'>" + "\n    <canvas></canvas>" + "\n    <button class='dform_widget blue dform_widget_type_button rotate-img' data-rot='-90'>&laquo; Rotate Image</button>" + "\n    <button class='dform_widget blue dform_widget_type_button rotate-img' data-rot='90'>Rotate Image &raquo;</button><br />" + "\n    <button class='dform_widget green dform_widget_type_button save-photo'>Accept Photo</button>" + "\n    <button class='dform_widget green dform_widget_type_button retake-photo'>Retake Photo</button>" + "\n  </div>" + "\n</div>\n";
serviceFeatures.HTML.imgPostUpload = "" + "\n <div class='box twelve file-details photo-details' style='display: none;'>" + "\n   <div class='dform_filenames' id='dform_widget_image_files'>" + "\n     <span data-filename='{{FILENAME}}' data-token='{{TOKEN}}'>" + "\n       {{FILENAME}}" + "\n       <span class='file_delete'>4</span>" + "\n     </span>" + "\n   </div>" + "\n </div>";
serviceFeatures.init();
var oneSignalTools = {
    setOnSwitch: true,
    init: function() {
        jQuery(document).on("__CP_OneSignal_Ready", function() {
            pwaCore.log("[PWA] :: OneSignal is Ready");
            oneSignalTools.onLoad();
        });
        jQuery(document).on("__CP_Persona_updated", function() {
            oneSignalTools.updatePersonaTag();
        });
    },
    onLoad: function() {
        oneSignalTools.setUserDetails();
        if (oneSignalTools.setOnSwitch === true) {
            oneSignalTools.setUserLanguage();
        }
    },
    setUserDetails: function() {
        var loggedInUser = document.getElementById("logged-in");
        if (loggedInUser === null) {
            return false;
        }
        if (typeof (sessionStorage) !== "object") {
            return false;
        }
        if (sessionStorage.getItem("ONESIGNAL_NAME_SET") === "true") {
            return false;
        }
        var userFirstName = loggedInUser.querySelector(".first-name").textContent;
        pwaCore.log("Set user's 'first name' tag :: " + userFirstName);
        oneSignalTools.sendTags({
            "first_name": userFirstName
        });
        sessionStorage.setItem("ONESIGNAL_NAME_SET", "true");
    },
    updatePersonaTag: function() {
        if (typeof (wssP) !== "object") {
            return false;
        }
        if (typeof (wssP.whoami) !== "string") {
            return false;
        }
        if (wssP.whoami.length === 0) {
            return false;
        }
        oneSignalTools.sendTags({
            "persona": wssP.whoami
        });
    },
    setUserLanguage: function() {
        pwaCore.log("{OneSignal :: Lang} Check if user's language needs to be set...");
        var userLang = jQuery("html").attr("lang") || "en";
        if (typeof (sessionStorage) !== "object") {
            return false;
        }
        if (sessionStorage.getItem("ONESIGNAL_PLAYER_LANG") === userLang) {
            return false;
        }
        pwaCore.log("{OneSignal :: Lang} No information about lang... definitely needs to be set.");
        var appId = jQuery("script#onesignal_js").attr("data-onesignal");
        OneSignal.getUserId().then(function(usrId) {
            return OneSignal.api.updatePlayer(appId, usrId, {
                "language": userLang
            }).then(function(apiRespone) {
                pwaCore.log("Set player's language...");
                pwaCore.log(apiRespone);
            });
        }).catch(function(err) {
            pwaCore.log("Error while setting up user's language...")
            pwaCore.log(err);
        });
        sessionStorage.setItem("ONESIGNAL_PLAYER_LANG", userLang);
        return true;
    },
    sendTags: function(tagsObject) {
        if (typeof (OneSignal) === "undefined") {
            return false;
        }
        if (typeof (tagsObject) !== "object") {
            return false;
        }
        OneSignal.push(function() {
            OneSignal.sendTags(tagsObject).then(function(tagsSent) {
                pwaCore.log(tagsSent);
            });
        });
    },
    getUserTags: function() {
        OneSignal.getTags().then(function(r) {
            pwaCore.log(r);
        });
    }
};
oneSignalTools.init();
var cookieOverlay = {
    cname: {
        optInCookie: "_gat_opt_in",
        smOptInCookie: "_sm_opt_in"
    },
    status: {
        trackingInitialized: false
    },
    settings: {
        enableSubdomains: true,
        updateOnSwitch: true
    },
    init: function() {
        if (typeof (cookieOverlayCfg) !== "object") {
            return false;
        }
        if (cookieOverlayCfg.enable !== true) {
            return false;
        }
        return cookieOverlay.buildHtml();
    },
    buildHtml: function() {
        if ($('body').hasClass('iframe')) {
            return false;
        }
        var overlayOutput = "";
        if (window.matchMedia('(display-mode: standalone)').matches === true) {
            overlayOutput = cookieOverlay.html.link + "\n" + cookieOverlay.html.popup;
        } else {
            overlayOutput = cookieOverlay.html.btn + "\n" + cookieOverlay.html.popup;
        }
        overlayOutput = overlayOutput.replace("{{GENERAL_COOKIES_INFO}}", cookieOverlayCfg.content.mainInfo);
        overlayOutput = overlayOutput.replace("{{ANALYTICS_COOKIES_INFO}}", cookieOverlayCfg.content.analyticsInfo);
        overlayOutput = overlayOutput.replace("{{SOCIAL_COOKIES_INFO}}", cookieOverlayCfg.content.socialMediaInfo);
        overlayOutput = overlayOutput.replace("{{SETTINGSBTN}}", cookieOverlayCfg.content.settingsBtn);
        overlayOutput = overlayOutput.replace("{{SAVEBTN}}", cookieOverlayCfg.content.saveBtn);
        if (cookieOverlayCfg.trackingEnabled === true) {
            overlayOutput = overlayOutput.replace("{{TRACKING_CHECKED}}", "checked");
        } else {
            overlayOutput = overlayOutput.replace("{{TRACKING_CHECKED}}", "");
        }
        if (window.matchMedia('(display-mode: standalone)').matches === true) {
            var htmlObj = jQuery(overlayOutput);
            $(htmlObj).insertBefore('.AvatarMenu-menu .language-switcher')
        } else {
            jQuery("body").append(overlayOutput);
            var widthButton = $('#lhsc-msg').outerWidth();
            var widthIcon = $('#lhsc-msg i').outerWidth();
            $('#lhsc-msg').css('left', -widthButton + widthIcon + 2);
        }
        cookieOverlay.startFunctionality();
        return true;
    },
    startFunctionality: function() {
        var analyticsCookie = jQuery.cookie(cookieOverlay.cname.optInCookie);
        var socialMediaCookie = jQuery.cookie(cookieOverlay.cname.smOptInCookie);
        var gaCheckbox = jQuery("#ga-cookie");
        if (socialMediaCookie === "1") {
            jQuery("#sm-cookie").attr("checked", "checked");
            jQuery(document).trigger("__CP_SocialMediaTracking");
        }
        if (cookieOverlay.testTracking(analyticsCookie) === true) {
            jQuery("#ga-cookie").attr("checked", "checked");
            jQuery(document).trigger("__CP_AnalyticsTracking");
            cookieOverlay.startTracking(false);
        } else {
            jQuery("#ga-cookie").removeAttr("checked");
        }
        if (analyticsCookie === undefined) {
            cookieOverlay.showOverlayInit();
        }
        cookieOverlay.attachEvents();
        return true;
    },
    showOverlayInit: function() {
        if (jQuery("#lhsc-overlay").is(":visible") === false) {
            if (window.matchMedia('(display-mode: standalone)').matches === false) {
                jQuery("#lhsc-overlay").fadeIn();
            }
        }
    },
    testTracking: function(cookieValue) {
        if (typeof (__gaid) === "undefined") {
            return false;
        }
        if (typeof (ga) !== "function") {
            return false;
        }
        if (cookieValue === "0") {
            return false;
        }
        if (cookieValue === "1") {
            return true;
        }
        return cookieOverlayCfg.trackingEnabled;
    },
    attachEvents: function() {
        jQuery("#lhsc-msg, .AvatarMenu-menu .cookie-settings a").click(function(e) {
            e.preventDefault();
            if (jQuery("#lhsc-overlay").is(":visible") === true) {
                jQuery("#lhsc-overlay").fadeOut();
            } else {
                jQuery("#lhsc-overlay").fadeIn(function() {});
            }
        });
        jQuery("#ga-cookie").change(function() {
            if (cookieOverlay.settings.updateOnSwitch === true) {
                cookieOverlay.testState();
            }
        });
        jQuery("#sm-cookie").change(function() {
            if (cookieOverlay.settings.updateOnSwitch === true) {
                cookieOverlay.socialMediaCookie();
            }
        });
        jQuery("#lhsc-save").click(function(e) {
            e.preventDefault();
            jQuery("#lhsc-overlay").fadeOut();
            var cookieValue = "0";
            if (jQuery("#ga-cookie").is(":checked") === true) {
                cookieValue = "1";
            }
            var cookieDetails = cookieOverlay.getCookieDetails();
            jQuery.cookie(cookieOverlay.cname.optInCookie, cookieValue, {
                expires: cookieDetails[1],
                path: "/",
                domain: cookieDetails[0]
            });
            if (cookieOverlay.settings.updateOnSwitch !== true) {
                cookieOverlay.socialMediaCookie();
                cookieOverlay.testState();
            }
        });
    },
    testState: function() {
        if (jQuery("#ga-cookie").is(":checked") === true) {
            return cookieOverlay.startTracking();
        }
        return cookieOverlay.stopTracking();
    },
    stopTracking: function() {
        window["ga-disable-" + __gaid] = true;
        var cookieDetails = cookieOverlay.getCookieDetails();
        jQuery.cookie(cookieOverlay.cname.optInCookie, "0", {
            expires: cookieDetails[1],
            path: "/",
            domain: cookieDetails[0]
        });
        if (typeof (ga) === "function") {
            ga("remove");
        }
        jQuery.removeCookie("_ga", {
            path: "/",
            domain: cookieDetails[0]
        });
        jQuery.removeCookie("_gid", {
            path: "/",
            domain: cookieDetails[0]
        });
        jQuery.removeCookie("_gat", {
            path: "/",
            domain: cookieDetails[0]
        });
        return true;
    },
    startTracking: function(updateMainCookie) {
        window["ga-disable-" + __gaid] = false;
        if (typeof (ga) === "function") {
            if (cookieOverlay.status.trackingInitialized === false) {
                ga("create", __gaid, "auto");
                ga("set", "anonymizeIp", true);
                ga("send", "pageview");
                cookieOverlay.status.trackingInitialized = true;
            }
        }
        var cookieDetails = cookieOverlay.getCookieDetails();
        if (updateMainCookie !== false) {
            jQuery.cookie(cookieOverlay.cname.optInCookie, "1", {
                expires: cookieDetails[1],
                path: "/",
                domain: cookieDetails[0]
            });
        }
        return true;
    },
    socialMediaCookie: function() {
        var cookieDetails = cookieOverlay.getCookieDetails();
        if (jQuery("#sm-cookie").is(":checked") === true) {
            jQuery.cookie(cookieOverlay.cname.smOptInCookie, "1", {
                expires: cookieDetails[1],
                path: "/",
                domain: cookieDetails[0]
            });
            return true;
        }
        jQuery.removeCookie(cookieOverlay.cname.smOptInCookie, {
            path: "/",
            domain: cookieDetails[0]
        });
        return false;
    },
    getCookieDetails: function() {
        var thisDomain = window.location.hostname;
        if (cookieOverlay.settings.enableSubdomains === true) {
            thisDomain = thisDomain.split(".");
            thisDomain.shift();
            thisDomain = "." + thisDomain.join(".");
        }
        var expDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        return [thisDomain, expDate];
    }
};
cookieOverlay.html = {};
cookieOverlay.html.btn = "" + "\n<button id='lhsc-msg'>" + "\n  <span class='txt'>{{SETTINGSBTN}}</span>" + "\n  <i title='Cookie Settings' class='fas fa-cog'></i> " + "\n</button>";
cookieOverlay.html.link = "" + "\n<li class='cookie-settings'>" + "\n <a id='aa' href='#'><i class='fas fa-cog'></i>{{SETTINGSBTN}}</a>" + "\n</li>";
cookieOverlay.html.popup = "" + "\n<div id='lhsc-overlay'>" + "\n  <div class='lhsc-overlay-content'>" + "\n    {{GENERAL_COOKIES_INFO}}" + "\n    <div class='switcher-toggle ga-switcher custom-switch custom-switch-label-io pl-0 custom-switch-sm'>" + "\n      <input type='checkbox' {{TRACKING_CHECKED}} name='ga-cookie' id='ga-cookie' title='Enable/Disable Tracking Cookies' class='custom-switch-input' />" + "\n      <label class='custom-switch-btn' for='ga-cookie'></label>" + "\n    </div>" + "\n    {{ANALYTICS_COOKIES_INFO}}" + "\n    <div class='switcher-toggle sm-switcher custom-switch custom-switch-label-io pl-0 custom-switch-sm'>" + "\n      <input type='checkbox' name='sm-cookie' id='sm-cookie' title='Enable/Disable Social Media Cookies' class='custom-switch-input' />" + "\n      <label class='custom-switch-btn' for='sm-cookie'></label>" + "\n    </div>" + "\n    {{SOCIAL_COOKIES_INFO}}" + "\n    <div class='save-btn-box'>" + "\n       <button id='lhsc-save' class='btn btn-cookie-commit'>{{SAVEBTN}}</button>" + "\n    </div>" + "\n  </div>" + "\n</div>";
jQuery(document).ready(function() {
    cookieOverlay.init();
});
