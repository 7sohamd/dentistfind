import './index.css';
import { mockPractices } from './mockData';
import { PracticeSummaryCard } from './components/PracticeSummaryCard';

export default function App() {
    const globalMax = Math.max(...mockPractices.flatMap(p => p.monthlyTrend));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Dashboard</h1>
                    <p className="text-gray-600">Monitor performance across all dental practices</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPractices.map((practice) => (
                        <PracticeSummaryCard key={practice.id} practice={practice} globalMax={globalMax} />
                    ))}
                </div>
            </div>
        </div>
    );
}
