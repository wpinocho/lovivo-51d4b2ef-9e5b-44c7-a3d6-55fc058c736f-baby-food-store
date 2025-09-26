import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Shield, Award, Users, Leaf, Baby } from 'lucide-react'

export const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Seguridad Garantizada",
      description: "Todos nuestros productos pasan rigurosos controles de calidad y están certificados para bebés."
    },
    {
      icon: Leaf,
      title: "100% Orgánico",
      description: "Utilizamos únicamente ingredientes orgánicos, sin pesticidas ni químicos artificiales."
    },
    {
      icon: Heart,
      title: "Hecho con Amor",
      description: "Cada producto es elaborado pensando en el bienestar y desarrollo saludable de tu bebé."
    },
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Reconocidos por organizaciones internacionales de nutrición infantil."
    }
  ]

  const team = [
    {
      name: "Dra. María González",
      role: "Nutricionista Pediátrica",
      description: "15 años de experiencia en nutrición infantil",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Chef Carlos Mendoza",
      role: "Chef Especializado",
      description: "Experto en cocina saludable para bebés",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Ana Rodríguez",
      role: "Fundadora & CEO",
      description: "Madre de 3 hijos y emprendedora apasionada",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    }
  ]

  return (
    <EcommerceTemplate pageTitle="Sobre Nosotros">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Baby className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Nuestra Historia
          </h1>
          <p className="text-xl text-green-700 leading-relaxed">
            BabyFood nació del amor de una madre por brindar la mejor nutrición a su bebé. 
            Desde 2018, nos hemos dedicado a crear alimentos orgánicos, seguros y deliciosos 
            que acompañen cada etapa del crecimiento de tu pequeño.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Todo Comenzó con una Pregunta Simple
            </h2>
            <div className="space-y-4 text-green-700">
              <p>
                "¿Qué le doy de comer a mi bebé?" Esta pregunta que se hacen millones de padres 
                fue el inicio de nuestro viaje. Como madre primeriza, Ana Rodríguez se enfrentó 
                a la difícil tarea de encontrar alimentos realmente saludables para su bebé.
              </p>
              <p>
                Después de investigar durante meses y consultar con nutricionistas pediátricos, 
                decidió crear sus propias recetas. Lo que comenzó en su cocina casera, hoy es 
                una empresa que alimenta a miles de bebés en todo el país.
              </p>
              <p>
                Cada producto que creamos pasa por el mismo filtro: "¿Se lo daría a mi propio hijo?"
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=400&fit=crop" 
              alt="Madre alimentando a su bebé"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">6+</div>
                <div className="text-sm">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Cada decisión que tomamos está guiada por estos principios fundamentales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-green-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-green-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Profesionales apasionados dedicados a la nutrición infantil
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-green-800 text-lg mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3 bg-orange-100 text-orange-700">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-green-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-green-800 text-white rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">50,000+</div>
              <div className="text-green-200">Bebés Alimentados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">100%</div>
              <div className="text-green-200">Ingredientes Orgánicos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">15+</div>
              <div className="text-green-200">Productos Únicos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">99%</div>
              <div className="text-green-200">Padres Satisfechos</div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Users className="h-16 w-16 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Nuestra Misión
          </h2>
          <p className="text-xl text-green-700 leading-relaxed mb-8">
            Proporcionar a las familias alimentos para bebé de la más alta calidad, 
            elaborados con ingredientes orgánicos y mucho amor, para que cada pequeño 
            tenga el mejor comienzo en la vida.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">Sin Conservantes</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">Sin Azúcares Añadidos</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">Certificado Orgánico</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">Libre de Alérgenos</Badge>
          </div>
        </div>
      </div>
    </EcommerceTemplate>
  )
}