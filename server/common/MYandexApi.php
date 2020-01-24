<?php
namespace ml\cmn;

class MYandexApi {
    private string $api_key;
    private array $config;

    public function __construct($api_key, $config = null) {
        $this->api_key = $api_key;
        $this->config =
            $config ?? require __DIR__ . "/../config/yandex.php";
    }

    public function test() : bool {
        return $this->exec(
                $this->config["translate"]
            )["code"] !== 401;
    }

    public function getLangs() : array {
        return $this->exec(
            $this->config["lang"], [
                "get" => ["ui" => "en"]
            ]
        );
    }

    public function translate(string $text, string $dir = "en-ru") : array {
        return $this->exec(
            $this->config["translate"], [
                "get" => ["lang" => $dir],
                "post" => ["text" => $text]
            ]
        );
    }

    public function defineLang(string $text) : array {
        return $this->exec(
            $this->config["detect"], [
                "post" => ["text" => $text]
            ]
        );
    }

    private function exec(string $resource, array $params = []) : array {
        if (!($curl = curl_init(
            $this->config["base_url"] . $resource . "?key=" .
            $this->api_key . "&" . $this->safeHttpBuilder("get", $params)
        )))
            return null;

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        if (array_key_exists("post", $params))
            curl_setopt($curl, CURLOPT_POSTFIELDS,
                $this->safeHttpBuilder("post", $params));

        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);

        return $response;
    }

    private function safeHttpBuilder($method, $params) : string {
        return http_build_query(
            array_key_exists($method, $params) ?
                $params[$method] : []
        );
    }
}