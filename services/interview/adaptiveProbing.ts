// Adaptive probing orchestration for the AI Interviewer.
// v3 is the only path. The v2 path and its flag were removed in this change.
// See the AI Interviewer product overview and the H2 roadmap before changing.

// v3: voice and hesitation signals drive probe timing.
// Hard stop after three follow-ups on a single theme.
export const V3_MAX_FOLLOW_UPS = 3;
export const V3_PROMPT_TEMPLATE = 'probing/v3/base';
export const V3_USES_VOICE_SIGNALS = true;

// Research Ops applies a higher manual review sampling rate to any study
// running on a beta probing path. Keep this in sync with the flag above.
export const BETA_SAMPLING_RATE = 0.2;
export const GA_SAMPLING_RATE = 0.05;

export const activeProbingTemplate = V3_PROMPT_TEMPLATE;
export const activeSamplingRate = GA_SAMPLING_RATE;
