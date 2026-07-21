import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import logoSquare from '../assets/logo-duri.svg'
import logoHorizontal from '../assets/logo-duri-horizontal.svg'

/* 비밀번호·열쇠는 .env 파일에서 관리 */
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin1234'
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || ''
const AUTH_KEY = 'duri-admin-auth'

/* 문의 데이터 주소 — Contact.tsx의 전송 주소와 같은 웹 앱 (읽기는 doGet) */
const SHEET_API_URL =
  'https://script.google.com/macros/s/AKfycbxoFCUue1953WXwXt5B7UUWYxCUkqylCi7TuWF0yRbOkrKms1rTlwDdkuxF5btdRcTZxA/exec'

/* text-input — DESIGN.md 스펙 */
const inputClass =
  'w-full rounded-[6px] border border-hairline-input bg-canvas px-3.5 py-2.5 text-[15px] font-light leading-[1.4] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-mute focus:border-primary focus:shadow-[0_0_0_4px_rgba(83,58,253,0.08)] focus:outline-none'

/* ── 비밀번호 입력 화면 ── */
function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'ok')
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas-soft px-6">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-hairline bg-canvas p-8 shadow-level-2"
        >
          <img src={logoSquare} alt="두리" className="mx-auto h-14 w-14" />
          <h1 className="mt-5 text-center text-[22px] font-light leading-[1.1] tracking-[-0.22px] text-ink">
            관리자 로그인
          </h1>
          <p className="mt-2 text-center text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
            관리자 전용 페이지입니다.
          </p>

          <div className="mt-7">
            <label
              htmlFor="admin-password"
              className="block text-[13px] font-normal tracking-[-0.39px] text-ink-mute"
            >
              비밀번호
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="비밀번호를 입력하세요"
              autoFocus
              className={`mt-1.5 ${inputClass} ${error ? 'border-ruby' : ''}`}
              aria-invalid={error}
            />
            {error && (
              <p
                role="alert"
                className="mt-1.5 text-[13px] font-normal tracking-[-0.39px] text-ruby"
              >
                비밀번호가 올바르지 않습니다
              </p>
            )}
          </div>

          <button type="submit" className="btn-primary mt-6 w-full">
            로그인
          </button>
        </form>

        <p className="mt-6 text-center">
          <Link to="/" className="group link-cta text-[14px]">
            ← 사이트로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  )
}

/* ── 문의 목록 ── */
type Inquiry = {
  row: number
  submittedAt: string
  company: string
  name: string
  phone: string
  schedule: string
  style: string
  email: string
  status: string
}

const STATUSES = ['신규 문의', '연락중', '답변 완료', '보류'] as const

/* 상태 뱃지 — DESIGN.md 팔레트 안에서만 */
const STATUS_BADGE: Record<string, string> = {
  '신규 문의': 'bg-primary-subdued text-primary-deep',
  연락중: 'bg-canvas-cream text-lemon',
  '답변 완료': 'bg-canvas-soft text-ink-mute ring-1 ring-inset ring-hairline',
  보류: 'bg-ruby/10 text-ruby',
}

/* 드롭다운 화살표 (회색 셰브론) */
const CHEVRON_BG = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5' viewBox='0 0 8 5'%3E%3Cpath d='M1 1l3 3 3-3' fill='none' stroke='%2364748d' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
} as const

function normalizeStatus(raw: string): string {
  const s = raw.trim()
  return (STATUSES as readonly string[]).includes(s) ? s : '신규 문의'
}

