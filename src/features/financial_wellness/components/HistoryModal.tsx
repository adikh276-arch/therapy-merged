'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, X, ChevronRight, History } from 'lucide-react';
import { storage } from '@/lib/storage';

interface HistoryModalProps {
  storageKey: string;
  onClose: () => void;
  onRestore: (data: any, timestamp: string) => void;
}

export function HistoryModal({ storageKey, onClose, onRestore }: HistoryModalProps) {
  const { t } = useTranslation();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = storage.get<any[]>(`${storageKey}_history`, []);
    setHistory(data);
  }, [storageKey]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)',
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        background: 'var(--bg-base)', width: '100%', maxWidth: 440,
        borderRadius: 'var(--radius-3xl)', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <History size={20} color="var(--brand-primary)" />
            <span style={{ fontWeight: 800, fontSize: 'var(--text-lg)' }}>{t("Entry History")}</span>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ background: 'var(--bg-neutral)', borderRadius: 12 }}>
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div style={{ maxHeight: 400, overflowY: 'auto', padding: 'var(--space-4)' }}>
          {history.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-faint)' }}>
              <Clock size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <p>{t("No history found for this tool yet.")}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {history.map((entry) => (
                <button 
                  key={entry.id} 
                  onClick={() => { onRestore(entry.data, entry.timestamp); onClose(); }} 
                  className="card-tap" 
                  style={{ 
                    width: '100%', textAlign: 'left', padding: 'var(--space-4)',
                    background: 'white', border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                      {new Date(entry.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{t("Restore this entry")}</p>
                  </div>
                  <ChevronRight size={16} color="var(--text-faint)" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: 'var(--space-5)', background: 'var(--bg-neutral)', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 500 }}>{t("Only the last 10 entries are preserved.")}</p>
        </div>
      </div>
    </div>
  );
}
