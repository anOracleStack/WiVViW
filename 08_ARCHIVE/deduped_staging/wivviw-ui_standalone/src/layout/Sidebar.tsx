import { NavLink } from 'react-router-dom'

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        'block rounded-lg px-3 py-2 text-sm border border-white/0',
        isActive ? 'bg-white/8 border-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
      ].join(' ')
    }
  >
    {label}
  </NavLink>
)

export default function Sidebar() {
  return (
    <aside className="w-[260px] shrink-0 p-4">
      <div className="glass rounded-2xl p-4 border border-white/10">
        <div className="text-sm tracking-[0.28em] text-white/80">WiVViW</div>
        <div className="mt-1 text-xs text-white/50">Calm Tech · Glass Box</div>

        <div className="mt-5 space-y-2">
          <div className="text-[11px] text-white/40 tracking-widest">PROJECT</div>
          <NavItem to="/" label="Projects" />
        </div>

        <div className="mt-5 space-y-2">
          <div className="text-[11px] text-white/40 tracking-widest">ENGINES</div>
          <NavItem to="/engines/dranb" label="dRANb" />
          <NavItem to="/engines/brandl" label="brandL" />
          <NavItem to="/engines/4ield" label="4IELD" />
          <NavItem to="/engines/4tress" label="4TRESS" />
        </div>

        <div className="mt-5 space-y-2">
          <div className="text-[11px] text-white/40 tracking-widest">VAULT</div>
          <NavItem to="/vault/evidence" label="Evidence Vault" />
          <NavItem to="/vault/v4ult" label="V4ULT Timeline" />
          <NavItem to="/receipts" label="Receipts" />
          <NavItem to="/exports" label="Exports" />
        </div>
      </div>
    </aside>
  )
}
