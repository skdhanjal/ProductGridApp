'use strict';

var ProductDOMBuilder = {};

ProductDOMBuilder = (function () {
    
    
    function buildElement(elementTagName, classList, innerHTML, attributes) {
        var element = document.createElement(elementTagName);
        
        if (attributes) {
            for (var attribute in attributes) {
                element.setAttribute(attribute, attributes[attribute]);
            }
        }
        for (var j = 0, classListLen = classList.length; j < classListLen; j++) {
            element.classList.add(classList[j]);
        }
        element.innerHTML = innerHTML;
        return element;
    }
    
    function addChildToParent(parent, child) {
        if (parent) {
            parent.appendChild(child);
        }
    }
    
    function hasClass(element, className) {
        return element.classList.contains(className);
    };
    
    function addClass(element, className) {
        element.classList.add(className);
    };
    
    function removeClass(element, className) {
        element.classList.remove(className);
    };
    
    function createProductDOM(product, index) {
        var productDivElement = buildElement("div", ['product'], ''),
            innerDivElement = buildElement("div", ['product-info'], ''),
            labelElement = buildElement("label", ['action', 'action--compare-add'], ''),
            buttonElement = buildElement("button", ['action', 'action--button', 'action--buy'], '');
        
        addChildToParent(innerDivElement, buildElement("img", ['product-image'], '', {src: 'images/' + (index + 1) + '.png'}));
        addChildToParent(innerDivElement, buildElement("h3", ['product-title'], product['productTitle']));
        addChildToParent(innerDivElement, buildElement("span", ['product-year', 'extra', 'highlight'], product['productYear']));
        addChildToParent(innerDivElement, buildElement("span", ['product-region', 'extra', 'highlight'], product['productArea']));
        addChildToParent(innerDivElement, buildElement("span", ['product-price', 'highlight'], product['productPrice']));
        addChildToParent(buttonElement, buildElement("i", ['fa', 'fa-shopping-cart'], ''));
        addChildToParent(buttonElement, buildElement("span", ['action-text'], 'Add to cart'));
        addChildToParent(innerDivElement, buttonElement);
        addChildToParent(labelElement, buildElement("input", ['check-hidden'], '', {type: 'checkbox'}));
        addChildToParent(labelElement, buildElement("i", ['fa', 'fa-plus'], ''));
        addChildToParent(labelElement, buildElement("i", ['fa', 'fa-check'], ''));
        addChildToParent(labelElement, buildElement("span", ['action-text', 'action-text--invisible'], 'Add to Compare'));
        addChildToParent(productDivElement, innerDivElement);
        addChildToParent(productDivElement, labelElement);
        
        return productDivElement;
    }
    
    
    // returing data module API
    return {
        addChildToParent: addChildToParent,
        createProductDOM: createProductDOM,
        add: addClass,
        remove: removeClass,
    };
    
})();




