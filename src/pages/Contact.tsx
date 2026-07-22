import { useState } from 'react'
import type { FormEvent } from 'react'

const CONTACT_EMAIL = 'loveless7737@gmail.com'

/* 구글 시트 연동 — Apps Script 웹 앱 배포 주소를 여기에 붙여넣으면
   문의가 시트에 한 줄씩 쌓입니다. (비어 있으면 화면 전환만 동작) */
const SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxoFCUue1953WXwXt5B7UUWYxCUkqylCi7TuWF0yRbOkrKms1rTlwDdkuxF5btdRcTZxA/exec'

/* text-input — DESIGN.md: canvas bg, ink text, body-md, 8px 12px,
   rounded-sm 6px, hairline-input 보더, 포커스 시 primary 보더 */
const inputClass =
  'w-full rounded-[6px] border bg-canvas px-3.5 py-2.5 text-[15px] font-normal leading-[1.4] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-mute focus:border-primary focus:shadow-[0_0_0_4px_rgba(83,58,253,0.08)] focus:outline-none'

const labelClass =
  'block text-[13px] font-normal tracking-[-0.39px] text-ink-mute'

/* 에러 표시는 브랜드 액센트 ruby — DESIGN.md에 별도 시맨틱 팔레트 없음 */
const errorTextClass = 'mt-1.5 text-[13px] font-normal tracking-[-0.39px] text-ruby'

type Errors = { company?: string; phone?: string; email?: string }

