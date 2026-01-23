import net from "net";
import bcrypt from 'bcryptjs';
import { CustomError } from "../interface/model";
import jwt from "jsonwebtoken";
import { env } from "./env";

export const generateToken = (payload: object) =>
  jwt.sign(payload, env.authSecret, { expiresIn: "5s" });

export const isValidEmail = (email: string) =>
  RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);

export const checkPort = (port: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", (err: CustomError) => {
      if (err.code === "EADDRINUSE") resolve(false);
      reject(err);
    });

    server.once("listening", () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
};

export const findAvailablePort = async (port: number): Promise<number> => {
  let isAvailable: boolean = false;
  while (!isAvailable) {
    isAvailable = await checkPort(port);
    if (!isAvailable) ++port;
  }
  return port;
};

export const handleFieldValidation = (formData: any) => {
  let stringLength: number = 10;
  let passwordLength: number = 20;
  let phoneNumberLength: number = 11;
  let errors: string[] = [];
  Object.keys(formData).forEach((v) => {
    const value = formData[v];
    // check if empty
    if (value === "" || value === " ") errors.push(`${v} is required`);

    // check if valid email
    if (v === "email" && !isValidEmail(value)) errors.push("invalid email");

    // check string length
    if (
      (v === "email" || v === "fname" || v === "lname") &&
      value.length <= stringLength
    )
      errors.push(`${v} should be atleast ${stringLength} characters`);

    // check password length
    if (v === "password" && value.length > passwordLength)
      errors.push(`${v} should be atleast ${passwordLength} characters`);

    if (v === "phoneNumber") {
      // check if number
      if (Number(value)) {
        // check length
        if (
          value.length < phoneNumberLength ||
          value.length > phoneNumberLength
        ) {
          errors.push(`${v} should be atleast ${phoneNumberLength} characters`);
        }
      } else {
        errors.push("invalid phone number");
      }
    }

    return v;
  });
  return errors;
};

export const generateHash = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

export const validateHashed = async (input: string, reference: any) =>
  await bcrypt.compare(input, reference);

export const somethingWentWrong: string = "Something went wrong, please try again!";

export const unauthorizedRequest = "Unauthorized, invalid request!";