/**
 * Public file for creating the pageview tracking request.
 *
 * Do not use ES2015 features as this file is only intended to be minified (to save bandwidth).
 */

const trackerUrl = window.koko_analytics.tracker_url;
const postId = parseInt(window.koko_analytics.post_id);
const useCookie = parseInt(window.koko_analytics.use_cookie);

function stringifyObject(obj) {
	return Object.keys(obj).map(function(k) {
		return window.encodeURIComponent(k) + '=' + window.encodeURIComponent(obj[k]);
	}).join('&');
}

function getCookie(name) {
	const cookies = document.cookie ? document.cookie.split('; ') : [];
	let parts, cookie;

	for (let i = 0; i < cookies.length; i++) {
		parts = cookies[i].split('=');
		if (window.decodeURIComponent(parts[0]) !== name) {
			continue;
		}

		cookie = parts.slice(1).join('=');
		return window.decodeURIComponent(cookie);
	}

	return '';
}

function setCookie(name, data, args) {
	name = window.encodeURIComponent(name);
	data = window.encodeURIComponent(String(data));

	let str = name + '=' + data;

	if(args.path) {
		str += ';path=' + args.path;
	}
	if (args.expires) {
		str += ';expires='+args.expires.toUTCString();
	}

	document.cookie = str;
}

function trackPageview() {
	// respect "Do Not Track" requests
	if ('doNotTrack' in navigator && navigator.doNotTrack === "1") {
		return;
	}

	// ignore pre-rendering requests
	if ('visibilityState' in document && document.visibilityState === 'prerender') {
		return;
	}

	// if <body> did not load yet, try again at dom ready event
	if (document.body === null) {
		document.addEventListener("DOMContentLoaded", trackPageview);
		return;
	}

	const cookie = getCookie('_koko_analytics_pages_viewed');
	const isNewVisitor = cookie.length === 0;
	const pagesViewed = cookie.split(',').filter(function(id) { return id !== ''; });
	const isUniquePageview = pagesViewed.indexOf(postId) === -1;
	const d = {
		p:  postId,
		nv: isNewVisitor ? 1 : 0,
		up: isUniquePageview ? 1 : 0,
	};

	// add referrer if not from same-site & try to detect returning visitors from referrer URL
	if (typeof(document.referrer) === "string" && document.referrer !== '') {
		if (document.referrer.indexOf(window.location.origin) === 0) {
			d.nv = 0; // referred by same-site, so not a new visitor

			if (document.referrer === window.location.href) {
				d.up = 0; // referred by same-url, so not a unique pageview
			}
		} else {
			d.r = document.referrer; // referred by external site, so send referrer URL to be stored
		}
	}

	const img = document.createElement('img');
	img.alt = '';
	img.style.display = 'none';
	img.setAttribute('aria-hidden', 'true');

	function finalize() {
		// clear src to cancel request (if called via timeout)
		img.src = '';

		// remove from dom
		if (img.parentNode) {
			document.body.removeChild(img);
		}

		// update tracking cookie
		if (useCookie) {
			if (isUniquePageview) {
				pagesViewed.push(postId)
			}
			let expires = new Date();
			expires.setHours(expires.getHours() + 6);

			setCookie('_koko_analytics_pages_viewed', pagesViewed.join(','), {expires, path: '/'})
		}
	}

	// clean-up tracking pixel after 5s or onload
	img.onload = finalize;
	window.setTimeout(finalize, 5000);

	// add to DOM to fire request
	img.src = trackerUrl + (trackerUrl.indexOf('?') > -1 ? '&' : '?') + stringifyObject(d);
	document.body.appendChild(img);
}

trackPageview();
