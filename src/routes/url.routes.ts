import { Router } from 'express';
import {
createShort,
getShort,
getShortStats,
updateShort,
deleteShort
} from '../controllers/url.controller.js';

const router = Router();

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Create a new short URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://www.example.com/some/long/url"
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', createShort);

/**
 * @swagger
 * /shorten/{shortCode}/stats:
 *   get:
 *     summary: Get only shortCode statitics
 *     parameters:
 *       - in: path
 *         name: shortCode
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
router.get('/:shortCode/stats', getShortStats);

/**
 * @swagger
 * /shorten/{shortCode}:
 *   get:
 *     summary: Get only shortCode
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:shortCode', getShort);

/**
 * @swagger
 * /shorten/{shortCode}:
 *   put:
 *     summary: Create a new short URL
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://www.example.com"
 *     responses:
 *       200:
 *         description: Created
 */
router.put('/:shortCode', updateShort);

/**
 * @swagger
 * /shorten/{shortCode}:
 *   delete:
 *     summary: Delete an existing short URL
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:shortCode', deleteShort);

export default router;