# OrangeDB

OrangeDB uses mySQL for Data-Managament

## Installation and Hosting

- You need: 
1) [Node.js](https://nodejs.org/)
2) [Dotenv](https://www.npmjs.com/package/dotenv?ref=hackernoon.com)
3) [mySQL2](https://www.npmjs.com/package/mysql2)

``npm install discord.js``
``npm install dotenv --save``
``npm install --save mysql2``

4) You need a ``.env`` file in your __Root__ directory

````
BOT_TOKEN=YOURTOKEN
DB_USER=YOUR_DB_USER //eg. root
DB_PASS=YOUR_DB_PASSWORD //eg. root
DB_NAME=orangedb  //if you dont know, then do not change that!
````
# mySQL

To use a database you have to install [mySQL Server](https://dev.mysql.com/downloads/windows/installer/8.0.html).
I recommend to create a new user with al permission with the commands below:

````
mysql> CREATE USER 'YOUR_USERNAME'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD'; 
mysql> GRANT ALL PRIVILEGES ON \*.* TO 'YOUR_USERNAME'@'localhost';
````
Back in commandline:
````
C:\Users\PC_USER> mysql -u YOUR_USERNAME -p
Enter password: YOUR_PASSWORD
mysql>
````

## Usage

You can use this Bot for anything you can think of... The important thing is, that you dont use this Bot as your own.  
This is an ``Open Source`` Project made by [Jonas Krödel](https://github.com/jonaskroedel/)

## Commands

There is currently ``1`` command available: <br>
1) ``o!prefix`` changes the prefix for your current guild <br>

More Commands coming soon!
<br>
<br>

And if you want to support me, then don't hesitate to donate me on [paypal.me/jonaskroedel](https://paypal.me/jonaskroedel)


Internet Systems Consortium license
===================================

Copyright (c) `2022`, `Jonas Krödel`

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.