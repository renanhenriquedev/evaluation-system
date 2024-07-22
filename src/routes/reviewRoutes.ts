import express from 'express';
import { createReview, getReviews, getReviewById, updateReview, deleteReview } from '../controllers/reviewController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - userId
 *         - rating
 *         - comment
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB
 *         userId:
 *           type: string
 *           description: ID do usuário que fez a avaliação
 *         rating:
 *           type: number
 *           description: Nota dada pelo usuário
 *         comment:
 *           type: string
 *           description: Comentário da avaliação
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Gerenciamento de avaliações
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Erro ao criar a avaliação
 */
router.post('/', authenticateToken, createReview);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retorna a lista de todas as avaliações
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Erro ao obter as avaliações
 */
router.get('/', authenticateToken, getReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Retorna uma avaliação pelo ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao obter a avaliação
 */
router.get('/:id', authenticateToken, getReviewById);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Atualiza uma avaliação pelo ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao atualizar a avaliação
 */
router.put('/:id', authenticateToken, updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Exclui uma avaliação pelo ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação excluída com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao excluir a avaliação
 */
router.delete('/:id', authenticateToken, deleteReview);

export default router;
