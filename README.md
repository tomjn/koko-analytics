Koko Analytics
===========
 [![Build Status](https://img.shields.io/travis/ibericode/koko-analytics/master)](https://travis-ci.org/ibericode/koko-analytics)
 [![Tested WordPress version](https://img.shields.io/wordpress/plugin/tested/koko-analytics)](https://wordpress.org/plugins/koko-analytics/)
 [![WordPress.org rating](https://img.shields.io/wordpress/plugin/stars/koko-analytics)](https://wordpress.org/support/plugin/koko-analytics/reviews/)
 [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
 
[Koko Analytics](https://www.kokoanalytics.com/) is an open-source and privacy-friendly analytics plugin for WordPress. 

![Screenshot of the Koko Analytics dashboard](https://github.com/dannyvankooten/koko-analytics/raw/master/assets/src/img/screenshot-1.png?v=1)

## Features

- No external services. Data is yours and yours alone.
- No personal information or anything visitor specific is tracked.
- Blazingly fast. Handles thousands of daily visitors or sudden bursts of traffic without breaking a sweat.
- Plug and play. Just install and activate the plugin and stats will automatically be recorded.
- Open-source (GPLv3 licensed).

### How to install

To run the latest development version of the plugin, take the following steps.

First, clone the repository using Git in your `/wp-content/plugins/` directory
```
git clone git@github.com:dannyvankooten/koko-analytics.git
```

Create the autoloader using Composer.
```
composer install
```

Install client-side dependencies using NPM
```
npm install
```

Build the plugin assets by issuing the following command:
``` 
npm run build
```

### Usage

Stats will be collected right away after you install and activate the plugin. You can view your stats on the **Dashboard > Analytics** page.

### Translations

You can [help translate Koko Analytics into your language](https://translate.wordpress.org/projects/wp-plugins/koko-analytics/stable/) using your WordPress.org account.

### License

GNU General Public License v3.0
