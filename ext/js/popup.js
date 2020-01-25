(function($, opts) {
    "use strict";
    const tmpl_url = "tmpl/";
    let mpt_api_bg;

    const build_page = page => {
        /*TODO show holder*/
        return $.ajax({
            method: "GET",
            url: `${tmpl_url}${page}.tmpl`
        }).done(html =>
            $(opts.page).html(html)
        ).always(() => {
            /*TODO hidden holder*/
        });
    };

    /*for control panel*/
    const build_control_languages = () => {
        const selectors = $(`${opts.selects.from},${opts.selects.to}`);

        for (let name in mpt_api_bg.get_langs().langs)
            selectors
                .append(
                    `<option value="${name}">${mpt_api_bg.get_langs().langs[name]}</option>`
                );

        /*en-ru by default*/
        $(selectors[0])
            .children("[value=en]")
            .attr("selected", "true");
        $(selectors[1])
            .children("[value=ru]")
            .attr("selected", "true");
    };

    const bind_actions = () => {
        /*login.tmpl*/
        /*onclick #send-api-key*/
        $(document).on("click", opts.login_form.api_key_send, () => {
                mpt_api_bg.auth($(opts.login_form.api_key_input).val())
                    .done(res => {
                        if ($.parseJSON(res).code === "1")
                            build_page("control");
                    });
            }
        );
        /*control.tmpl*/
        /*onclick category item*/
        $(document).on(
            "click",
            `${opts.category.translate},${opts.category.define}`,
            e => {
                e = $(e.target);
                if (!e.hasClass("selected"))
                    e
                        .addClass("selected") /*add for target*/
                        .siblings()
                        .removeClass("selected"); /*remove for sibling*/
            }
        );
        /*onclick #translatetbtn*/
        $(document).on("click", opts.category.translate,
            build_control_languages
        );
        /*onclick #send-translate*/
        $(document).on("click", opts.translate.translate_btn, () => {
            mpt_api_bg
                .translate(
                    $(opts.translate.translate_text_from).val(),
                    /*val_from + "-" + val_to*/
                    `${
                        $(opts.selects.from + " :selected").val()
                    }-${
                        $(opts.selects.to + " :selected").val()
                    }`
                ).done(res =>
                    $(opts.translate.translate_text_to)
                        .html($.parseJSON(res).message.text[0])
                );
        });
        /*onclick #logout-btn*/
        $(document).on("click", opts.logout_btn, () => {
                mpt_api_bg.logout();
                build_page("login");
            }
        );
    };

    /*init*/
    (function() {
        /*get mpt_api from background*/
        chrome.runtime.getBackgroundPage(win => {
                mpt_api_bg = win.mpt_api;
                /**@method getBackgroundPage*/
                if(!mpt_api_bg.get_user_status())
                    build_page("login");
                else
                    build_page("control")
                        .done(() => {
                            build_control_languages();
                            document.dispatchEvent(
                                new CustomEvent("ControlPanelLoaded", {
                                    detail: {
                                        panel: $(opts.control_panel)
                                    }
                                })
                            );
                        });
            }
        );
        bind_actions();
    })();
})(jQuery, {
    page: "#page",
    /*login.tmpl*/
    login_form: {
        api_key_input: "#api-key",
        api_key_send: "#send-api-key"
    },
    /*control.tmpl*/
    control_panel: "#control-panel",
    category: {
        translate: "#translate-btn",
        define: "#define-btn"
    },
    selects: {
        from: "#from",
        to: "#to"
    },
    translate: {
        translate_text_from: "#translate-text_from",
        translate_text_to: "#translate-text_to",
        translate_btn: "#send-translate",
    },
    logout_btn: "#logout-btn"
});