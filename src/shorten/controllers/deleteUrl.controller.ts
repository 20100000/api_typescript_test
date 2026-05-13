import { Request, Response } from 'express';
import { pool } from '../../config/database.js';
import { deleteShortQuery, deleteStatisticQuery } from '../models/url.model.js'

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