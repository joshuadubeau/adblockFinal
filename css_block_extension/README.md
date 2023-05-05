This is how to use the Ad Remover Extension!

Firstly, download the package, there should
be a manifest.json, content.js, and background.js files

Next, go to content.js and put the site you want to change in the website domain of the sites class. 

Then, 

1. Go to chrome://extensions/

Make sure you have developer tools on to be able to test the extension. Importantly we are using manifest v2,
to study webRequests, but chrome does not allow new v2 extensions 
to be published.

2. Click on 'load unpacked' and you can choose the folder with the files

3. the extension 'Adblock Extension' should appear, make sure the slider in the bottom right
is turned on.

4. Now when you load a webpage, ads should be minimzed to the page