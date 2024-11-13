import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  params: Promise<{
    section: string;
    tab: string;
  }>;
}

export default async function Page(props: Props) {
  const params = await props.params;

  return null;
}
