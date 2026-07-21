import { Link } from 'react-router-dom'
import logoSquare from '../assets/logo-duri.svg'
import HeroFloatingImages from '../components/HeroFloatingImages'

function Home() {
  return (
    <>
      {/* 히어로 — 여백을 시원하게 (섹션 패딩 96px대) */}
      <section className="relative overflow-hidden">
        {/* 마우스를 따라 움직이는 패럴랙스 이미지 배경 */}
        <HeroFloatingImages />

        <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:gap-12 lg:pb-32 lg:pt-28">
          {/* 왼쪽: 메시지 */}
          <div>
            {/* pill-tag-soft eyebrow */}
            <span className="inline-block rounded-full bg-primary-subdued px-3 py-1.5 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep">
              기업 · 소상공인을 위한 사이트 · 웹 앱 제작
            </span>

            {/* display-xxl: 56px / 300 / -1.4px / lh 1.03~ */}
            <h1 className="mt-7 max-w-xl break-keep text-[36px] font-bold leading-[1.12] tracking-[-0.7px] text-ink md:text-[48px] lg:text-[56px] lg:leading-[1.08] lg:tracking-[-1px]">
              한 번 하고 끝나는 게 아니라,
              <br />
              <span className="text-primary">다음 날 매출이 바뀝니다.</span>
            </h1>

            {/* body-lg lead — 줄간격 여유 */}
            <p className="mt-7 max-w-md break-keep text-[16px] font-normal leading-[1.65] text-ink-secondary">
              말 관리사로 현장을 뛰며 느낀 아날로그의 불편함을 바이브코딩으로
              직접 해결해온 개발자가, 상담부터 제작·배포까지 책임지고
              진행합니다.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              {/* button-primary-pill — 화면에서 눈에 띄는 버튼은 이것 하나 */}
              <Link to="/contact" className="group btn-primary shadow-level-1">
                제작 문의하기
                <span
                  aria-hidden="true"
                  className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
              {/* link-on-light — 조용한 텍스트 링크로 강등 */}
              <Link to="/works" className="group link-cta">
                제작 사이트 예시 보기
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>

            {/* caption 보조 행 — 작업 방식 미리 귀띔 */}
            <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
              상담 접수
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary-subdued" />
              제작
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary-subdued" />
              배포까지 한 사람이 책임집니다
            </p>
          </div>

          {/* 오른쪽: 대표 프로필 카드 — 대시보드 목업 크롬 (DESIGN.md 시그니처) */}
          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
            {/* pill-tag-soft 뱃지 */}
            <span className="absolute -top-3 right-8 z-10 rounded-full bg-primary-subdued px-3 py-1.5 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep shadow-level-1">
              가성비
            </span>

            <div className="card-lift overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-level-2">
              {/* 목업 크롬 헤더 — ruby/magenta 액센트 도트 */}
              <div className="flex items-center gap-1.5 border-b border-hairline bg-canvas-soft px-5 py-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ruby/70" />
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-magenta/70" />
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary-subdued" />
                <span className="ml-auto text-[10px] font-normal tracking-[0.5px] text-ink-mute">
                  duri — profile
                </span>
              </div>

              <div className="p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    src={logoSquare}
                    alt=""
                    className="h-14 w-14 rounded-full border border-hairline"
                  />
                  <div>
                    {/* heading-lg: 22px / 300 / -0.22px */}
                    <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-ink">
                      두리
                    </h2>
                    {/* caption */}
                    <p className="mt-1.5 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
                      현직 말 관리사 × 전직 UX/UI 개발자
                    </p>
                  </div>
                </div>

                <div className="mt-6 h-px w-full bg-hairline" />

                <ul className="mt-6 space-y-5">
                  <li className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-soft" />
                    <span className="break-keep text-[15px] font-normal leading-[1.55] text-ink-secondary">
                      AI 콘텐츠 교육 수강
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ruby/80" />
                    <span className="break-keep text-[15px] font-normal leading-[1.55] text-ink-secondary">
                      현직 말 관리사로서 현장에 필요한 앱을 직접 바이브코딩으로
                      제작해{' '}
                      <span className="font-semibold text-ink">
                        현장에서 실제로 사용
                      </span>{' '}
                      중
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-magenta/80" />
                    <span className="break-keep text-[15px] font-normal leading-[1.55] text-ink-secondary">
                      전직 UX/UI 개발자
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 문의 밴드 — brand-dark-900 피처드 밴드 (색 리듬: 메시 → 화이트 → 딥 네이비) */}
      <section className="relative overflow-hidden bg-brand-dark">
        {/* 다크 서피스 위 은은한 인디고/루비 글로우 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              'radial-gradient(40% 70% at 15% 100%, rgba(102, 94, 253, 0.25) 0%, rgba(102, 94, 253, 0) 100%)',
              'radial-gradient(35% 60% at 85% 0%, rgba(234, 34, 97, 0.18) 0%, rgba(234, 34, 97, 0) 100%)',
            ].join(', '),
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-20 text-center lg:py-24">
          {/* display-lg: 32px / 300 / -0.64px */}
          <h2 className="break-keep text-[26px] font-bold leading-[1.1] tracking-[-0.26px] text-white md:text-[32px] md:tracking-[-0.5px]">
            지금 바로 문의하세요
          </h2>
          <p className="mx-auto mt-4 max-w-sm break-keep text-[16px] font-normal leading-[1.65] text-white/70">
            인스타그램 DM 또는 이메일로 편하게 연락 주세요.
          </p>
          <div className="mt-9">
            <Link to="/contact" className="group btn-primary">
              상담 문의 바로가기
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
