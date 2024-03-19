import pool from "../../database/config.js";
import format from "pg-format";

//limit format
export const getAllJoyasModelLimitFormat = async (order_by = "id_DESC", limits = 10, page = 0) => {
    const [attribute, direction] = order_by.split('_');

    const allJoyas = format(
      'SELECT * FROM inventario ORDER BY %s %s',
      attribute,
      direction
    );
    
    const response = await pool.query(allJoyas);
    return response.rows;
}

//Hateoas
export const getAllJoyasHateoas = async () => {
    const allJoyas = await pool.query('SELECT * FROM inventario');
    return allJoyas.rows;
}



export const getAllJoyasModelFilter = async (filters) => {

    const conditions = [];
    const values = [];

    if (filters.precio_min) {
        conditions.push('precio >= $1');
        values.push(filters.precio_min);
    }
    if (filters.precio_max) {
        conditions.push('precio <= $' + (values.length + 1));
        values.push(filters.precio_max);
    }
    if (filters.categoria) {
        conditions.push('categoria = $' + (values.length + 1));
        values.push(filters.categoria);
    }
    if (filters.metal) {
        conditions.push('metal = $' + (values.length + 1));
        values.push(filters.metal);
    }

    const query = `
        SELECT * FROM inventario
        ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}
    `;

    const result = await pool.query(query, values);

    return result.rows;
};


export const getJoyaByIdFromDatabase = async (id) => {
    const query = 'SELECT * FROM inventario WHERE id = $1';
    const response = await pool.query(query, [id]);

    return response.rows.length > 0 ? response.rows[0] : null;
};