CREATE DATABASE orangedb;

CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    guildOwnerId VARCHAR (100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT 'o!',
    modLogId VARCHAR(100),
    subReddit VARCHAR(100) DEFAULT 'meme'
);

