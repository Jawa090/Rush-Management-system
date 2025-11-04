import { useState, useEffect } from 'react';
import { useNotifications } from './use-notifications';

export interface FavoriteDua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  dateAdded: Date;
}

export function useDuaFavorites() {
  const [favorites, setFavorites] = useState<FavoriteDua[]>([]);
  const { showSuccess, showInfo } = useNotifications();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('duaFavorites');
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        // Convert date strings back to Date objects
        const favoritesWithDates = parsed.map((fav: any) => ({
          ...fav,
          dateAdded: new Date(fav.dateAdded)
        }));
        setFavorites(favoritesWithDates);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('duaFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (dua: Omit<FavoriteDua, 'dateAdded'>) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === dua.id);
    
    if (isAlreadyFavorite) {
      showInfo('Already in Favorites', 'This dua is already in your favorites');
      return false;
    }

    const newFavorite: FavoriteDua = {
      ...dua,
      dateAdded: new Date()
    };

    setFavorites(prev => [newFavorite, ...prev]);
    showSuccess('Added to Favorites', `${dua.title} has been added to your favorites`);
    return true;
  };

  const removeFromFavorites = (duaId: number) => {
    const duaToRemove = favorites.find(fav => fav.id === duaId);
    setFavorites(prev => prev.filter(fav => fav.id !== duaId));
    
    if (duaToRemove) {
      showSuccess('Removed from Favorites', `${duaToRemove.title} has been removed from your favorites`);
    }
    return true;
  };

  const isFavorite = (duaId: number) => {
    return favorites.some(fav => fav.id === duaId);
  };

  const toggleFavorite = (dua: Omit<FavoriteDua, 'dateAdded'>) => {
    if (isFavorite(dua.id)) {
      removeFromFavorites(dua.id);
      return false;
    } else {
      addToFavorites(dua);
      return true;
    }
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    showSuccess('Favorites Cleared', 'All favorites have been removed');
  };

  const getFavoritesByCategory = (category: string) => {
    return favorites.filter(fav => fav.category === category);
  };

  const getRecentFavorites = (limit: number = 5) => {
    return favorites
      .sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime())
      .slice(0, limit);
  };

  const exportFavorites = () => {
    const dataStr = JSON.stringify(favorites, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dua-favorites-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showSuccess('Favorites Exported', 'Your favorites have been exported successfully');
  };

  const importFavorites = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        const favoritesWithDates = importedData.map((fav: any) => ({
          ...fav,
          dateAdded: new Date(fav.dateAdded)
        }));
        setFavorites(favoritesWithDates);
        showSuccess('Favorites Imported', `${importedData.length} favorites have been imported`);
      } catch (error) {
        showSuccess('Import Failed', 'Failed to import favorites. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    getFavoritesByCategory,
    getRecentFavorites,
    exportFavorites,
    importFavorites,
    favoritesCount: favorites.length
  };
}