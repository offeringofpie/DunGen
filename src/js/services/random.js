/**
 * Creates a pseudo-random value generator. The seed must be an integer.
 *
 * Uses an optimized version of the Park-Miller PRNG.
 * http://www.firstpr.com.au/dsp/rand31/
 */
export class Random {
  constructor(seed = Math.random()) {
    this.input = seed;
    this.seed = this._convert(seed);
    if (this.seed <= 0) this.seed += 2147483646;
  }

  _convert(rawSeed) {
    return rawSeed.toString().split('').map((l,i) => rawSeed.toString().charCodeAt(i)).join('') % 2147483647;
  }

  getSeed() {
    return this.input;
  }

  setSeed(newSeed) {
    this.input = newSeed;
    this.seed = this._convert(newSeed);
  }

  /**
   * Returns a pseudo-random value between 1 and 2^32 - 2.
   */
  next() {
    this.seed = this.seed * 16807 % 2147483647;
    return this.seed;
  }

  /**
   * Returns a pseudo-random floating point number in range [0, 1].
   */
  nextFloat() {
    return (this.next() - 1) / 2147483646;
  }
}

  /**
   * Box–Muller transform
   *
   * @return  {[type]}  [return description]
   */
export function boxMuller(val) {
  const u = Math.random();
  const v = Math.random();
  return Math.max(Math.min(Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v), val), -val);
}

export function closest(val, div) {
  return Math.ceil(val/div)*div;
  // return val + ((div - (val % div)) % div);
}

/**
 * Linear Interpolation
 *
 * @param   {number}  v0  First value
 * @param   {number}  v1  Second value
 * @param   {number}  t   Step
 *
 * @return  {number}      Returns the step value between v0 and v1
 */
export function lerp(v0, v1, t=Math.random()) {
  return (1 - t) * v0 + t * v1;
}

export function distance([x0,y0],[x1,y1]) {
  var dx = x0 - x1;
  var dy = y0 - y1;
  return sqrt(dx * dx + dy * dy);
}

export function intersect(r1, r2, spaceBetween = 0) {
  if (typeof r2 === 'undefined') return false;
  return !(r2.x > (r1.x + r1.w + spaceBetween) ||
           (r2.x + r2.w + spaceBetween) < r1.x || 
           r2.y > (r1.y + r1.h + spaceBetween) ||
           (r2.y + r2.h + spaceBetween) < r1.y);
}