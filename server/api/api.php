<?php
require_once __DIR__ . "/../common/MResponse.php";

$type = $_GET["act"];
if (!(require_once __DIR__ . "/$type.php"))
    ml\cmn\MResponse
        ::exit("0", "Incorrect type");