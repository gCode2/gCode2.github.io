<?php

if(isset($_REQUEST["submitted"])){
$fV = $_REQUEST["firstValue"]; //firstValue
if(empty($fV) || !is_numeric($fV)){
    $messages [] = "Podana ilość jest błędna!";
}

$fC = $_REQUEST["fCurrency"];   //first Currency
$sC = $_REQUEST["sCurrency"]; //second Currency



if(empty($messages)){
function findCurrencyValue($fC, $sC){
    $json = file_get_contents("app/rates.json");
    //laduje zawartosc pliku
    $json_a = json_decode($json,false); 
    //zamiana json na obiekt php
    $json_a = (array) $json_a;
    //zmiana obiektu na mape
    $x = array();


        if(array_key_exists($fC, $json_a)){
            $firstCurrencyValue = $json_a[$fC];
            array_push($x, $firstCurrencyValue);
        }
        if(array_key_exists($sC, $json_a)){
            $secondCurrencyValue = $json_a[$sC];
            array_push($x, $secondCurrencyValue);
        }

    
    return $x;
}

function calculate($fV, $fC, $fcv, $sC, $scv){

return $fV." ".$fC." to ".number_format((($fV * $fcv)/$scv),3,".")." ".$sC;
    
}

$currencyValues = findCurrencyValue($fC, $sC);


$result = calculate($fV, $fC, $currencyValues[0], $sC, $currencyValues[1]);

}


}
else{
 //header('Location: index.php');
}
?>