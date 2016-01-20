'use strict';

// fetching products data product data service
var ProductDOMBuilder = ProductDOMBuilder || {},
    DisplayProductsModule = {},
    CompareProductModule = compareProductModule || {};

DisplayProductsModule = (function () {
    //var products = productsData || [];
    
    function ProductView(products) {
        this.products = products;
        
    }
    
    ProductView.prototype.addProductsToView = function (viewID) {
        var self = this,
            products = this.products,
            mainViewElement = document.querySelector('#' + viewID);
        
        for (var i = 0, productsLength = products.length; i < productsLength; i++) {
            ProductDOMBuilder.addChildToParent(mainViewElement, ProductDOMBuilder.createProductDOM(products[i], i));
        }
    }
    
    function init(products, viewID) {
        var productView = new ProductView(products);
        productView.addProductsToView(viewID);
        CompareProductModule.init();
    }
    
    // returing data module API
    return {
        initProducts: init
    };
    
})();


