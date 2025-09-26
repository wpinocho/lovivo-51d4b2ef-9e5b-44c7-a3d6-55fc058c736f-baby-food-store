import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, Shield, Truck } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    blogs,
    loading,
    loadingCollections,
    loadingBlogs,
    searchTerm,
    selectedCollectionId,
    filteredProducts,
    setSearchTerm,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section */}
      <section className="baby-gradient py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-baby-green-100 rounded-full mb-6 animate-bounce-gentle">
              <Heart className="h-8 w-8 text-baby-green-600" />
            </div>
            
            <h1 className="text-5xl font-bold text-baby-green-800 mb-6 leading-tight">
              Nutrición Natural para tu
              <span className="block text-baby-orange-500">Pequeño Tesoro</span>
            </h1>
            
            <p className="text-xl text-baby-green-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra selección de alimentos orgánicos y nutritivos, 
              especialmente diseñados para cada etapa del crecimiento de tu bebé. 
              Calidad garantizada y amor en cada bocado.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-baby-green-500 h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Busca papillas, cereales, snacks..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-12 py-4 text-lg border-2 border-baby-green-200 rounded-2xl focus:border-baby-green-400 bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4">
                <Shield className="h-6 w-6 text-baby-green-600" />
                <span className="text-baby-green-800 font-medium">100% Orgánico</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4">
                <Heart className="h-6 w-6 text-baby-orange-500" />
                <span className="text-baby-green-800 font-medium">Sin Conservantes</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4">
                <Truck className="h-6 w-6 text-baby-green-600" />
                <span className="text-baby-green-800 font-medium">Envío Rápido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-baby-cream-50 to-baby-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-baby-green-800 mb-4">
                Encuentra lo Perfecto para Cada Etapa
              </h2>
              <p className="text-lg text-baby-green-600 max-w-2xl mx-auto">
                Nuestros productos están organizados por edad para que encuentres 
                exactamente lo que tu bebé necesita en cada momento de su crecimiento.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {collections.map((collection) => (
                <div key={collection.id} className="baby-card-hover">
                  <CollectionCard 
                    collection={collection} 
                    onViewProducts={handleViewCollectionProducts} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-baby-green-800 mb-2">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Productos Seleccionados'}` 
                  : 'Productos Destacados'
                }
              </h2>
              <p className="text-baby-green-600">
                {selectedCollectionId 
                  ? 'Productos perfectos para esta etapa de crecimiento'
                  : 'Los favoritos de las familias que confían en nosotros'
                }
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="border-baby-green-300 text-baby-green-700 hover:bg-baby-green-50 rounded-xl"
              >
                Ver Todos los Productos
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-baby-green-100 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="baby-card-hover">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-baby-green-100 rounded-full mb-6">
                <Search className="h-10 w-10 text-baby-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-baby-green-800 mb-2">
                {searchTerm 
                  ? 'No encontramos productos que coincidan' 
                  : 'No hay productos disponibles'
                }
              </h3>
              <p className="text-baby-green-600">
                {searchTerm 
                  ? 'Intenta con otros términos de búsqueda o explora nuestras colecciones' 
                  : 'Pronto tendremos nuevos productos disponibles'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 baby-gradient border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-baby-orange-100 rounded-full mb-6">
            <Heart className="h-8 w-8 text-baby-orange-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-baby-green-800 mb-4">
            Consejos de Nutrición para tu Bebé
          </h2>
          <p className="text-lg text-baby-green-600 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro boletín y recibe consejos de expertos, 
            recetas saludables y ofertas especiales directamente en tu correo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="tu@email.com" 
              className="flex-1 py-3 border-2 border-baby-green-200 rounded-xl focus:border-baby-green-400"
            />
            <Button className="bg-baby-orange-500 hover:bg-baby-orange-600 text-white px-8 py-3 rounded-xl font-semibold">
              Suscribirse
            </Button>
          </div>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};