// Corner icon telling visitors a card is clickable:
// external = opens another site, internal = opens a page here, expand = shows details.
const ICONS = {
  external: <path d='M7 17L17 7M9 7h8v8' />,
  internal: <path d='M5 12h14M13 6l6 6-6 6' />,
  expand: <path d='M12 5v14M5 12h14' />,
}

const CardBadge = ({ type = 'internal', open = false }) => (
  <span
    aria-hidden='true'
    className='pointer-events-none absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-[#1e50bd] group-hover:border-[#6fa3f3]'
  >
    <svg
      viewBox='0 0 24 24'
      className={`h-[18px] w-[18px] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
      fill='none'
      stroke='currentColor'
      strokeWidth='2.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {ICONS[type]}
    </svg>
  </span>
)

export default CardBadge
