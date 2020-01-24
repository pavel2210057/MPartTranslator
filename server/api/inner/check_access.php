<?php
require_once __DIR__ . "/../../common/MMySql.php";

$client_addr = $_SERVER["REMOTE_ADDR"];
$sql = new ml\cmn\MMySql();
$api_key = $sql->query("
        SELECT api_key FROM users
        WHERE id='$client_addr'
");

if(!$api_key->num_rows)
    return false;
return $api_key->fetch_array()["api_key"];