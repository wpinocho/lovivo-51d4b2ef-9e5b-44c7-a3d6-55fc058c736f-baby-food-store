import { useState } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calculator, Package, Truck, Clock, MapPin, DollarSign } from 'lucide-react'
import { toast } from 'sonner'

interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: string
  description: string
  icon: any
}

export const ShippingCalculatorPage = () => {
  const [postalCode, setPostalCode] = useState('')
  const [state, setState] = useState('')
  const [weight, setWeight] = useState('')
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)

  const mexicanStates = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
    'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit',
    'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
    'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ]

  const calculateShipping = () => {
    if (!postalCode || !state || !weight) {
      toast.error('Por favor completa todos los campos')
      return
    }

    if (postalCode.length !== 5 || !/^\d+$/.test(postalCode)) {
      toast.error('El código postal debe tener 5 dígitos')
      return
    }

    const weightNum = parseFloat(weight)
    if (weightNum <= 0 || weightNum > 50) {
      toast.error('El peso debe estar entre 0.1 y 50 kg')
      return
    }

    setIsCalculating(true)

    // Simular cálculo de envío
    setTimeout(() => {
      const basePrice = 50
      const weightMultiplier = weightNum * 15
      const stateMultiplier = getStateMultiplier(state)
      
      const options: ShippingOption[] = [
        {
          id: 'standard',
          name: 'Envío Estándar',
          price: Math.round(basePrice + weightMultiplier * stateMultiplier),
          estimatedDays: '5-7 días hábiles',
          description: 'Entrega confiable a domicilio',
          icon: Package
        },
        {
          id: 'express',
          name: 'Envío Express',
          price: Math.round((basePrice + weightMultiplier * stateMultiplier) * 1.8),
          estimatedDays: '2-3 días hábiles',
          description: 'Entrega rápida con seguimiento',
          icon: Truck
        },
        {
          id: 'overnight',
          name: 'Envío Nocturno',
          price: Math.round((basePrice + weightMultiplier * stateMultiplier) * 2.5),
          estimatedDays: '1 día hábil',
          description: 'Entrega al siguiente día hábil',
          icon: Clock
        }
      ]

      setShippingOptions(options)
      setIsCalculating(false)
      setHasCalculated(true)
      toast.success('¡Costos de envío calculados exitosamente!')
    }, 1500)
  }

  const getStateMultiplier = (stateName: string): number => {
    // Estados cercanos a centros de distribución tienen menor costo
    const lowCostStates = ['Ciudad de México', 'Estado de México', 'Jalisco', 'Nuevo León']
    const mediumCostStates = ['Puebla', 'Guanajuato', 'Querétaro', 'Morelos', 'Hidalgo']
    
    if (lowCostStates.includes(stateName)) return 1.0
    if (mediumCostStates.includes(stateName)) return 1.2
    return 1.5
  }

  const resetCalculator = () => {
    setPostalCode('')
    setState('')
    setWeight('')
    setShippingOptions([])
    setHasCalculated(false)
  }

  return (
    <EcommerceTemplate pageTitle="Calculadora de Envíos">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            Calculadora de Envíos
          </h1>
          <p className="text-green-700 max-w-2xl mx-auto">
            Calcula el costo exacto de envío para tus productos BabyFood. 
            Ofrecemos diferentes opciones de entrega para que elijas la que mejor se adapte a tus necesidades.
          </p>
        </div>

        {/* Calculator Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <MapPin className="h-5 w-5" />
              Información de Envío
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Código Postal</Label>
                <Input
                  id="postalCode"
                  placeholder="12345"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  maxLength={5}
                  className="text-center font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {mexicanStates.map((stateName) => (
                      <SelectItem key={stateName} value={stateName}>
                        {stateName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Peso Estimado (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="1.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0.1"
                  max="50"
                  step="0.1"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={calculateShipping}
                disabled={isCalculating}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Envío
                  </>
                )}
              </Button>
              
              {hasCalculated && (
                <Button 
                  onClick={resetCalculator}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Nuevo Cálculo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Options */}
        {shippingOptions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-800 text-center">
              Opciones de Envío Disponibles
            </h2>
            
            <div className="grid gap-4">
              {shippingOptions.map((option) => (
                <Card key={option.id} className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <option.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-green-800 text-lg">{option.name}</h3>
                          <p className="text-green-600 text-sm">{option.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-sm text-orange-600 font-medium">{option.estimatedDays}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-2xl font-bold text-green-800">
                          <DollarSign className="h-6 w-6" />
                          {option.price}
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          MXN
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
            Información Importante sobre Envíos
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm text-green-700">
            <div>
              <h4 className="font-semibold mb-2">📦 Empaque Especial</h4>
              <p>Todos nuestros productos se envían en empaques especiales que mantienen la frescura y calidad durante el transporte.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🚚 Seguimiento</h4>
              <p>Recibirás un número de seguimiento para monitorear tu pedido en tiempo real desde el envío hasta la entrega.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">❄️ Cadena de Frío</h4>
              <p>Los productos que requieren refrigeración se envían con gel refrigerante para mantener la temperatura adecuada.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">💰 Envío Gratis</h4>
              <p>¡Envío gratuito en pedidos mayores a $800 MXN! Aplica para envío estándar en toda la República Mexicana.</p>
            </div>
          </div>
        </div>
      </div>
    </EcommerceTemplate>
  )
}