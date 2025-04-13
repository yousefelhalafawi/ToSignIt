import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignatureCSR from "./SignatureCSR";

export default async function page() {
  // Access headers on the server by awaiting the promise
  const requestHeaders = await headers();
  const referer = requestHeaders.get("referer");
  const host = requestHeaders.get("host");

  // Determine the protocol based on the environment (use HTTPS in production)
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  // Construct the current environment URL
  const currentEnv = `${protocol}://${host}`;

  // Redirect if the referer does not match the expected URL

  // if (referer !== `${currentEnv}/dashboard`) {
  //   redirect("/dashboard");
  // }

  // Render the page with the client component
  return (
    <div className="p-6">
      <SignatureCSR />
    </div>
  );
}
