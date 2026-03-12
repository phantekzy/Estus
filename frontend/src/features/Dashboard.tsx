import React, { useState } from "react"

export const Dashboard: React.FC = () => {
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);
    }
    return (
        <section className="w-full max-w-lg bg-surface border border-slate-800 p-8 rounded-2xl shadow-2xl">
            <div className="mb-8">
                <h1 className="text-2xl uppercase font-bold text-primary tracking-tighter">
                    Estus
                </h1>
                <p className="text-slate-500 text-xs uppercase font-semibold mt-1 ">
                    Background Worker Dispatcher
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                        Email
                    </label>
                </div>
            </form>
        </section>
    )
}
