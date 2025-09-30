import {
  PhoneIcon,
  DocumentMagnifyingGlassIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
const iconMap = {
  number: PhoneIcon,
  mail: DocumentMagnifyingGlassIcon,
  country: GlobeAltIcon,
};

export default async function CardWrapper() {
    const email = "ozbej.ramsak@scv.si";
    const phone = "+386 40 123 456";
    const country = "Slovenia";
  return (
    <>
      <Card title="Phone" value={phone} type="phone" />
      <Card title="Mail" value={email} type="mail" />
      <Card title="Country" value={country} type="country" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'phone' | 'mail' | 'country';
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
