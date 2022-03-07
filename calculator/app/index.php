<?php
require_once('calc.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="app/index.css">
    <title>Kalkulator walut</title>
</head>
<body>
    <div class="formContainer">
    <form action="index.php" method="post">
        <h2>Kalkulator walut</h2>
        <span>kursy z dnia 7.03.2022r. via Google</span>
    <input type="text" name="firstValue" required>
    <select name="fCurrency">
        <option value="PLN" selected>PLN</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="CHF">CHF</option>
        <option value="JPY">JPY</option>
        <option value="HUF">HUF</option>
        <option value="RUB">RUB</option>
    </select>
    <label for="sCurrency">Konwertuj na: </label>
    <select name="sCurrency" class="destCurrency">
        <option value="PLN">PLN</option>
        <option value="EUR" selected>EUR</option>
        <option value="GBP">GBP</option>
        <option value="CHF">CHF</option>
        <option value="JPY">JPY</option>
        <option value="HUF">HUF</option>
        <option value="RUB">RUB</option>
    </select>
    <input type="submit" value="Przelicz!" name="submitted">
    </form>
    <div>
<?php
if(isset($result)) echo $result;


?>
</div>
<div class="errorContainer">
    <?php
    
if(isset($messages)){
    foreach($messages as $message){
        echo $message;
    }

}
    ?>

</div>
</div>

</body>
</html>