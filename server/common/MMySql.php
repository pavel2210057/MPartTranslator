<?php
namespace ml\cmn;

class MMySql {
    private \MySqli $sql;

    public function __construct($config = null) {
        if (!$config)
            $config = require_once __DIR__ . "/../config/db.php";

        $this->sql = new \MySqli(
            $config["host"],
            $config["user"],
            $config["pass"],
            $config["db"]
        );
    }

    public function __destruct() {
        $this->sql->close();
    }

    public function query(string $query) {
        return $this->sql->query($query);
    }
}