export const GET_ALL_NOMENCLATURES = 'SELECT * FROM nomenclature'

export const GET_ACTIVE_WORKDAY = 'SELECT * FROM workday w WHERE w.end_to IS NULL'

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