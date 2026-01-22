import { AdminLayout } from "@/components/admin/AdminLayout";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
