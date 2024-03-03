import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const certificate = require(process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PATH!);

const firebaseAdminConfig = {
  credential: cert(certificate),
};

function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
customInitApp();

const bucket = getStorage().bucket(
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
);

export { customInitApp, bucket };
