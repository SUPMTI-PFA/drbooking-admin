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