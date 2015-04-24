<?php
include 'includes/debugging.php';
$data = json_decode($_POST['data']);

try {
    require_once 'includes/pdo_connect.php';
} catch (Exception $e) {
    $error = $e->getMessage();
}


if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}
$ipadress = ip2long($ip);
ChromePhp::log($ipadress);

if($ipadress=="wrong"){
kickout();	
}



function idgen()
{
    $alphabet = "abcdefghijklmnopqrstuwxyz0123456789";
    $pass = array();
    $alphaLength = strlen($alphabet) - 1;
    for ($i = 0; $i < 5; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass);
}
function getChartID(PDO $pdo){
    $chartidTry = idgen();
$q="SELECT chartid FROM chart WHERE chartid=:chartid";
    $stmt=$pdo->prepare($q);
    $stmt->bindParam(":chartid",$chartidTry);
    $stmt->execute();
    $row=$stmt->fetch();
    if($row){
        getChartID();
    }else{
        return $chartidTry;
    }
}
$chartid=getChartID($pdo);

// set the PDO error mode to exception
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql = "INSERT INTO chart (chartid,IP,visits) VALUES (:chartid,:ip,0)";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(":chartid", $chartid);
$stmt->bindParam(":ip", $ipadress);
$stmt->execute();

$sql = "INSERT INTO chartitem (chartid,type,start,end,text)
VALUES ( :chartid,:type,:start,:end,:text)";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(":chartid", $chartid);
foreach ($data as $chartitem) {
    $type = htmlspecialchars($chartitem[0]);
    $start = htmlspecialchars($chartitem[1]);
    $end = htmlspecialchars($chartitem[2]);
    $text = htmlspecialchars($chartitem[3]);
    $stmt->bindParam(":type", $type);
    $stmt->bindParam(":start", $start);
    $stmt->bindParam(":end", $end);
    $stmt->bindParam(":text", $text);
    $stmt->execute();
}

echo "Success!";
?>
