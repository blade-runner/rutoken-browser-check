# Модуль для проверки совместимости браузера с [плагином Рутокен](https://github.com/AktivCo/rutoken-plugin-js)

## Установка

```sh
npm install rutoken-browser-check
```

## Пример использования совместно с плагином Рутокен

```js
window.onload = function () {

 rutoken.ready.then(function () {
        return rutokenBrowserCheck.ifCompatible(rutoken.isExtensionInstalled);
    }).then(function (result) {
            return result ? rutoken.isPluginInstalled() : rutokenBrowserCheck.noExtension();
    }).then(function (result) {
            return result ? rutoken.loadPlugin() : rutokenBrowserCheck.noPlugin();        
    }).then(function (plugin) {
    	//Можно начинать работать с плагином
    	//Только для работы через старый интерфейс плагина
        return plugin.wrapWithOldInterface();
    }).then(function (wrappedPlugin) {
        //Можно начинать работать через старый интерфейс плагина
    }).then(undefined, function (reason) {
        console.log(reason);
    });

}
```

## API

### Функции

Модуль содержит следующие функции:

* ifCompatible(extensionCheckFunction) -> Promise(bool)

Функция позволяет узнать, совместим ли браузер с плагином Рутокен и в случае совместимости выполнить проверку на наличие расширения для браузера. В случае несовместимости выбрасывается исключение с текстом, конкретизирующим вариант несовместимости.

* noExtension() -> Exception(message)

Функция выбрасывает исключение с текстом, позволяющим узнать как поставить расширение для браузера, если оно доступно.

* noPlugin() -> Exception(message)

Функция выбрасывает исключение с текстом, позволяющим узнать как поставить плагин для браузера, если есть возможность утсановки в текущий браузер.


## Лицензия

Исходный код распространяется под лицензией Simplified BSD. См. файл LICENSE в корневой директории проекта.