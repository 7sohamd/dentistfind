import type { PerformanceStatus, PracticeSummary } from './types';

export function getStatusFromConversionRate(conversionRate: number): PerformanceStatus {
    if (conversionRate >= 20) return 'high';
    if (conversionRate < 10) return 'at-risk';
    return 'stable';
}

export function formatPercent(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
}
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function getRecommendations(practice: PracticeSummary): string[] {
    const { conversionRate, appointmentRequests } = practice;
    const recommendations: string[] = [];

    if (conversionRate < 10) {
        recommendations.push('Improve follow-up speed to capture more appointment requests');
        recommendations.push('Review messaging and value proposition on landing pages');
    } else if (conversionRate < 15 && appointmentRequests > 30) {
        recommendations.push('Optimize booking flow to reduce friction and increase conversions');
        recommendations.push('Consider adding live chat support during business hours');
    } else if (conversionRate >= 20) {
        recommendations.push('Maintain current follow-up processes—performance is strong');
        recommendations.push('Consider expanding marketing reach to increase volume');
    } else {
        recommendations.push('Continue monitoring conversion trends month-over-month');
        recommendations.push('Test A/B variations on appointment booking CTAs');
    }

    return recommendations.slice(0, 2);
}
