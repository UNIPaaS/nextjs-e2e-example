// components/layout/index.tsx
import { ReactNode } from "react";
import Link from "next/link";
import { useStore } from "@/hooks/useStore";
import { SelectInput } from "@/components/inputs/select";
import { useApi } from "@/hooks/useApi";
import * as EnvironmentKeys from "@/environment-keys.json";
import { Button } from "@/components/button";
import { TextInput } from "@/components/inputs/text";

export function Layout({ children }: { children: ReactNode }) {
  const [selectedVendorId, setSelectedVendorId] = useStore('selectedVendorId');
  const [vendors, setVendors] = useStore('vendors');
  const [privateKey, setPrivateKey] = useStore('privateKey');
  const [environment, setEnvironment] = useStore('environment');
  const [accessToken, setAccessToken] = useStore('accessToken');
  const [components, setComponents] = useStore('components');

  // @ts-ignore
  const environmentKeys = EnvironmentKeys[environment];
  const {scriptSrc, baseURL} = environmentKeys || {};
  const {postAuthorize} = useApi(baseURL, privateKey);

  const authorizeAPI = async () => {
    const data = await postAuthorize({
      ...(selectedVendorId && {vendorId: selectedVendorId}),
    });
    setAccessToken(data?.accessToken);
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <header className="absolute top-0 w-full bg-white border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">
            <Link href="/">
              UNIPaaS Platform
            </Link>
          </h1>

          <div className="justify-end">
            <SelectInput label="Vendor" value={selectedVendorId} setValue={setSelectedVendorId}>
              <option value="">Select a vendor</option>
              {vendors.map((vendor: {id: string, name: string}) => (
                <option key={vendor.id} value={vendor.id}>{vendor.name} ({vendor.id})</option>
              ))}
            </SelectInput>
          </div>


        </div>
      </header>

      <aside className="mt-16 w-64 bg-white p-4 shadow-lg">
        <ul>
          <li>
            <Link href="/" className="block my-2 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200">
              Settings
            </Link>
          </li>
          <li>
            <Link href="/onboarding" className="block my-2 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200">
              Onboarding
            </Link>
          </li>
          <li>
            <Link href="/pay-portal" className="block my-2 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200">
              Pay Portal
            </Link>
          </li>
          <li>
            <Link href="/invoice" className="block my-2 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200">
              Invoice
            </Link>
          </li>
        </ul>
      </aside>

      <main className="mt-16 flex-1 py-4 px-8 overflow-auto">
        {/* settings */}
        <div className="pb-8 mb-8 border-b-2">
          <h2 className="text-2xl font-bold my-4">Settings</h2>
          <div className="flex items-baseline space-x-2">
            {/* environment */}
            <SelectInput label="Environment" value={environment} setValue={setEnvironment}>
              <option value="local">local</option>
              <option value="development">development</option>
              <option value="sandbox">sandbox</option>
              <option value="production">production</option>
            </SelectInput>

            {/* private key */}
            <TextInput label="Private Key" value={privateKey} setValue={setPrivateKey} />
          </div>

          <br />
          {/* authorize button */}
          <Button onClick={authorizeAPI}>
            POST /authorize
          </Button>
          <div className="mt-4 flex items-baseline space-x-2">
            <strong>Components status</strong>: {components ? 'loaded' : 'not loaded'}
          </div>
        </div>
        {children}
      </main>

    </div>
  )
}
