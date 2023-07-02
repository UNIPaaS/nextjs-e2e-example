// pages/index.tsx
import Head from "next/head";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/button";

export default function Home() {
  const [components] = useStore('components');

  return (
    <div>
      <Head>
        <title>Onboarding | UNIPaaS Platform</title>
      </Head>

      {components && <div>
        <h2 className="text-xl font-bold my-4">Onboarding</h2>
        <div className="mt-4 flex items-baseline space-x-2 w-full">
          <div className="w-full">
            <Button onClick={() => {
              const payPortal = components.create("onboarding", {});
              payPortal.mount("#onboarding");
            }}>Create</Button>
            <br />
            <br />
            <div id="onboarding" className="w-full"/>
          </div>
        </div>
      </div>}

    </div>
  )
}
