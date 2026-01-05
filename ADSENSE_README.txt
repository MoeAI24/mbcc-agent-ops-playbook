AdSense quick notes (no structure/layout changes)

- ads.txt added at site root: https://moecommunitycloud.com/ads.txt
  Content:
  google.com, pub-8387411349417007, DIRECT, f08c47fec0942fa0

- Auto Ads script injected into <head> where </head> exists.
  HTML scanned: 43
  Updated (script inserted): 40
  Skipped (no </head>): 2

Verify after deploy:
1) Open https://moecommunitycloud.com/ads.txt and confirm it shows the one line above.
2) View page source on any page and search for: adsbygoogle.js?client=ca-pub-8387411349417007
