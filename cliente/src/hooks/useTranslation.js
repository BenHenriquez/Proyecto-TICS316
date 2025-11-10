import { useMemo } from 'react'
import es from '../locales/es.json'
import en from '../locales/en.json'
const dict = { es, en }
export default function useTranslation(lang) {
  return useMemo(() => key => dict[lang]?.[key] ?? key, [lang])
}