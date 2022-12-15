
import { User } from "../models/users";
import bcrypt from 'bcrypt';

export async function Login(body: any) {
    const registredUser = await User.findOne({
        where: {
            email: body.email,
        }
    });

    if (registredUser) {
        const currentPassword = registredUser.password;
        return body.password && currentPassword ? bcrypt.compareSync(body.password, currentPassword) : false;
    }
    return false;
}
export async function getUserById(id: number) {
    return await User.findByPk(id);
}

export async function Registration(body: any) {
    return await User.create(body);
}

export async function getUsers(condition: any) {
    return await User.findAll({
        where: condition
    });
}

export async function updateUser(userId: number,body: any) {
    return await User.update(body, {
        where: { id: userId }
      });
}
export async function deleteUser(userId: number) {
    return await User.destroy({where:{ id: userId}});
}