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

interface KoalaWelcomeEmailProps {
  userFirstname: string;
  verifyLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailTemplate = ({
  userFirstname,
  verifyLink,
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Have fun on your fitness journey with gamification of Fitittrack
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://www.fitittrack.com/images/logo.svg`}
          width="170"
          height="50"
          alt="Fitittrack"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to FititTrack, the gamification fitness habit tracker that
          motivates you to stay active and healthy. Discover a fun way to build
          and maintain your fitness routines, helping you achieve your goals
          with engaging and rewarding experiences
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={verifyLink}>
            Verify Email
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          Erwin
        </Text>
        <Hr style={hr} />
        {/* <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text> */}
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

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
