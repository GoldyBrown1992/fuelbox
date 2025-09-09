import { Zap, Flame, Droplets, Leaf } from 'lucide-react'

export default function NutritionCards() {
  const nutritionData = [
    {
      icon: <Flame className="w-8 h-8" />,
      value: "100g",
      label: "PROTEIN",
      description: "Premium blend of chicken, salmon & beef",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: "1200",
      label: "CALORIES",
      description: "Perfect for muscle growth & recovery",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-500"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      value: "85g",
      label: "CARBS",
      description: "Complex carbs for sustained energy",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-500"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      value: "35g",
      label: "HEALTHY FATS",
      description: "Omega-3s from salmon & avocado",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {nutritionData.map((item, index) => (
        <div
          key={index}
          className={`${item.bgColor} ${item.borderColor} border-2 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group`}
        >
          {/* Icon */}
          <div className={`${item.iconColor} mb-4 group-hover:scale-110 transition-transform`}>
            {item.icon}
          </div>

          {/* Value */}
          <div className={`text-4xl font-black mb-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
            {item.value}
          </div>

          {/* Label */}
          <div className="text-sm font-bold text-gray-700 mb-3">
            {item.label}
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600">
            {item.description}
          </p>

          {/* Decorative Element */}
          <div className={`mt-4 h-1 w-full bg-gradient-to-r ${item.color} rounded-full opacity-30 group-hover:opacity-60 transition-opacity`}></div>
        </div>
      ))}
    </div>
  )
}
