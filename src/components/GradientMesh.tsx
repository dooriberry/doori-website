/* Gradient Mesh Backdrop — DESIGN.md 시그니처.
   Stripe 홈페이지처럼 사선(skew)으로 흐르는 파스텔 워시:
   cream → sherbet orange → lavender → indigo → magenta → ruby.
   위쪽 1/3을 덮고 아래로 갈수록 캔버스 화이트로 잦아든다. */
function GradientMesh() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden"
    >
      {/* 사선 워시 밴드 */}
      <div
        className="absolute -top-[260px] left-[-12%] right-[-12%] h-[600px] origin-top-left -skew-y-6"
        style={{
          background: [
            'linear-gradient(94deg,',
            '#f5e9d4 0%,',
            'rgba(255, 201, 143, 0.8) 16%,',
            'rgba(185, 185, 249, 0.9) 40%,',
            'rgba(102, 94, 253, 0.55) 62%,',
            'rgba(249, 107, 238, 0.45) 80%,',
            'rgba(234, 34, 97, 0.3) 100%)',
          ].join(' '),
        }}
      />
      {/* 은은하게 — 파스텔 톤으로 가라앉히는 화이트 베일 */}
      <div className="absolute inset-0 bg-white/40" />
      {/* 하이라이트 — 좌상단 크림, 중앙 라벤더 부드러운 부풀림 */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(48% 55% at 8% 0%, rgba(245, 233, 212, 0.9) 0%, rgba(245, 233, 212, 0) 100%)',
            'radial-gradient(42% 50% at 58% 6%, rgba(185, 185, 249, 0.5) 0%, rgba(185, 185, 249, 0) 100%)',
            'radial-gradient(30% 42% at 92% 16%, rgba(102, 94, 253, 0.28) 0%, rgba(102, 94, 253, 0) 100%)',
          ].join(', '),
        }}
      />
      {/* 아래로 갈수록 캔버스 화이트로 복귀 */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent to-canvas" />
    </div>
  )
}

export default GradientMesh
