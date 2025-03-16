import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

// Encryption Keys
const method: string = "aes-256-cbc";
const key: Buffer = randomBytes(32);
const iv: Buffer = randomBytes(16);

class Encryption {
    constructor() {}

    encrypt = (email: string): string => {
        const cipher = createCipheriv(method, key, iv);

        let encryptedEmail = cipher.update(email, "utf-8", "hex");

        encryptedEmail += cipher.final("hex");

        return encryptedEmail;
    };

    descrypt = (encryptedEmail: string): string => {
        const decipher = createDecipheriv(method, key, iv);

        let descryptedEmail = decipher.update(encryptedEmail, "hex", "utf-8");

        descryptedEmail += decipher.final("utf-8");

        return descryptedEmail;
    };
}

export default Encryption;
