import { Request, Response } from 'express';
import { pool } from '../config/database.js';
import { customAlphabet } from 'nanoid';


export const createShort = async (req: Request, res: Response) => {
    const { url } = req.body;
    if(!url) {
        res.status(400).json({
            message: 'Bad Request url undefined',
        });
    }
    const generationShortCode = customAlphabet(url, 6); 
    const shortCode = generationShortCode();
    try {
         const result = await pool.query('INSERT INTO shortenURLs(url, shortCode, createdAt, updatedAt) VALUES($1, $2, now(), now()) RETURNING *',
            [url, shortCode]);
        await pool.query('INSERT INTO statistics(shortCode, accessCount, createdAt, updatedAt) VALUES($1, 0, now(), now()) RETURNING *', [shortCode]); 
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
        const result = await pool.query('SELECT url.*, s.accessCount FROM shortenURLs AS url INNER JOIN statistics as s ON url.shortCode = s.shortCode WHERE url.shortCode=$1', [shortCode]);
        if (!result.rows[0]) {
            throw new Error('Resource not found', { cause: { statusCode: 404 } });
        } else {
            res.status(200).json({
                result: result.rows,
            });
        }    
    } catch (err) {
        if (err instanceof Error) {
            res.status(res.statusCode).json({
                message: err.message,
            });
        }
    }
   
};

export const getShort = async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
        let result = await pool.query('SELECT url.*, s.accessCount FROM shortenURLs AS url INNER JOIN statistics as s ON url.shortCode = s.shortCode WHERE url.shortCode=$1', [shortCode]);
        if (result.rows[0]) {
            result.rows[0].accesscount = result.rows[0].accesscount + 1;
            await pool.query('UPDATE statistics SET accessCount=$1, updatedAt=now() WHERE shortCode=$2 RETURNING *',[result.rows[0].accesscount, shortCode]);
            delete result.rows[0].accesscount;
        } else {
            throw new Error('Resource not found', { cause: { statusCode: 404 } }); 
        }
        res.status(200).json({
            result: result.rows[0],
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(res.statusCode).json({
                message: err.message,
            });
        }
    }   
};

export const updateShort = async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    const { url } = req.body;
    try {
        const result = await pool.query('UPDATE shortenURLs SET url=$1, updatedAt=now() WHERE shortCode=$2 RETURNING *',[url, shortCode]);
        if (result.rows[0]) {
            throw new Error('Resource not found', { cause: { statusCode: 404 } }); 
        }
        res.status(200).json({
            result: result.rows[0],
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(res.statusCode).json({
                message: err.message,
            });
        }
    } 
};

export const deleteShort= async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    try {
        await pool.query('DELETE FROM shortenURLs WHERE shortCode=$1', [shortCode]);
        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (err) {
        if (err instanceof Error) {
            res.status(res.statusCode).json({
                message: err.message,
            });
        }
    }
};