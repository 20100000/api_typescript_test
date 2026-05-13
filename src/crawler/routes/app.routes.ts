import { Router } from 'express';
import { getProducts } from '../controllers/crawler.controller.js';

const router = Router();


/**
 * @swagger
 * /crawler/{product}:
 *   get:
 *     summary: Get products
 *     parameters:
 *       - in: path
 *         name: product
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/:product', getProducts);

export default router;