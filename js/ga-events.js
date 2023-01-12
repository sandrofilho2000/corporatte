// ATENÇÃO: Se não conhecer de Google Analytics desative esse arquivo. CUIDADO!!!
// Esse arquivo depende de configurações de métricas e engajamentos do GA.
var ga_code = 'UA-46066479-2';

$('.ga-click').on('click', function (event) {
    event.preventDefault();

    //console.log('clicou');    

    //var pageTitle = $(this).attr('ga-page-title');
    //var pagePath = $(this).attr('ga-page_path');
    //if (pageTitle != '' && pagePath != '') {
    //    gtag('config', ga_code, { 'page_title': pageTitle, 'page_path': pagePath });
    //}

    var src_link = $(this).attr('href');
    //console.log(src_link);
    switch (src_link) {
        case '#slider-area':
        case 'index.html#slider-area':
            gtag('config', ga_code, { 'page_title' : 'Home', 'page_path' : '/'});
            break;
        case '#services':
        case 'index.html#services':
            gtag('config', ga_code, { 'page_title' : 'Serviços', 'page_path' : '/servicos'});
            break;
        case '#features':            
        case 'index.html#features':
            gtag('config', ga_code, { 'page_title' : 'Soluções', 'page_path' : '/solucoes'});
            break;
        case '#testimonial':            
        case 'index.html#testimonial':
            gtag('config', ga_code, { 'page_title' : 'Casos de Sucesso', 'page_path' : '/casossucesso'});
            break;
        case '#team':      
        case 'index.html#team':
            gtag('config', ga_code, { 'page_title' : 'Quem Somos', 'page_path' : '/quemsomos'});
            break;
        case '#subscribe': 
        case 'index.html#subscribe':
            gtag('config', ga_code, { 'page_title' : 'Newsletter', 'page_path' : '/newsletter'});
            break;
        case '#blog':      
        case 'index.html#blog':
            gtag('config', ga_code, { 'page_title' : 'Blog', 'page_path' : '/blog'});
            break;
        case '#contact':   
        case 'index.html#contact':
            gtag('config', ga_code, { 'page_title' : 'Contato', 'page_path' : '/contato'});
            break;
        //default:
          //  console.log('n/a');
    }

});