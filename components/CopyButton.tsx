"use client"; // Obligatoire pour utiliser window/navigator

import { useState } from "react";

export default function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset après 2s
    } catch (err) {
      console.error("Erreur lors de la copie : ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-sm font-bold transition-all text-left ${
        copied ? "text-green-500" : "text-indigo-600 hover:underline"
      }`}
    >
      {copied ? "Copié ! ✅" : "Copier l'URL ↗"}
    </button>
  );
}