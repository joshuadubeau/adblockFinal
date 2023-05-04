# Adblocker Data Collection

This is the same as the url filtering adblocker, except it tries to display the ability 
of an extension to collect data without the user's knowledge.

## How the Extension Works

Firstly, within this extension is the same code as in the vanilla adblocker, so it 
should be as effective as the normal adblocker. This is designed to prevent the user from knowing
if anything is different. However, there is additional code, that, when a url is loaded/visited,
before it could be blocked, or if it not in the blocked url list, can log information about the 
users visit, such as the time of visit, request id, url, and server IP. Additionally, using webrequests
there are many more things that could be collected without needing user consent. It is then sent 
to a server we own, (http://lukemorrill.epizy.com/add_data.php) where we collect it on our database.

### Note on add_data.php file

For this adblocker variant i included the php file I wrote for receiving the data on infinty free account ie
this file is in the htdocs of the website. I wanted to show how we recieved the data and added to the database,
since we cannot display the actual server when it is run without the login credentials to the account.

For security reasons, the username and password have been removed for the server have been removed from the 
file (replaced with '*') since this is being posted on github. Therefore, this php file WILL NOT work if 
run as it is now, if needed the username and password can be requested from one of the authors of the github.
Besides this the php is exactly as it is on infinityfree.

## How to Use the extension
This extension was developed using chrome's developer tools. Firstly download the package, there should
be a manifest.json, blocked_domains.js, and background.js files, and the add_data.php files. 

1. Go to chrome://extensions/

Make sure you have developer tools on to be able to test the extension. Importantly we are using manifest v2,
to study webRequests, but chrome does not allow new v2 extensions 
to be published (also we don't want to publish malicious code)

2. Click on 'load unpacked' and you can choose the folder with the files

3. the extension 'adblockerMal' should appear, make sure the slider in the bottom right
is turned on.

4. Now when you load a webpage, ads should be blocker if they are in the filter list,
and secretly we are sending our data to a server on infinity free.
