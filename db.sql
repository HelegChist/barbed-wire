-- 1. create tables
CREATE TABLE IF NOT EXISTS nomenclature
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    NOT NULL,
    price   INTEGER NOT NULL,
    disable INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS production
(
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at      TEXT DEFAULT CURRENT_TIMESTAMP       NOT NULL,
    nomenclature_id INTEGER REFERENCES nomenclature (id) NOT NULL,
    workday_id      INTEGER REFERENCES workday (id)      NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_production_nomenclature ON production (nomenclature_id);

CREATE INDEX IF NOT EXISTS idx_production_workday ON production (workday_id);

CREATE TABLE IF NOT EXISTS workday
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    start_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_to   TEXT,
    ratio_id INTEGER REFERENCES workday (id),
    result   INTEGER
);

CREATE TABLE IF NOT EXISTS ratio
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    start_at TEXT    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name     TEXT                              NOT NULL,
    value    INTEGER                           NOT NULL,
    disable  INTEGER DEFAULT 0
);

-- 2. insert test values
INSERT INTO nomenclature (id, name, price)
VALUES (1, 'Шпиндель', 123),
       (2, 'Шток', 450),
       (3, '130/20/30', 1000);

INSERT INTO ratio (id, start_at, name, value, disable)
VALUES (1, '2024-04-12 12:14:46', 'Ночная смена', 1.5, 0),
       (2, '2024-04-12 12:14:46', 'Праздничная смена', 1.5, 1);

INSERT INTO workday (id, start_at, end_to, ratio_id, result)
VALUES (1, '2024-04-12 12:14:46', '2024-04-12 21:04:33', 1, 1350),
       (2, '2024-04-13 08:22:00', null, 1, null);

INSERT INTO production (id, created_at, nomenclature_id, workday_id)
VALUES (1, '2024-04-12 13:00:00', 1, 1),
       (2, '2024-04-12 14:00:00', 2, 1),
       (3, '2024-04-12 18:00:00', 2, 1),
       (4, '2024-04-12 21:00:00', 2, 1),
       (5, '2024-04-13 08:00:00', 3, 2),
       (6, '2024-04-13 09:00:00', 3, 2),
       (7, '2024-04-13 09:00:00', 1, 2);
