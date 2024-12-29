import * as Crypto from "expo-crypto";
import { v4 as uuidv4 } from "uuid";

// Create a custom random number generator using expo-crypto
const getRandomValues = (arr: Uint8Array) => {
  return Crypto.getRandomValues(arr);
};

// Override the crypto implementation
const crypto = {
  getRandomValues,
};

// @ts-ignore
window.crypto = crypto;

// Now you can use uuid normally
export const generate_uuid = () => uuidv4();
