// ATENÇÃO: Se não conhecer de Google Analytics desative esse arquivo. CUIDADO!!!
var ga_code = 'UA-46066479-2';

/* Form Contact */

$("#contact-form").validator().on("submit", function(event) {
   // console.log('validator');
    if (event.isDefaultPrevented()) {
        //console.log('error');
        // handle the invalid form...
        formError();
        submitMSG(false, "Preencha os campos");
    } else {
        //console.log('good');
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    //var company = $("#company").val();
    //var name = $("#name").val();
    //var email = $("#email").val();
    //var msg_subject = $("#subject").val();
    //var message = $("#message").val();
    var form = $('#contact-form');
    var form_status = $('<div class="form_status text-center" style="width:100%"></div>');
    $.ajax({
        type: "POST",
        url: "contato.php",
        //data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        data: form.serialize(),
        beforeSend: function() {
            form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Enviando...</p>').fadeIn());
            $('#btnEnviar').attr('disabled', 'disabled');
        },
        success: function (text) {
            //console.log(text);
            //console.log(text.indexOf("ok"));
            if (text.indexOf("ok") != -1) {
                //console.log('---ok');
                formSuccess();
                $('#contact-form input[name=company]').val('');
                $('#contact-form input[name=name]').val('');
                $('#contact-form input[name=phone]').val('');
                $('#contact-form input[name=email]').val('');
                $('#contact-form input[name=subject]').val('');
                $('#contact-form input[name=message]').val('');
            } else {
                //console.log('---não ok');
                formError();
                submitMSG(false, text);
            }
            $('#btnEnviar').removeAttr('disabled');
            form_status.html('').delay(1000).fadeOut();
        }
    });
}


function formSuccess(){
    $("#contact-form")[0].reset();
    submitMSG(true, "Mensagem enviada!");
    gtag('config', ga_code, { 'page_title': 'Fale Conosco', 'page_path': '/lead_fale_conosco' });
}

function formError(){
    $("#contact-form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    $("#msgSubmit").fadeIn();
    var msgClasses = '';
    if(valid){
        msgClasses = "h4 text-center tada animated alert alert-success text-white";
    } else {
        msgClasses = "h4 text-center alert alert-danger text-dark";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    $("#msgSubmit").delay(7000).fadeOut();
}




/* Form Newsletter */


$("#newsletter-form").validator().on("submit", function(event) {
    //console.log('validator');
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formErrorNews();
        submitMSGNews(false, "Preencha os campos");
    } else {
        // everything looks good!
        event.preventDefault();
        submitFormNews();
    }
});


function submitFormNews() {
    // Initiate Variables With Form Content
    //var company = $("#company").val();
    //var name = $("#name").val();
    //var email = $("#email").val();
    //var msg_subject = $("#subject").val();
    //var message = $("#message").val();
    var form = $('#newsletter-form');
    var form_status = $('<div class="form_status text-center" style="width:100%"></div>');
    $.ajax({
        type: "POST",
        url: "news.php",
        //data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        data: form.serialize(),
        beforeSend: function() {
            form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Enviando...</p>').fadeIn());
            $('#btnEnviar').attr('disabled', 'disabled');
        },
        success: function(text) {
            if (text == "Newsletter assinada") {
                formSuccessNews();
                $('#newsletter-form input[name=name]').val('');
                $('#newsletter-form input[name=phone]').val('');
                $('#newsletter-form input[name=email]').val('');
            } else {
                formErrorNews();
                submitMSGNews(false, text);
            }
            $('#btnEnviar').removeAttr('disabled');
            form_status.html('').delay(1000).fadeOut();            
        }
    });
}


function formSuccessNews() {
    $("#newsletter-form")[0].reset();
    submitMSGNews(true, "Newsletter assinada!");
    gtag('config', ga_code, { 'page_title': 'Newsletter', 'page_path': '/lead_news' });
}

function formErrorNews() {
    $("#newsletter-form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass();
    });
}

function submitMSGNews(valid, msg) {
    var msgClasses = '';
    //console.log(valid);
    //console.log(msg);
    $("#msgSubmitNews").fadeIn();
    if (valid) {
        msgClasses = "h4 text-center tada animated alert alert-success text-white";
    } else {
        msgClasses = "h4 text-center alert alert-danger text-dark";
    }
    $("#msgSubmitNews").removeClass().addClass(msgClasses).text(msg);
    $("#msgSubmitNews").delay(7000).fadeOut();
}










// Event click on Button Contact
//console.log('aqui');

/*$("#btnEnviar").on("click", function() {
    console.log($(this).text());
});

$("#btnEnviar").click(function() {
    console.log('btnEnviar...');
    //$( "#contact-form" ).submit();
});


// Contact form
var form = $('#contact-form');
form.submit(function(event) {
    event.preventDefault();

    console.log('submit...');


    if ($("#company").val() == '') {
        $('#msgSubmit2').show();
        $('#msgSubmit2').html('Preencha o Nome');
        console.log('Preencha o Nome');
        return false;
    }

    //console.log('submit contact');
    var form_status = $('<div class="form_status"></div>');
    $.ajax({
        url: $(this).attr('action'),
        data: form.serialize(),
        type: 'POST',
        beforeSend: function() {
            form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> O email est&aacute; sendo enviado...</p>').fadeIn());
            $('#btnEnviar').attr('disabled', 'disabled');
        },
        complete: function() {
            //alert(data);
            //console.log('complete: ' + data);
            $('#btnEnviar').removeAttr('disabled');
            grecaptcha.reset();
        }
    }).done(function(data) {
        //alert(data);
        //console.log('done: ' + data);
        if (data == "ok") {
            formSuccess();
            form_status.html('<p class="text-success">Enviado com sucesso! Obrigado por nos contatar.</p>').delay(3000).fadeOut();
            $("#company").val("");
            $("#name").val("");
            $("#email").val("");
            $("#phone").val("");
            $("#message").val("");
            $('#btnEnviar').removeAttr('disabled');
            grecaptcha.reset();
        }
        else if (data == "reload") {
            $('#btnEnviar').removeAttr('disabled');
            form_status.html('<p class="text-alert">Confirme que você não é um robô no captcha</p>').delay(3000).fadeOut();
            recaptcha.reset();
        }
        else {
            formError();
            $('#btnEnviar').removeAttr('disabled');
            form_status.html('<p class="text-alert">Ocorreu um erro! Tente novamente ou entre em contato conosco.</p>').delay(3000).fadeOut();
        }
    });
});




// Newsletter form
var form = $('#newsletter-form');
form.submit(function(event) {
    event.preventDefault();
    //console.log('submit contact');
    var form_status = $('<div class="form_status"></div>');
    $.ajax({
        url: $(this).attr('action'),
        data: form.serialize(),
        type: 'POST',
        beforeSend: function() {
            form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> O email est&aacute; sendo enviado...</p>').fadeIn());
            $('#btnEnviarNews').attr('disabled', 'disabled');
        },
        complete: function() {
            //alert(data);
            //console.log('complete: ' + data);
            $('#btnEnviar').removeAttr('disabled');
            grecaptcha.reset();
        }
    }).done(function(data) {
        //alert(data);
        //console.log('done: ' + data);
        if (data == "ok") {
            form_status.html('<p class="text-success">Newsletter assinada com sucesso.</p>').delay(3000).fadeOut();
            $("#name").val("");
            $("#phone").val("");
            $("#email").val("");
            $('#btnEnviarNews').removeAttr('disabled');
            grecaptcha.reset();
        }
        else if (data == "reload") {
            $('#btnEnviarNews').removeAttr('disabled');
            form_status.html('<p class="text-alert">Confirme que você não é um robô no captcha</p>').delay(3000).fadeOut();
            recaptcha.reset();
        }
        else {
            $('#btnEnviarNews').removeAttr('disabled');
            form_status.html('<p class="text-alert">Ocorreu um erro! Tente novamente ou entre em contato conosco.</p>').delay(3000).fadeOut();
        }
    });
  
});   
*/    
    	
	
	