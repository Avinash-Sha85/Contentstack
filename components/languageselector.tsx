import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getLocals } from "../contentstack-sdk";

interface Locale {
  code: string;
  name: string;
}

const LanguageSelector = () => {
  const [locales, setLocales] = useState<Locale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { locale: currentLocale, asPath } = router;

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const data = await getLocals();
        // convert to uppercase to match Next.js
        const normalizedLocales = data.map((loc) => ({
          code: loc.code.toLowerCase(), // consistent lower-case
          name: loc.name,
        }));
        setLocales(normalizedLocales);
      } catch (err) {
        setError("Failed to load languages.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocales();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = e.target.value;
    router.push(asPath, asPath, { locale: selectedLocale });
  };

  return (
    <div className="LanguageSelector">
      <div className="language-selector">
        {loading ? (
          <p>Loading languages...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <select
            aria-label="Language selector"
            className="w-[200] p-2 border border-gray-300 rounded-[4px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={currentLocale?.toLowerCase()}
          >
            {locales.map((loc) => (
              <option key={loc.code} value={loc.code}>
                {loc.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
