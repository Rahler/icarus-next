import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav/Nav";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Icarus Build Tool",
};

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en" className={robotoMono.className}>
        <body>
          <Nav />
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
