import { Routes, Route } from 'react-router-dom'
import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
import Backdrop from './components/Backdrop'

import Projects from './pages/Projects'
import Receipts from './pages/Receipts'
import Exports from './pages/Exports'

import dRANb from './pages/engines/dRANb'
import brandL from './pages/engines/brandL'
import IELD4 from './pages/engines/IELD4'
import TRESS4 from './pages/engines/TRESS4'

import EvidenceVault from './pages/vault/EvidenceVault'
import V4ULTTimeline from './pages/vault/V4ULTTimeline'

export default function App() {
  return (
    <div className="min-h-screen">
      <Backdrop />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <Routes>
            <Route path="/" element={<Projects />} />

            <Route path="/engines/dranb" element={<dRANb />} />
            <Route path="/engines/brandl" element={<brandL />} />
            <Route path="/engines/4ield" element={<IELD4 />} />
            <Route path="/engines/4tress" element={<TRESS4 />} />

            <Route path="/vault/evidence" element={<EvidenceVault />} />
            <Route path="/vault/v4ult" element={<V4ULTTimeline />} />

            <Route path="/receipts" element={<Receipts />} />
            <Route path="/exports" element={<Exports />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
