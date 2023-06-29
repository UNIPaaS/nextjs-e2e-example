// pages/index.tsx
import Head from "next/head";
import { useStore } from "@/hooks/useStore";

export default function Home() {
  const [selectedVendorId, setSelectedVendorId] = useStore('selectedVendorId');

  return (
    <div>
      <Head>
        <title>UNIPaaS Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <strong>Selected Vendor ID</strong>: {selectedVendorId || 'None'}
        </div>
      </main>

    </div>
  )
}
