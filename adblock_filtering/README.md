# How this extension works:

This extension uses the webRequest API to filter out requests to a known list of ad services (found in the blocked_domains file). On an attempt to connect to these services, the extension simply cancels the connection. Note: there are some ads that get through the ad blocker. This is because our blocked_domains list is not as extensive (roughly 200 blocked domains) as those found in commercial ad blockers (generally over 60,000 blocked domains). Regardless, this extension functions for demonstration purposes, and showcases the mechanism through which many commercially available ad blockers function.

1. Go to chrome://extensions/

Make sure you have developer tools on to be able to test the extension. Importantly we are using manifest v2,
to study webRequests, but chrome does not allow new v2 extensions 
to be published

2. Click on 'load unpacked' and you can choose the folder with the files

3. the extension 'adblocker' should appear, make sure the slider in the bottom right is turned on.

