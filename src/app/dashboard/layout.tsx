import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disaster Management System",
  description: "Emergency management and disaster response portal",
};

export default function DashboardLayout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
