import React from 'react';

interface TrendBarsProps {
    data: number[];
    globalMax: number;
}

export const TrendBars: React.FC<TrendBarsProps> = ({ data }) => {
    const yAxisMax = 45;
    const yAxisLabels = [45, 35, 25, 15, 0];

    return (
        <div className="flex justify-center">
            <div className="flex gap-3">
                <div className="flex flex-col justify-between h-40 text-xs text-gray-400 pt-1 pb-1">
                    {yAxisLabels.map((label, idx) => (
                        <span key={idx}>{label}</span>
                    ))}
                </div>
                <div className="relative h-40">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        <div className="border-t border-dashed border-gray-300"></div>
                        <div className="border-t border-dashed border-gray-300"></div>
                        <div className="border-t border-dashed border-gray-300"></div>
                        <div className="border-t border-dashed border-gray-300"></div>
                        <div className="border-t border-dashed border-gray-300"></div>
                    </div>
                    <div className="relative flex items-end gap-1.5 h-40">
                        {data.map((value, index) => {
                            const heightPercent = (value / yAxisMax) * 100;
                            return (
                                <div
                                    key={index}
                                    className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t transition-all hover:from-emerald-600 hover:to-emerald-500"
                                    style={{ height: `${heightPercent}%`, minHeight: '8%', width: '34px' }}
                                    title={`Month ${index + 1}: ${value}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
