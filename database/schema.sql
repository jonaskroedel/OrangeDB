CREATE DATABASE orangedb;

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

USE orangedb;

CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    guildOwnerId VARCHAR (100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT 'o!',
    modLogId VARCHAR(100),
    subReddit VARCHAR(100) DEFAULT 'meme',
    guildWelcome VARCHAR(100),
    guildWelcomeMsg VARCHAR(200),
    guildVolume INT(3) DEFAULT 100,
    guildLanguage VARCHAR(10)
);

create table playlists (
    guildId varchar(100) not null,
    username varchar(32),
    userId varchar(100) not null,
    playlistName varchar(20) not null,
    playlist longtext
);