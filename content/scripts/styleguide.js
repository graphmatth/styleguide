
$(document).ready(function () {
    var oldVal = "";

    initSearchControl();
    var owl = $(".owl-departement");

    owl.owlCarousel({
        autoplay: true,
        loop: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        items: 1,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1,
            },
            // breakpoint from 480 up
            480: {
                items: 2,
            },
            // breakpoint from 768 up
            768: {
                items: 3,
            },

            1024: {
                items: 4,
            }
        },

        itemsDesktop: [1200, 5], //5 items between 1200px and 992px
        itemsDesktopSmall: [1024, 4], //4 items betweem 992px and 767px
        itemsTablet: [767, 3], //3 items between 767px and 480px
        itemsMobile: [480, 2] // 2 items between 480px and 0 
    });

    
    // Tweets carousel
    $(".owl-tweet").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        margin: 15,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items: 1,
            },
            // breakpoint from 480 up
            480 : {
                items: 1,
            },
            // breakpoint from 768 up
            800 : {
                items: 2,
            },

            1024 : {
                items: 2,
            }
        },
    });


    // Generate tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        });
    })
    // Custom Navigation Events
    $(".next").click(function () {
        owl.trigger('next.owl.carousel');
    })

    $(".prev").click(function () {
        owl.trigger('prev.owl.carousel');
    })


    $('#menu-button').click(function (e) {
        $('#navbar').addClass('visible');
    });

    jQuery('body').bind('click', function (e) {

        if (jQuery(e.target).closest('#navbar').length == 0) {
            var clickover = $(event.target);
            var openSidebar = jQuery('#navbar').hasClass('visible');
            if (openSidebar === true && !clickover.hasClass("menu-button")) {
                $('#navbar').removeClass('visible');
            }
        }
    });

    // Floating Labels
    //==============================================================
    $('[data-toggle="floatLabel"]').attr('data-value', $(this).val()).on('keyup change', function () {
        $(this).attr('data-value', $(this).val());
    });

    $("[name='my-checkbox']").bootstrapSwitch();

    // ajoute la class orange a l'icon "local_offer" lorsqu'on clique dans le champ ajout d'un tag
    $(".bootstrap-tagsinput input").focus(function () {
        $(".i-asso").addClass("orange");
    });
    // retire la class orange a l'icon "local_offer" lorsqu'on clique dans le champ ajout d'un tag
    $(document).click(function (event) {
        if (!$(event.target).closest('.bootstrap-tagsinput input').length) {
            $(".i-asso").removeClass("orange");
        }
    });
});


