import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase, UserProfile } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink, Loader2, TrendingUp, Users, Activity, BarChart3, FileText, CheckCircle2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

interface ExtendedProviderStats {
    user: UserProfile;
    foundation_score: number;
    total_score: number;
    last_seen: string;
    // Progress per layer (0-100%)
    layer_progress: {
        layer0: number;
        layer1: number;
        layer2: number;
        layer3: number;
        layer4: number;
        layer5: number;
        layer6: number;
    };
    raw_progress: any[]; // Store full progress rows for detail view
}

const AdminDashboard = () => {
    const [providers, setProviders] = useState<ExtendedProviderStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [metrics, setMetrics] = useState({ total: 0, active: 0, avgScore: 0 });

    // Detail View State
    const [selectedProvider, setSelectedProvider] = useState<ExtendedProviderStats | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch All Profiles
            const { data: profiles, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (profileError) throw profileError;

            // 2. Fetch All Scores
            const { data: scores } = await supabase.from('business_scores').select('*');

            // 3. Fetch All Progress Details
            const { data: progress } = await supabase.from('pathway_progress').select('*');

            // 4. Process & Join Data
            const processed = profiles.map(profile => {
                const scoreRec = scores?.find(s => s.user_id === profile.id);
                const userProgress = progress?.filter(p => p.user_id === profile.id && p.status === 'completed') || [];

                // Calculate Layer Progress
                const countByLayer = (lid: string) => userProgress.filter(p => p.layer_id === lid).length;
                const completionPct = (lid: string, max: number) => Math.min(100, Math.round((countByLayer(lid) / max) * 100));

                return {
                    user: profile,
                    foundation_score: scoreRec?.foundation_score || 0,
                    total_score: scoreRec?.total_score || 0,
                    last_seen: profile.last_seen_at || profile.created_at,
                    raw_progress: userProgress,
                    layer_progress: {
                        layer0: completionPct('layer0', 4),
                        layer1: completionPct('layer1', 5),
                        layer2: completionPct('layer2', 4),
                        layer3: completionPct('layer3', 3),
                        layer4: completionPct('layer4', 4),
                        layer5: completionPct('layer5', 3),
                        layer6: completionPct('layer6', 4),
                    }
                };
            });

            setProviders(processed);

            // Calculate Top-Level Metrics
            const total = processed.length;
            const active = processed.filter(p => {
                const date = new Date(p.last_seen);
                const now = new Date();
                const diffTime = Math.abs(now.getTime() - date.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
            }).length;
            const avg = total > 0 ? Math.round(processed.reduce((acc, curr) => acc + curr.total_score, 0) / total) : 0;

            setMetrics({ total, active, avgScore: avg });

        } catch (e) {
            console.error("Admin Data Error", e);
        } finally {
            setLoading(false);
        }
    };

    const filteredProviders = providers.filter(p =>
        p.user.full_name?.toLowerCase().includes(filter.toLowerCase()) ||
        p.user.email?.toLowerCase().includes(filter.toLowerCase())
    );

    // Heatmap Dot
    const ProgressDot = ({ pct }: { pct: number }) => {
        let color = "bg-gray-100 text-gray-300";
        if (pct > 0 && pct < 100) color = "bg-yellow-100 text-yellow-600";
        if (pct === 100) color = "bg-green-100 text-green-600";

        return (
            <div className="flex justify-center" title={`${pct}% Complete`}>
                <div className={`w-2.5 h-2.5 rounded-full ${pct === 100 ? 'bg-green-500' : pct > 0 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
            </div>
        );
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Header & Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-1 md:col-span-1">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Program Optics</h1>
                        <p className="text-sm text-slate-500 mt-1">Real-time provider performance.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium uppercase">Total Providers</p>
                            <p className="text-2xl font-bold text-slate-900">{metrics.total}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium uppercase">Active (7d)</p>
                            <p className="text-2xl font-bold text-slate-900">{metrics.active}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium uppercase">Avg. Score</p>
                            <p className="text-2xl font-bold text-slate-900">{metrics.avgScore}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Filter by name, email..."
                            className="pl-9 bg-white border-slate-200 focus:ring-blue-500"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchData}>Refresh Data</Button>
                </div>

                {/* Data Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-24">UID</TableHead>
                                <TableHead className="w-[300px]">Provider Profile</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-center">Score</TableHead>
                                <TableHead className="text-center w-12 text-xs">L0</TableHead>
                                <TableHead className="text-center w-12 text-xs">L1</TableHead>
                                <TableHead className="text-center w-12 text-xs">L2</TableHead>
                                <TableHead className="text-center w-12 text-xs">L3</TableHead>
                                <TableHead className="text-center w-12 text-xs">L4</TableHead>
                                <TableHead className="text-center w-12 text-xs">L5</TableHead>
                                <TableHead className="text-center w-12 text-xs">L6</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={12} className="h-32 text-center text-slate-500">
                                        <div className="flex justify-center items-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" /> Processing Data...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredProviders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={12} className="h-32 text-center text-slate-500">
                                        No providers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProviders.map((p) => (
                                    <TableRow
                                        key={p.user.id}
                                        className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedProvider(p)}
                                    >
                                        <TableCell>
                                            <span className="font-mono text-xs text-slate-400" title={p.user.id}>
                                                {p.user.id.substring(0, 8)}...
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase">
                                                    {p.user.full_name?.substring(0, 2) || 'UN'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900 text-sm">{p.user.full_name || 'Unknown'}</div>
                                                    <div className="text-xs text-slate-500 font-mono">{p.user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 capitalize text-[10px] px-2 py-0.5">
                                                {p.user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={`text-base font-bold font-mono ${p.total_score >= 70 ? 'text-emerald-600' : 'text-slate-700'}`}>
                                                {p.total_score}
                                            </span>
                                        </TableCell>

                                        <TableCell className="p-0"><ProgressDot pct={p.layer_progress.layer0} /></TableCell>
                                        <TableCell className="p-0"><ProgressDot pct={p.layer_progress.layer1} /></TableCell>
                                        <TableCell className="p-0"><ProgressDot pct={p.layer_progress.layer2} /></TableCell>
                                        <TableCell className="p-0"><ProgressDot pct={p.layer_progress.layer3} /></TableCell>
                                        <TableCell className="p-0"><ProgressDot pct={p.layer_progress.layer4} /></TableCell>
                                        <TableCell className="p-0"><ProgressDot pct={p.layer_progress.layer5} /></TableCell>
                                        <TableCell className="p-0"><ProgressDot pct={p.layer_progress.layer6} /></TableCell>

                                        <TableCell className="text-right">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600" asChild onClick={(e) => e.stopPropagation()}>
                                                <a href={`/?uid=${p.user.id}`} target="_blank" rel="noreferrer">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* DETAIL SHEET */}
                <Sheet open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
                    <SheetContent className="sm:max-w-xl overflow-y-auto">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="text-xl">{selectedProvider?.user.full_name}</SheetTitle>
                            <SheetDescription>{selectedProvider?.user.email}</SheetDescription>
                        </SheetHeader>

                        <div className="space-y-6">
                            {/* Score Summary */}
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Total Score</p>
                                    <p className="text-2xl font-bold text-slate-900">{selectedProvider?.total_score}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Foundation</p>
                                    <p className="text-2xl font-bold text-slate-900">{selectedProvider?.foundation_score}</p>
                                </div>
                            </div>

                            {/* Detailed Progress List */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-3">Pathway Timeline</h3>
                                <div className="space-y-3">
                                    {selectedProvider?.raw_progress.length === 0 ? (
                                        <p className="text-sm text-slate-500 italic">No activity recorded yet.</p>
                                    ) : (
                                        selectedProvider?.raw_progress.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <p className="text-sm font-semibold text-slate-900 capitalize">
                                                            {item.pathway_id.replace('-', ' ')}
                                                        </p>
                                                        <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                                            {new Date(item.completed_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 capitalize">{item.layer_id}</p>

                                                    {/* EVIDENCE URL LINK */}
                                                    {item.evidence_url && (
                                                        <a
                                                            href={item.evidence_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="mt-2 inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded"
                                                        >
                                                            <FileText className="w-3 h-3" /> View Submitted Document
                                                        </a>
                                                    )}

                                                    {/* FORM DETAILS RENDERING */}
                                                    {item.details && (
                                                        <div className="mt-2 bg-slate-50 p-2 rounded text-xs border border-slate-200">
                                                            <p className="font-semibold mb-1 text-slate-700">Submission Details:</p>
                                                            <ul className="space-y-1.5 text-slate-600">
                                                                {Object.entries(item.details).map(([key, value]) => (
                                                                    <li key={key} className="flex flex-col border-b border-slate-100 last:border-0 pb-1">
                                                                        <span className="capitalize text-[10px] font-bold text-slate-400">{key.replace(/_/g, ' ')}</span>
                                                                        <span className="pl-1 text-xs">
                                                                            {Array.isArray(value) ? (
                                                                                <div className="flex flex-wrap gap-1 mt-0.5">
                                                                                    {value.map((v: any, i: number) => (
                                                                                        <span key={i} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">{String(v)}</span>
                                                                                    ))}
                                                                                </div>
                                                                            ) : typeof value === 'object' && value !== null ? (
                                                                                <pre className="text-[10px] bg-slate-100 p-1 rounded mt-0.5 overflow-x-auto">
                                                                                    {JSON.stringify(value, null, 2)}
                                                                                </pre>
                                                                            ) : (
                                                                                <span className="font-medium text-slate-800">{String(value)}</span>
                                                                            )}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
