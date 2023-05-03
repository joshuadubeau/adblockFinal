chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		console.log("blocking:", details.url);
		return {cancel: true };
	},
	{urls: blocked_domains},
	["blocking"]
);

// begin additional listeners

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log("Request from IP address:", details.ip || "Unknown");
        console.log("Request URL:", details.url);
        console.log("Request method:", details.method);
        if (details.requestHeaders) {
            console.log("Request headers:", details.requestHeaders);
        }

        if (details.requestBody) {
            console.log("Request body:", details.requestBody || "Not available");
        }
        if (details.timeStamp) {
        console.log("Request initiated at:", new Date(details.timeStamp));
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestBody"]
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log("WebSocket URL:", details.url);
      console.log("WebSocket headers:", details.requestHeaders);
    },
    {urls: ["ws://*/*", "wss://*/*"]},
    ["blocking"]
  );

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log("SSE URL:", details.url);
      console.log("SSE headers:", details.requestHeaders);
    },
    {urls: ["<all_urls>"], types: ["xmlhttprequest"]},
    ["blocking"]
  );
  
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log("WebRTC URL:", details.url);
      console.log("WebRTC headers:", details.requestHeaders);
      console.log("WebRTC body:", details.requestBody);
    },
    {urls: ["<all_urls>"], types: ["xmlhttprequest"]},
    ["blocking", "requestBody"]
  );

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log("WebSocket URL:", details.url);
      console.log("WebSocket headers:", details.requestHeaders);
    },
    {urls: ["<all_urls>"], types: ["xmlhttprequest"]},
    ["requestBody"]
  );

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'Authorization') {
          console.log('Credentials:', details.requestHeaders[i].value);
          break;
        }
      }
    },
    {urls: ["http://*/*"]},
    ["requestHeaders", "blocking"]
  );
