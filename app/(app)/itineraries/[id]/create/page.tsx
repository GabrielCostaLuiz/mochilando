"use client"

import React, { useState } from "react"
import {
  MapPin,
  Clock,
  DollarSign,
  Camera,
  Plus,
  ChevronLeft,
  Save,

} from "lucide-react"
// import { useRouter } from "next/navigation"


import { useRouter } from "next/navigation"

export default function CreateRoute() {

  

  // if (id !== session?.user?.id) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <div className="container mx-auto px-4 py-8">
  //         <div className="max-w-4xl mx-auto">
  //           <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
  //             <div className="text-center">
  //               <h1 className="text-2xl font-bold text-gray-900">
  //                 Você não está logado
  //               </h1>
  //               <p className="text-gray-500 mt-2">
  //                 Para acessar essa página, você precisa estar logado.
  //               </p>
  //               <Link
  //                 href="/auth/signin"
  //                 className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
  //               >
  //                 Fazer Login
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  const router = useRouter()
  const [transportSteps, setTransportSteps] = useState([
    { title: "", price: "", duration: "", details: "" },
  ])
  const [routeSteps, setRouteSteps] = useState([{ title: "", description: "" }])
  const [tips, setTips] = useState([""])
  // const [images, setImages] = useState([])

  const addTransportStep = () => {
    setTransportSteps([
      ...transportSteps,
      { title: "", price: "", duration: "", details: "" },
    ])
  }

  const addRouteStep = () => {
    setRouteSteps([...routeSteps, { title: "", description: "" }])
  }

  const addTip = () => {
    setTips([...tips, ""])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Save className="w-5 h-5" />
              Salvar Roteiro
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Criar Novo Roteiro</h1>

          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-2">
                Título do Roteiro
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <input
                  type="text"
                  className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Ex: São Paulo → Rio de Janeiro"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Descrição</label>
              <textarea
                className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Descreva seu roteiro..."
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Informações Básicas
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <input
                    type="text"
                    className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Duração (ex: 8h)"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <input
                    type="text"
                    className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Custo Total (ex: R$ 280)"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Fotos do Roteiro</label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Opções de Transporte</label>
                <button
                  onClick={addTransportStep}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
              <div className="space-y-4">
                {transportSteps.map((step, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="space-y-4">
                      <input
                        type="text"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Título (ex: Ônibus Executivo)"
                      />
                      <input
                        type="text"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Detalhes"
                      />
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Preço"
                      />
                      <input
                        type="text"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Duração"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Passo a Passo</label>
                <button
                  onClick={addRouteStep}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
              <div className="space-y-4">
                {routeSteps.map((step, index) => (
                  <div key={index} className="border-l-2 border-blue-600 pl-4">
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Título do passo"
                    />
                    <textarea
                      className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Descrição detalhada do passo"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Dicas Importantes</label>
                <button
                  onClick={addTip}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 mt-3 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm">{index + 1}</span>
                    </div>
                    <textarea
                      className="flex-grow p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Digite uma dica importante..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
