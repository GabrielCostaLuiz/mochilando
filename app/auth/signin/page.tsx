import { signIn } from "@/lib/authjs/auth"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Faça login para continuar sua jornada de exploração
          </p>
        </div>

        {/* Sign In Form */}
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/explorer" })
          }}
          className="mt-8 space-y-6"
        >
          <div className="space-y-4">
            {/* Google Sign In Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Fazer login com Google"
            >
              {/* Google Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>

            {/* Email Sign In Button - For future implementation */}
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-400 cursor-not-allowed opacity-50"
              aria-label="Fazer login com Email (em breve)"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Continuar com Email (em breve)
            </button>
          </div>
        </form>

        {/* Terms and Privacy */}
        <p className="mt-6 text-center text-xs text-gray-600">
          Ao continuar, você concorda com nossos{" "}
          <a
            href="/terms"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a
            href="/privacy"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  )
}
