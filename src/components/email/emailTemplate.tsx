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
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const KoalaWelcomeEmail = ({
  userFirstname,
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://firebasestorage.googleapis.com/v0/b/img-caption-36c4c.appspot.com/o/images%2Flogo.svg?alt=media&token=7a9c78c6-0902-42e4-85d8-23e378e33f8f`}
          width="170"
          height="50"
          alt="Koala"
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
          <Button style={button} href="https://getkoala.com">
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

KoalaWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as KoalaWelcomeEmailProps;

export default KoalaWelcomeEmail;

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
