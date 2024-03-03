import { google } from "googleapis";
import nodemailer from "nodemailer";

const getCredentials = async (): Promise<string | any> => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.OAUTH_REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  return await oAuth2Client.getAccessToken();
};

export async function sendEmail({
  to,
  subject,
  template,
}: {
  to: string;
  subject: string;
  template: string;
}) {
  const credentials = await getCredentials();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "dhuviuidesigns@gmail.com",
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: credentials,
    },
  });

  return await transporter.sendMail({
    from: "dhuviuidesigns@gmail.com",
    to: to,
    subject: subject,
    html: template,
  });
}
