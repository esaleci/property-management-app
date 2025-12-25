import type { Metadata } from "next"
import { DocumentsClient } from "./documents-client"

export const metadata: Metadata = {
  title: "Documents - Property Manager",
  description: "Manage property documents and files",
}

export default function DocumentsPage() {
  return <DocumentsClient />
}
