import { randomBytes } from "crypto";

export default function secureRandom() {
  const bytes = randomBytes(2); // Generate 2 random bytes (16 bits)
  const randomNumber = bytes.readUInt16BE(0); // Convert bytes to an integer

  // Ensure the number is within the 5-digit range
  const min = 10000;
  const max = 99999;
  const secure5DigitNumber = min + (randomNumber % (max - min + 1));

  return secure5DigitNumber;
}
