import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { PortalLayout } from "@/components/portal/PortalLayout";

export default async function PortalLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "CLIENT") {
    redirect("/login");
  }

  return <PortalLayout>{children}</PortalLayout>;
}
