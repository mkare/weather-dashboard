export const msToKmh = (ms: number) => (ms * 3.6).toFixed(1);

export const celsiusToFahrenheit = (celsius: number) => {
  return ((celsius * 9) / 5 + 32).toFixed(1);
};

export const msToMph = (ms: number) => (ms * 2.23694).toFixed(1);

export const getWeatherIcon = (icon: string) => {
  const iconCode = icon.slice(0, -1);
  const iconType = ['03', '04', '09', '11', '13', '50'].some((prefix) => icon.startsWith(prefix))
    ? 'd'
    : icon.endsWith('d')
    ? 'd'
    : 'n';
  return `/weather-icons/${iconCode}${iconType}.svg`;
};

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[çÇ]/g, 'c')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o')
    .replace(/[şŞ]/g, 's')
    .replace(/[üÜ]/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
