import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import type { Metadata } from "next";
import BootstrapClient from "@/components/BootstrapClient";

import { Roboto_Mono } from "next/font/google";
import "./custom.scss";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

interface Props {
  readonly children: ReactNode;
  readonly nav?: ReactNode;
}

export const metadata: Metadata = {
  title: "Icarus Build Tool",
};

export default function RootLayout({ children, nav }: Props) {
  return (
    <StoreProvider>
      <html lang="en" className={robotoMono.className}>
        <body>
          {nav}
          <main className="container">{children}</main>
          <BootstrapClient />
        </body>
      </html>
    </StoreProvider>
  );
}
