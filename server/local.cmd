@echo off

set /p port="Select Port: "
start php -S localhost:%port% -t api\