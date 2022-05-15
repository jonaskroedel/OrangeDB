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
    guildVolume INT(3) DEFAULT 100
);

CREATE TABLE Playlists (
    guildId VARCHAR(100) NOT NULL,
    username varchar(32),
    userId varchar(100) NOT NULL PRIMARY KEY,
    playlistName varchar(20) NOT NULL,
    playlist longtext
)