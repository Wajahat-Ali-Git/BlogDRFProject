const DEFAULT_LOCALE = "en-US";

const resolveLocale = (language: string | undefined | null): string => {
  if (!language) return DEFAULT_LOCALE;

  // If caller passes a full locale already (e.g. "en-US"), keep it.
  if (language.includes("-")) return language;

  // Map app language codes -> BCP-47 locales (best-effort)
  switch (language) {
    case "en":
      return "en-US";
    case "ur":
      return "ur-PK";
    case "ar":
      return "ar-SA";
    case "hi":
      return "hi-IN";
    case "zh":
      return "zh-CN";
    default:
      return DEFAULT_LOCALE;
  }
};

const pickVoice = (locale: string): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;

  const base = locale.split("-")[0]?.toLowerCase();

  return (
    voices.find((v) => v.lang.toLowerCase() === locale.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(`${base}-`)) ||
    voices.find((v) => v.lang.toLowerCase() === base) ||
    voices[0]
  );
};

export const stopSpeaking = () => {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
};

export const speak = (text: string, language: string = "en") => {
  if (typeof window === "undefined") return;
  if (!text.trim()) return;
  if (
    !("speechSynthesis" in window) ||
    !("SpeechSynthesisUtterance" in window)
  ) {
    console.warn("Text-to-speech is not supported in this browser.");
    return;
  }

  const locale = resolveLocale(language);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = locale;

  // Try to choose a matching voice if available (depends on OS/browser).
  const voice = pickVoice(locale);
  if (voice) utterance.voice = voice;

  // Restart speech cleanly.
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};
