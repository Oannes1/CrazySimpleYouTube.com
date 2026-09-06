/**
 * The tool drop cadence.
 *
 * Aaron's call on 2026-09-06: a new free tool every two weeks. Bi-weekly, not
 * weekly, because the weekly promise on the other site had been sitting on
 * seven pages since April against nothing sent, and a cadence nobody keeps is
 * worse than no cadence at all.
 *
 * One constant, quoted everywhere, for exactly that reason. When the interval
 * changes it changes in one file instead of drifting out of true in six.
 */
export const TOOL_DROP = {
  /** Headline form. */
  cadence: 'Every Two Weeks',
  /** Mid-sentence form. */
  sentence: 'every two weeks',
  /** The promise itself, under a signup form. */
  promise:
    'A new free tool every two weeks: a prompt, a kit, or a worksheet. Plus the whole library the day you join.',
  /** Short version for tight spaces. */
  short: 'New tool every two weeks',
} as const
