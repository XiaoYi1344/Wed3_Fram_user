declare module 'aos' {
  const AOS: {
    init: (options?: {
      duration?: number
      delay?: number
      once?: boolean
      offset?: number
      easing?: string
      mirror?: boolean
      anchorPlacement?: string
    }) => void
    refresh: () => void
    refreshHard: () => void
  }

  export default AOS
}
