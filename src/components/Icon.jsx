
function Icon({ name, ...props }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    chevron: <path d="m8 4 8 8-8 8" />,
    phone: <path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c0 3-2 5-5 4C8 19 5 16 3 8 2 5 4 3 7 3Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    facebook: <path d="M14 22V13h3l1-4h-4V6c0-1 .5-2 2-2h2V1h-3c-4 0-5 2-5 5v3H7v4h3v9" />,
    youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 6 3-6 3Z" /></>,
    close: <path d="m5 5 14 14M5 19 19 5" />,
    pause: <path d="M9 5v14M15 5v14" />,
    play: <path d="m8 4 12 8-12 8Z" />,
    up: <path d="M12 20V4m-6 6 6-6 6 6" />,
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  )
}

export default Icon
