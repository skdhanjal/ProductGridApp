// can't make ajax call on local file system so exposing data through object

var productsDataService = {},
    DisplayProductsModule = DisplayProductsModule || {};

productsDataService = (function () {
    var productsData = [];
    
    // private function	
    function getData() {
        return productsData;
    }
    
    function loadJSON() {
        var ajaxXHRObject = new XMLHttpRequest();
        
        ajaxXHRObject.overrideMimeType("application/json");
        ajaxXHRObject.open('GET', 'productsData.json', true);
        
        ajaxXHRObject.onreadystatechange = function () {
            if (ajaxXHRObject.readyState == 4 && ajaxXHRObject.status == "200") {
                if (ajaxXHRObject.responseText) {
                    productsData = JSON.parse(ajaxXHRObject.responseText)["products"];
                    DisplayProductsModule.initProducts(productsData, 'productDispalySection');
                }
            }
        };
        ajaxXHRObject.send(null);
    }
    
    function init() {
        loadJSON();
    }
    
    init();
    
})();
