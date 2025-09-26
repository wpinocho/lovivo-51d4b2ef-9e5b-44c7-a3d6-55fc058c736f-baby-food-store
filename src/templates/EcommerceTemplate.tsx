import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Shield, Award } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { Input } from '@/components/ui/input'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white/95 backdrop-blur-sm border-b border-baby-green-100 sticky top-0 z-40 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-baby-green-500 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-baby-green-800">BabyFood</h1>
                <p className="text-xs text-baby-green-600">Nutrición Natural</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-baby-green-700 hover:text-baby-green-900 transition-colors font-medium"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="text-baby-green-700 hover:text-baby-green-900 transition-colors font-medium"
              >
                Consejos
              </Link>
              <div className="flex items-center space-x-1 text-baby-green-700">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">100% Seguro</span>
              </div>
            </nav>
          </div>

          {/* Cart */}
          {showCart && (
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative hover:bg-baby-green-50 rounded-xl"
            >
              <ShoppingCart className="h-6 w-6 text-baby-green-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-baby-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-baby-green-800">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-baby-green-800 text-white py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-baby-orange-500 rounded-full flex items-center justify-center">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">BabyFood</h3>
                <p className="text-baby-green-200">Nutrición Natural</p>
              </div>
            </div>
            <p className="text-baby-green-200 mb-6 max-w-md">
              Comprometidos con la nutrición saludable de tu bebé. 
              Productos orgánicos, seguros y deliciosos para cada etapa de crecimiento.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-baby-green-700 rounded-lg px-3 py-2">
                <Shield className="h-4 w-4 text-baby-green-200" />
                <span className="text-sm text-baby-green-200">Certificado Orgánico</span>
              </div>
              <div className="flex items-center space-x-2 bg-baby-green-700 rounded-lg px-3 py-2">
                <Award className="h-4 w-4 text-baby-green-200" />
                <span className="text-sm text-baby-green-200">Calidad Premium</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Navegación</h3>
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-baby-green-200 hover:text-white transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block text-baby-green-200 hover:text-white transition-colors"
              >
                Consejos de Nutrición
              </Link>
              <a 
                href="#" 
                className="block text-baby-green-200 hover:text-white transition-colors"
              >
                Sobre Nosotros
              </a>
              <a 
                href="#" 
                className="block text-baby-green-200 hover:text-white transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Mantente Informado</h3>
            <p className="text-baby-green-200 mb-4 text-sm">
              Recibe consejos de nutrición y ofertas especiales
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="tu@email.com" 
                className="bg-baby-green-700 border-baby-green-600 text-white placeholder:text-baby-green-300 focus:border-baby-orange-400"
              />
              <Button className="w-full bg-baby-orange-500 hover:bg-baby-orange-600 text-white font-semibold">
                Suscribirse
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-white">Síguenos</h4>
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-baby-green-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-baby-green-200 text-sm">
              &copy; 2024 BabyFood. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-baby-green-200 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-baby-green-200 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}