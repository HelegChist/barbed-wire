export const GET_ALL_NOMENCLATURES = 'SELECT * FROM nomenclature WHERE disable = 0;'
export const INSERT_NOMENCLATURES = 'INSERT INTO nomenclature (NAME, PRICE) VALUES (?, ?);'
export const DELETE_NOMENCLATURES = 'UPDATE nomenclature SET disable = 1 WHERE id = ?;'

export const INSERT_WORKDAY = `INSERT INTO workday (start_at, end_to, ratio_id)
                               VALUES (datetime('now'), null, ?);`
export const GET_ALL_WORKDAY = `
    SELECT w.start_at as startTo, w.end_to as endTo, SUM(n.price) as total
    FROM workday w
             JOIN production p ON p.workday_id = w.id
             JOIN nomenclature n ON p.nomenclature_id = n.id
    GROUP BY w.id
    ORDER BY w.start_at ASC`;
export const GET_ACTIVE_WORKDAY = 'SELECT * FROM workday w WHERE w.end_to IS NULL'
export const FINISH_ACTIVE_WORKDAY = `UPDATE workday
                                      SET end_to = datetime('now')
                                      WHERE id = ?;`

export const INSERT_PRODUCTION = 'INSERT INTO production (nomenclature_id, workday_id) VALUES (?, ?)'
export const DELETE_LAST_PRODUCTION = `
    DELETE
    FROM production
    WHERE id = (SELECT MAX(p.id) FROM production p WHERE p.nomenclature_id = ? AND p.workday_id = ?);`
export const GET_PRODUCTION = `
    SELECT n.id, n.name, COUNT(n.name) as count, SUM(n.price) as sum
    FROM workday w
        JOIN production p
    ON w.id = p.workday_id
        JOIN nomenclature n ON n.id = p.nomenclature_id
    WHERE w.id = ?
    GROUP BY p.nomenclature_id;`

export const GET_ALL_RATIO = 'SELECT * FROM ratio WHERE disable = 0;'
export const INSERT_RATIO = 'INSERT INTO ratio (NAME, VALUE) VALUES (?, ?);'
export const DELETE_RATIO = 'UPDATE ratio SET disable = 1 WHERE id = ?;'