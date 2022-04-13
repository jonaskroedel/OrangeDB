CREATE DATABASE orangedb;

USE orangedb;

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


CREATE TABLE ClientCommands (
    nr INT AUTO_INCREMENT PRIMARY KEY,
    cmdName VARCHAR(100),
    cmdDesc VARCHAR(100)
);