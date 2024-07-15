import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { GoOrganization } from "react-icons/go";
import { LuExternalLink } from "react-icons/lu";
import { cn } from "@/lib/utils";

type OrganizationData = {
  org: string;
  description: string;
  type: string;
  lat: number | null;
  lon: number | null;
  addressline1: string | null;
  addressline2: string | null;
  city: string | null;
  country: string | null;
  zip: string | null;
  sitelist: string[];
};

export const fakeOrgData: OrganizationData[] = [
  {
    org: "Organization A",
    description: "this is orgA",
    type: "org",
    lat: 123.123,
    lon: 123.123,
    addressline1: null,
    addressline2: null,
    city: "Taipei",
    country: "Hsinchu",
    zip: "224",
    sitelist: ["F1", "F2", "F3"],
  },
  {
    org: "Organization B",
    description: "this is orgB",
    type: "org",
    lat: null,
    lon: null,
    addressline1: null,
    addressline2: null,
    city: "Taipei",
    country: "Taiwan",
    zip: "446",
    sitelist: ["LAC1", "LAC2", "LAC3"],
  },
  {
    org: "Organization C",
    description: "this is orgB",
    type: "org",
    lat: null,
    lon: null,
    addressline1: null,
    addressline2: null,
    city: "Taipei",
    country: "Taiwan",
    zip: "446",
    sitelist: ["LAC1", "LAC2", "LAC3"],
  },
  {
    org: "Organization D",
    description: "this is orgB",
    type: "org",
    lat: null,
    lon: null,
    addressline1: null,
    addressline2: null,
    city: "Taipei",
    country: "Taiwan",
    zip: "446",
    sitelist: ["LAC1", "LAC2", "LAC3"],
  },
];

export function OrgDataCard({ orgData }: { orgData: OrganizationData }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="flex flex-col space-y-0 justify-start items-start">
          <h1 className={"text-lg font-semibold"}>{orgData.org}</h1>
          <p className={"text-md text-gray-500"}>{orgData.description}</p>
        </div>
        <div>
          <div className="label flex flex-rol justify-center items-center space-x-2 bg-blue-500 px-2 py-0.5 rounded-lg">
            <p className={"text-md font-semibold text-white"}>組織</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          <p className={"text-md font-semibold"}>Organization Location</p>
          <div className="grid grid-cols-3 gap-2">
            <InfoBlock label="latitude" value={orgData.lat?.toString()} />
            <InfoBlock label="longitude" value={orgData.lon?.toString()} />
            <InfoBlock label="city" value={orgData.city ?? undefined} />
            <InfoBlock label="country" value={orgData.country ?? undefined} />
            <InfoBlock label="zip" value={orgData.zip ?? undefined} />
            <InfoBlock
              className="col-span-3"
              label="addressline1"
              value={orgData.addressline1 ?? undefined}
            />
            <InfoBlock
              label="addressline2"
              className="col-span-3"
              value={orgData.addressline2 ?? undefined}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className={"text-md font-semibold"}>廠區列表</p>
          <div className="flex flex-wrap space-x-2">
            {orgData.sitelist.map((site) => (
              <Button variant={"outline"} key={site}>
                <p className={"text-md p-1"}>{site}</p>
                <LuExternalLink />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoBlock({
  label,
  value,
  className,
}: {
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-start items-start p-2 border border-l-4 rounded-[4px] border-gray-300",
        className
      )}
    >
      <p className="text-md font-semibold">{label}</p>
      <p className="text-md">{value ?? "None"}</p>
    </div>
  );
}
