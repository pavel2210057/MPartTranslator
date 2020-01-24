<?php
require_once __DIR__ . "/../common/MResponse.php";

use ml\cmn\MResponse;

if (!(require_once __DIR__ . "/inner/check_access.php"))
    MResponse::exit(0, "User out of the system");
MResponse::exit(1, "Success");
