import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PricingAdmin } from "@/components/pricing/PricingAdmin";

export const dynamic = "force-dynamic";

export default async function PricingAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <PricingAdmin />;
}
