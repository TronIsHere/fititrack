import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ForgotPasswordEmailProps {
  verifyLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ForgotPasswordEmailTemplate = ({
  verifyLink,
}: ForgotPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Forgot password link for fitittrack</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://firebasestorage.googleapis.com/v0/b/img-caption-36c4c.appspot.com/o/images%2Flogo.svg?alt=media&token=7a9c78c6-0902-42e4-85d8-23e378e33f8f`}
          width="170"
          height="50"
          alt="Fitittrack"
          style={logo}
        />
        <Text style={paragraph}>Hi,</Text>
        <Text style={paragraph}>
          our password reset link is ready! Click to update your password and
          jump right back into FititTrack. Continue your adventure towards
          better health and fitness with ease. We&apos;re here to support your
          journey every step of the way. Stay active, stay motivated, and
          let&apos;s keep moving forward with FititTrack!
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={verifyLink}>
            Forgot Password Link
          </Button>
        </Section>
        <Text style={paragraph}>
          If you didn't request this action please ignore it!
        </Text>
        <Hr style={hr} />
        {/* <Text style={footer}>
            470 Noor Ave STE B #1148, South San Francisco, CA 94080
          </Text> */}
      </Container>
    </Body>
  </Html>
);

export default ForgotPasswordEmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#3E3ADB",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
