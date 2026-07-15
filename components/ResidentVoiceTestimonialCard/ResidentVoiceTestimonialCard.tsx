import Image from "next/image";
import DoubleQuotesIcon from "@/assets/svgs/DoubleQuotesIcon";
import { cn } from "@/lib/utils";

export type ResidentVoiceTestimonialCardProps = {
  quote: string;
  details: string;
  author: string;
  role: string;
  avatarSrc: string;
  avatarAlt: string;
  className?: string;
};

export default function ResidentVoiceTestimonialCard({
  quote,
  details,
  author,
  role,
  avatarSrc,
  avatarAlt,
  className,
}: ResidentVoiceTestimonialCardProps) {
  return (
    <article
      className={cn(
        "min-w-0 bg-[#F1EFEC] border border-black/5 flex flex-col justify-between bg-white",
        className
      )}
    >
      <div className="p-6 md:p-8 bg-white ">
        <div className="flex items-start justify-end text-[64px] leading-[0.8] text-gold-beige font-display-semi rotate-180">
          <DoubleQuotesIcon width={64} height={64} />
        </div>
        <p className="mt-2 text-base md:text-[16px] font-semibold text-black/90 leading-5 min-h-[150px]">
          {quote}
        </p>
        <p className="mt-6 text-sm md:text-base text-black/80 leading-relaxed">
          {details}
        </p>
      </div>

      <div className="bg-[#AB9B81] px-6 md:px-8 py-4 flex items-center gap-4 min-h-[110px]">
        {
          avatarSrc && (
          <div className="relative w-14 h-14 shrink-0 overflow-hidden hidden">
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              fill
              className="object-cover"
            />
          </div>
        )
        }
        <div>
          <p className="text-white font-display-semi text-xl md:text-[18px] leading-tight">
            {author}
          </p>
          <p className="text-white/90 text-sm md:text-lg">{role}</p>
        </div>
      </div>
    </article>
  );
}
