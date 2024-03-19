import { getAllJoyasModelLimitFormat, getAllJoyasHateoas, getAllJoyasModelFilter, getJoyaByIdFromDatabase} from "../models/joyas.model.js";

import HATEOAS from '../../helpers/hateoas.js';
import pagination from "../../helpers/paginator.js";


//Hateoas
export const getAllJoyasWithHateoas = async (req, res) => {
    try {
        const allJoyas = await getAllJoyasHateoas();
        const allJoyasWithHateoas = await HATEOAS('joyas', allJoyas);
        res.status(200).json({joya: allJoyasWithHateoas});
    } catch (error) {
        res.status(400).json({error: error.message});
        console.log('Error al procesar la solicitud: ', error);
    }
};



//Paginator

export const allJoyasPaginator = async (req, res) => {
    try {
        const {items, page} = req.query;
        const allJoyas = await getAllJoyasHateoas();
        const isPage = /^[1-9]\d*$/.test(page);
        if(!isPage){
            return res.status(400).json({message: 'page numero invalido'});
        }
        const pageData = pagination(allJoyas, items, page);
        res.status(200).json(pageData);

    } catch (error) {
        res.status(400).json({error: error.message});
        console.log('Error al procesar la solicitud: ', error);
    }
}




export const getOrderAndLimitJoyas = async (req, res) => {
    try {
        const { order_by = 'id_DESC', limits = 10, page = 1 } = req.query;
        const joyas = await getAllJoyasModelLimitFormat(order_by, limits, page);
        
        // Aplicar paginación
        const joyasPaginadas = pagination(joyas, limits, page);
        
        // Aplicar HATEOAS a los resultados paginados
        const joyasConHateoas = await HATEOAS('joyas', joyasPaginadas.result);

        res.status(200).json({ joya: joyasConHateoas, pagination: joyasPaginadas });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log('Error al procesar la solicitud: ', error);
    }
};


export const filterJoyas = async (req, res) => {
    try {
        const { precio_min, precio_max, categoria, metal } = req.query;
        const filters = {};

        if (precio_min) filters.precio_min = precio_min;
        if (precio_max) filters.precio_max = precio_max;
        if (categoria) filters.categoria = categoria;
        if (metal) filters.metal = metal;

        const joyas = await getAllJoyasModelFilter(filters);
        res.status(200).json(joyas);
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log('Error al procesar la solicitud: ', error);
        }
};


export const getJoyaById = async (req, res) => {
    try {
        const { id } = req.params;
        const joya = await getJoyaByIdFromDatabase(id);

        if (!joya) {
            return res.status(404).json({ message: 'Joya no encontrada' });
        }

        res.status(200).json(joya);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la joya' });
        console.error('Error al obtener la joya:', error);
    }
};