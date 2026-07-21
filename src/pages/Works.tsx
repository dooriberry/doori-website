import { Link } from 'react-router-dom'
import logoSquare from '../assets/logo-duri.svg'
import { SITES } from '../data/sites'
import type { Site } from '../data/sites'

/* 카드 주소창에 표시할 짧은 주소 */
function displayUrl(url: string) {
  if (url.startsWith('http')) {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }
  return 'duri — this site'
}

/* 썸네일이 없을 때 — 브랜드 그라디언트 플레이스홀더 */
function Placeholder({ title }: { title: string }) {
  return (
    <div
      className="flex aspect-video w-full items-center justify-center"
      style={{
        background: [
          'radial-gradient(60% 90% at 10% 0%, rgba(245, 233, 212, 0.9) 0%, rgba(245, 233, 212, 0) 100%)',
          'radial-gradient(55% 85% at 60% 10%, rgba(185, 185, 249, 0.7) 0%, rgba(185, 185, 249, 0) 100%)',
          'radial-gradient(45% 70% at 95% 40%, rgba(102, 94, 253, 0.35) 0%, rgba(102, 94, 253, 0) 100%)',
          'linear-gradient(180deg, #f6f9fc 0%, #ffffff 100%)',
        ].join(', '),
      }}
    >
      <div className="flex items-center gap-3">
        <img src={logoSquare} alt="" className="h-10 w-10 rounded-full border border-hairline bg-canvas" />
        <span className="max-w-[220px] break-keep text-[15px] font-light leading-[1.4] text-ink-secondary">
          {title}
        </span>
      </div>
    </div>
  )
}

/* card-dashboard-mockup — 크롬 헤더 + 미리보기 + 본문 */
function SiteCard({ site }: { site: Site }) {
  const external = site.url.startsWith('http')

  const card = (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-canvas shadow-level-1">
      {/* 크롬 바 — 액센트 도트 + 주소 */}
      <div className="flex items-center gap-1.5 border-b border-hairline bg-canvas-soft px-4 py-2.5">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ruby/70" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-magenta/70" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary-subdued" />
        <span
          className="ml-auto text-[10px] font-normal tracking-[0.5px] text-ink-mute"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {displayUrl(site.url)}
        </span>
      </div>

      {/* 미리보기 */}
      {site.thumbnail ? (
        <img
          src={site.thumbnail}
          alt={`${site.title} 미리보기`}
          className="aspect-video w-full object-cover object-top"
        />
      ) : (
        <Placeholder title={site.title} />
      )}

      {/* 본문 */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap gap-1.5">
          {site.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-subdued px-2.5 py-1 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* heading-md */}
        <h2 className="mt-4 break-keep text-[20px] font-light leading-[1.35] tracking-[-0.2px] text-ink">
          {site.title}
        </h2>
        <p className="mt-2 break-keep text-[15px] font-light leading-[1.6] text-ink-secondary">
          {site.desc}
        </p>
        <span className="link-cta mt-5 text-[14px]">
          사이트 보러가기
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </article>
  )

  return external ? (
    <a href={site.url} target="_blank" rel="noreferrer" className="group block h-full">
      {card}
    </a>
  ) : (
    <Link to={site.url} className="group block h-full">
      {card}
    </Link>
  )
}

function Works() {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pb-24 pt-20 lg:pb-32 lg:pt-28">
        {/* pill-tag-soft eyebrow */}
        <span className="inline-block rounded-full bg-primary-subdued px-3 py-1.5 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep">
          제작 사이트
        </span>
        {/* display-xl */}
        <h1 className="mt-7 max-w-2xl break-keep text-[32px] font-light leading-[1.15] tracking-[-0.64px] text-ink md:text-[48px] md:leading-[1.12] md:tracking-[-0.96px]">
          직접 만든 사이트들입니다.
        </h1>
        <p className="mt-6 max-w-md break-keep text-[16px] font-light leading-[1.65] text-ink-secondary">
          카드를 누르면 실제 운영 중인 사이트로 이동합니다. 완성될 때마다
          이곳에 하나씩 추가됩니다.
        </p>

        {SITES.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SITES.map((site) => (
              <SiteCard key={site.title} site={site} />
            ))}
          </div>
        ) : (
          /* 빈 상태 */
          <div className="mt-12 rounded-xl border border-dashed border-hairline-input bg-canvas-soft p-14 text-center">
            <p className="text-[20px] font-light leading-[1.35] tracking-[-0.2px] text-ink">
              첫 사이트를 준비하고 있어요.
            </p>
            <p className="mt-2 text-[15px] font-light leading-[1.6] text-ink-mute">
              완성되는 대로 이곳에서 바로 보실 수 있습니다.
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-[15px] font-light text-ink-secondary">
            이런 사이트가 필요하신가요?
          </p>
          <div className="mt-5">
            <Link to="/contact" className="group btn-primary">
              제작 문의하기
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

export default Works