function Contact() {
  const [form, setForm] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    schedule: '',
    style: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
      if (key === 'company' || key === 'phone' || key === 'email') {
        setErrors((prev) => ({ ...prev, [key]: undefined }))
      }
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (!form.company.trim()) next.company = '기관/회사명을 입력해주세요.'
    if (!form.phone.trim()) next.phone = '연락처를 입력해주세요.'
    if (!form.email.trim()) {
      next.email = '이메일을 입력해주세요.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = '이메일 형식을 확인해주세요.'
    }
    setErrors(next)

    if (next.company || next.phone || next.email) {
      const firstErrorId = next.company
        ? 'company'
        : next.phone
          ? 'phone'
          : 'email'
      document.getElementById(firstErrorId)?.focus()
      return
    }

    /* 구글 시트로 전송 — URL이 등록된 경우에만 */
    if (SHEET_WEBHOOK_URL) {
      setSending(true)
      setSendError(false)
      try {
        await fetch(SHEET_WEBHOOK_URL, {
          method: 'POST',
          /* URLSearchParams 본문 → 브라우저 사전 요청(preflight) 없이 전송됨 */
          body: new URLSearchParams({
            company: form.company,
            name: form.name,
            phone: form.phone,
            email: form.email,
            schedule: form.schedule,
            style: form.style,
          }),
        })
      } catch {
        setSending(false)
        setSendError(true)
        return
      }
      setSending(false)
    }
    setSubmitted(true)
  }

  const borderClass = (hasError: boolean) =>
    hasError ? 'border-ruby' : 'border-hairline-input'

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-24 pt-20 lg:pb-32 lg:pt-28">
      {/* pill-tag-soft eyebrow */}
      <span className="inline-block rounded-full bg-primary-subdued px-3 py-1.5 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep">
        상담 문의
      </span>
      {/* display-xl */}
      <h1 className="display-3d mt-7 max-w-2xl break-keep text-[32px] font-bold leading-[1.15] tracking-[-0.5px] text-ink md:text-[48px] md:leading-[1.12] md:tracking-[-0.7px]">
        편하게 연락 주세요.
      </h1>
      <p className="mt-6 max-w-md break-keep text-[16px] font-normal leading-[1.65] text-ink-secondary">
        어떤 사이트가 필요한지 아직 정리되지 않아도 괜찮습니다. 아래 내용만
        적어주시면 필요한 것부터 함께 정리해드립니다.
      </p>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
        {submitted ? (
          /* 접수 완료 화면 — card-feature-light + Level 2 shadow */
          <div className="rounded-xl border border-hairline bg-canvas p-6 text-center shadow-level-2 sm:p-8 md:p-14">
            {/* pill-tag-soft */}
            <span className="rounded-full bg-primary-subdued px-2 py-1 text-[11px] font-normal leading-[1.15] tracking-[0.1px] text-primary-deep">
              접수 완료
            </span>
            {/* display-md: 26px / 300 / -0.26px */}
            <h2 className="mt-6 break-keep text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-ink">
              문의가 접수되었어요.
            </h2>
            <p className="mt-3 break-keep text-[16px] font-normal leading-[1.4] text-ink-secondary">
              1~2일 안에 연락드릴게요.
            </p>

            <div className="mx-auto mt-8 h-px w-16 bg-hairline" />

            <p className="mt-8 break-keep text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
              {form.name ? `${form.name} 님, ` : ''}
              {form.company} · {form.phone} 로 연락드립니다.
            </p>
            <p className="mt-2 break-keep text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
              입력하신 이메일({form.email})로 접수 확인 메일을 보내드렸어요.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    company: '',
                    name: '',
                    phone: '',
                    email: '',
                    schedule: '',
                    style: '',
                  })
                  setSubmitted(false)
                }}
                className="group link-cta text-[14px]"
              >
                새 문의 작성하기
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* 문의 폼 — card-feature-light + Level 2 shadow */
          <form
            noValidate
            onSubmit={handleSubmit}
            className="rounded-xl border border-hairline bg-canvas p-6 shadow-level-2 sm:p-8"
          >
            {/* 담당자 정보 */}
            <h2 className="flex items-center gap-2.5 text-[18px] font-medium leading-[1.4] text-ink">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
              담당자 정보
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="company" className={labelClass}>
                  기관/회사명
                </label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  onChange={update('company')}
                  placeholder="예: 두리상회"
                  aria-invalid={!!errors.company}
                  className={`mt-1.5 ${inputClass} ${borderClass(!!errors.company)}`}
                />
                {errors.company && (
                  <p role="alert" className={errorTextClass}>
                    {errors.company}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="name" className={labelClass}>
                  담당자 성함
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="예: 홍길동"
                  className={`mt-1.5 ${inputClass} border-hairline-input`}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  연락처
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="예: 010-1234-5678"
                  aria-invalid={!!errors.phone}
                  className={`mt-1.5 ${inputClass} ${borderClass(!!errors.phone)}`}
                />
                {errors.phone && (
                  <p role="alert" className={errorTextClass}>
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="예: hello@duri.com"
                  aria-invalid={!!errors.email}
                  className={`mt-1.5 ${inputClass} ${borderClass(!!errors.email)}`}
                />
                {errors.email && (
                  <p role="alert" className={errorTextClass}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 h-px w-full bg-hairline" />

            {/* 원하는 사이트 */}
            <h2 className="mt-8 flex items-center gap-2.5 text-[18px] font-medium leading-[1.4] text-ink">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ruby/80" />
              원하는 사이트
            </h2>
            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="schedule" className={labelClass}>
                  희망 일정
                </label>
                <input
                  id="schedule"
                  type="text"
                  value={form.schedule}
                  onChange={update('schedule')}
                  placeholder="예: 8월 안에 오픈하고 싶어요"
                  className={`mt-1.5 ${inputClass} border-hairline-input`}
                />
              </div>
              <div>
                <label htmlFor="style" className={labelClass}>
                  어떤 느낌의 사이트가 필요한지
                </label>
                <textarea
                  id="style"
                  rows={5}
                  value={form.style}
                  onChange={update('style')}
                  placeholder="예: 동네 빵집인데, 따뜻하고 정갈한 느낌으로 메뉴와 예약 안내가 들어갔으면 해요"
                  className={`mt-1.5 resize-y ${inputClass} border-hairline-input`}
                />
              </div>
            </div>

            {/* button-primary-pill — 폼당 filled 버튼 하나 */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                {sending ? '보내는 중…' : '문의 보내기'}
              </button>
              {sendError && (
                <p role="alert" className={errorTextClass}>
                  전송에 실패했어요. 잠시 후 다시 시도하시거나, 인스타그램
                  DM으로 연락 주세요.
                </p>
              )}
            </div>
          </form>
        )}

        {/* 다른 문의 채널 */}
        <aside className="space-y-4">
          <div className="card-lift rounded-xl border border-hairline bg-canvas p-6 shadow-level-1 sm:p-8">
            <span className="rounded-full bg-primary-subdued px-2 py-1 text-[11px] font-normal leading-[1.15] tracking-[0.1px] text-primary-deep">
              빠른 답변
            </span>
            <h2 className="mt-4 text-[20px] font-medium leading-[1.4] tracking-[-0.2px] text-ink">
              인스타그램 DM
            </h2>
            <p className="mt-2 break-keep text-[15px] font-normal leading-[1.4] text-ink-secondary">
              폼 작성이 번거로우시면 DM으로 편하게 물어보세요.
            </p>
            <div className="mt-5">
              <a
                href="https://www.instagram.com/doori_web"
                target="_blank"
                rel="noreferrer"
                className="group link-cta text-[14px]"
              >
                DM 보내기
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="card-lift rounded-xl bg-canvas-cream p-6 text-ink sm:p-8">
            <h2 className="text-[20px] font-medium leading-[1.4] tracking-[-0.2px] text-ink">
              이메일
            </h2>
            <p className="mt-2 break-keep text-[15px] font-normal leading-[1.4] text-ink-secondary">
              참고 자료를 함께 보내주시면 더 구체적으로 답변드릴 수 있습니다.
            </p>
            <p className="mt-4 text-[13px] font-normal tracking-[-0.39px] text-ink-secondary">
              {CONTACT_EMAIL}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Contact
