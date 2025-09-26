import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import { Heart, Shield, Leaf } from "lucide-react"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Este componente solo maneja la presentación del ProductCard.
 * Toda la lógica viene del HeadlessProductCard.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Animaciones y efectos
 * - Agregar features visuales (hover effects, etc.)
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-white border-2 border-baby-green-100 rounded-2xl overflow-hidden hover:border-baby-green-300 transition-all duration-300 hover:shadow-xl">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-gradient-to-br from-baby-cream-50 to-baby-green-50 rounded-t-2xl overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-baby-green-400">
                    <Heart className="h-16 w-16" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-baby-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-baby-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      Favorito
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      Agotado
                    </span>
                  )}
                </div>

                {/* Organic Badge */}
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <Leaf className="h-4 w-4 text-baby-green-600" />
                  </div>
                </div>
              </div>
            </Link>

            <div className="p-5">
              <Link to={`/products/${logic.product.slug}`} className="block mb-4">
                <h3 className="text-baby-green-800 font-bold text-lg mb-2 line-clamp-2 leading-tight">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-baby-green-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </Link>

              {logic.hasVariants && logic.options && (
                <div className="mb-4 space-y-3">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-sm font-semibold text-baby-green-800 mb-2">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-8 w-8 rounded-full border-2 ${
                                  isSelected ? 'border-baby-green-500 ring-2 ring-baby-green-200' : 'border-baby-green-200'
                                } ${
                                  logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''
                                }`}
                                style={{ 
                                  backgroundColor: swatch
                                }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                                isSelected 
                                  ? 'border-baby-green-500 bg-baby-green-500 text-white shadow-md' 
                                  : logic.selected[opt.name] && !isSelected
                                    ? 'border-baby-green-200 bg-white text-baby-green-600 opacity-40'
                                    : 'border-baby-green-200 bg-white text-baby-green-700 hover:border-baby-green-400 hover:bg-baby-green-50'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                              title={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-baby-green-800 font-bold text-xl">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-baby-green-400 text-sm line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className={`${
                    logic.inStock 
                      ? 'bg-baby-orange-500 hover:bg-baby-orange-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } font-semibold px-6 py-2 rounded-xl transition-all duration-200 ${
                    logic.inStock ? 'hover:shadow-lg hover:scale-105' : ''
                  }`}
                >
                  {logic.inStock ? (
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Agregar
                    </span>
                  ) : (
                    'Agotado'
                  )}
                </Button>
              </div>

              {/* Trust indicator */}
              <div className="mt-3 pt-3 border-t border-baby-green-100">
                <div className="flex items-center justify-center space-x-2 text-baby-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs font-medium">100% Orgánico y Seguro</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}