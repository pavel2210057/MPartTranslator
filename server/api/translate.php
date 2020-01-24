<?php
require_once __DIR__ . "/../common/MResponse.php";
use ml\cmn\MResponse;

/*check access | get api key*/
$api_key = require_once __DIR__ . "/inner/check_access.php";
if (!$api_key)
    MResponse::exit(0, "User out of the system");

require_once __DIR__ . "/../common/MYandexApi.php";

MResponse::exit(1,
    (new ml\cmn\MYandexApi($api_key))
        ->translate(
            $_POST["text"], $_POST["dir"]
        )
);