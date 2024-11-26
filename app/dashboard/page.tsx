import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

type cardProps = {
  img_src: string;
  title: string;
  tags: string[];
  link: { label: string; path: string };
  theme: string;
};

const Card = ({ img_src, title, tags, link, theme }: cardProps) => (
  <div
    className="bg-white overflow-hidden flex flex-col items-start w-[400px] max-w-full rounded-[10px_10px_30px_10px]"
    style={{ fontFamily: "Noto Sans JP", color: theme }}
  >
    <Image
      className="undraggable"
      width={1000}
      height={1000}
      style={{ width: "100%", height: "174px" }}
      src={img_src}
      alt="pic not display"
    ></Image>
    <div className="flex flex-col justify-center items-start gap-[15px] self-stretch p-5">
      <span className="self-stretch text-lg not-italic font-bold leading-[normal]">
        {title}
      </span>
      <div className="flex items-start content-start gap-2.5 self-stretch flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="text-sm not-italic font-bold leading-[normal] flex justify-center items-center gap-[5px] px-2.5 py-1"
            style={{
              background: `linear-gradient(0deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%), ${theme}`,
            }}
          >
            <span>#</span>
            <span>{tag}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-end gap-2.5 self-stretch">
        <button
          className="text-white text-xs not-italic font-bold leading-4 flex flex-row items-center gap-1 px-2.5 py-[5px] rounded-[5px]"
          style={{ background: theme }}
        >
          <span>
            <Link href={link.path}>{link.label}</Link>
          </span>
          <span>
            <HiArrowRight style={{ height: 24, width: 24 }} />
          </span>
        </button>
      </div>
    </div>
  </div>
);

export async function getServerStaticProps() {
  return {};
}

export default function Page() {
  const bgImage = "/dashboard_bg.png";
  const logo = "/IBM_logo_white.png";

  return (
    <main
      className="flex relative min-h-screen w-screen h-screen overflow-auto p-4"
      style={{ justifyContent: "safe center", alignItems: "safe center" }}
    >
      <div className="z-0 flex max-w-full flex-col justify-center items-center gap-10 p-10 m-auto">
        <div className="flex flex-col justify-center items-center gap-[5px]">
          <Image
            className="undraggable"
            height={90}
            width={200}
            style={{ height: "90px", width: "auto" }}
            src={logo}
            alt="IBM"
          ></Image>
        </div>
        <div className="flex flex-wrap max-w-full justify-center items-center gap-10 self-stretch p-10">
          <Card
            img_src="/dashboard_img1.png"
            title="工作安全 ESG 儀表板"
            tags={["罰單", "事故", "工商", "施工", "稽核", "設備", "其他"]}
            link={{
              label: "工安儀表板",
              path: "/dashboard/management/location_and_asset?mode=display&page=Location",
            }}
            theme="#397EFF"
          ></Card>
          <Card
            img_src="/dashboard_img2.png"
            title="環境安全 ESG 儀表板"
            tags={[
              "異常管理",
              "空污",
              "溫室氣體",
              "水污",
              "廢棄物",
              "毒化物",
              "海污",
            ]}
            link={{ label: "環境安全儀表板", path: "/dashboard/env_safety" }}
            theme="#11AE3D"
          ></Card>
        </div>
      </div>
      <div className="opacity-50 z-[-1] fixed top-0 left-0 w-full h-full bg-green-100/50">
        <Image fill src={bgImage} alt="background image" quality={50} />
      </div>
    </main>
  );
}
