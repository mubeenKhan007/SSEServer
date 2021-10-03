import express from 'express'
import { check, body } from 'express-validator'

import { AddProduct, AddProductToCart, DeleteProduct, EditProduct, GetExchangeProducts, GetProductById, GetSellingProducts, LikeProduct } from '../../Controller/ProductController.js'
import { UserAuth } from '../../Middleware/UserAuth.js'

export const ProductRouter = express.Router()

/**
 * @swagger
 * /Api/Product/AddProduct:
 *  post: 
 *      summary: Add the product
 *      tags:
 *      - Product
 *      responses:
 *          '200':
 *              description: Product is successfully added
 *      parameters:
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          productName:
 *                              type: string
 *                          price:
 *                              type: string
 *                          forExchange:
 *                              type: string
 *                          description:
 *                              type: string
 *                          categoryId:
 *                              type: string
 *                          cityId:
 *                              type: string
 *                          conditionId:
 *                              type: string
 *                          images:
 *                              type: array
 *                              items:
 *                                  type: string
 */
ProductRouter.post(
    '/AddProduct',
    [
        UserAuth,
        [
            check('productName', 'Product name is required').not().isEmpty(),
            check('price', 'Price should be a number').isNumeric(),
            check('forExchange', 'ForExchange should be boolean').isBoolean(),
            check('description', 'Description is required').not().isEmpty(),
            check('categoryId', 'Category should be a number').not().isEmpty(),
            check('cityId', 'City should be a number').not().isEmpty(),
            check('conditionId', 'Condition should be a number').not().isEmpty(),
            body('images').custom((value, { req }) => {
                if (value.length < 3) {
                    throw new Error('Each product should have at least 3 images');
                }
                // Indicates the success of this synchronous custom validator
                return true;
            }),
        ]
    ],
    AddProduct
)
/**
 * @swagger
 * /Api/Product/LikeProduct:
 *  patch: 
 *      summary: Like the product 
 *      tags:
 *      - Product
 *      responses:
 *          '200':
 *              description: Product is liked and added to wishlist
 *      parameters:
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          productId:
 *                              type: string
 */
ProductRouter.patch(
    '/LikeProduct',
    [
        UserAuth,
        [
            check('productId', 'Product id is required').not().isEmpty(),
        ]
    ],
    LikeProduct
)
/**
 * @swagger
 * /Api/Product/AddProductToCart:
 *  patch: 
 *      summary: Like the product 
 *      tags:
 *      - Product
 *      responses:
 *          '200':
 *              description: Product is liked and added to wishlist
 *      parameters:
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          productId:
 *                              type: string
 */
ProductRouter.patch(
    '/AddProductToCart',
    [
        UserAuth,
        [
            check('productId', 'Product id is required').not().isEmpty(),
        ]
    ],
    AddProductToCart
)
/**
 * @swagger
 * /Api/Product/GetProductById:
 *  get: 
 *      summary: Get product details
 *      tags:
 *      - Product
 *      responses:
 *          '200':
 *              description: Product details are successfully fetched
 *      parameters:
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *      - in: query
 *        name: productId
 *        schema:
 *          type: string
 */
ProductRouter.get(
    '/GetProductById',
    UserAuth,
    GetProductById
)
/**
 * @swagger
 * /Api/Product/GetSellingProducts:
 *  get: 
 *      summary: Get selling products 
 *      tags:
 *      - Product
 *      responses:
 *          '200':
 *              description: Selling products are successfully fetched
 *      parameters:
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *      - in: query
 *        name: skip
 *        schema:
 *          type: integer
 */
ProductRouter.get(
    '/GetSellingProducts',
    UserAuth,
    GetSellingProducts
)
/**
 * @swagger
 * /Api/Product/GetExchangeProducts:
 *  get: 
 *      summary: Get exchange products 
 *      tags:
 *      - Product
 *      responses:
 *          '200':
 *              description: Exchange products are successfully fetched
 *      parameters:
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *      - in: query
 *        name: skip
 *        schema:
 *          type: integer
 */
ProductRouter.get(
    '/GetExchangeProducts',
    UserAuth,
    GetExchangeProducts
)
/**
 * @swagger
 * /Api/Product/EditProduct:
 *  put: 
 *      summary: Edit the product
 *      tags:
 *      - Product
 *      responses:
 *          '200':
 *              description: Product is successfully edited
 *      parameters:
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          productId:
 *                              type: string
 *                          productName:
 *                              type: string
 *                          price:
 *                              type: string
 *                          forExchange:
 *                              type: string
 *                          description:
 *                              type: string
 *                          categoryId:
 *                              type: string
 *                          cityId:
 *                              type: string
 *                          conditionId:
 *                              type: string
 *                          images:
 *                              type: array
 *                              items:
 *                                  type: string
 */
ProductRouter.put(
    '/EditProduct',
    [
        UserAuth,
        [
            check('productId', 'Product id is required').not().isEmpty(),
            check('productName', 'Product name is required').not().isEmpty(),
            check('price', 'Price should be a number').isNumeric(),
            check('forExchange', 'ForExchange should be boolean').isBoolean(),
            check('description', 'Description is required').not().isEmpty(),
            check('categoryId', 'Category should be a number').not().isEmpty(),
            check('cityId', 'City should be a number').not().isEmpty(),
            check('conditionId', 'Condition should be a number').not().isEmpty(),
            body('images').custom((value, { req }) => {
                if (value.length < 3) {
                    throw new Error('Each product should have at least 3 images');
                }
                // Indicates the success of this synchronous custom validator
                return true;
            }),
        ]
    ],
    EditProduct
)
/**
 * @swagger
 * /Api/Product/DeleteProduct:
 *  delete: 
 *      summary: Delete the product 
 *      tags:
 *      - Product
 *      responses:
 *          '200':
 *              description: Product is successfully deleted
 *      parameters:
 *      - in: header
 *        name: x-auth-token
 *        schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          productId:
 *                              type: string
 */
ProductRouter.delete(
    '/DeleteProduct',
    [
        UserAuth,
        [
            check('productId', 'Product id is required').not().isEmpty(),
        ]
    ],
    DeleteProduct
)