var rutokenBrowserCheck = (function (rc) {

    rc.ifCompatible = function (extensionCheckFunction) {
        var noSupportYet = (bowser.osname === 'macOS' || bowser.osname === 'Linux') && bowser.name === 'Chrome';

        if (noSupportYet) {
            throw "Браузер временно не поддерживается. Пожалуйста, воспользуйтесь браузером Apple Safari или Mozilla Firefox.";
        }

        var isChrome = !!window.chrome;
        var verOffset, fullVersion, majorVerison;
        var performCheck = true;
        if (bowser.msedge) throw 'Браузер временно не поддерживается.';
        if (bowser.fireFox) {

            if (bowser.osname !== 'Windows' && bowser.version >= 53) {
                throw 'Firefox 53+ не поддерживается плагином на mac/linux';
            }
            if (bowser.osname === 'macOS' && bowser.version >= 47) {
                throw "Opera 47+ не поддерживается плагином на MacOS";
            }
            if (bowser.version < 50)
                performCheck = false;
        }
        if (performCheck && (bowser.name === 'Chrome' || bowser.name === 'Firefox') && bowser.osname === 'Windows') {
            return extensionCheckFunction();
        } else {
            return true;
        }
    };

    rc.noExtension = function(){
        if ((bowser.osname === 'Windows' || bowser.osname === 'macOS') && bowser.name === 'Opera') {
            throw "Установите <a href='https://addons.opera.com/ru/extensions/details/adapter-rutoken-plagin/'>расширение для Opera</a> или убедитесь, что оно активно.";
        } else if (bowser.fireFox && bowser.osname === 'Windows') {
            throw "Если Рутокен Плагин установлен, включите расширение в настройках браузера. Если нет, установите <a href='http://www.rutoken.ru/support/download/rutoken-plugin/'>Рутокен Плагин</a>.";
        }
        else {
            throw "Установите <a href='https://chrome.google.com/webstore/detail/%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80-%D1%80%D1%83%D1%82%D0%BE%D0%BA%D0%B5%D0%BD-%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD/ohedcglhbbfdgaogjhcclacoccbagkjg'>расширение для Google Chrome</a> или убедитесь, что оно активно.";
        }
    };

    rc.noPlugin = function(){
        throw "Установите <a href='http://www.rutoken.ru/support/download/rutoken-plugin/'>Рутокен Плагин</a>";
    };

    return rc;

}(rutokenBrowserCheck || {}));

if (typeof module !== 'undefined') {
    module.exports = rutokenBrowserCheck;
}

