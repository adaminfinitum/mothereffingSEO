/*! Adapted by Adam Powell via http://www.adaminfinitum.com from the source commented out below, the HTML5 Bolierplate docs, and the blogs of Justin Cutroni and Avinash Kaushik,  Modified to include video searches,  h5bp.com docs https://github.com/h5bp/html5-boilerplate/blob/master/doc/extend.md */
/*! From cutroni.com */

// Google Analytics Rank Tracking Script
if (document.referrer.match(/google.([a-zA-Z]{2,5})/gi) && document.referrer.match(/cd/gi)) {
  var myString = document.referrer;
  var r        = myString.match(/cd=(.*?)&/);
  var rank     = parseInt(r[1]);
  var kw       = myString.match(/q=(.*?)&/);
  if (kw[1].length > 0) {
    var keyWord  = decodeURI(kw[1]);
  } else {
    keyWord = "(not provided)";
  }
  var p        = document.location.pathname;
  _gaq.push(['_trackEvent', 'RankTracker', keyWord, p, rank, true]);
};

/*! From HTML5 Bolierplate docs */
//Track JS Errors in Google Analytics
(function(window){
    var undefined,
        link = function (href) {
            var a = window.document.createElement('a');
            a.href = href;
            return a;
        };
    window.onerror = function (message, file, line, column) {
        var host = link(file).hostname;
        _gaq.push([
            '_trackEvent',
            (host == window.location.hostname || host == undefined || host == '' ? '' : 'external ') + 'error',
            message, file + ' LINE: ' + line + (column ? ' COLUMN: ' + column : ''), undefined, undefined, true
        ]);
    };
}(window));

/*! This JavaScript was developed by GA-Experts (http://www.ga-experts.co.uk) for Google Analytics Please use this code to overwrite the default set of Search Engines in the GA tracking code Use this code at your own risk.  GA Experts takes no responsibility for errors, loss of data or any other complications arising from the use of this code Version 2.0 (Mar 2007) - many thanks to Brian Clifton and Tomas Remotigue for help with this For enquiries please contact mail@ga-experts.co.uk Dutch Search Engines added by Joost de Valk (http://www.joostdevalk.nl) For enquiries specifically about the Dutch SE's please contact joost@joostdevalk.nl */
_gaq.push(
	['_addOrganic','images.google.co.uk','q'],
	['_addOrganic','images.google.es','q'],
	['_addOrganic','images.google.it','q'],
	['_addOrganic','images.google.fr','q']
);
// Other Google Image search
_gaq.push(
	['_addOrganic','images.google.com','q'],
	['_addOrganic','images.google.ca','q'],
	['_addOrganic','images.google.com.au','q'],
	['_addOrganic','images.google','q']
);
// Blogsearch
_gaq.push(
	['_addOrganic','blogsearch.google','q']
);
// Google EMEA Domains
_gaq.push(
	['_addOrganic','google.co.uk','q'],
	['_addOrganic','google.es','q'],
	['_addOrganic','google.it','q'],
	['_addOrganic','google.fr','q']
);
// Yahoo EMEA Domains
_gaq.push(
	['_addOrganic','uk.yahoo.com','p'],
	['_addOrganic','es.yahoo.com','p'],
	['_addOrganic','it.yahoo.com','p'],
	['_addOrganic','fr.yahoo.com','p']
);
// UK specific
_gaq.push(
	['_addOrganic','hotbot.co.uk','query'],
	['_addOrganic','excite.co.uk','q'],
	['_addOrganic','bbc','q'],
	['_addOrganic','tiscali','query'],
	['_addOrganic','uk.ask.com','q'],
	['_addOrganic','blueyonder','q'],
	['_addOrganic','search.aol.co.uk','query'],
	['_addOrganic','ntlworld','q'],
	['_addOrganic','tesco.net','q'],
	['_addOrganic','orange.co.uk','q'],
	['_addOrganic','mywebsearch.com','searchfor'],
	['_addOrganic','uk.myway.com','searchfor'],
	['_addOrganic','searchy.co.uk','search_term'],
	['_addOrganic','msn.co.uk','q'],
	['_addOrganic','uk.altavista.com','q'],
	['_addOrganic','lycos.co.uk','query']
);
// Extras
_gaq.push(
	['_addOrganic','alltheweb','q'],
	['_addOrganic','ananzi','qt'],
	['_addOrganic','anzwers','search'],
	['_addOrganic','araby.com','q'],
	['_addOrganic','dogpile','q'],
	['_addOrganic','ezilon.com','q'],
	['_addOrganic','hotbot','query'],
	['_addOrganic','indiatimes.com','query'],
	['_addOrganic','mywebsearch.com','searchfor'],
	['_addOrganic','search.aol.com','encquery'],
	['_addOrganic','search.indiatimes.com','query'],
	['_addOrganic','searcheurope.com','query']
);
// Testing tracking Google Video Search
_gaq.push(
	['_addOrganic','video.google.co.uk','q'],
	['_addOrganic','video.google.es','q'],
	['_addOrganic','video.google.com','q'],
	['_addOrganic','video.google.ca','q'],
	['_addOrganic','video.google','q']
);

