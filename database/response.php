<?php
$conn = mysqli_connect('localhost','root','','libront_grzegorz_test');
if(isset($_POST['str'])){
$received = $_POST['str'];
    
if($received != ''){
    $query = "select distinct autor from ksiazki where autor like '$received%'";
    if($received == '/wszyscy' || $received == '/all'){
        $query = "select distinct autor from ksiazki";
    }
$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_assoc($result)){
        echo '<div class="list-item" onclick="showInfo(this)">'.$row["autor"].'</div>';
    }
}else{
    echo '<div class="wrong">Taki autor nie istnieje!</div>';
}   
}
}
if(isset($_POST['author'])){
$author = $_POST['author'];
    
    $query = "select nrk, tytul, wydawca, rok_wydania, data_zakupu, cena from ksiazki where autor = '$author'";
    $result = mysqli_query($conn, $query);
    echo '<table>';
    $rows=mysqli_fetch_fields($result);
    foreach ($rows as $row) echo "<th>$row->name</th>";
    
    while($row = mysqli_fetch_assoc($result)){
        echo '<tr><td>'.$row['nrk'].'</td><td>'.$row['tytul'].'</td><td>'.$row['wydawca'].'</td><td>'.$row['rok_wydania'].'</td><td>'.$row['data_zakupu'].'</td><td>'.$row['cena'].'</td></tr>';
    }
    echo '</table>';
}





mysqli_close($conn);
?>
