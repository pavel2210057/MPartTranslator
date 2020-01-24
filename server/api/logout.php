<?php
require_once __DIR__ . "/../common/MResponse.php";
require_once __DIR__ . "/../common/MMySql.php";

use ml\cmn\MResponse;

$sql = new ml\cmn\MMySql();
$client_ip = $_SERVER["REMOTE_ADDR"];

if (!$sql->query("
    SELECT api_key FROM users
    WHERE id='$client_ip'
")->num_rows)
    MResponse::exit(0, "User out of the system");

$sql->query("
    DELETE FROM users
    WHERE id='$client_ip'
");

MResponse::exit(1, "Success");