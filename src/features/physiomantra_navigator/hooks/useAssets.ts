import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export interface Asset {
    id: string;
    title: string;
    description?: string;
    type: 'video' | 'pdf' | 'image' | 'link';
    url: string;
    pathway_id?: string;
}

export const useAssets = (pathwayId?: string) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAssets();
    }, [pathwayId]);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            let query = supabase.from('assets').select('*');

            if (pathwayId) {
                query = query.eq('pathway_id', pathwayId);
            }

            const { data, error } = await query;

            if (error) throw error;

            setAssets(data as Asset[]);
        } catch (e) {
            console.error("Failed to fetch assets", e);
        } finally {
            setLoading(false);
        }
    };

    const getPublicUrl = (path: string) => {
        // If it's already a full URL, return it
        if (path.startsWith('http')) return path;

        // Otherwise assume it's a storage path
        const { data } = supabase.storage.from('pathway-assets').getPublicUrl(path);
        return data.publicUrl;
    };

    return { assets, loading, getPublicUrl, refresh: fetchAssets };
};
