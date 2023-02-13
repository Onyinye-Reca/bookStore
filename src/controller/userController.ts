import { Request, Response, NextFunction, request, response } from "express";
import { v4 as uuidv4 } from "uuid";
// import { UserInstance } from "../model/userModel";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utility/utils";
import User from "../model/userModel";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const { email, password } = req.body;

    const checkIfUserExist = await User.findOne({ email });
    if (checkIfUserExist) {
      return res.status(400).json({
        message: "User with email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUserRecord = await User.create({
      id,
      ...req.body,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User successfully created",
      newUserRecord,
    });
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).json({
      message: "failed to create user",
      err,
    });
  }
}

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.find({});

    res.status(200).json({
      message: "Successfully fetched all Users",
      count: users.length,
      users
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to get users",
      err,
    });
  }
}

export async function getSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    // const user = await User.findOne({ _id: id });
    const user = await User.findById(id)

    if (!user) {
      return res.status(400).json({
        message: `User with id: ${id} not found`,
      });
    }

    return res.status(200).json({
      message: `User with id: ${id} successfully fetched`,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: `failed to fetch user`,
      err,
    });
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).json({
        message: `User with id: ${id} not found`,
      });
    }

    const newUser = {
      firstname: req.body?.firstname,
      lastname: req.body?.lastname,
      email: req.body?.email,
      password: req.body?.password,
    };

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {new: true})

    return res.status(200).json({
      message: `User with id: ${id} successfully updated`,
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: `failed to update user record`,
      err,
    });
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const user = await User.findOne({_id: id });

    if (!user) {
      return res.status(400).json({
        message: `Book with id: ${id} not found`,
      });
    }

    const deletedUser = await User.findByIdAndDelete(id)

    return res.status(200).json({
      message: `User with id: ${id} successfully deleted`,
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: `failed to delete book`,
      err,
    });
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const user = (await User.findOne({ email })) as unknown as { [key: string]: string };

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    //const id = User.id
    // {id: id}
    const { _id } = user
    const token = generateAccessToken({ _id });
    const maxAge = 3 * 24 * 60 * 60;

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
      return res.status(401).json({ message: "Invalid login details" });
    }

    return res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: `LOGIN ERROR:\n ${err}`,
      err,
    });
  }
}

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
){
  res.cookie("jwt", "", {maxAge: 1})
  res.send("User successfully logged out")
}