var buttons = require('sdk/ui/button/action');
var self = require('sdk/self');
var tabs = require('sdk/tabs');
var url = require('sdk/url');


/////////
// API //
/////////

// gBrowser (why is it like this?)
function getGBrowser(){
  return require('sdk/tabs/utils').getTabBrowser(
    require('sdk/window/utils').getMostRecentBrowserWindow()
  );
}

function jumpDomain(sign) {
  var gBrowser = getGBrowser();
  var history = gBrowser.webNavigation.sessionHistory;

  // Get current domain
  var currentDomain =
      url.URL(history.getEntryAtIndex(history.index, false).URI.spec).host;

  // Find index to jump to
  var jumpIndex = history.index;
  while (jumpIndex + sign >= 0 && jumpIndex + sign < history.count) {
    jumpIndex += sign;
    var testDomain =
        url.URL(history.getEntryAtIndex(jumpIndex, false).URI.spec).host;
    if (testDomain != currentDomain) {
      break;
    }
  }

  // Navigate to index
  console.log('jumpIndex: ' + jumpIndex);
  gBrowser.webNavigation.gotoIndex(jumpIndex);
}


//////////////
// Handlers //
//////////////

var backButton = buttons.ActionButton({
  id: 'domain-back',
  label: 'Go back a domain',
  icon: {
    '16': './back-icon-16.png',
    '32': './back-icon-32.png',
    '64': './back-icon-64.png'
  },
  onClick: backClickHandler
});
function backClickHandler(state) {
  jumpDomain(-1);
}

var forwardButton = buttons.ActionButton({
  id: 'domain-forward',
  label: 'Go forward a domain',
  icon: {
    '16': './forward-icon-16.png',
    '32': './forward-icon-32.png',
    '64': './forward-icon-64.png'
  },
  onClick: forwardClickHandler
});
function forwardClickHandler(state) {
  jumpDomain(1);
}
