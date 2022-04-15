import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'userName', 'emailAddress', 'userLevel']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUsersByUsername = async (req, res) => {
    const service = await Users.findAll({
        where: {
            userName: req.body.emailAddress
        }
    });
    const user =  service.length == 0 ? null : service;

    if (user) {
        return user;
    }
    return null;
}

export const getUsersByEmail = async (req, res) => {
    const service = await Users.findAll({
        where: {
            emailAddress: req.body.emailAddress
        }
    });
    const user =  service.length == 0 ? null : service;

    if (user) {
        return user;
    }
    return null;
}

export const Register = async (req, res) => {
    const { user, emailAddress, password, confPassword } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Passwords need to match" });
    }

    const userWithEmail = await getUsersByEmail(req, res);

    if (userWithEmail && userWithEmail.length == undefined) {

        req.body.emailAddress = req.body.user; // set the email to username because i'm lazy
        const userWithUserName = await getUsersByUsername(req, res);

        if (userWithUserName.length != 0) {
            res.status(400).json({ msg: "Username already exists" });
        }

    } else {
        res.status(400).json({ msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            userName: user,
            emailAddress: emailAddress,
            password: hashPassword,
            userLevel: 0
        });
        res.status(200).json({ msg: "Registered Successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Error trying to register" });
    }
}

export const Login = async (req, res) => {
    try {
        var user;
        const userWithEmail = await getUsersByEmail(req, res);

        if (userWithEmail == null) {

            const userWithUserName = await getUsersByUsername(req, res);

            if (userWithUserName != null) {
                user = userWithUserName[0].dataValues;
            } else {
                throw new Error("No Username or Email found")
            }
        } else {
            user = userWithEmail[0].dataValues;
        }

        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return res.status(400).json({ msg: "Wrong Password" });
            }
            const userId = user.id;
            const name = user.userName;
            const email = user.emailAddress;
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            });
            const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            await Users.update({ refreshToken: refreshToken }, {
                where: {
                    id: userId
                }
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ accessToken });
        } else {
            res.status(400).json({ msg: "Check username and password combination" });
        }
    } catch (error) {
        res.status(404).json({ msg: "Error trying to login" });
    }

}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refreshToken: null }, {
        where: {
            id: userId
        }
    });
    res.sendStatus(200).clearCookie('refreshToken');
}

// export const Remove = async (req, res) => {
//     const { user, emailAddress, password, confPassword } = req.body;

//     await Users.destroy({
//         where: {
//             userName: req.body.username
//         }
//     }).then( deletedRows => {
//         if (deletedRows == 1) {
//             res.status(200).json({ msg: "Successfully deleted account: " + user + ", with email: " + emailAddress });
//         } else {
//             res.status(400).json({ msg: "There was an error deleting account: " + user + ", with email: " + emailAddress });
//         }
//     }).catch(error => {
//         res.status(500).json({ msg: "Error deleting records"})
//     });
// }