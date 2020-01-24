/**
 * @var chrome
 * @property runtime
 * @property onMessage
 */
(function() {
    "use strict";
    const get_selection = () => {
        return getSelection().toString();
    };

    /*init*/
    (function() {
        chrome.runtime.onMessage.addListener((r, i, sendResponse) => {
            sendResponse({
                code: 1,
                message: get_selection()
            });
        });
    })();
})();
