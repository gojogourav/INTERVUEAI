import * as jwt from 'jsonwebtoken'
import * as z from 'zod'
import { Request, Response } from 'express';

const registerUserSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty().toLowerCase(),
    password: z.string().min(5).nonempty(),
});

type RegisterUserPayload = z.infer<typeof registerUserSchema>;



const generateToken = (res: Response, userId: string): void => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("Error no jwt secret provided");
        }
        const access_token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
        const refresh_token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict' as const,
            path: '/',

        }

        res.cookie('access_token', access_token, {
            ...cookieOptions, maxAge: 15 * 60 * 1000
        })

        res.cookie('refresh_token', refresh_token, {
            ...cookieOptions, maxAge: 15 * 60 * 1000
        })

    } catch (error) {
        console.error("Error generating tokens :", error);
        res.status(500).json({ message: "Server Error! Please try again later" });

    }
}

export const registerUser = async (req: Request<{}, {}, RegisterUserPayload>, res: Response): Promise<void> => {
    const parsed = registerUserSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.flatten() });
        return
    }
    let ip: string | undefined;

    try {
        const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress;
        if (!ip) throw new Error("Could not determine IP address");
        

    } catch (error) {

    }
}