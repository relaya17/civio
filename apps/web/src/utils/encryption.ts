/**
 * Basic encryption utility for sensitive data in localStorage
 * 
 * Note: This is client-side encryption for basic protection.
 * For production, consider using a more robust solution or server-side encryption.
 */

/**
 * Simple encryption using Web Crypto API (AES-GCM)
 * Falls back to base64 encoding if crypto is not available
 */
export async function encryptData(data: string): Promise<string> {
  try {
    // Check if Web Crypto API is available
    if (!window.crypto || !window.crypto.subtle) {
      // Fallback: simple base64 encoding (not secure, but better than plain text)
      return btoa(encodeURIComponent(data));
    }

    // Generate a key from a fixed password (in production, use a proper key derivation)
    const password = "civio-user-data-2024";
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const passwordBuffer = encoder.encode(password);

    // Import key
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"],
    );

    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"],
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      dataBuffer,
    );

    // Combine salt, iv, and encrypted data
    const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);

    // Convert to base64 for storage
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.warn("Encryption failed, using fallback:", error);
    // Fallback to base64
    return btoa(encodeURIComponent(data));
  }
}

/**
 * Decrypt data encrypted with encryptData
 */
export async function decryptData(encryptedData: string): Promise<string> {
  try {
    if (!window.crypto || !window.crypto.subtle) {
      // Fallback: decode base64
      return decodeURIComponent(atob(encryptedData));
    }

    const combined = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const encrypted = combined.slice(28);

    const password = "civio-user-data-2024";
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"],
    );

    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encrypted,
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.warn("Decryption failed, trying fallback:", error);
    // Fallback: decode base64
    try {
      return decodeURIComponent(atob(encryptedData));
    } catch {
      return encryptedData; // Return as-is if all fails
    }
  }
}

/**
 * Check if encryption is available
 */
export function isEncryptionAvailable(): boolean {
  return typeof window !== "undefined" && !!window.crypto && !!window.crypto.subtle;
}