// Select all links with hashes
$('a[href*="#"]')
    // Remove links that don't need smoooth transition
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[data-toggle="collapse"]')
    .not('[data-toggle="tab"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1200, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    })



// SHOW HIDE PASSWORD SCRIPT
$(document).ready(function () {
    $('.show-password').click(function () {
        if ($(this).next('input').prop('type') == 'password') {
            $(this).next('input').prop('type', 'text');
            $(this).text('Masquer');
        } else {
            $(this).next('input').prop('type', 'password');
            $(this).text('Afficher');
        }
    });
});


$(function () {
    //bind float label plugin
    $('[data-toggle="floatLabel"]').attr('data-value', $(this).val()).on('keyup change', function () {
        $(this).attr('data-value', $(this).val());
    }).trigger("change");
});

// Floating Labels
//==============================================================
$('[data-toggle="floatLabel"]').on('keyup change', function () {
    $(this).attr('data-value', $(this).val());
}).trigger("change");

function clearInputs() {
    $('#inputFirstname').val('');
    $('#inputLastname').val('');

    $('#partnerlastname').val('');
    $('#partnerfirstname').val('');

    $('#fatherlastname').val('');
    $('#fatherfirstname').val('');

    $('#motherlastname').val('');
    $('#motherfirstname').val('');

    $('#inputAroundYear').val('');
    $('#inputFromYear').val('');
    $('#inputToYear').val('');

    ClearPlaceHiddenInputs();
}

function onAutocompleted($e, datum) {
    $('#Latitude').val(datum.Latitude);
    $('#Longitude').val(datum.Longitude);
    $('#Geonameid').val(datum.Id);
    $('#FeatureCode').val(datum.FeatureCode);
    $('#DepartementId').val(datum.DepartementId);
    $('#RegionId').val(datum.RegionId);
}
function ClearPlaceHiddenInputs() {
    $('#inputPlace').typeahead('val', '');
    $('#Longitude').val('0');
    $('#Latitude').val('0');
    $('#Geonameid').val('');
    $('#FeatureCode').val('');
    $('#DepartementId').val('');
    $('#RegionId').val('');
    $("#PlaceFilter").val("AllPlaces");
}
//#endregion Autocomplete

//#region Form
function initSearchControl(familyMemberDic) {
    //InitVariable
    var oldVal = "";
    hasFather = false;
    hasMother = false;
    hasPartner = false;
    navBarOuterHeight = $('#navigationBarSearch').outerHeight();

    //Add action on Reset form button
    $(document).on("click", "#clearform", function (e) {
        e.preventDefault();
        window.location = appPath + "/Search.mvc/SearchForm";
    });
    $(document).on("input propertychange", ".mainField", function (e) {
        var currentVal = $("#inputLastname").val()
        if (currentVal == oldVal) {
            return; //check to prevent multiple simultaneous triggers
        }
        oldVal = currentVal;
        if ($("#inputLastname").val() == '') {
            $("#clearform").addClass('hide');
        } else {
            $("#clearform").removeClass('hide');
        }
    });

    $('.hasclear').each(function () {
        if ($('.hasclear').length > 0) {
            toggleClearButton($(this));
        }
    });

    $('#searchForm').on('keyup', "input", function (event) {
        if ($("#inputPlace").val() === '')
            ClearPlaceHiddenInputs();
    });

    //Init clearable fields to display the clear button
    $(".hasclear").click(function () { toggleClearButton($(this)) });
    $(".hasclear").keyup(function () { toggleClearButton($(this)) });
    $(".clearer").click(function () {
        var self = $(this);
        var inputId = self.attr('id');
        inputId = inputId.substring(0, inputId.length - 5);
        $('#' + inputId).val('');
        if (inputId === 'inputPlace') {
            ClearPlaceHiddenInputs();
        }
        self.hide();
    });

}

function toggleClearButton(self) {
    $('#' + self.attr('id') + 'Clear').toggle(Boolean(self.val()));
}
function showOrHideClearBtn(input) {
    $(input).val().length > 0 ? $(input).next().show() : $(input).next().hide();
}
function clearField(clearBtn) {
    $(clearBtn).prev().val('');
    $(clearBtn).hide();
}

function CopyBg(elem) {
    var rgbColor = $(elem).css('background-color');
    var hexaColor = rgb2hex(rgbColor);
    hexaColor = hexaColor.toUpperCase();
    copyToClipboard(hexaColor);
}

function CopyIcon(elem) {
    var iconFont = $(elem).find("i");
    var iconFontHtml = iconFont.context.innerText;
    console.log(iconFontHtml);
    copyIconToClipboard(iconFontHtml);
}

var hexDigits = new Array
    ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}



// COPY TO CLIPBOARD
// src: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyToClipboard(text) {
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    textArea.style.width = '2em';
    textArea.style.height = '2em';

    textArea.style.padding = 0;

    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();


    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log(msg);

        $.dreamAlert({
            'type': 'success',
            'message': textArea.value + ' copié !'
        });
      } catch (err) {
        console.log('Oops, unable to copy');
                $.dreamAlert({
            'type': 'error',
            'message': 'Erreur !'
        });
      }

    document.body.removeChild(textArea);
}

function copyIconToClipboard(text) {
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    textArea.style.width = '2em';
    textArea.style.height = '2em';

    textArea.style.padding = 0;

    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();


    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log(msg);

        $.dreamAlert({
            'type': 'success',
            'icon': '',
            'message': textArea.value + ' copié !'
        });
      } catch (err) {
        console.log('Oops, unable to copy');
                $.dreamAlert({
            'type': 'error',
            'message': 'Erreur !'
        });
      }

    document.body.removeChild(textArea);
}

$( ".toggle-flipp" ).click(function() {
    $(".btn-flipper").toggleClass( "flipped" );
});