# AGL Developer Test
Attn: Robert Rath, Senior Consultant - Digital, Applications &amp; Development, Robert Walters

## Assumptions for usage
- Node.JS installed and running
- Favorite GIT command line tool installed

## How To Use
```bash
# Open up a command prompt clone my repository to a local directory
git clone https://github.com/jseuren/AGL-Developer-Test.git

# Change directory to the newly created directory of my repository
cd AGL-Developer-Test

# install the local server and dependenices
npm install

# start the local web server to view the output
npm start
```

## Libraries

Libraries used for the test

- [HandlebarsJS] - http://handlebarsjs.com/ for a lightweight templated output solution
- [UnderscoreJs] - http://underscorejs.org/ as an easy to use client side library for grouping / filtering / sorting etc..
- [JQuery] - (https://jquery.com/) for client side consumption of JSON file
- [QUnit] - (https://qunitjs.com/) for basic client side unit testing

## Assumptions for test

- There should be at least one owner with a cat
- All owners should be assigned a gender
- All cats defined should have a name