import 'lazysizes'
import 'lazysizes/plugins/bgset/ls.bgset.js'
import 'lazysizes/plugins/parent-fit/ls.parent-fit.js'
import 'lazysizes/plugins/respimg/ls.respimg.js'
import TweenLite from 'gsap/all' // eslint-disable-line
import { ScrollToPlugin } from 'gsap/all' // eslint-disable-line
// needs to be referenced to avoid tree-shaking:
const avoidTreeShaking = [ScrollToPlugin] // eslint-disable-line

// import 'intersection-observer'
// IntersectionObserver.prototype.THROTTLE_TIMEOUT = 16
