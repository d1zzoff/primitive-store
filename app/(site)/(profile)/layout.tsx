import ProfileInfo from "@/app/components/profile-info/ProfileInfo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="flex gap-[30px] w-full items-start">
      <ProfileInfo />
      {children}
    </article>
  );
}
