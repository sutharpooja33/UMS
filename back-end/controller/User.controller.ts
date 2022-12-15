import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/users';
import * as userService from '../service/User.service';

export async function Registration(req: Request, res: Response) {
    try {
        if (!req.body.email) {
            return res.send('Email is required!');
        }
        const data = await userService.Registration(req.body);
        if (!data) {
            return res.send('Wrong email and password please try again!');
        }
        return res.send(data);
    }
    catch (err) {
        return res.send(err || 'somthing went wrong!');
    }
}

export async function login(req: Request, res: Response) {
    try {
        if (!req.body.email) {
            return res.send('Email is required!');
        }
        const data = await userService.Login(req.body);
        if (data === false) {
            return res.send('login failed!');
        }
        const registredUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        return res.send(registredUser);
    }
    catch (err) {
        return res.send(err || 'somthing went wrong!');
    }
}

export async function getUserById(req: Request, res: Response): Promise<any> {
    try {
        const tutorial = await userService.getUserById(+req.params.id);
        res.send(JSON.stringify(tutorial));
    }
    catch (err) {
        res.status(500).send({
            message:
                err || "Some error occurred while finding the user."
        });
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const search = req.query.search;
        const condition = search ? {
            [Op.or]: [
                {
                    name: { [Op.like]: `%${search}%` }
                },
                {
                    email: { [Op.like]: `%${search}%` }
                }
            ]
        } : null
        const data = await userService.getUsers(condition);
        return res.send(data);
    }
    catch (err) {
        return res.send(err || 'somthing went wrong!');
    }
}

export async function updateUser(req: Request, res: Response): Promise<any> {
    try {
        const existUser = await User.findByPk(+req.params.id);
        if (!existUser) {
            res.status(400).send({
                message: "User not found!"
            });
            return;
        }
        const data = {
            email: req.body.email,
            name: req.body.name,
            type: req.body.type
        };
        const user = await userService.updateUser(+req.params.id, data);
        res.send(JSON.stringify(user));
    }
    catch (err) {
        res.status(500).send({
            message:
                err || "Some error occurred while updating the user."
        });
    }
}

export async function deleteUser(req: Request, res: Response): Promise<any> {
    try {
        const user = await userService.deleteUser(+req.params.id);
        res.send(JSON.stringify(user));
    }
    catch (err) {
        res.status(500).send({
            message:
                err || "Some error occurred while deleting the user."
        });
    }
}

