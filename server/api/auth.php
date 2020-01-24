<?php
require_once __DIR__ . "/../common/MResponse.php";
require_once __DIR__ . "/../common/MYandexApi.php";
use ml\cmn\MResponse;

/* make test api request */
$api_key = $_GET["api_key"];
$is_key_correct = (new ml\cmn\MYandexApi($api_key))->test();

if (!$is_key_correct)
    MResponse::exit(0, "Incorrect key");

require_once __DIR__ . "/../common/MMySql.php";

$client_ip = $_SERVER["REMOTE_ADDR"];
$sql = new ml\cmn\MMySql();

/*check for existence*/
if($sql->query("
    SELECT api_key FROM users
    WHERE id='$client_ip'
")->num_rows)
    MResponse
        ::exit(0, "User already in system");

$sql->query("
    INSERT INTO users(id, api_key)
    VALUES('$client_ip', '$api_key')
");

/*success*/
MResponse::exit(1, "Success");