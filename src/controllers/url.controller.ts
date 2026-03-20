import { Request, Response } from 'express';
import { pool } from '../config/database.js';
import { customAlphabet } from 'nanoid';
import {
    createShortQuery, createStatisticQuery, getStatisticStatsQuery, updateShortQuery,
    updateStatisticsQuery, deleteShortQuery, deleteStatisticQuery
} from '../models/url.model.js'

const createShortCode = async (url: any) => {
    const generationShortCode = await customAlphabet(url, 6);
    return generationShortCode();
}

export const createShort = async (req: Request, res: Response) => {
    const { url } = req.body;
    try {
        if(!url) {
            throw new Error('Bad Request url undefined', { cause: { statusCode: 400 } });
        }
        const shortCode = await createShortCode(url);
        const result = await pool.query(createShortQuery, [url, shortCode]);
        await pool.query(createStatisticQuery, [shortCode]);
        res.status(201).json({
            result: result.rows[0],
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                message: err.message,
            });
        }
    }
};

export const getShortStats = async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
        const result = await pool.query(getStatisticStatsQuery, [shortCode]);
        if (!result.rows[0]) {
            throw new Error('Resource not found', { cause: { statusCode: 404 } });
        } else {
            res.status(200).json({
                result: result.rows,
            });
        }    
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                message: err.message,
            });
        }
    }
   
};

export const getShort = async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
        let result = await pool.query(getStatisticStatsQuery, [shortCode]);
        if (result.rows[0]) {
            result.rows[0].accesscount = result.rows[0].accesscount + 1;
            await pool.query(updateStatisticsQuery, [result.rows[0].accesscount, shortCode]);
            delete result.rows[0].accesscount;
        } else {
            throw new Error('Resource not found', { cause: { statusCode: 404 } }); 
        }
        res.status(200).json({
            result: result.rows[0],
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                message: err.message,
            });
        }
    }   
};

export const updateShort = async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    const { url } = req.body;
    try {
        if (!url) {
            throw new Error('Bad Request url undefined', { cause: { statusCode: 400 } });
        }
        const result = await pool.query(updateShortQuery, [url, shortCode]);
        if (!result.rows[0]) {
            throw new Error('Resource not found', { cause: { statusCode: 404 } }); 
        } else {
            res.status(200).json({
                result: result.rows[0],
            });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                message: err.message,
            });
        }
    } 
};

export const deleteShort= async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
        const result = await pool.query(deleteStatisticQuery, [shortCode]);
        if (result.rowCount == 0) {
            throw new Error('Resource not found', { cause: { statusCode: 404 } });
        }
        await pool.query(deleteShortQuery, [shortCode]);
        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                message: err.message,
            });
        }
    }
};