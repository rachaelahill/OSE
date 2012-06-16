<?
  if(isset($_POST['name']) == '' || isset($_POST['email']) == '' || isset($_POST['mess']) == '')
  {
    died('We are sorry, but there appears to be a problem with the form you submitted.');
  }
  
  $emailTo = $_POST['emailTo'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $mess = $_POST['mess'];
  $error_mess = '';

  $email_exp = '/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$';
  if(!preg_match($email_exp, $email))
  {
    $error_mess .= 'The email address you entered does not appear to be valid. <br />';
  }
  
  $name_ex = '/^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$';
  if(!preg_match($name_ex, $name))
  {
    $error_mess .= 'The name you entered does not appear to be valid.';
  }
  
  if(strlen($mess) < 500 || strlen($mess) == 0)
  {
    $error_mess .= 'The message you entered does not appear to be valid.';
  }
  
  function clean_string($string)
  {
    $bad = array('content-stype', 'bcc:', 'to:', 'cc:', 'href');
    return str_replace($bad, '', $string);
  }
  
  $emailDetail .= 'Name:'.clean_string($name).'\n';
  $emailDetail .= 'Email:'.clean_string($email).'\n';
  $emailDetail .= 'Message:'.clean_string($mess).'\n';
  
  @mail($emailTo, $emailDetail);

?>