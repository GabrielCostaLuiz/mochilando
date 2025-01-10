"use client"
import React, { useState } from "react"
import { Search, MapPin, Heart, Filter, Star, Clock, Bus } from "lucide-react"
import Link from "next/link"

import Image from "next/image"

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("routes")

  const routes = [
    {
      id: 1,
      title: "São Paulo → Rio de Janeiro",
      image: "/api/placeholder/400/250",
      price: "R$ 280",
      duration: "8h",
      transport: "Ônibus + Metrô",
      rating: 4.8,
      likes: 234,
      tags: ["Econômico", "Cultural"],
    },
    {
      id: 2,
      title: "Curitiba → Florianópolis",
      image: "/api/placeholder/400/250",
      price: "R$ 150",
      duration: "6h",
      transport: "Ônibus",
      rating: 4.9,
      likes: 187,
      tags: ["Praia", "Natureza"],
    },
    {
      id: 3,
      title: "Salvador → Porto Seguro",
      image: "/api/placeholder/400/250",
      price: "R$ 200",
      duration: "7h",
      transport: "Ônibus + Barco",
      rating: 4.7,
      likes: 156,
      tags: ["Praia", "História"],
    },
  ]

  const localExperiences = [
    {
      id: 1,
      title: "Tour Gastronômico na Liberdade",
      location: "São Paulo, SP",
      image: "/api/placeholder/400/250",
      price: "R$ 50",
      duration: "3h",
      rating: 4.9,
      likes: 342,
      tags: ["Gastronomia", "Cultural"],
    },
    {
      id: 2,
      title: "Trilha do Morro da Urca",
      location: "Rio de Janeiro, RJ",
      image: "/api/placeholder/400/250",
      price: "Grátis",
      duration: "2h",
      rating: 4.8,
      likes: 267,
      tags: ["Aventura", "Natureza"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Para onde você quer ir?"
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setActiveTab("routes")}
              className={`pb-4 px-4 font-medium ${
                activeTab === "routes"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Roteiros
            </button>
            <button
              onClick={() => setActiveTab("local")}
              className={`pb-4 px-4 font-medium ${
                activeTab === "local"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Roles Locais
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "routes"
            ? 
              routes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <Image
                      src={route.image}
                      alt={route.title}
                      width={400}
                      height={400}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {route.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{route.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {route.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Bus className="w-4 h-4" />
                        {route.transport}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">A partir de</div>
                        <div className="text-lg font-bold text-blue-600">
                          {route.price}
                        </div>
                      </div>
                      <Link
                        href="/itineraries/1"
                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : 
              localExperiences.map((experience) => (
                <div
                  key={experience.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {experience.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      {experience.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" fill="currentColor" />
                        {experience.rating}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Custo médio</div>
                        <div className="text-lg font-bold text-blue-600">
                          {experience.price}
                        </div>
                      </div>
                      <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
