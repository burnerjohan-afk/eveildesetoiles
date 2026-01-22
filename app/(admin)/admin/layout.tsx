import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
