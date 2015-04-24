<?php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
try{

    if ($_SERVER['HTTP_HOST'] === "napchart.com") {
        $servername = "localhost";
        $username = "strengtr_ncuser";
        $password = "wGcunHFkgtK5";
        $dbname = "strengtr_napchart";
    } else if ($_SERVER['HTTP_HOST'] === "beta.napchart.com") {
        $servername = "localhost";
        $username = "strengtr_nap-b";
        $password = "CKkf165l7k";
        $dbname = "strengtr_nap-beta";
    } else if ($_SERVER['HTTP_HOST'] === "localhost") {
        $servername = "localhost";
        $username = "napchart";
        $password = "hest";
        $dbname = "napchart";
    }




    $dsn = "mysql:host=$servername;dbname=$dbname";

    $pdo = new PDO($dsn, $username, $password);

//$pdo = new PDO("mysql:host=localhost;dbname=strengtr_nap-beta","strengtr_nap-b", "CKkf165l7k");



    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}


catch (customException $e) {
    //display custom message
    echo $e->errorMessage();
}