// app/(dashboard)/layout.tsx
import Navbar from '@/components/Navbar' // ou ton code de Navbar direct

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar/> 
      <main>{children}</main>
    </>
  )
}