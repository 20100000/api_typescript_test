import { Request, Response } from 'express';
import { pool } from '../../config/database.js';
import { updateShortQuery } from '../models/url.model.js'

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