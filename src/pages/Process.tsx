import { Link } from 'react-router-dom'

/* about.md '작업 방식' — 상담 접수 · 제작 · 배포 */
const STEPS = [
  {
    no: '01',
    title: '상담 접수',
    desc: '인스타그램 DM이나 이메일로 필요한 것을 편하게 알려주세요.',
  },
  {
    no: '02',
    title: '제작',
    desc: '쓰는 사람 입장에서, 현장에서 통하는 사이트·웹 앱을 만듭니다.',
  },
  {
    no: '03',
    title: '배포',
    desc: '실제 운영 환경에 올려 바로 쓸 수 있는 상태로 전달합니다.',
  },
]

/* about.md '앞으로의 목표' — 첫 항목은 딥 네이비 피처드 카드 */
const GOALS = [
  {
    tag: '지금',
    title: '바이브코딩을 통한 웹 개발',
    desc: '기업·소상공인에게 필요한 사이트와 웹 앱을 제작합니다.',
    featured: true,
  },
  {
    tag: '준비 중',
    title: '디지털 상품',
    desc: '업무에 바로 쓸 수 있는 디지털 상품을 준비하고 있습니다.',
    featured: false,
  },
  {
    tag: '준비 중',
    title: '오프라인 강의',
    desc: '바이브코딩으로 직접 만드는 법을 알려드리는 강의를 준비하고 있습니다.',
    featured: false,
  },
]

function Process() {
  return (
    <>
      {/* 히어로 */}
      <section className="mx-auto max-w-[1200px] px-6 pt-20 lg:pt-28">
        <span className="inline-block rounded-full bg-primary-subdued px-3 py-1.5 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep">
          제작 순서 및 프로그램
        </span>
        {/* display-xl: 48px / 300 / -0.96px */}
        <h1 className="display-3d mt-7 max-w-2xl break-keep text-[32px] font-bold leading-[1.15] tracking-[-0.5px] text-ink md:text-[48px] md:leading-[1.12] md:tracking-[-0.7px]">
          상담 접수부터 배포까지,
          <br />세 단계로 진행합니다.
        </h1>
      </section>

      {/* 작업 방식 — card-feature-light 3-up */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24 pt-16 lg:pb-32">
        {/* heading-md 섹션 라벨 */}
        <h2 className="text-[20px] font-medium leading-[1.4] tracking-[-0.2px] text-ink">
          작업 방식
        </h2>
        <p className="mt-1.5 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
          모든 프로젝트는 같은 세 단계를 거칩니다.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.no}
              className="card-lift rounded-xl border border-hairline bg-canvas p-7 shadow-level-1 sm:p-8"
            >
              {/* 번호 필 서클 — tnum (DESIGN.md 숫자 원칙) */}
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-subdued text-[14px] font-normal text-primary-deep"
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                {step.no}
              </span>
              {/* heading-lg */}
              <h3 className="mt-6 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-ink">
                {step.title}
              </h3>
              {/* 한 줄 소개 — 줄간격 여유 */}
              <p className="mt-3.5 break-keep text-[15px] font-normal leading-[1.6] text-ink-secondary">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 앞으로의 목표 — canvas-soft 밴드, 피처드(네이비)/크림 카드 리듬 */}
      <section className="bg-canvas-soft">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24">
          {/* display-lg */}
          <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.26px] text-ink md:text-[32px] md:tracking-[-0.5px]">
            앞으로의 목표
          </h2>
          <p className="mt-2 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
            웹 제작에서 시작해, 배우고 쓸 수 있는 것들로 넓혀갑니다.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {GOALS.map((goal) =>
              goal.featured ? (
                /* card-pricing-featured — brand-dark-900 위 화이트 */
                <div
                  key={goal.title}
                  className="card-lift relative overflow-hidden rounded-xl bg-brand-dark p-7 text-white shadow-level-1 sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(60% 80% at 100% 0%, rgba(102, 94, 253, 0.35) 0%, rgba(102, 94, 253, 0) 100%)',
                    }}
                  />
                  <div className="relative">
                    <span className="rounded-full bg-primary-subdued px-2.5 py-1 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep">
                      {goal.tag}
                    </span>
                    {/* heading-md */}
                    <h3 className="mt-5 break-keep text-[20px] font-medium leading-[1.35] tracking-[-0.2px] text-white">
                      {goal.title}
                    </h3>
                    <p className="mt-2.5 break-keep text-[15px] font-normal leading-[1.6] text-white/70">
                      {goal.desc}
                    </p>
                  </div>
                </div>
              ) : (
                /* card-cream-band */
                <div
                  key={goal.title}
                  className="card-lift rounded-xl bg-canvas-cream p-7 text-ink sm:p-8"
                >
                  <span className="rounded-full bg-canvas px-2.5 py-1 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-ink-mute">
                    {goal.tag}
                  </span>
                  <h3 className="mt-5 break-keep text-[20px] font-medium leading-[1.35] tracking-[-0.2px] text-ink">
                    {goal.title}
                  </h3>
                  <p className="mt-2.5 break-keep text-[15px] font-normal leading-[1.6] text-ink-secondary">
                    {goal.desc}
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-16 text-center">
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

export default Process
