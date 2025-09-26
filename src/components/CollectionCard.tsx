import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Baby } from 'lucide-react'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-white border-2 border-baby-green-100 rounded-2xl overflow-hidden hover:border-baby-green-300 transition-all duration-300 hover:shadow-xl baby-card-hover">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-gradient-to-br from-baby-cream-50 to-baby-green-50 overflow-hidden relative">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-baby-green-400">
              <Baby className="h-16 w-16" />
            </div>
          )}
          
          {/* Featured Badge */}
          {collection.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-baby-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                Destacado
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-baby-green-800 font-bold text-xl line-clamp-2 leading-tight">
              {collection.name}
            </h3>
          </div>
          
          {collection.description && (
            <p className="text-baby-green-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full bg-baby-green-500 hover:bg-baby-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
            onClick={() => onViewProducts(collection.id)}
          >
            <span className="flex items-center justify-center gap-2">
              Ver Productos
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}