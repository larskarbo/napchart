<?php

try {
    require_once 'includes/pdo_connect.php';

include 'includes/debugging.php';
if (isset($_GET["chartid"])) {
    try {
        require_once 'includes/pdo_connect.php';
} catch (Exception $e) {
        $error = $e->getMessage();
        echo $error;
    }
    if (!$pdo) {
        echo "<p>There was a problem fetching data from the server!</p>";
    }
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $chartid = htmlspecialchars($_GET["chartid"]);
    ChromePhp::log($chartid);
    $q="UPDATE chart SET visits=visits+1 WHERE chartid=:chartid";
    $stmt = $pdo->prepare($q);
    $stmt->bindParam(':chartid',$chartid);
    $stmt->execute();

    $q = "
SELECT *
FROM chartitem
WHERE chartid=:chartid";
    $stmt = $pdo->prepare($q);
    $stmt->bindParam(':chartid',$chartid);
    $stmt->execute();


    echo "<script>
$(document).ready(function() {

";
    while ($row = $stmt->fetch()) {
        echo "addInputBox('";
        if ($row['type'] == 0)
            $type = "Sleep";
        else if ($row['type'] == 1)
            $type = "Nap";
        else if ($row['type'] == 2)
            $type = "Work";
        echo $type . "'," . $row['start'] . "," . $row['end'] . ");";
    };
    echo "
updateInputValues(true);
});</script>";


}
} catch (Exception $e) {
    $error = $e->getMessage();
    echo $error;
}
?>

