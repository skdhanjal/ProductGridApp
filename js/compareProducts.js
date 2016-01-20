'use strict';

var compareProductModule = (function () {
    
    var viewElement = document.querySelector('.view'),
        gridElement = viewElement.querySelector('.grid'),
        productDOMBuilder = ProductDOMBuilder || {}, // fetching the product dom builder module
        items = [],
        compareProductContainer;
    
    // the constructor function for the compare products object
    function CompareProductContainer() {
        this.domEl = document.querySelector('.compare-basket');
        this.allowedItems = 3; // maximum items allowed to be addded to comparison view
        this.adddedItems = 0; //
        this.items = [];
    }
    
    CompareProductContainer.prototype.addItem = function (item) {
        var self = this,
            productItem = {};
        // check if the itme limit is reached
        if (self.isMaxItemLimitReached()) {
            return false;
        }
        productDOMBuilder.add(item, 'product--selected');
        // create item preview element
        productItem = self.createProductItemDOM(item);
        // prepend it to the item container
        self.domEl.insertBefore(productItem, self.domEl.childNodes[0]);
        self.items.push(productItem);
        self.adddedItems++;
        // if limit reached add the full class
        if (self.isMaxItemLimitReached()) {
            productDOMBuilder.add(self.domEl, 'compare-basket--full');
        }
        productDOMBuilder.add(self.domEl, 'compare-basket--active');
    };
    
    CompareProductContainer.prototype.removeItem = function (item) {
        var preview = this.domEl.querySelector('[data-idx = "' + items.indexOf(item) + '"]'),
            indexRemove = this.items.indexOf(preview),
            checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');

        productDOMBuilder.remove(this.domEl, 'compare-basket--full');
        productDOMBuilder.remove(item, 'product--selected');
        this.domEl.removeChild(preview);
        this.adddedItems--;
        this.items.splice(indexRemove, 1);
        if (this.adddedItems === 0) {
            productDOMBuilder.remove(this.domEl, 'compare-basket--active');
        }
        if (checkbox.checked) {
            checkbox.checked = false;
        }
    };
    
    CompareProductContainer.prototype.createProductItemDOM = function (item) {
        var self = this, 
            preview = document.createElement('div'),
            removeCtrl = document.createElement('button');
            productImageEl = item.querySelector('img.product-image').cloneNode(true),
            productInfo = item.querySelector('.product-info').innerHTML;;

        preview.className = 'product-icon';
        preview.setAttribute('data-idx', items.indexOf(item));
        removeCtrl.className = 'action action--remove';
        removeCtrl.innerHTML = '<i class="fa fa-remove"></i><span class="action-text action-text--invisible">Remove product</span>';
        removeCtrl.addEventListener('click', function () {
            self.removeItem(item);
        });
        preview.appendChild(productImageEl);
        preview.appendChild(removeCtrl);
        preview.setAttribute('data-info', productInfo);
        return preview;
    };
    
    CompareProductContainer.prototype.isMaxItemLimitReached = function () {
        return this.adddedItems === this.allowedItems;
    };
    
    function addEvents() {
        items = Array.prototype.slice.call(gridElement.querySelectorAll('.product'));
        items.forEach(function (item) {
            var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
            checkbox.checked = false;
            
            checkbox.addEventListener('click', function (eventObj) {
                if (eventObj.target.checked) {
                    if (compareProductContainer.isMaxItemLimitReached()) {
                        eventObj.preventDefault();
                        return false;
                    }
                    compareProductContainer.addItem(item);
                } else {
                    compareProductContainer.removeItem(item);
                }
            });
        });
    }
    
    function init() {
        compareProductContainer = new CompareProductContainer();
        addEvents();
    }
    
    return {
        init: init
    }
    
})();