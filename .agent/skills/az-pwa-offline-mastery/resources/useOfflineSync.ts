'use client';

import { db } from '@/lib/db'; // Instance Dexie supposée
import { useEffect, useState } from 'react';

interface OutboxItem {
  id?: number;
  method: string;
  url: string;
  body: any;
  timestamp: number;
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Tentative de sync initiale
    if (navigator.onLine) syncOutbox();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Déclenche la sync quand on repasse en ligne
  useEffect(() => {
    if (isOnline) syncOutbox();
  }, [isOnline]);

  const syncOutbox = async () => {
    if (isSyncing) return;
    
    const items = await db.table<OutboxItem>('outbox').toArray();
    if (items.length === 0) return;

    setIsSyncing(true);
    
    for (const item of items) {
      try {
        const response = await fetch(item.url, {
          method: item.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.body),
        });

        if (response.ok) {
          await db.table('outbox').delete(item.id);
        }
      } catch (error) {
        console.error('Échec de synchro pour le point d\'entrée:', item.url);
        break; // Stop la boucle en cas d'erreur réseau persistante
      }
    }

    setIsSyncing(false);
  };

  const addToOutbox = async (method: string, url: string, body: any) => {
    await db.table('outbox').add({
      method,
      url,
      body,
      timestamp: Date.now(),
    });
    if (isOnline) syncOutbox();
  };

  return {
    isOnline,
    isSyncing,
    addToOutbox,
    syncOutbox
  };
}
