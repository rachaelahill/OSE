<?php
  $emailTo = 'rachaelann.hill@gmail.com';
  $subject = 'Email from application.';
  $name = $_POST['name'];
  $email = $_POST['email'];
  $mess = $_POST['mess'];
  $header = "Reply to: $email from $name";
  
   mail($emailTo, $subject, $mess, $header) or die("Error");   
?>