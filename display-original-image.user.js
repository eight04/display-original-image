// ==UserScript==
// @name        Display Original Image
// @version     0.1.0
// @namespace   eight04.blogspot.com
// @description This script will replace thumbnail with full size image if available.
// @include     http*
// @grant       none
// ==/UserScript==

"use strict";

function observeDocument(callback) {

	callback(document.body);

	new MutationObserver(function(mutations){
		var i;
		for (i = 0; i < mutations.length; i++) {
			if (!mutations[i].addedNodes.length) {
				continue;
			}
			callback(mutations[i].target);
		}
	}).observe(document.body, {
		childList: true,
		subtree: true
	});
}

function displayOriginalImage(node) {
	var imgs = node.querySelectorAll("a[href]>img[src]");
	var i;

	for (i = 0; i < imgs.length; i++) {
		replace(imgs[i], imgs[i].parentNode);
	}
}

function replace(img, anchor) {
	if (!/\.(jpg|png|gif)($|\?)/i.test(anchor.href)) {
		img.src = anchor.href;
	}
}

observeDocument(displayOriginalImage);

