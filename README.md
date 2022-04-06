# OrangeDB
   

OrangeDB uses mySQL for Data-Managament <br>
to be an __multi-guild__ usable Discord Bot 

<img src="https://cdn.discordapp.com/attachments/959002401937952788/961137375851978822/unknown.png" alt="logo" width="100">

## Installation and Hosting

- You need: 
1) [Node.js](https://nodejs.org/)
2) [Dotenv](https://www.npmjs.com/package/dotenv?ref=hackernoon.com)
3) [mySQL2](https://www.npmjs.com/package/mysql2)

``npm install discord.js``
``npm install dotenv --save``
``npm install --save mysql2``
``npm install got@11.8.3``

- You need a ``.env`` file in your __Root__ directory

````
BOT_TOKEN=YOURTOKEN
DB_HOST=YOUR_HOST_ADRESS //eg. localhost
DB_USER=YOUR_DB_USER //eg. root
DB_PASS=YOUR_DB_PASSWORD //eg. root
DB_NAME=orangedb  //if you dont know, then do not change that!
````
## mySQL

To use a database you have to install [mySQL Server](https://dev.mysql.com/downloads/windows/installer/8.0.html).
I recommend to create a new user with all permission with the commands below:

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

There are currently ``8`` commands available: <br>
1) ``o!help`` not finished help page
2) ``o!prefix`` changes the prefix for your current guild, only with permission "MANAGE_GUILD" 
3) ``o!reddit`` sends a random pst from r/meme or custom subreddit 
4) ``o!ping`` sends the ping in `ms` from the bot 
5) ``o!clear`` clears between 1 and 100 messages in a specific channel
6) ``o!userinfo`` show the info for yourself or tagged user
7) ``o!subreddit`` changes the default subreddit for your current guild, only with permission "MANAGE_GUILD

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