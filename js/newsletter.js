$(document).ready(function() {


    /* 
    Get url in xml file
    ========================================================================== */

    var allowCrossDomain = function(req, res, next) {
        // Website you wish to allow to connect
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    };

    var divn = $('#owl-news');
    divn.hide();
    if (divn != null) {
        divn.html('');

        $.ajax({
            type: "GET",
            url: "newsletter.xml",
            dataType: "xml",
            processData: false,
            contentType: "text/xml; charset=\"utf-8\"",
            success: function(xml) {
                var html = '';
                var cont = 1;
                //var cont = 0;
                $(xml).find('artigo').each(function() {

                    var sIcone = $(this).find('icone').text();
                    var sTitulo = $(this).find('titulo').text();
                    var sDescricao = $(this).find('descricao').text();
                    var sURL = $(this).find('url').text();

                    //console.log(sTitulo);

                    //$("<li></li>").html(sTitulo + ", " + sAutor + ", " + sGenero).appendTo("#contentArea ul");
                    //console.log(sTitulo);


                    //html = '<div class="sub-item-box">';
                    html = html + '<div class="sub-item-box">';
                    if (sURL != '') {
                        html = html + '<a href="' + sURL + '" target="_blank">';
                    }

                    html = html + '<div class="icon-box">';
                    html = html + '<i class="lni-' + sIcone + '"></i>';
                    html = html + '</div>';
                    html = html + '<div class="text-box">';
                    html = html + '<h4>' + sTitulo + '</h4>';
                    html = html + '<p>' + sDescricao + '</p>';
                    html = html + '</div>';

                    if (sURL != '') {
                        html = html + '</a>';
                    }

                    html = html + '</div>';

                    if (cont == 3) {
                        divn.append('<div class="item">' + html + '</div>');
                        cont = 0;
                        html = '';
                    }
                    //divn.append('<div class="item">' + html + '</div>');

                    cont = cont + 1;

                });

                if (html != '') {
                    divn.append('<div class="item">' + html + '</div>');
                }

            },
            error: function() {
                alert("Ocorreu um erro inesperado durante o processamento.");
            }
        });
    }






    /* 
    Touch Owl Carousel
    //
    itemsDesktopSmall: [1024, 1],
    itemsTablet: [600, 1],
    itemsMobile: [479, 1]
    ========================================================================== */
    setTimeout(function() {

        $("#owl-news").owlCarousel({

            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items: 1,
            slideSpeed: 3000,
            stopOnHover: true

            /*
            autoplay: 4000,
            
            items: 1,
            nav: true*/

        });
        //alert('ok');
        divn.show();

    }, 3000);





    /*$("#newsletter").owlCarousel({
    items: 3,
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    rewind: true,
    autoplay: true,
    margin: 0,
    nav: true
    });*/


    //var owl_news = $("#newsletter");
    /*owl_news.owlCarousel({
    navigation: false,
    pagination: true,
    slideSpeed: 1000,
    stopOnHover: true,
    items: 1,
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    rewind: true,
    autoplay: true,
    margin: 0,
    nav: true
    });*/
    /*
    owl_news.owlCarousel({
    navigation: false,
    pagination: true,
    slideSpeed: 1000,
    stopOnHover: true,
    autoPlay: true,
    items: 1,
    itemsDesktopSmall: [1024, 1],
    itemsTablet: [600, 1],
    itemsMobile: [479, 1]
    });
    */

    $('#owl-news').find('.owl-prev').html('<i class="lni-chevron-left"></i>');
    $('#owl-news').find('.owl-next').html('<i class="lni-chevron-right"></i>');

});