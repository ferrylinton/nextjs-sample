/**
 * @swagger
 * components:
 *   schemas:
 *     Hello:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The people name
 *       example:
 *         name: Jhon Doe
 * 
 */

type Hello = {
    name: string
}