// from cutroni.com
if (document.referrer.match(/google\.([a-zA-Z]{2,5})/gi) && document.referrer.match(/source=images/gi)) {
	var myString = document.referrer;
	var regex    = new RegExp("google\.(.*?)\/","gi");
	var de       = regex.exec(myString);
	var se       = 'secure.images.'+de[1];
_gaq.push(['_addOrganic',se,'q',true]
	);
}

// Google Analytics Scroll Tracking Script
jQuery(function($) {
    // Debug flag
    var debugMode = false;
    // Default time delay before checking location
    var callBackTime = 100;
    // # px before tracking a reader
    var readerLocation = 150;
    // Set some flags for tracking & execution
    var timer = 0;
    var scroller = false;
    var endContent = false;
    var didComplete = false;
    // Set some time variables to calculate reading time
    var startTime = new Date();
    var beginning = startTime.getTime();
    var totalTime = 0;
    // Track the aticle load
    if (!debugMode) {
        _gaq.push(['_trackEvent', 'Reading', 'ArticleLoaded', '', , true]);
    }
    // Check the location and track user
    function trackLocation() {
        bottom = $(window).height() + $(window).scrollTop();
        height = $(document).height();
        // If user starts to scroll send an event
        if (bottom > readerLocation && !scroller) {
            currentTime = new Date();
            scrollStart = currentTime.getTime();
            timeToScroll = Math.round((scrollStart - beginning) / 1000);
            if (!debugMode) {
                _gaq.push(['_trackEvent', 'Reading', 'StartReading', '', timeToScroll]);
            } else {
                alert('started reading ' + timeToScroll);
            }
            scroller = true;
        }
        // If user has hit the bottom of the content send an event and if they
        // did it in less than 60 sec then set a custom var
        if (bottom >= $('.entry-content').scrollTop() + $('.entry-content').innerHeight() && !endContent) {
            currentTime = new Date();
            contentScrollEnd = currentTime.getTime();
            timeToContentEnd = Math.round((contentScrollEnd - scrollStart) / 1000);
            if (!debugMode) {
                if (timeToContentEnd < 60) {
                    _gaq.push(['_setCustomVar', 5, 'ReaderType', 'Scanner', 3]);
                } else {
                    _gaq.push(['_setCustomVar', 5, 'ReaderType', 'Reader', 3]);
                }
                _gaq.push(['_trackEvent', 'Reading', 'ContentBottom', '', timeToContentEnd]);
            } else {
                if (timeToContentEnd < 60) {
                    alert('SCANNER: end content section ' + timeToContentEnd);
                } else {
                    alert('READER: end content section ' + timeToContentEnd);
                }
            }
            endContent = true;
        }
        // If user has hit the bottom of page send an event
        if (bottom >= height && !didComplete) {
            currentTime = new Date();
            end = currentTime.getTime();
            totalTime = Math.round((end - scrollStart) / 1000);
            if (!debugMode) {
                _gaq.push(['_trackEvent', 'Reading', 'PageBottom', '', totalTime]);
            } else {
                alert('bottom of page ' + totalTime);
            }
            didComplete = true;
        }
    }
    // Track the scrolling and track location
    $(window).scroll(function() {
        if (timer) {
            clearTimeout(timer);
        }
        // Use a buffer so we don't call trackLocation too often.
        timer = setTimeout(trackLocation, callBackTime);
    });
});

/*! gaAddons FREE v1.0, Copyright 2011, Stephane Hamel - http://gaAddons.com Licensed under a Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License gaAddons FREE v1.0, Copyright 2011, Stéphane Hamel - httpgaAddons.com gaAddons by Stéphane Hamel is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. This code is provided as is, without guarantee or support. */

// _trackDownloads
jQuery(document).ready(function($) {
    // helper function - allow regex as jQuery selector
    $.expr[':'].regex = function(e, i, m) {
        var mP = m[3].split(','),
            l = /^(data|css):/,
            a = {
                method: mP[0].match(l) ? mP[0].split(':')[0] : 'attr',
                property: mP.shift().replace(l, '')
            },
            r = new RegExp(mP.join('').replace(/^\s+|\s+$/g, ''), 'ig');
        return r.test($(e)[a.method](a.property));
    };

    $('a:regex(href,"\\.(zip|mp\\d+|mpe*g|pdf|docx*|pptx*|xlsx*|jpe*g|png|gif|tiff*)")$').live('click', function(e) {
        _gaq.push(['_trackEvent', 'download', 'click', this.href.replace(/^.*\/\//, '')]);
    });
});

// _trackError: track 404 - Page not found
if (document.title.search(/Page Not Found/i) !== -1) {
    _gaq.push(['_trackPageview', '/vpv/404/' + location.host + location.pathname + '?from=' + document.referrer]);
}

// _trackMailTo
jQuery(document).ready(function($) {
    $('a[href^="mailto"]').live('click', function(e) {
        _gaq.push(['_trackSocial', 'email', 'send', this.href.replace(/^mailto:/i, '')]);
    });
});

// _trackOutbound
jQuery(document).ready(function($) {
    $('a[href^="http"]:not([href*="//' + location.host + '"])').live('click', function(e) {
        _gaq.push(['_trackEvent', 'outbound', 'click', this.href.match(/\/\/([^\/]+)/)[1]]);
    });
});
