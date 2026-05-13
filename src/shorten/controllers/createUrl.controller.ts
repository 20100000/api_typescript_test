import { Request, Response } from 'express';
import { pool } from '../../config/database.js';
import { customAlphabet } from 'nanoid';
import { createShortQuery, createStatisticQuery } from '../models/url.model.js'

const createShortCode = async (url: any) => {
    const generationShortCode = await customAlphabet(url, 6);
    return generationShortCode();
}

export const createShort = async (req: Request, res: Response) => {
    const { url } = req.body;
    try {
        if (!url) {
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
