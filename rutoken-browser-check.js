var rutokenBrowserCheck = (function (rc) {

    var errors = {
        'NO_SUPPORT_YET': 'Браузер временно не поддерживается. Пожалуйста, воспользуйтесь браузером Apple Safari или Mozilla Firefox.',
        'NO_MSEDGE_SUPPORT': 'Браузер Edge временно не поддерживается.',
        'NO_OPERA_47_MAC': 'Opera 47+ не поддерживается плагином на MacOS',
        'NO_FF_53_MAC_LINUX': 'Firefox 53+ не поддерживается плагином на mac/linux',
        'INST_EXT_OPERA': 'Установите <a href="https://addons.opera.com/ru/extensions/details/adapter-rutoken-plagin/">расширение для Opera</a> или убедитесь, что оно активно.',
        'INST_EXT_FF': 'Если Рутокен Плагин установлен, включите расширение в настройках браузера. Если нет, установите <a href="http://www.rutoken.ru/support/download/rutoken-plugin/">Рутокен Плагин</a>.',
        'INST_EXT': 'Установите <a href="https://chrome.google.com/webstore/detail/%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80-%D1%80%D1%83%D1%82%D0%BE%D0%BA%D0%B5%D0%BD-%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD/ohedcglhbbfdgaogjhcclacoccbagkjg">расширение для Google Chrome</a> или убедитесь, что оно активно.',
        'INST_PLUIGN': 'Установите <a href="https://www.rutoken.ru/support/download/rutoken-plugin/ ">Рутокен Плагин</a>',
        'INST_PLUIGN_WINDOWS': 'Установите <a href="https://www.rutoken.ru/support/download/get/rtPlugin-win.html">Рутокен Плагин</a> для Windows',
        'INST_PLUIGN_MAC': 'Установите <a href="https://www.rutoken.ru/support/download/get/rtPlugin-mac.html">Рутокен Плагин</a> для MacOS',
        'OS_NOT_SUPPORTED': 'Ваша операционная система не подходит для установки Рутокен Плагина'
    };

    function Err(mnemonic) {
        this.mnemonic = mnemonic;
        this.description = errors[mnemonic] || 'Ошибка';
    }

    Err.prototype.toString = function () {
        return this.description;
    };

    rc.ifCompatible = function () {

        var noSupportYet = (bowser.osname === 'macOS' || bowser.osname === 'Linux') && bowser.name === 'Chrome';
        if (noSupportYet) {
            throw new Err('NO_SUPPORT_YET');
        }

        if (bowser.msedge) throw new Err('NO_MSEDGE_SUPPORT');

        var isChromeCompat = !!window.chrome;
        var performCheck = true;

        if (bowser.osname === 'macOS' && bowser.opera && bowser.version >= 47) {
            throw new Err('NO_OPERA_47_MAC');
        }

        if (bowser.name === 'Firefox') {

            if (bowser.osname !== 'Windows' && bowser.version >= 53) {
                throw new Err('NO_FF_53_MAC_LINUX');
            }

            if (bowser.version < 50)
                performCheck = false;
        }

        if (performCheck && (isChromeCompat || bowser.name === 'Firefox') && bowser.osname === 'Windows') {
            return { noCheckExtension : false};
        } else {
            return { noCheckExtension : true};
        }
    };

    rc.noExtension = function () {
        if ((bowser.osname === 'Windows' || bowser.osname === 'macOS') && bowser.name === 'Opera') {
            throw new Err('INST_EXT_OPERA');
        } else if (bowser.name === 'Firefox') {
            throw new Err('INST_EXT_FF');
        } else {
            throw new Err('INST_EXT');
        }
    };

    rc.noPlugin = function () {
        switch (bowser.osname) {
            case 'Windows':
                throw new Err('INST_PLUIGN_WINDOWS');
            case 'macOS':
                throw new Err('INST_PLUIGN_MAC');
            case 'Linux':
                throw new Err('INST_PLUIGN');
            default:
                throw new Err('OS_NOT_SUPPORTED');
        }
    };

    return rc;

}(rutokenBrowserCheck || {}));

if (typeof module !== 'undefined') {
    module.exports = rutokenBrowserCheck;
}