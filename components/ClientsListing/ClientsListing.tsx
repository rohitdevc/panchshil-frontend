"use client";

import Image from "next/image";
import type { ClientItem } from "@/app/clients/clients.data";

type ClientsListingProps = {
  clients: ClientItem[];
};

export default function ClientsListing({ clients }: ClientsListingProps) {
  const paginatedClients = clients;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-10 justify-between">
          {paginatedClients.map(
            (client) =>
              client.imageSrc && (
                <div
                  key={client.id}
                  className="flex items-center justify-center bg-[#F7F5F4] rounded-full overflow-hidden w-38 h-38 md:w-50 md:h-50 xl:w-60 xl:h-60"
                >
                  <Image
                    src={client.imageSrc}
                    alt={client.imageAlt}
                    width={300}
                    height={300}
                    className="object-contain p-10"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
