import React from "react"
import { MapPin,  Bus,  Users } from "lucide-react"
import Link from "next/link"


export default function LandingPage() {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Roteiros Econômicos",
      description:
        "Descubra caminhos testados e aprovados pela comunidade para viajar gastando menos",
    },
    {
      icon: <Bus className="w-6 h-6" />,
      title: "Transporte Público",
      description:
        "Navegue pela cidade como um local usando transporte público e rotas alternativas",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dicas de Locais",
      description:
        "Acesse experiências únicas compartilhadas por moradores da região",
    },
  ]

  // const benefits = [
  //   "Economize até 60% em suas viagens",
  //   "Descubra lugares autênticos fora do circuito turístico",
  //   "Planeje viagens sustentáveis sem depender de carro",
  //   "Conecte-se com viajantes e moradores locais",
  // ]

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-blue-600 flex gap-2 items-center">
          
              <p className="">Mochilando</p>
            </div>
            <Link
              href="/explorer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                Beta Gratuito 🚀
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Viaje mais gastando menos com dicas de
                <span className="text-blue-600"> quem conhece</span>
              </h1>
              <p className="text-xl text-gray-600">
                Planeje viagens econômicas com roteiros compartilhados por
                locais. Descubra como explorar cada destino usando transporte
                público e dicas da comunidade.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                  Criar Conta Grátis
                </button>
                <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors">
                  Ver Como Funciona
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Image
                      width={600}
                      height={400}
                      alt="User Avatar"
                      key={i}
                      src={`/api/placeholder/32/32`}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <p>+100 viajantes já estão usando</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8">
                <Image
                  width={400}
                  height={400}
                  src="/api/placeholder/600/400"
                  alt="Platform Preview"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold">Economia Média</p>
                      <p className="text-green-600 font-bold">60% por viagem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="space-y-8">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                Beta Gratuito 🚀
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Viaje mais gastando menos com dicas de
                <span className="text-blue-600"> quem conhece</span>
              </h1>
              <p className="text-xl text-gray-600">
                Planeje viagens econômicas com roteiros compartilhados por
                locais. Descubra como explorar cada destino usando transporte
                público e dicas da comunidade.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
                <Link href={"/auth/signin"} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                  Criar Conta Grátis
                </Link>
                {/* <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors">
                  Ver Como Funciona
                </button> */}
              </div>
              {/* <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Image
                      width={600}
                      height={400}
                      alt="User Avatar"
                      key={i}
                      src={`/api/placeholder/32/32`}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <p>+100 viajantes já estão usando</p>
              </div> */}
            </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600">
              Planeje sua próxima aventura em três passos simples
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">
                Por que escolher nossa plataforma?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image
                  width={400}
                  height={400}
                  src="/api/placeholder/280/200"
                  className="rounded-lg shadow-lg"
                  alt="Feature 1"
                />
                <Image
                  width={400}
                  height={400}
                  src="/api/placeholder/280/320"
                  className="rounded-lg shadow-lg"
                  alt="Feature 2"
                />
              </div>
              <div className="space-y-4 pt-8">
                <Image
                  width={400}
                  height={400}
                  src="/api/placeholder/280/320"
                  className="rounded-lg shadow-lg"
                  alt="Feature 3"
                />
                <Image
                  width={400}
                  height={400}
                  src="/api/placeholder/280/200"
                  className="rounded-lg shadow-lg"
                  alt="Feature 4"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Comece a planejar sua próxima aventura agora
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a outros viajantes que já estão economizando e descobrindo
            experiências únicas
          </p>
          <Link href={"/auth/signin"} className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
            Criar Conta Gratuita
          </Link>
        </div>
      </div>

      
    </div>
  )
}
