// ==UserScript==
// @name         CMC Shipping Estimator
// @namespace    https://github.com/SevenIndirecto/utils
// @version      0.1
// @description  Add estimated shipping prices on Cardmarket Singles page
// @author       Seven
// @match        https://www.cardmarket.com/en/Magic/Products/Singles/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cardmarket.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const SHIPPING_PRICES = {
        'Austria': { regular: 2.6, tracked: 6.45 },
        'Belgium': { regular: 2.95, tracked: 14.76 },
        'Bulgaria': { regular: 1.69, tracked: 5.52 },
        'Canada': { regular: 3.9, tracked: 14.1 },
        'Croatia': { regular: 2.14, tracked: 4.69 },
        'Czech Republic': { regular: 1.96, tracked: 5 },
        'Cyprus': { regular: 0.94, tracked: 3.38 },
        'Denmark': { regular: 5.34, tracked: 18.23 },
        'Estonia': { regular: 2.2, tracked: 11.40 },
        'Finland': { regular: 2.8, tracked: 19.65 },
        'France': { regular: 2.1, tracked: 6.95 },
        'Germany': { regular: 1.4, tracked: 14.99 },
        'Greece': { regular: 2.3, tracked: 5.5 },
        'Hungary': { regular: 2.67, tracked: 7.67 },
        'Iceland': { regular: 2.07, tracked: 9.44 },
        'Ireland': { regular: 2.5, tracked: 11 },
        'Italy': { regular: 3.8, tracked: 11.2 },
        // 'Japan': { regular: null, tracked: null }, - no sellers active currently
        'Latvia': { regular: 2.12, tracked: 6.34 },
        'Liechtenstein': { regular: 1.84, tracked: 9.33 },
        'Lithuania': { regular: 1.7, tracked: 5.3 },
        'Luxembourg': { regular: 1.7, tracked: 3.9 },
        'Malta': { regular: 2, tracked: 8.3 },
        'Netherlands': { regular: 1.95, tracked: 7.9 },
        'Norway': { regular: 2.81, tracked: 21.64 },
        'Poland': { regular: 2.08, tracked: 4.69 },
        'Portugal': { regular: 2.6, tracked: 6.45 },
        'Romania': { regular: 2.53, tracked: 4.96 },
        'Slovenia': { regular: 1.58, tracked: 3.18 },
        'Slovakia': { regular: 1.8, tracked: 6.7 },
        'Spain': { regular: 2.25, tracked: 7.25 },
        'Sweden': { regular: 2.97, tracked: 11.07 },
        'Switzerland': { regular: 4.61, tracked: 10.76 },
        'United Kingdom': { regular: 2.92, tracked: 10.87 },
    };
    const MODIFIER_CLASS = '_modified';

    function getSellerCountry(offer) {
        const tooltipText = offer.querySelector('span.seller-name span[data-original-title]').dataset.originalTitle;
        return tooltipText.split(': ')[1];
    }

    function getPrice(offer) {
        const priceString = offer.querySelector('.col-offer span').innerText.split(' ')[0];
        const price = parseFloat(priceString.replaceAll('.', '').replace(',', '.'));
        return price;
    }

    function getShippingPrice(price, country, requiresTracking) {
        if (!SHIPPING_PRICES[country]) {
            return null;
        }
        return SHIPPING_PRICES[country][price >= 25 || requiresTracking ? 'tracked' : 'regular'];
    }

    function displayShippingAndTotalPrice(offerRow, price, shipping) {
        const total = (shipping + price).toFixed(2);
        const textNodeHTML = `<div style='width: 100%' class='color-primary text-muted font-italic small text-end text-nowrap'>ship: ${shipping}€ / <b>total: ${total}€</b></div>`;
        offerRow.querySelector('.col-offer').insertAdjacentHTML('beforeend', textNodeHTML);
        offerRow.querySelector('.col-offer').style = 'flex-wrap: wrap;';
    }

    function processUnmodifiedRows() {        
        const articleRows = document.querySelectorAll('.article-row:not(._modified)');

        for (const offer of articleRows) {
            try {
                const price = getPrice(offer);
                const country = getSellerCountry(offer);
                const requiresTracking = Boolean(offer.querySelector('.untracked'));

                const shipping = getShippingPrice(price, country, requiresTracking);
                if (!shipping) {
                    console.log('no shipping', price, country);
                    continue;
                }

                displayShippingAndTotalPrice(offer, price, shipping);
                offer.classList.add(MODIFIER_CLASS);
            } catch (e) {
                console.log(e);
                continue;
            }
        }
    }

    // On load
    processUnmodifiedRows();

    // Load more button
    document.getElementById('loadMoreButton')?.addEventListener('click', () => {
       setTimeout(processUnmodifiedRows, 3000); // TODO Maybe this should be increased
    });
})();
