'use client'

import useChat from '@/hooks/useChat';
import useModaleResults from '@/hooks/useModaleResults'

export default function ModaleBackground() {
   // Composant qui sert uniquement à ajouter du style sur le background de la modale
  // Pas possible de le faire conditionnement sur la page duel, car hook pas utilisable puisque RSC

  const modaleResults = useModaleResults()
  const chat = useChat()
  if (chat.isOpen || modaleResults.isOpen) {
    return (
      <div className='absolute opacity-80 min-h-[200vh] w-full bg-slate-700 z-10'></div>
    );
  }
  return null;
}

