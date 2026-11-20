import { redirect } from "next/navigation";
import NavbarClient from "@/components/navbar-client";
import { getSession } from "@/lib/checkUser";

export default async function MainLayout({ children }) {
  const session = await getSession();
  if (!session?.user) redirect("/sign-in");

  return (
    <>
      <NavbarClient workspace user={session.user} />
      <div className="px-4 pb-12 pt-[76px] sm:px-7 lg:ml-52 lg:px-8 lg:pt-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </>
  );
}
