import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Log In — BlueWave AI School",
  description: "Log in to your BlueWave AI School account to access lessons, track progress, and continue learning.",
  alternates: { canonical: "https://bluewaveprojects.com/login" },
};

export default function LoginPage() {
  return <LoginClient />;
}
