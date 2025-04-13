import * as crypto from "crypto";

export function decodeData(data: any) {
  const decodedString = Buffer.from(data, "base64").toString("utf-8");
  try {
    const payload = JSON.parse(decodedString);
    const { info, hash } = payload;
    const computedHash = crypto
      .createHmac("sha256", `${process.env.NEXT_PUBLIC_SECRET_KEY}`)
      .update(JSON.stringify(info))
      .digest("hex");

    if (computedHash === hash) {
      return { valid: true, data: info };
    } else {
      return { valid: false, data: null };
    }
  } catch (error) {
    return { valid: false, data: null };
  }
}
