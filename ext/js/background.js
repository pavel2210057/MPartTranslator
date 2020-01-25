/**
 * @var chrome
 * @property runtime
 * @property onInstalled
 */
chrome.runtime.onInstalled.addListener(() => {
    /*init api*/
    mpt_api.init();
    /**
     *  @var mpt_api
     *  @property contextMenus
     *  @property onClicked
     *  @method create
     */
    /*translate*/
    chrome.contextMenus.create({
        title: "Translate",
        contexts: ["page", "selection"],
        onclick: () => {
            /**
             * @property tabs
             * @method getSelected
             */
            chrome.tabs.getSelected(tab => {
                /** @method sendMessage */
                chrome.tabs.sendMessage(tab.id, {}, res => {
                    window.open(
                        "popup.html",
                        null,
                        "width=540,height=540"
                    ).onload = function() {
                        this.document.addEventListener("ControlPanelLoaded", e => {
                            const [
                                translate_from,
                                send_btn
                            ] = e.detail.panel
                                .find("#translate-text_from,#send-translate");

                            $(translate_from).val(res.message);
                            $(send_btn).trigger("click");
                        });
                    };
                })
            });
        }
    });
    /*lang definition*/
    chrome.contextMenus.create({
        title: "Define Language",
        contexts: ["page", "selection"]
    });
});