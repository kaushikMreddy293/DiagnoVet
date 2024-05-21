import { response } from "express"

export const successResponse = (data, response) => {
    response.status(200)
    .json(data)
}

export const errorResponse = (err, response) => {
    response.status(500)
    .json({
        code: "Service Error",
        message: err.message,
        error: err
    })
}

export const deleteResponse = (data, response) => {
    response.status(200)
    .json(data)
}

export const updateResponse = (data, response) => {
    response.status(200)
    .json(data)
}