DROP DATABASE worldcup_pool;

CREATE DATABASE worldcup_pool;

USE worldcup_pool;

CREATE TABLE gambler
(
    id BINARY(16) NOT NULL,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    phone VARCHAR(24) NOT NULL,
    birth_date DATE,
    PRIMARY KEY(id)
);

CREATE TABLE bet
(
    id BINARY(16) NOT NULL,
    champion VARCHAR(256) NOT NULL,
    runner_up VARCHAR(256) NOT NULL,
    gambler_id BINARY(16) NOT NULL,
    bet_date DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(gambler_id)
        REFERENCES gambler(id)
);