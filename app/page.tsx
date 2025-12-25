import type { Metadata } from "next"
import ClientHomePage from "./client-page"

export const metadata: Metadata = {
  title: "PropertyManager - Find Your Perfect Home",
  description:
    "Search and browse available properties for rent. Find apartments, houses, condos, and more in New York.",
}

export default function HomePage() {
  return <ClientHomePage />
}
