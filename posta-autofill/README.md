# Posta.si IMPORT/EXPORT auto filler

![Preview](https://raw.githubusercontent.com/SevenIndirecto/utils/master/posta-autofill/chrome_sVfdIzXvXy.gif)

Sanity warning, extremely niche. 
Are you using CardMarket.eu and shipping registered packages via https://uvoz-izvoz.posta.si/en/export/shipment? This script can automate this annoying form just for you (and me).

This script will add a Button to https://uvoz-izvoz.posta.si/en/export/shipment allowing you to copy the Recipient address from CardMarket 
and pressing a single button to fill out this whole form. 

*NOTE* This has been tested using the english version of the page, but likely works for the /si/ version as well.

## Initial Setup

1. Use Chrome or any other browser that supports Tampermonkey (or something similar). Install Tampermonkey https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
2. Click the Tampermonkey icon in Chrome and select "Create a new script..."
3. Overwrite it with the contents of https://github.com/SevenIndirecto/utils/blob/master/posta-autofill/shipper.js and save.
4. That should be it.

## Usage

1. In your card market shipment, copy the Shipping address. Something like this should be in your clipboard

```
John Doe
Triebstraße 7
60388 Frankfurt Am Main
Germany
```

2. Go to https://uvoz-izvoz.posta.si/en/export/shipment/ and select "Letter" -> "Agree" -> "Continue"
3. On the next screen press the "Auto Fill Form" button in the top right. That's it.


## Troubleshooting and disclaimers

* Currently only works with Shipping Addresses which are formatted to have 4 lines exactly.
