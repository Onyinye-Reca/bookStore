import { z } from "zod";
import jwt from 'jsonwebtoken'

export const createBookValidator = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string"
        }),
        author: z.string({
            required_error: "Author is required",
            invalid_type_error: "Author must be a string"
        }),
        datePublished: z.string({
            required_error: "Date published is required",
            invalid_type_error: "Date Published must be a string"
        }),
        description: z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string"
        }),
        pageCount: z.string({
            required_error: "Page count published is required",
            invalid_type_error: "Page Count must be a string"
        }),
        genre: z.string({
            required_error: "Genre published is required",
            invalid_type_error: "Genre must be a string"
        }),
        bookId: z.string({
            required_error: "Book Id published is required",
            invalid_type_error: "Bood Id must be a string"
        }),
        publisher: z.string({
            required_error: "Publisher count published is required",
            invalid_type_error: "Publisher must be a string"
        }),
    })
})

export const updateBookValidator = z.object({
    body: z.object({
        title: z.string().optional(),
        author: z.string().optional(),
        datePublished: z.string().optional(),
        description: z.string().optional(),
        pageCount: z.string().optional(),
        genre: z.string().optional(),
        bookId: z.string().optional(),
        publisher: z.string().optional(),
    })
})

export const registerUserValidator = z.object({
    body: z.object({
        firstname: z.string({
            required_error: "Firstname is required",
            invalid_type_error: "Firstname must be a string"
        }),
        lastname: z.string({
            required_error: "Lastname is required",
            invalid_type_error: "Lastname must be a string"
        }),
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string"
        }),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Passowrd must be a string"
        }).min(5, { message: "Password must be 5 or more characters long" }),
        confirm_password: z.string({
            required_error: "Confirm Password is required",
            invalid_type_error: "Confirm Password must be a string"
        }),
    }).superRefine(({ confirm_password, password }, ctx) => {
        if (confirm_password !== password) {
          ctx.addIssue({
            code: "custom",
            message: "The passwords did not match"
          });
        }
    })
})

export const updateUserValidator = z.object({
    body: z.object({
        firstname: z.string().optional(),
        lastname: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional()
    })
})

export const loginValidator = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string"
        }).email(),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string"
        })
    })
})


export  const generateAccessToken = (user: {[key: string]: unknown}): any =>{
    const passKey = process.env.JWT_SECRET as string
    const jwToken = jwt.sign(user, passKey, {expiresIn: '7d'})
    return jwToken
}
