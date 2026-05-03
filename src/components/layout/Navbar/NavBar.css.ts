import { style } from '@vanilla-extract/css'

const navItemBase = {
  display: 'inline-flex',
  minHeight: '40px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  color: '#ddd',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  transition: 'background 0.2s ease, color 0.2s ease, transform 0.2s ease',
} as const

export const navbarInner = style({
  display: 'flex',
  width: '100%',
  maxWidth: '1180px',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
  margin: '0 auto',
})

export const brand = style({
  display: 'inline-flex',
  minWidth: 0,
  alignItems: 'center',
  gap: '12px',
})

export const brandLogo = style({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  objectFit: 'cover',
  boxShadow: '0 0 22px rgba(183, 132, 247, 0.36)',
})

export const brandText = style({
  background: 'linear-gradient(135deg, #fff, #c4b5fd)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  fontSize: '15px',
  fontWeight: 800,
  letterSpacing: '0.08em',
  whiteSpace: 'nowrap',
})

export const desktopNav = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '8px',

  '@media': {
    '(max-width: 900px)': {
      display: 'none',
    },
  },
})

export const navLink = style({
  ...navItemBase,
  padding: '0 14px',

  selectors: {
    '&:hover': {
      background: 'rgba(147, 51, 234, 0.22)',
      color: '#fff',
      transform: 'translateY(-1px)',
    },
  },
})

export const activeNavLink = style({
  background: 'rgba(147, 51, 234, 0.26)',
  color: '#fff',
})

export const dropdown = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
})

export const dropdownTrigger = style({
  ...navItemBase,
  gap: '6px',
  padding: '0 14px',
  border: 0,
  background: 'transparent',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      background: 'rgba(147, 51, 234, 0.22)',
      color: '#fff',
      transform: 'translateY(-1px)',
    },
  },
})

export const serviceChevron = style({
  transition: 'transform 0.2s ease',

  selectors: {
    [`${dropdown}:hover &`]: {
      transform: 'rotate(180deg)',
    },
    [`${dropdown}:focus-within &`]: {
      transform: 'rotate(180deg)',
    },
  },
})

export const dropdownMenu = style({
  position: 'absolute',
  top: 'calc(100% + 12px)',
  right: 0,
  display: 'grid',
  width: '230px',
  gap: '4px',
  padding: '10px',
  border: '1px solid rgba(255, 255, 255, 0.16)',
  borderRadius: '12px',
  background: 'rgba(13, 0, 26, 0.96)',
  boxShadow: '0 18px 44px rgba(0, 0, 0, 0.45)',
  backdropFilter: 'blur(18px)',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(8px)',
  pointerEvents: 'none',
  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease',

  selectors: {
    [`${dropdown}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)',
      pointerEvents: 'auto',
    },
    [`${dropdown}:focus-within &`]: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)',
      pointerEvents: 'auto',
    },
  },
})

export const dropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  minHeight: '40px',
  padding: '0 12px',
  borderRadius: '8px',
  color: '#ddd',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  transition: 'background 0.2s ease, color 0.2s ease',

  selectors: {
    '&:hover': {
      background: 'rgba(147, 51, 234, 0.24)',
      color: '#fff',
    },
  },
})

export const navActions = style({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '6px',
})

export const accountButton = style({
  ...navItemBase,
  gap: '8px',
  padding: '0 16px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  background: 'rgba(255, 255, 255, 0.1)',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.16)',
      color: '#fff',
      transform: 'translateY(-1px)',
    },
  },
})

export const mobileMenuButton = style({
  display: 'none',
  width: '42px',
  height: '42px',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.08)',
  color: '#fff',
  cursor: 'pointer',

  '@media': {
    '(max-width: 900px)': {
      display: 'inline-flex',
    },
  },
})

export const mobilePanel = style({
  position: 'absolute',
  top: '72px',
  left: 0,
  right: 0,
  display: 'grid',
  gap: '14px',
  padding: '14px 16px 18px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  background: 'rgba(13, 0, 26, 0.98)',
  boxShadow: '0 18px 44px rgba(0, 0, 0, 0.38)',
  backdropFilter: 'blur(18px)',

  '@media': {
    '(min-width: 901px)': {
      display: 'none',
    },
  },
})

export const mobileMenuHeader = style({
  color: '#b8b8d4',
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
})

export const mobileMenu = style({
  display: 'grid',
  gap: '4px',
})
