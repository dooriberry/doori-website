import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Process from './pages/Process'
import Works from './pages/Works'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="process" element={<Process />} />
          <Route path="works" element={<Works />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* 관리자 페이지 — 마케팅 셸 없이 독립 화면 */}
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
