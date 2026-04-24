"use client"
import { useState } from 'react'

// On définit proprement ce que le bouton peut recevoir : une url ET un texte
interface CopyButtonProps {
  url: string;
  text?: string; // Le "?" veut dire que le texte est optionnel
}

export default function CopyButton({ url, text = "Copier le lien" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie :', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
        copied 
        ? 'bg-green-500 text-white shadow-lg shadow-green-100' 
        : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-slate-200'
      }`}
    >
      {copied ? "Copié ! ✅" : text}
    </button>
  )
}