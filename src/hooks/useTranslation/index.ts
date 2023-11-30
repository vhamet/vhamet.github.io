import { useLocalStorage } from "../useStorage";
import translations from "./translations";

const useTranslation = () => {
  const [language, setLanguage] = useLocalStorage("language", "en");
  const [fallbackLanguage, setFallbackLanguage] = useLocalStorage(
    "fallbackLanguage",
    "en"
  );

  const translate = (key: string) => {
    const keys = key.split(".");

    return (
      getNestedTranslation(language!, keys) ??
      getNestedTranslation(fallbackLanguage!, keys) ??
      key
    );
  };

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  };
};

type TranslationContent = {
  [key: string]: string | TranslationContent;
};
const getNestedTranslation = (key: string, keys: string[]): string => {
  let res: string | TranslationContent = translations;
  keys.forEach((k: string) => {
    res = typeof res === "string" ? res : res[k];
  });
  let translation: string;
  if (typeof res === "string") translation = res;
  else translation = key;

  return translation;
};

export default useTranslation;
