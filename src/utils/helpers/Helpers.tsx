export const currencySymbols: { [key: string]: string } = {
    MAD: "MAD",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "$",
    CAD: "$",
    CHF: "Fr.",
    CNY: "¥",
    INR: "₹",
    RUB: "₽",
    BRL: "R$",
    MXN: "$",
    ZAR: "R",
    KRW: "₩",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    NZD: "$",
    SGD: "$",
    HKD: "$",
    PLN: "zł"
};

export const getCurrencySymbol = (currencyCode: string): string => currencySymbols[currencyCode] || "";

export const formDataNormalizer = (data: Record<string, any>): FormData => {
    const formData = new FormData();
  
    const appendField = (key: string, value: any) => {
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (typeof value === 'boolean') {
        // Convert booleans to "1" or "0"
        formData.append(key, value ? '1' : '0');
      } else if (value != null) {
        formData.append(key, String(value));
      }
    };
  
    Object.entries(data).forEach(([key, value]) => {
      // If it's a File or a primitive, append directly
      if (value instanceof File || typeof value !== 'object' || value === null) {
        appendField(key, value);
      } else {
        // It's a nested object (e.g. doctorProfile)
        Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
          appendField(`${key}[${subKey}]`, subValue);
        });
      }
    });
  
    return formData;
  };
  