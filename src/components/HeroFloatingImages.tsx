import { motion } from 'motion/react'

import Floating, { FloatingElement } from '@/components/ui/parallax-floating'

/* 사용자가 고른 웹 제작 테마 이미지 (Unsplash, 저작권 리스크 낮음) */
const exampleImages = [
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    title: 'Web Coding & Development',
  },
  {
    url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop',
    title: 'UI UX Wireframing',
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    title: 'Analytics Dashboard',
  },
  {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    title: 'Digital Network Infrastructure',
  },
  {
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    title: 'Web Design Workspace',
  },
  {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    title: 'Abstract Gradient Art',
  },
  {
    url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop',
    title: 'Responsive Layout Sketch',
  },
  {
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
    title: '3D Geometry Render',
  },
  {
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    title: 'Data Matrix Code',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    title: 'Modern Architecture Pattern',
  },
]

/* 카드 하나 — 위치/크기/이미지/깊이 */
type Card = {
  img: number
  depth: number
  className: string
}

const CARDS: Card[] = [
  // 상단 라인
  { img: 0, depth: 0.5, className: 'left-[3%] top-[6%] h-16 w-16 md:h-24 md:w-24' },
  { img: 6, depth: 1, className: 'left-[19%] top-[13%] h-20 w-20 md:h-28 md:w-28' },
  { img: 3, depth: 1, className: 'left-[86%] top-[7%] h-24 w-24 md:h-32 md:w-32' },
  // 좌우 측면
  { img: 4, depth: 1.5, className: 'left-[1%] top-[46%] h-24 w-24 md:h-36 md:w-36' },
  { img: 2, depth: 2, className: 'left-[72%] top-[40%] h-24 w-32 md:h-32 md:w-44' },
  // 하단 라인
  { img: 5, depth: 3, className: 'left-[10%] top-[74%] h-28 w-36 md:h-36 md:w-52' },
  { img: 8, depth: 1, className: 'left-[45%] top-[82%] h-20 w-20 md:h-28 md:w-28' },
  { img: 7, depth: 2, className: 'left-[82%] top-[70%] h-24 w-24 md:h-36 md:w-36' },
]

/* 히어로 배경 — 마우스를 따라 은은하게 움직이는 패럴랙스 이미지 레이어.
   가장자리 위주로 배치 + 낮은 투명도 + 중앙 흰색 베일로 텍스트·카드 가독성 확보.
   (aria-hidden + pointer-events-none: 순수 장식, 클릭을 막지 않음) */
function HeroFloatingImages() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Floating sensitivity={-0.7} easingFactor={0.08}>
        {CARDS.map((card, i) => (
          <FloatingElement key={i} depth={card.depth} className={card.className}>
            <img
              src={exampleImages[card.img].url}
              alt=""
              draggable={false}
              className="h-full w-full rounded-2xl object-cover opacity-[0.55] shadow-[rgba(0,55,112,0.10)_0_8px_24px] md:opacity-[0.65]"
            />
          </FloatingElement>
        ))}
      </Floating>

      {/* 중앙 흰색 베일 — 텍스트/카드 영역의 대비 확보 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(72% 62% at 50% 44%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 52%, rgba(255,255,255,0) 100%)',
        }}
      />
    </motion.div>
  )
}

export default HeroFloatingImages
