'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Heart, 
  Calendar, 
  FileText, 
  DollarSign, 
  Package, 
  MapPin, 
  Users, 
  BarChart3,
  Menu,
  X,
  ChevronLeft,
  Home,
  LogOut
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      name: 'Agendamento',
      href: '/agendamento',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      name: 'Pacientes',
      href: '/pacientes',
      icon: <Users className="w-5 h-5" />
    },
    {
      name: 'Prontuários',
      href: '/prontuarios',
      icon: <FileText className="w-5 h-5" />
    },
    {
      name: 'Financeiro',
      href: '/financeiro',
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      name: 'Estoque',
      href: '/estoque',
      icon: <Package className="w-5 h-5" />
    },
    {
      name: 'Atendimento Domiciliar',
      href: '/atendimento-domiciliar',
      icon: <MapPin className="w-5 h-5" />
    }
  ]

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PetCare+</span>
          </Link>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                    onClick={() => {
                      // Fechar sidebar no mobile após clicar
                      if (window.innerWidth < 1024) {
                        onToggle()
                      }
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Voltar ao Início</span>
          </Link>
          <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </>
  )
}