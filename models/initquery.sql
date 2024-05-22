CREATE DATABASE IF NOT EXISTS bmxl35l3amqxxanjhflp;
USE bmxl35l3amqxxanjhflp;
CREATE TABLE IF NOT EXISTS users(
    username varchar(20) PRIMARY KEY,
    password varchar(128) NOT NULL
);
CREATE TABLE IF NOT EXISTS problems(
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(20),
    problem text(255),
    duration time,
    entered text(128),
    result text(128),
    wrongcount int,
    correctcount int,
    type enum("BIN", "CON"),
    foreign key(username) references users(username) on delete cascade
);
