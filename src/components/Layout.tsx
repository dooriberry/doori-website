import { Link, NavLink, Outlet } from 'react-router-dom'
import logoHorizontal from '../assets/logo-duri-horizontal.svg'
import logoSquare from '../assets/logo-duri.svg'
import GradientMesh from './GradientMesh'

const MENU = [
  { to: '/', label: '소개' },
  { to: '/process', label: '제작 순서 및 프로그램' },
  { to: '/works', label: '제작 사이트' },
  { to: '/contact', label: '상담 문의' },
]

/* about.md '대표 프로필' 핵심 한 줄 */
const PROFILE_ITEMS = [
  'AI 콘텐츠 교육 수강',
  '현직 말 관리사 — 현장에서 실제로 쓰는 앱을 직접 바이브코딩으로 제작',
  '전직 UX/UI 개발자',
]

/* 상단 티커 — brand-dark-900 위 micro 타이포, 천천히 왼쪽으로 흐른다 */
function TopTicker() {
  const line = (
    <>
      {PROFILE_ITEMS.map((item) => (
        <span key={item} className="flex shrink-0 items-center gap-6">
          <span className="whitespace-nowrap">{item}</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 shrink-0 rounded-full bg-primary-subdued"
          />
        </span>
      ))}
    </>
  )

  return (
    <div className="relative z-10 overflow-hidden bg-brand-dark py-1.5">
      <div className="flex w-max animate-ticker gap-6 motion-reduce:animate-none">
        {/* 같은 줄 2벌 — 끊김 없는 루프용 */}
        <div className="flex shrink-0 items-center gap-6 text-[11px] font-normal leading-[1.4] text-white">
          {line}
          {line}
        </div>
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-6 text-[11px] font-normal leading-[1.4] text-white"
        >
          {line}
          {line}
        </div>
      </div>
    </div>
  )
}

/* nav-bar-on-mesh + footer-light — 모든 페이지 공통 셸 */
function Layout() {
  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      <TopTicker />
      <GradientMesh />

      <header className="relative z-10">
        {/* 모바일: 1줄(로고+CTA) + 2줄(메뉴) / md 이상: 한 줄 */}
        <nav className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-10 gap-y-3 px-4 py-3 sm:px-6 sm:py-5">
          <Link to="/" aria-label="두리 홈" className="shrink-0">
            <img src={logoHorizontal} alt="두리" className="h-10 w-auto sm:h-12" />
          </Link>

          <Link to="/contact" className="btn-dark ml-auto shrink-0 text-[14px] md:order-last">
            제작 문의하기
          </Link>

          {/* body-md 네비 링크 — ink, 활성 시 primary(link-on-light) */}
          <ul className="flex w-full items-center gap-5 overflow-x-auto md:w-auto md:gap-6">
            {MENU.map((item) => (
              <li key={item.to} className="shrink-0">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-block py-2 text-[15px] leading-none transition-colors ${
                      isActive
                        ? 'font-normal text-primary'
                        : 'font-normal text-ink hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      {/* footer-light — caption 타이포, 링크 그룹 + 법적 문구 행 */}
      <footer className="border-t border-hairline bg-canvas">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <img src={logoHorizontal} alt="두리" className="h-10 w-auto" />
              <p className="mt-4 max-w-xs break-keep text-[13px] font-normal leading-[1.6] tracking-[-0.39px] text-ink-mute">
                기업·소상공인을 위한 사이트·웹 앱 제작.
                <br />한 번 하고 끝나는 게 아니라, 다음 날 매출이 바뀝니다.
              </p>
            </div>

            <nav aria-label="푸터 메뉴">
              <p className="text-[11px] font-normal tracking-[0.5px] text-ink">
                메뉴
              </p>
              <ul className="mt-4 space-y-2.5">
                {MENU.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-[13px] font-normal tracking-[-0.39px] text-ink-mute transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-[11px] font-normal tracking-[0.5px] text-ink">
                문의
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="https://www.instagram.com/doori_web"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] font-normal tracking-[-0.39px] text-ink-mute transition-colors hover:text-primary"
                  >
                    인스타그램 DM
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:loveless7737@gmail.com"
                    className="text-[13px] font-normal tracking-[-0.39px] text-ink-mute transition-colors hover:text-primary"
                  >
                    loveless7737@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-6">
            <p className="text-[11px] font-normal text-ink-mute">
              © 2026 두리. All rights reserved.
            </p>
            <p className="flex items-center gap-2 text-[11px] font-normal text-ink-mute">
              <img src={logoSquare} alt="" className="h-5 w-5" />
              정성을 다해, 하나씩
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
