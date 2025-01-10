export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Mochilada</h3>
            <p className="text-gray-600">
              Viaje mais, gaste menos, explore melhor.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Preços
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Termos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© 2025 Mochilada. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
