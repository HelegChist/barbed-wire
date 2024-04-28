-- 1. create tables
CREATE TABLE IF NOT EXISTS nomenclature
(
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT    NOT NULL,
    price INTEGER NOT NULL
);

-- 2. insert test values
INSERT INTO nomenclature (NAME, PRICE) VALUES ('Шпиндель', 123);
INSERT INTO nomenclature (NAME, PRICE) VALUES ('Шток', 450);
INSERT INTO nomenclature (NAME, PRICE) VALUES ('130/20/30', 1000);