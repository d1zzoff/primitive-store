import ProfileInfo from "@/components/profile-info/ProfileInfo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="flex flex-col md:flex-row gap-[30px] w-full items-start">
      <ProfileInfo />
      {children}
    </article>
  );
}
