import React, { useState } from "react"
import type { JobPayload } from "../types/api.types";
import { jobService } from "../api/job.service";

export const Dashboard: React.FC = () => {
    const [formData, setFormData] = useState<JobPayload>({ email: '', content: '' });
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try {
            const response = await jobService.dispatch(formData)
            setStatus({
                type: 'success',
                msg: `${response.message}. Job ID : ${response.jobId}`
            })
            setFormData({ email: '', content: '' })
        } catch (err: any) {
            setStatus({
                type: 'error',
                msg: err.response?.data?.error || "Connection to Estus Engine failed.",
            })
        } finally {
            setIsSubmitting(false)
        }
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
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-background border border-slate-700 rounded-lg p-3 focus:border-primary outline-none transition-all font-mono"
                        placeholder="phantekzy@sys.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Task Parameters</label>
                    <textarea
                        required
                        rows={4}
                        className="w-full bg-background border border-slate-700 rounded-lg p-3 focus:border-primary outline-none transition-all resize-none font-mono"
                        placeholder="Define execution payload..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-slate-950 font-black py-4 rounded-lg hover:bg-sky-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase text-sm tracking-tighter "
                >
                    {isSubmitting ? "Loading..." : "Send"}
                </button>
            </form>

            {status && (
                <div className={`mt-6 p-4 rounded border text-xs font-mono ${status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
                    }`}>
                    &gt; {status.msg}
                </div>
            )}

        </section>
    )
}
