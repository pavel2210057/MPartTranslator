/**
 * @var jQuery
 */
window.mpt_api = Object.freeze(
    new (function($) {
        this.base_url = "http://localhost/";
        const api_url = `${this.base_url}api.php`;
        let user_status;
        let langs;

        const exec = request => {
            return $.ajax({
                method: request.method || "GET",
                url: `${api_url}?act=${request.act}`,
                data: request.data || {}
            });
        };

        this.init = () => {
            if (typeof user_status !== typeof undefined)
                throw "API already initialized";

            exec({
                method: "GET",
                act: "check"
            }).done(res => {
                    if ($.parseJSON(res).code === "1") {
                        user_status = true;
                        init_langs();
                    }
                    else
                        user_status = false;
                }
            );
        };

        this.auth = api_key => {
            if (user_status)
                throw "User already in the system";

            return exec({
                method: "GET",
                act: "auth",
                data: {
                    api_key: api_key
                }
            }).done(res => {
                if ($.parseJSON(res).code === "1") {
                    user_status = true;
                    if (!this.langs)
                        init_langs();
                }
            });
        };

        this.get_user_status = () => user_status;

        this.logout = () => {
            if (!user_status)
                throw "User out of the system";

            return exec({
                method: "GET",
                act: "logout"
            }).done(() =>
                /*always logout*/
                user_status = false
            );
        };

        this.translate = (text, dir = "en-ru") => {
            if (!user_status)
                throw "User out of the system";

            return exec({
                method: "POST",
                act: "translate",
                data: {
                    text: text,
                    dir: dir
                }
            });
        };

        this.def_lang = text => {
            if (!user_status)
                throw "User out of the system";

            return exec({
                method: "POST",
                act: "def_lang",
                data: {text: text}
            });
        };

        const init_langs = () => {
            exec({
                method: "GET",
                act: "get_langs"
            }).done(res =>
                langs = $.parseJSON(res).message
            );
        };

        this.get_langs = () => langs;
    })(jQuery)
);