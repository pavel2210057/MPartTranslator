<?php
require_once __DIR__ . "/../common/MResponse.php";
require_once __DIR__ . "/../common/MMySql.php";

use ml\cmn\MResponse;

/*check access | get api key*/
$api_key = require_once __DIR__ . "/inner/check_access.php";
if (!$api_key)
    MResponse::exit(0, "User out of the system");

$sql->query("
    DELETE FROM users
    WHERE api_key='$api_key'
");

MResponse::exit(1, "Success");