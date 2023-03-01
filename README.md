## Smart-Script V2

## Overview
**At a glance:** Use OneLink Smart Script to generate URLs that get embedded behind a button on your mobile website.

![smart_script_flow](./images/Smart_Script_flow.png "OneLink Smart Script flow")

Users arrive at your mobile website before reaching your app store page, either organically, or via advertising campaigns. However, since there are two clicks (the first that directs to the web page and the second that directs from the web page to the app store), collecting click conversion metrics and deep linking is problematic. 

OneLink Smart Script solves these problems. The script:

Uses the incoming URLs leading to the webpage to automatically generate unique outgoing OneLink URLs leading to the app store. 
Provides accurate web-to-app metrics collection for all media sources, including ad networks, SRNs, Google clicks, and owned media. 
Can be used for deep linking. 
Runs seamlessly on any webpage or landing page.

Table of contents: 
- [Smart Script latest version](https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js)
- [Smart Script latest version - local copy](scripts/onelink-smart-script-latest.js)
- Sample use cases
  - [Single Key](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/single_key.html?incmp=gogo&inmedia=email)
  - [Multiple Keys](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/multiple_keys.html?incmp11=gogo11&inmedia22=email22)
  - [Override media source](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/override_mediasource.html?inmedia=old_value)
  - [Media source default value](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/mediasource_default_value.html?inmedia_found=orig_media_value)
  - [Forced default values](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/forced_default_values.html?inmedia_found=plain_media_source)
  - [UTM Parameters](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/utm_parameters.html?utm_campaign=mycmpn&utm_source=mysource)
  - [Google Click ID](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/google_clickid.html?inmedia=email&gclid=1a2b3c&keyword=sale%2Bboat)
  - [Facebook Click ID](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/facebook_clickid.html?inmedia=email&fbclid=7hjy89)
  - [OneLink and attribution parameters](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/onelink_parameters.html?inmedia=email&dp_dest=apples&inchnl=this_channel&promo=buy99)
  - [OneLink custom parameters](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/onelink_custom_parameters.html?inmedia=email&dp_dest=apples&pageid=2g4f&productid=shirt12&partner=bigagency)
  - [Referrer Skip List](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/referrer_skip_list.html?incmp=gogo&inmedia=email)
  - [URL Skip List](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/url_skip_list.html?incmp=gogo&inmedia=email&af_r=hotel.me)
  - [Google Tag Manager](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/google_tag_manager.html?my_source=email&app_dest=planes&typeid=b787&msg_id=f7h8)
  - [QR Code](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/qr_code.html?incmp=gogo&inmedia=email)
  - [Google Tag Manager /w QR Code](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/google_tag_manager_qr.html?my_source=email&app_dest=planes&typeid=b787&msg_id=f7h8)
  - [Impressions](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/impressions.html?incmp=gogo&inmedia=email)
  - [Direct Click URL (CTVs and consoles)](https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/direct_click.html?incmp=gogo&inmedia=new_source)

