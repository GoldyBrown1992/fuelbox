export default function BenefitsBar() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="text-lg">💪</span>
            <span className="font-semibold">108g Protein</span>
          </div>
          <div className="hidden md:block text-white/50">|</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🍕</span>
            <span className="font-semibold">Pizza Flavor</span>
          </div>
          <div className="hidden md:block text-white/50">|</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🏷️</span>
            <span className="font-semibold">Just $20</span>
          </div>
          <div className="hidden md:block text-white/50">|</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🚚</span>
            <span className="font-semibold">Free Delivery</span>
          </div>
        </div>
      </div>
    </div>
  )
}