function formatDate(iso: string): string {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '-'
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function InquiryTable() {
  const [rows, setRows] = useState<Inquiry[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingRow, setSavingRow] = useState<number | null>(null)
  const [actionError, setActionError] = useState('')
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replySending, setReplySending] = useState(false)
  const [replyResult, setReplyResult] = useState<{
    ok: boolean
    msg: string
  } | null>(null)

  /* 선택된 문의 — 목록이 갱신돼도 최신 상태를 따라감 */
  const selected = rows?.find((r) => r.row === selectedRow) ?? null

  /* 다른 문의를 선택하면 답장 입력을 초기화 */
  useEffect(() => {
    setReplyText('')
    setReplyResult(null)
  }, [selectedRow])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `${SHEET_API_URL}?key=${encodeURIComponent(ADMIN_API_KEY)}&t=${Date.now()}`,
      )
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'load failed')
      /* 접수일시 최신순 정렬 */
      const sorted = [...(data.rows as Inquiry[])].sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
      )
      setRows(sorted)
    } catch {
      setError(
        '문의 목록을 불러오지 못했어요. 구글 스크립트가 최신 버전(v4)으로 배포되어 있는지 확인해주세요.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  /* 상태 변경 — 화면 먼저 바꾸고(즉시 반응), 실패하면 되돌립니다 */
  const changeStatus = async (inq: Inquiry, newStatus: string) => {
    /* 옛 버전 스크립트로 불러온 목록에는 줄 번호가 없음 → 목록을 새로 받아온다 */
    if (!inq.row) {
      setActionError('목록 정보를 새로 불러왔어요. 다시 시도해주세요.')
      load()
      return
    }
    const prevStatus = inq.status
    setActionError('')
    setSavingRow(inq.row)
    setRows((rs) =>
      rs ? rs.map((r) => (r.row === inq.row ? { ...r, status: newStatus } : r)) : rs,
    )
    try {
      const res = await fetch(SHEET_API_URL, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'updateStatus',
          key: ADMIN_API_KEY,
          row: String(inq.row),
          submittedAt: inq.submittedAt,
          status: newStatus,
        }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'update failed')
    } catch (err) {
      setRows((rs) =>
        rs ? rs.map((r) => (r.row === inq.row ? { ...r, status: prevStatus } : r)) : rs,
      )
      if (err instanceof Error && err.message === 'stale') {
        setActionError('시트 내용이 바뀐 것 같아 목록을 다시 불러왔어요.')
        load()
      } else {
        setActionError('상태 변경에 실패했어요. 잠시 후 다시 시도해주세요.')
      }
    } finally {
      setSavingRow(null)
    }
  }

  /* 답장 발송 — 성공 시 상태를 '답변 완료'로, 실패 시 상태 유지 */
  const sendReply = async (inq: Inquiry) => {
    if (!replyText.trim()) {
      setReplyResult({ ok: false, msg: '답장 내용을 입력해주세요.' })
      return
    }
    setReplySending(true)
    setReplyResult(null)
    try {
      const res = await fetch(SHEET_API_URL, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'sendReply',
          key: ADMIN_API_KEY,
          row: String(inq.row),
          submittedAt: inq.submittedAt,
          email: inq.email,
          company: inq.company,
          message: replyText,
        }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'send failed')
      /* 성공: 상태 자동 '답변 완료' + 입력 초기화 */
      setRows((rs) =>
        rs
          ? rs.map((r) =>
              r.row === inq.row ? { ...r, status: '답변 완료' } : r,
            )
          : rs,
      )
      setReplyText('')
      setReplyResult({ ok: true, msg: '답장을 성공적으로 보냈습니다' })
    } catch {
      setReplyResult({
        ok: false,
        msg: '답장 발송에 실패했어요. 잠시 후 다시 시도해주세요.',
      })
    } finally {
      setReplySending(false)
    }
  }

  /* 요약 통계 — 목록과 같은 데이터에서 집계 */
  const total = rows ? rows.length : null
  const newCount = rows
    ? rows.filter((r) => normalizeStatus(r.status) === '신규 문의').length
    : null
  const doneCount = rows
    ? rows.filter((r) => normalizeStatus(r.status) === '답변 완료').length
    : null

  /* 카드별 색 테마 — 회색 / 적색(루비) / 초록, 중간 농도의 은은한 틴트 */
  const STATS = [
    {
      label: '전체 문의',
      value: total,
      card: 'border-[#dfe5ec] bg-[#eef1f6]',
      labelCls: 'text-ink-mute',
      numCls: 'text-ink',
      circleCls: 'bg-[#dde3eb] text-[#64748d]',
      icon: (
        /* 메시지 */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      label: '신규 문의',
      value: newCount,
      card: 'border-[#f7d2df] bg-[#fdeaf0]',
      labelCls: 'text-[#c81e56]',
      numCls: 'text-ruby',
      circleCls: 'bg-[#f9d3e0] text-ruby',
      icon: (
        /* 알람벨 */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      label: '답변 완료',
      value: doneCount,
      card: 'border-[#d3e8dd] bg-[#e6f4ec]',
      labelCls: 'text-[#1b7f52]',
      numCls: 'text-[#157a4c]',
      circleCls: 'bg-[#d0e9dc] text-[#157a4c]',
      icon: (
        /* 체크 */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* 요약 통계 카드 — 색 테마 + 우상단 아이콘 서클, display 숫자(300/tnum) */}
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-start justify-between rounded-xl border p-6 shadow-level-1 sm:p-7 ${stat.card}`}
          >
            <div>
              <p
                className={`text-[13px] font-normal tracking-[-0.39px] ${stat.labelCls}`}
              >
                {stat.label}
              </p>
              {/* display-lg: 40px / 300 / 음수 자간 + tnum */}
              <p
                className={`mt-3 text-[40px] font-light leading-[1.05] tracking-[-0.8px] ${stat.numCls}`}
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                {stat.value === null ? '–' : stat.value}
                <span className={`ml-1.5 text-[15px] font-light tracking-normal opacity-70 ${stat.labelCls}`}>
                  건
                </span>
              </p>
            </div>
            {/* 우상단 아이콘 서클 */}
            <span
              aria-hidden="true"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${stat.circleCls}`}
            >
              {stat.icon}
            </span>
          </div>
        ))}
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-hairline bg-canvas shadow-level-1">
      <div className="flex items-center gap-3 border-b border-hairline px-6 py-4">
        {/* heading-sm */}
        <h2 className="text-[18px] font-light leading-[1.4] text-ink">
          문의 목록
        </h2>
        <span className="hidden text-[13px] font-normal tracking-[-0.39px] text-ink-mute sm:inline">
          — 줄을 클릭하면 상세 내용이 열립니다
        </span>
        {rows && (
          <span
            className="rounded-full bg-primary-subdued px-2.5 py-1 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {rows.length}건
          </span>
        )}
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="group link-cta ml-auto cursor-pointer text-[13px] disabled:cursor-wait disabled:opacity-50"
        >
          {loading ? '불러오는 중…' : '새로고침'}
        </button>
      </div>

      {actionError && (
        <p
          role="alert"
          className="border-b border-hairline px-6 py-3 text-[13px] font-normal tracking-[-0.39px] text-ruby"
        >
          {actionError}
        </p>
      )}

      {loading && (
        <p className="px-6 py-12 text-center text-[15px] font-light text-ink-mute">
          문의 목록을 불러오는 중이에요…
        </p>
      )}

      {!loading && error && (
        <p className="break-keep px-6 py-12 text-center text-[15px] font-light text-ruby">
          {error}
        </p>
      )}

      {!loading && !error && rows && rows.length === 0 && (
        <p className="px-6 py-12 text-center text-[15px] font-light text-ink-mute">
          아직 접수된 문의가 없어요.
        </p>
      )}

      {!loading && !error && rows && rows.length > 0 && (
        <div className="overflow-x-auto">
          {/* body-tabular — 14px / tnum (DESIGN.md 숫자 원칙) */}
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-hairline bg-canvas-soft">
                <th className="px-6 py-3 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
                  회사명
                </th>
                <th className="px-4 py-3 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
                  담당자명
                </th>
                <th className="px-4 py-3 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
                  상태
                </th>
                <th className="px-6 py-3 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
                  접수일시
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const status = normalizeStatus(row.status)
                return (
                  <tr
                    key={`${row.submittedAt}-${i}`}
                    onClick={() => setSelectedRow(row.row)}
                    className={`cursor-pointer border-b border-hairline transition-colors last:border-b-0 hover:bg-canvas-soft ${
                      selectedRow === row.row ? 'bg-canvas-soft' : ''
                    }`}
                  >
                    <td className="px-6 py-3.5 text-[14px] font-normal tracking-[-0.42px] text-ink">
                      {row.company || '-'}
                    </td>
                    <td className="px-4 py-3.5 text-[14px] font-light tracking-[-0.42px] text-ink-secondary">
                      {row.name || '-'}
                    </td>
                    <td
                      className="px-4 py-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* 뱃지가 곧 드롭다운 — 클릭해서 상태 변경, 시트에 자동 반영 */}
                      <select
                        value={status}
                        disabled={savingRow === row.row}
                        onChange={(e) => changeStatus(row, e.target.value)}
                        title="클릭해서 상태 변경"
                        aria-label={`${row.company} 문의 상태 변경`}
                        className={`cursor-pointer appearance-none whitespace-nowrap rounded-full border-0 py-1 pl-2.5 pr-6 text-[11px] font-normal leading-[1.15] tracking-[0.3px] transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-wait disabled:opacity-50 ${STATUS_BADGE[status]}`}
                        style={CHEVRON_BG}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-3.5 text-[14px] font-light tracking-[-0.42px] text-ink-mute"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {formatDate(row.submittedAt)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      </section>

      {/* 문의 상세 패널 — 줄 클릭 시 표시 */}
      {selected && (
        <section className="mt-6 overflow-hidden rounded-xl border border-hairline bg-canvas shadow-level-2">
          <div className="flex items-center gap-3 border-b border-hairline px-6 py-4">
            <h2 className="text-[18px] font-light leading-[1.4] text-ink">
              문의 상세
            </h2>
            <span
              className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-normal leading-[1.15] tracking-[0.3px] ${STATUS_BADGE[normalizeStatus(selected.status)]}`}
            >
              {normalizeStatus(selected.status)}
            </span>
            <button
              type="button"
              onClick={() => setSelectedRow(null)}
              className="link-cta ml-auto cursor-pointer text-[13px]"
            >
              닫기 ✕
            </button>
          </div>

          {/* 상세 내용 */}
          <div className="grid gap-x-10 gap-y-5 px-6 py-6 sm:grid-cols-2">
            {[
              { label: '기관/회사명', value: selected.company },
              { label: '담당자 성함', value: selected.name },
              { label: '연락처', value: selected.phone },
              { label: '이메일', value: selected.email },
              { label: '접수일시', value: formatDate(selected.submittedAt) },
              { label: '희망 일정', value: selected.schedule },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
                  {f.label}
                </p>
                <p className="mt-1 break-keep text-[15px] font-light leading-[1.5] text-ink">
                  {f.value || '-'}
                </p>
              </div>
            ))}
            <div className="sm:col-span-2">
              <p className="text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
                원하는 사이트 느낌
              </p>
              <p className="mt-1 whitespace-pre-wrap break-keep text-[15px] font-light leading-[1.6] text-ink">
                {selected.style || '-'}
              </p>
            </div>
          </div>

          {/* 답장 보내기 */}
          <div className="border-t border-hairline px-6 py-6">
            <h3 className="flex items-center gap-2.5 text-[18px] font-light leading-[1.4] text-ink">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              답장 보내기
            </h3>

            {selected.email ? (
              <>
                <p className="mt-2 break-keep text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
                  받는 사람: {selected.email} · 제목: Re: [
                  {selected.company || '문의'}] 문의 건 · 보내는 사람: 두리
                </p>
                <textarea
                  rows={6}
                  value={replyText}
                  onChange={(e) => {
                    setReplyText(e.target.value)
                    setReplyResult(null)
                  }}
                  placeholder={`안녕하세요, ${selected.name || '담당자'}님. 문의 주셔서 감사합니다.`}
                  className="mt-4 w-full resize-y rounded-[6px] border border-hairline-input bg-canvas px-3.5 py-2.5 text-[15px] font-light leading-[1.6] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-mute focus:border-primary focus:shadow-[0_0_0_4px_rgba(83,58,253,0.08)] focus:outline-none"
                />
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => sendReply(selected)}
                    disabled={replySending}
                    className="btn-primary disabled:cursor-wait disabled:opacity-60"
                  >
                    {replySending ? '보내는 중…' : '답장 보내기'}
                  </button>
                  {replyResult && (
                    <p
                      role={replyResult.ok ? 'status' : 'alert'}
                      className={`text-[13px] font-normal tracking-[-0.39px] ${
                        replyResult.ok ? 'text-[#157a4c]' : 'text-ruby'
                      }`}
                    >
                      {replyResult.msg}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="mt-3 break-keep text-[15px] font-light text-ink-mute">
                이 문의에는 이메일 주소가 없어 답장을 보낼 수 없어요. 연락처(
                {selected.phone || '-'})로 직접 연락해주세요.
              </p>
            )}
          </div>
        </section>
      )}
    </>
  )
}

/* ── 대시보드 바로가기 카드 ── */
const DASH_CARDS = [
  {
    title: '문의 관리',
    desc: '위 문의 목록에서 상태 뱃지를 클릭하면 바로 변경되고 구글 시트에도 자동 반영됩니다. 문의 상세 내용은 시트에서 확인하세요.',
    linkLabel: '구글 시트 열기',
    href: 'https://sheets.google.com',
  },
  {
    title: '메일 알림',
    desc: '관리자 알림: tlsrlgks1126@naver.com · 신청자에게는 접수 확인 메일이 자동 발송됩니다.',
    linkLabel: '네이버 메일 열기',
    href: 'https://mail.naver.com',
  },
  {
    title: '제작 사이트 등록',
    desc: '새 사이트가 완성되면 src/data/sites.ts 에 제목·주소·소개를 추가하면 카드가 자동 생성됩니다.',
    linkLabel: '제작 사이트 페이지 보기',
    href: '/works',
  },
]

/* ── 관리자 대시보드 ── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-canvas-soft">
      <header className="border-b border-hairline bg-canvas">
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-4">
          <img src={logoHorizontal} alt="두리" className="h-10 w-auto" />
          <span className="rounded-full bg-primary-subdued px-2.5 py-1 text-[11px] font-normal leading-[1.15] tracking-[0.3px] text-primary-deep">
            관리자
          </span>
          <div className="ml-auto flex items-center gap-5">
            <Link
              to="/"
              className="text-[14px] font-light text-ink-mute transition-colors hover:text-primary"
            >
              사이트 보기
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="btn-dark cursor-pointer text-[14px]"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-14">
        <h1 className="text-[26px] font-light leading-[1.1] tracking-[-0.26px] text-ink md:text-[32px] md:tracking-[-0.64px]">
          관리자 대시보드
        </h1>
        <p className="mt-2 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
          문의 확인과 사이트 관리를 한곳에서.
        </p>

        {/* 문의 목록 테이블 */}
        <InquiryTable />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {DASH_CARDS.map((card) => {
            const external = card.href.startsWith('http')
            return (
              <div
                key={card.title}
                className="card-lift flex flex-col rounded-xl border border-hairline bg-canvas p-7 shadow-level-1"
              >
                <h2 className="text-[20px] font-light leading-[1.35] tracking-[-0.2px] text-ink">
                  {card.title}
                </h2>
                <p className="mt-2.5 flex-1 break-keep text-[15px] font-light leading-[1.6] text-ink-secondary">
                  {card.desc}
                </p>
                <div className="mt-5">
                  {external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group link-cta text-[14px]"
                    >
                      {card.linkLabel}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  ) : (
                    <Link to={card.href} className="group link-cta text-[14px]">
                      {card.linkLabel}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 rounded-xl bg-canvas-cream p-7 text-ink">
          <h2 className="text-[18px] font-light leading-[1.4] text-ink">
            비밀번호 변경 방법
          </h2>
          <p className="mt-2 break-keep text-[15px] font-light leading-[1.6] text-ink-secondary">
            프로젝트 폴더의 <span className="font-normal text-ink">.env</span>{' '}
            파일을 열어{' '}
            <span className="font-normal text-ink">VITE_ADMIN_PASSWORD</span>{' '}
            값을 바꾼 뒤 저장하면 됩니다.
          </p>
        </div>
      </main>
    </div>
  )
}

/* ── /admin 진입점 ── */
function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'ok',
  )

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
  }

  return authed ? (
    <Dashboard onLogout={logout} />
  ) : (
    <Login onSuccess={() => setAuthed(true)} />
  )
}

export default Admin
