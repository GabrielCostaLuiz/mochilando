'use client'
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">Oops!</span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">
            Página não encontrada
          </h2>
          <p className="text-gray-600 max-w-sm mx-auto">
            Desculpe, não conseguimos encontrar a página que você está
            procurando. Ela pode ter sido movida ou não existe mais.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            Página Inicial
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
        </div>

        {/* Help Links */}
        <div className="text-sm text-gray-500">
          <p>Precisa de ajuda?</p>
          <div className="mt-2 space-x-4">
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-500 underline"
            >
              Contato
            </Link>
            <Link
              href="/faq"
              className="text-blue-600 hover:text-blue-500 underline"
            >
              FAQ
            </Link>
            <Link
              href="/sitemap"
              className="text-blue-600 hover:text-blue-500 underline"
            >
              Mapa do Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
