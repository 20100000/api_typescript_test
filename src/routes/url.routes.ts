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
 *  post:
 *   summary: Create a new short URL
 *   parameters:
 *    - in: query
 *      name: url
 *      required: true
 *      schema:
 *        type: string      
 */
router.post('/', createShort);

/**
 * @swagger
 * /shorten/{shortCode}/stats:
 *  get:
 *   summary: Get all short URL
 */
router.get('/:shortCode/stats', getShortStats);

/**
 * @swagger
 * /shorten/{shortCode}:
 *  get:
 *   summary: Get only shortCode
 */
router.get('/:shortCode', getShort);

/**
 * @swagger
 * /shorten/{shortCode}:
 *  put:
 *   summary: Update an existing short URL
 *   parameters:
 *    - in: query
 *      name: url
 *      required: true
 *      schema:
 *        type: string  
 */
router.put('/:shortCode', updateShort);

/**
 * @swagger
 * /shorten/{shortCode}:
 *  delete:
 *   summary: Delete an existing short URL
 */
router.delete('/:shortCode', deleteShort);

export default router;