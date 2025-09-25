import Image from "next/image";

export function LogotypeHeader() {
  return (
    <div className="fixed top-0 z-50 w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="bg-hotel-surface-elevated/95 backdrop-blur-lg shadow-lg">
        <div className="w-full grid justify-items-center">
          <Image
            src="/images/villamagna-logo.png"
            width={226}
            height={100}
            alt="Villamagna family resorts logotype"
          />
        </div>
      </div>
    </div>
  );
}
