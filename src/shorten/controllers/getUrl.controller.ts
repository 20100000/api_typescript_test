import { Request, Response } from 'express';
import { pool } from '../../config/database.js';
import { getStatisticStatsQuery, updateStatisticsQuery } from '../models/url.model.js'

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
