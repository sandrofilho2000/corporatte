
<?php   // Email de destino.
//$emailDestino = "samuel.souza@corporatte.inf.br";
//$emailDestino = "inframicro@inframicro.com.br";
$emailDestino = "contato@corporatte.inf.br";

// O remetente deve ser um e-mail do seu domínio conforme determina a RFC 822.
// O return-path deve ser ser o mesmo e-mail do remetente.
$headers = "MIME-Version: 1.1\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8\r\n";
$headers .= "From: ".$emailDestino."\r\n"; // remetente
$headers .= "Return-Path: ".$emailDestino."\r\n"; // return-path

// Coletar os valores dos campos.
$nomeremetente     	= trim($_POST['name']);
$empresa     		= trim($_POST['company']);
$emailremetente    	= trim($_POST['email']);
$telefone          	= trim($_POST['phone']);
$assunto    		= trim($_POST['subject']);
$mensagemremetente  = trim($_POST['message']);

// Montar o corpo do e-mail.
$mensagem =  "Nome: ".$nomeremetente."\r\n";
$mensagem .= "Empresa: ".$empresa."\r\n";
$mensagem .= "E-mail: ".$emailremetente."\r\n";
$mensagem .= "Telefone: ".$telefone."\r\n";
$mensagem .= "Assunto: ".$assunto."\r\n";
$mensagem .= "Mensagem: ".$mensagemremetente."\r\n";

/*  
 teste formulario
 foreach ($_POST as $key => $val) {
	echo $key.' - '.$val.'<br>';
}*/


require_once("phpmailer/class.phpmailer.php");


define('GUSER', 'contato@corporatte.inf.br');	// <-- Insira aqui o seu GMail
define('GPWD', 'corporatte123');		// <-- Insira aqui a senha do seu GMail

function smtpmailer($para, $de, $de_nome, $assunto, $mensagem) { 
	global $error;
	$mail = new PHPMailer();
	$mail->SetLanguage('br');
	$mail->IsSMTP();		// Ativar SMTP
	$mail->SMTPDebug = 1;		// Debugar: 1 = erros e mensagens, 2 = mensagens apenas
	$mail->SMTPAuth = true;		// Autenticação ativada
	$mail->SMTPSecure = 'ssl';	// SSL REQUERIDO pelo GMail
	$mail->Host = 'mail.corporatte.inf.br';	// SMTP utilizado
	$mail->Port = 465;  		// A porta 587 deverá estar aberta em seu servidor
	$mail->Username = GUSER;
	$mail->Password = GPWD;
	$mail->CharSet = 'UTF-8';
	$mail->SetFrom($de, $de_nome);
	$mail->AddReplyTo('cristiano.oliveira@corporatte.inf.br', 'Cristiano');
	$mail->AddAddress($para);
	$mail->Subject = $assunto;
	$mail->Body = $mensagem ;

	if(!$mail->Send()) {
		$error = 'Mail error: '.$mail->ErrorInfo; 
		return false;
	} else {
		$error = 'Mensagem enviada!';
		return true;
	}
}

# enviar para admin ...
$envio = smtpmailer($emailDestino, $emailDestino, $nomeremetente, $assunto, $mensagem);


# enviar ...
$envio = smtpmailer($emailremetente, $emailDestino, $nomeremetente, $assunto, $mensagem);

if($envio){
	echo "ok";	
}else{

	echo "Problema para enviar";	
}
?>