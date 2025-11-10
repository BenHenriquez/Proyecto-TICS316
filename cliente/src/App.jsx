import React, { useState, useEffect } from 'react'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SummariesPage from './pages/SummariesPage.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import useTranslation from './hooks/useTranslation.js'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { listSummaries } from './api/summaries.js'

function InnerApp() {
  const [lang, setLang] = useState('es')
  const [page, setPage] = useState('login')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [summaries, setSummaries] = useState([])
  const t = useTranslation(lang)
  const { loggedIn, logout } = useAuth()

  useEffect(() => {
    if (loggedIn) {
      listSummaries()
        .then(setSummaries)
        .catch(e => console.error('Error summaries', e))
    }
  }, [loggedIn])

  const renderPage = () => {
    if (!loggedIn) {
      return page === 'home'
        ? <HomePage t={t} setPage={setPage} isLoggedIn={false} />
        : <LoginPage t={t} setPage={setPage} />
    }
    if (page === 'home') return <HomePage t={t} setPage={setPage} isLoggedIn={true} setIsSubscribed={setIsSubscribed} />
    if (page === 'summaries') return <SummariesPage t={t} summaries={summaries} isSubscribed={isSubscribed} setPage={setPage} />
    if (page === 'admin') return <AdminPanel t={t} summaries={summaries} setSummaries={setSummaries} />
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setLang={setLang} setPage={setPage} page={page} isLoggedIn={loggedIn} setIsLoggedIn={(v)=>{ if(!v) logout(); }} t={t} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{renderPage()}</main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

// --- Configuración de Idiomas (i18n) ---
const translations = {
  es: {
    navHome: "Inicio",
    navSummaries: "Resúmenes",
    navAdmin: "Admin",
    navLogin: "Iniciar Sesión",
    navLogout: "Cerrar Sesión",
    navLang: "Language",
    homeTitle: "Bienvenido a tu Centro de Estudios",
    homeSubtitle: "Resúmenes y pautas de tus ramos, todo en un solo lugar.",
    homeCTA: "Ver Planes de Suscripción",
    loginTitle: "Acceso de Miembros",
    loginEmail: "Correo Electrónico",
    loginPassword: "Contraseña",
    loginButton: "Ingresar",
    loginLoading: "Ingresando...",
    loginErrorEmpty: "Por favor, completa todos los campos.",
    loginErrorGeneric: "Error de autenticación. Verifica tus credenciales.",
    summariesTitle: "Biblioteca de Resúmenes",
    summariesDesc: "Accede a todo el material si tienes una suscripción activa.",
    summaryCardView: "Ver Resumen",
    adminTitle: "Panel de Administración",
    adminDesc: "Gestionar el contenido de la plataforma.",
    adminFormTitle: "Subir Nuevo Resumen",
    adminFormCourse: "Ramo (ej: Cálculo I)",
    adminFormUnit: "Unidad (ej: Unidad 1)",
    adminFormTitlePlaceholder: "Título del Resumen",
    adminFormFile: "Seleccionar Archivo PDF",
    adminFormSave: "Guardar Resumen",
    adminExistingTitle: "Resúmenes Existentes",
    adminExistingEdit: "Editar",
    adminExistingDelete: "Eliminar",
    paymentError: "Error en el proceso de pago. Inténtalo más tarde.",
    paymentSuccess: "Suscripción activada con éxito!",
    paymentLoginRequired: "Debes iniciar sesión para suscribirte.",
    paywallTitle: "Contenido Exclusivo",
    paywallDesc: "Esta sección es solo para miembros con suscripción activa.",
    paywallButton: "Activa tu Suscripción",
  },
  en: {
    navHome: "Home",
    navSummaries: "Summaries",
    navAdmin: "Admin",
    navLogin: "Login",
    navLogout: "Logout",
    navLang: "Idioma",
    homeTitle: "Welcome to Your Study Hub",
    homeSubtitle: "Summaries and guides for your courses, all in one place.",
    homeCTA: "View Subscription Plans",
    loginTitle: "Member Access",
    loginEmail: "Email Address",
    loginPassword: "Password",
    loginButton: "Sign In",
    loginLoading: "Signing In...",
    loginErrorEmpty: "Please fill out all fields.",
    loginErrorGeneric: "Authentication error. Check your credentials.",
    summariesTitle: "Summary Library",
    summariesDesc: "Access all material if you have an active subscription.",
    summaryCardView: "View Summary",
    adminTitle: "Admin Panel",
    adminDesc: "Manage the platform's content.",
    adminFormTitle: "Upload New Summary",
    adminFormCourse: "Course (e.g., Calculus I)",
    adminFormUnit: "Unit (e.g., Unit 1)",
    adminFormTitlePlaceholder: "Summary Title",
    adminFormFile: "Select PDF File",
    adminFormSave: "Save Summary",
    adminExistingTitle: "Existing Summaries",
    adminExistingEdit: "Edit",
    adminExistingDelete: "Delete",
    paymentError: "Payment process failed. Please try again later.",
    paymentSuccess: "Subscription activated successfully!",
    paymentLoginRequired: "You must be logged in to subscribe.",
    paywallTitle: "Exclusive Content",
    paywallDesc: "This section is for subscribed members only.",
    paywallButton: "Activate Your Subscription",
  }
};

const useTranslation = (lang) => {
  return useMemo(() => (key) => translations[lang][key] || key, [lang]);
};