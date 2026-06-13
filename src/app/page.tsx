import LandingHero from "@/components/landing/LandingHero";
import { getOptionalAuthUser } from "@/lib/auth/session";

export default async function HomePage() {
  const user = await getOptionalAuthUser();

  return <LandingHero signedIn={!!user} />;
}
