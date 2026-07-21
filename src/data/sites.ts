/*
  제작 사이트 등록부.
  사이트를 새로 만들면 아래 배열에 한 항목씩 추가하세요.

  - title: 사이트 이름
  - desc: 한두 문장 소개
  - url: 사이트 주소 (https://... 는 새 탭으로 열림, /로 시작하면 내부 이동)
  - tags: 카드에 표시할 작은 태그들 (업종, 기술 등)
  - thumbnail: (선택) 스크린샷 이미지 — public 폴더에 넣고 '/파일명.png' 로 지정.
               없으면 브랜드 그라디언트 플레이스홀더가 표시됩니다.
*/
export type Site = {
  title: string
  desc: string
  url: string
  tags: string[]
  thumbnail?: string
}

export const SITES: Site[] = [
  {
    title: '두리 — 웹 제작 섭외 사이트',
    desc: '지금 보고 계신 이 사이트입니다. 상담 접수부터 제작·배포까지의 흐름을 그대로 담았습니다.',
    url: '/',
    tags: ['소개 사이트', 'React'],
  },
  // 예시 — 새 사이트를 등록할 때 이 형식을 복사하세요:
  // {
  //   title: '○○ 베이커리',
  //   desc: '동네 빵집의 메뉴와 예약 안내를 담은 사이트.',
  //   url: 'https://example.com',
  //   tags: ['소상공인', '예약'],
  //   thumbnail: '/works/bakery.png',
  // },
]
