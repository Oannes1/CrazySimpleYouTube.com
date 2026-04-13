'use client'

export default function BonusForm() {
  return (
    <form
      className="mt-8 flex flex-col gap-3 max-w-sm mx-auto"
      onSubmit={(e) => {
        e.preventDefault()
        /* TODO: Connect to GHL/Brevo API and redirect to Skool */
      }}
    >
      <input
        type="text"
        placeholder="First name"
        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/25 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30"
        required
      />
      <input
        type="email"
        placeholder="Email address"
        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/25 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30"
        required
      />
      <button
        type="submit"
        className="w-full py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20"
      >
        Send Me the Free Kit
      </button>
    </form>
  )
}
