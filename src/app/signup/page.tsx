import type { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Sign Up — BlueWave AI School",
  description: "Create your BlueWave AI School account. Start learning AI with interactive lessons, exercises, and XP tracking.",
  alternates: { canonical: "https://bluewaveprojects.com/signup" },
};

export default function SignupPage() {
  return <SignupClient />;
}
