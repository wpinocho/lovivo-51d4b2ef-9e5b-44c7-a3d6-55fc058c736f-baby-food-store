import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/contexts/CartContext'
import { CartUIProvider } from '@/components/CartProvider'

// Pages
import { IndexPage } from '@/pages/IndexPage'
import { AboutPage } from '@/pages/AboutPage'
import { ShippingCalculatorPage } from '@/pages/ShippingCalculatorPage'
import { BlogPage } from '@/pages/BlogPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <CartUIProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/shipping-calculator" element={<ShippingCalculatorPage />} />
                <Route path="/blog" element={<BlogPage />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </CartUIProvider>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App