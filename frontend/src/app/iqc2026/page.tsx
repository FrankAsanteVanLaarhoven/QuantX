'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import OverfittingGuard from '@/components/iqc/OverfittingGuard';
import ConcentrationManager from '@/components/iqc/ConcentrationManager';
import SentimentAlphaBuilder from '@/components/iqc/SentimentAlphaBuilder';

export default function IQC2026Page() {
    return (
        <DashboardLayout>
            <div className="flex-1 overflow-y-auto bg-[#020204]">
                <div className="p-8 max-w-7xl mx-auto space-y-8 pb-32">
                    
                    <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 text-green-500 font-bold tracking-widest text-xs">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            SOTA PROTOCOLS ENGAGED
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            IQC 2026 Sentinel Lab
                        </h1>
                        <p className="text-white/60 max-w-3xl leading-relaxed text-sm mt-2">
                            A dedicated workspace for engineering Alpha formulas that transcend the 1st percentile. 
                            Manage low capitalization ceilings, prevent historical overfitting, and systematically 
                            neutralize semantic noise prior to Out-of-Sample (OOS) live evaluation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <OverfittingGuard />
                            <ConcentrationManager />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <SentimentAlphaBuilder />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
