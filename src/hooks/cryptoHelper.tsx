const encoder = new TextEncoder();
const decoder = new TextDecoder();

const getKey = async (secret: string, salt: Uint8Array): Promise<CryptoKey> => {
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
};

export const encrypt = async (text: string, secret: string): Promise<string> => {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await getKey(secret, salt);

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoder.encode(text)
    );

    const encryptedBytes = new Uint8Array(encrypted);
    const combined = new Uint8Array(salt.length + iv.length + encryptedBytes.length);
    combined.set(salt);
    combined.set(iv, salt.length);
    combined.set(encryptedBytes, salt.length + iv.length);

    return btoa(String.fromCharCode(...combined));
};

export const decrypt = async (cipherText: string, secret: string): Promise<string> => {
    const combined = Uint8Array.from(atob(cipherText), c => c.charCodeAt(0));

    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const encryptedData = combined.slice(28);

    const key = await getKey(secret, salt);
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
    );

    return decoder.decode(decrypted);
};
