import { CheckCircle, Users, Heart, MessageCircle } from 'lucide-react'

export default function InfluencerSection() {
  const influencers = [
    {
      name: "Mike Johnson",
      handle: "@musclemike",
      followers: "250K",
      verified: true,
      quote: "Been using FuelBox for 3 months. The 100g protein is a game changer! My recovery time is cut in half. 💪",
      likes: "12.5K",
      comments: "847",
      gradient: "from-blue-400 to-purple-400"
    },
    {
      name: "Sarah Chen",
      handle: "@fitnesssarah",
      followers: "180K",
      verified: true,
      quote: "Finally, a meal that actually keeps me full! Perfect macros for my competition prep. Can't recommend enough!",
      likes: "8.3K",
      comments: "523",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      name: "Alex Rivera",
      handle: "@alexlifts",
      followers: "320K",
      verified: true,
      quote: "This isn't just another meal prep. It's literally the only meal I need post-workout. Insane quality! 🔥",
      likes: "15.7K",
      comments: "1.2K",
      gradient: "from-green-400 to-emerald-400"
    }
  ]

  return (
    <div className="py-8">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-8 bg-gradient-to-r from-amber-600 to-green-600 bg-clip-text text-transparent">
        Trusted by Top Athletes
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {influencers.map((influencer, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${influencer.gradient} p-4`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center font-bold text-lg">
                    {influencer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{influencer.name}</span>
                      {influencer.verified && (
                        <CheckCircle className="w-4 h-4 fill-white" />
                      )}
                    </div>
                    <div className="text-sm opacity-90">{influencer.handle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-1 rounded-full text-sm">
                  <Users className="w-4 h-4" />
                  {influencer.followers}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 italic">
                "{influencer.quote}"
              </p>

              {/* Engagement Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{influencer.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span>{influencer.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Metrics */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-8 bg-gradient-to-r from-amber-50 to-green-50 px-8 py-4 rounded-2xl">
          <div>
            <p className="text-3xl font-black text-amber-600">500+</p>
            <p className="text-sm text-gray-600">Happy Athletes</p>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div>
            <p className="text-3xl font-black text-green-600">4.9</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div>
            <p className="text-3xl font-black text-blue-600">100%</p>
            <p className="text-sm text-gray-600">Recommend</p>
          </div>
        </div>
      </div>
    </div>
  )
}
