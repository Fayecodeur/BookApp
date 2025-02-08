import { createContext, useContext, useState } from "react";

// Création du contexte avec des valeurs par défaut
const AppContext = createContext({
  items: [],
  createItem: (item) => {},
  getItem: (id) => {},
  updateItem: (item) => {},
});

export default function Store({ children }) {
  const [items, setItems] = useState([]);

  // Fonction pour ajouter un nouvel item
  function createItem(item) {
    const temp = [...items]; // Copier les items existants
    temp.push(item); // Ajouter le nouvel item
    setItems(temp); // Mettre à jour le state
  }

  // Fonction pour récupérer un item par son ID
  function getItem(id) {
    return items.find((item) => item.id === id); // Trouver l'item avec le bon ID
  }

  // Fonction pour mettre à jour un item existant
  function updateItem(updatedItem) {
    const index = items.findIndex((i) => i.id === updatedItem.id); // Trouver l'index de l'item
    if (index !== -1) {
      const temp = [...items];
      temp[index] = { ...updatedItem }; // Remplacer l'item par les nouvelles valeurs
      setItems(temp); // Mettre à jour le state
    }
  }

  // Fournir les valeurs et fonctions à tout le composant enfant
  return (
    <AppContext.Provider value={{ items, createItem, getItem, updateItem }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personnalisé pour accéder plus facilement au contexte
export function useAppContext() {
  return useContext(AppContext);
}
