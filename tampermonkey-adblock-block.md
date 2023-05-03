---
layout: post
title: Tampermonkey ad-blocker 
published: true
tags: [adblock, tampermonkey, browser]
---

This ad-blocker script for Tampermonkey won't trigger an adblock-block / adblock-detector script and so you could use it for pages that are annoying you with "please turn of your adblock" messages. It's just hiding the ads and don't try to intercept the requests or remove the ads at all. So it don't make the websites faster, but it makes them cleaner and easier to read.

This script is not a generic solution and has to be configured for every website it should clean up. I don't provide configs for pages, just use your browser developer-tools to find the elements you want remove or click.

### What is Tampermonkey?

Tampermonkey is a browser extension for Firefox and Google Chrome that allows you to run scripts on websites. You can find Tampermonkey in the extension repository of your favorite browser vendor. It is a very popular plugins with hundreds of thousands downloads and therefor it's very stable and trustworthy.

* Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=de
* Firefox: https://addons.mozilla.org/de/firefox/addon/tampermonkey/

### Ad-block Config Options

#### click
A array with css-selectors to click when the script is running. It's used to click away the cookie-consent banners or other popups.

    {
        'click': ['.ad','.banner'],
    }

#### remove
A array with css-selectors of elements to remove when the script is running. Take care that you have the right selector. Ads usually make iframes around them, so you have to find the element that consists the ad-iframe.

    {
        'remove': ['.ad','.banner'],
    }

#### interaction
Bool to trigger a fake mouse-move at document load. You can use that for sites who are waiting for user-interaction to show consent-boxes or ads.

    {
        'interaction': true, // or false
    }

#### timeout
A timeout in milliseconds to wait after document load to start the ad-block script.

    {
        'timeout': 1000, // 1 second
    }

#### interval
A interval in milliseconds to repeat the ad-block script after some time to remove ads that are loaded on scroll or a timeout after document ready. Don't use to small numbers, some seconds (3000ms to 5000ms) between the runs usually would work best.

    {
        'interval': 5000, // 5 seconds
    }

#### background
Sets a background color for sites that are doing full page custom ads with changed background color. It also sets overflow:scroll and position:static that is sometimes needed if you removed a blocking modal.

    {
        'background': '#ffffff', // white
    }
    
### Tampermonkey Script Code

    // ==UserScript==
    // @name         mf-adblock
    // @namespace    http://tampermonkey.net/
    // @version      0.1
    // @description  a basic anti-adblock workaround that can remove or click elements on a website
    // @author       You
    // @match        https://*/*
    // @grant        none
    // ==/UserScript==

    (function() {
        'use strict';

        // here is the config ... just an example
        let sites = {
            'www.a-website.com': { // website domain
                click: ['.class','#element'], // click this elements (used for cookie consent)
                remove: ['.ad','#banner'], // hide this elements (used for ads)
                interaction: true, // move mouse cursor to trigger onmousemove ads
                timeout: 0, // in ms wait timeout before doing something
                interval: 0, // in ms interval redo everything after this time (used if ads are added onscroll or timeout)
                background: '#ffffff' // set a background-color, overflow:scroll and position for custom fullpage ads
            },
        }

        let interval = null;

        let hostname = document.location.hostname;

        function cleanup() {

            if(sites[hostname].interaction) {
                document.body.dispatchEvent(new MouseEvent('mousemove'));
            }

            if(sites[hostname].remove) {
                let selectors = sites[hostname].remove;

                selectors.forEach(function(selector) {
                    let elements = document.querySelectorAll(selector);

                    console.log(selector, elements);

                    elements.forEach(function(elem) {
                        elem.style.visibility = 'hidden';
                        elem.style.width = '1px';
                        elem.style.height = '1px';
                        elem.style.overflow = 'hidden';
                        elem.style.opacity = 0;
                    });
                });
            }

            if(sites[hostname].background) {
                document.body.style.background = sites[hostname].background;
                document.body.style.overflow = 'scroll';
                document.body.style.position = 'static';
            }

            if(sites[hostname].click) {
                let selectors = sites[hostname].click;

                selectors.forEach(function(selector) {
                    let element = document.querySelector(selector);

                    if(element !== null) {
                        element.click();
                    }
                });
            }
        }

        if(Object.keys(sites).indexOf(hostname) >= 0) {

            let timeout = 0;
            if(sites[hostname].timeout) {
                timeout = sites[hostname].timeout;
            }

            window.setTimeout(function(){
                cleanup();
            }, timeout);

            if(sites[hostname].interval) {
                if(interval === null) {
                    interval = window.setInterval(function(){
                        cleanup();
                    }, sites[hostname].interval);
                }
            }
        }
    })();