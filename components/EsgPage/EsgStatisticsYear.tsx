type Props = {
    caption?: string
}

export default function EsgStatisticsYear({caption}: Props) {
    return (
        <div className="w-full bg-white py-10 border-t border-[#E2DFD7]/30 transition-colors duration-300">
          <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
            <span className="text-[11px] md:text-xs text-gray-500 font-sans font-light tracking-wide block">{caption}</span>
          </div>
        </div>
    )
}