/* className 병합 유틸 — shadcn 컴포넌트 호환용 (조건부 클래스 조합) */
export function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(' ')
}
