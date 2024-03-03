"use server";

import { customInitApp } from "@/lib/firebaseAdmin.config";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const session = cookies().get("session")?.value || "";
  //Validate if the cookie exist in the request
  if (!session) {
    throw new Error(`Not Authorized`);
  }

  //Use Firebase Admin to validate the session cookie
  customInitApp();
  const decodedClaims = await auth().verifySessionCookie(session, true);
  if (!decodedClaims) {
    throw new Error(`Not Authorized`);
  }

  return decodedClaims;
}
