export default function BenefitsBar() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm md:text-base">
          <div className="font-bold">100g PROTEIN</div>
          <div className="hidden md:block text-white/50">|</div>
          <div className="font-bold">JUST $20</div>
          <div className="hidden md:block text-white/50">|</div>
          <div className="font-bold">HOT & READY PICKUP</div>
          <div className="hidden md:block text-white/50">|</div>
          <div className="font-bold">LIMITED DAILY - 20 ONLY</div>
        </div>
      </div>
    </div>
  )
}
