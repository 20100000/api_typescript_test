import { Request, Response } from 'express';
import { crawlerProcess } from '../lib/crawler.lib.js'

export const getProducts = async (req: Request, res: Response) => {
    const { product } = req.params;
    const url = 'https://webscraper.io/test-sites/e-commerce/static/computers/laptops?page=';
    try {
        const products:any = await crawlerProcess(url, product)
        if (! products.length) {
            throw new Error('Resource not found', { cause: { statusCode: 404 } });
        }
        res.status(200).json({
            result: products,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                message: err.message,
            });
        }
    }   
};
