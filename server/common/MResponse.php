<?php
namespace ml\cmn;

class MResponse {
    public static function format(string $code, $message) : string {
        return json_encode([
            "code" => $code,
            "message" => $message
        ]);
    }

    public static function exit(string $code, $message) : void {
        exit(
            self::format($code, $message)
        );
    }
}