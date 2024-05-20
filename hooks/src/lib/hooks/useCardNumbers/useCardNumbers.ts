import { useState } from "react";

import { INPUT_REGEX_PARAMS } from "../../constants/regex";
import { MAX_LENGTH_ERROR_MESSAGE } from "../../constants/errorMessage";

function useCardNumbers() {
  const [cardNumbers, setCardNumbers] = useState("");
  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardBrand, setCardBrand] = useState("domestic");
  const [cardNumberMaxLength, setCardNumberMaxLength] = useState(16);
  const [formattedCardNumbers, setFormattedCardNumbers] = useState("");

  /**
   * @example checkCardBrand("4") // visa
   * @example checkCardBrand("51 ~ 55") // masterCard
   * @example checkCardBrand("36") // diners
   * @example checkCardBrand("34") // amex
   * @example checkCardBrand("37") // amex
   * @example checkCardBrand("624 ~ 626") // unionPay
   * @example checkCardBrand("6282 ~ 6288") // unionPay
   * @example checkCardBrand("622126 ~ 622925") // unionPay
   *
   * @param value input으로 들어오는 string
   */
  const checkCardBrand = (value: string) => {
    const cardBrand = getCardBrand(value);
    const maxLength = getCardNumbersMaxLength(cardBrand);

    setCardBrand(cardBrand);
    setCardNumberMaxLength(maxLength);
  };

  const getCardBrand = (value: string): string => {
    const prefixes = getCardPrefixes(value);

    if (value.startsWith("4")) return "visa";
    if (prefixes.two >= 51 && prefixes.two <= 55) return "masterCard";
    if (prefixes.two === 36) return "diners";
    if (prefixes.two === 34 || prefixes.two === 37) return "amex";
    if (
      (prefixes.three >= 624 && prefixes.three <= 626) ||
      (prefixes.four >= 6282 && prefixes.four <= 6288) ||
      (prefixes.six >= 622126 && prefixes.six <= 622925)
    )
      return "unionPay";

    return "domestic";
  };

  const getCardPrefixes = (value: string) => ({
    two: Number(value.substring(0, 2)),
    three: Number(value.substring(0, 3)),
    four: Number(value.substring(0, 4)),
    six: Number(value.substring(0, 6)),
  });

  const getCardNumbersMaxLength = (cardBrand: string): number => {
    switch (cardBrand) {
      case "diners":
        return 14;
      case "amex":
        return 15;
      case "visa":
      case "masterCard":
      case "unionPay":
      default:
        return 16;
    }
  };

  const handleCardNumbersChange = (value: string) => {
    checkCardBrand(value);

    const isValidNumber =
      INPUT_REGEX_PARAMS.cardNumber(cardNumberMaxLength).test(value);
    setCardNumberError(!isValidNumber);
    setCardNumbers(value);

    formatCardNumbers(value, cardBrand);
  };

  const formatCardNumbers = (value: string, cardBrandValue: string) => {
    const formattedValue = handleCardNumbersFormat(value, cardBrandValue);
    setFormattedCardNumbers(formattedValue.trim());
  };

  const handleCardNumbersFormat = (
    value: string,
    cardBrandValue: string
  ): string => {
    const formattedValue = {
      first: "",
      second: "",
      third: "",
      last: "",
    };
    if (cardBrandValue === "diners" || cardBrandValue === "amex") {
      formattedValue.first = value.substring(0, 4);
      formattedValue.second = value.substring(4, 10);
      formattedValue.third = value.substring(10);
    } else {
      formattedValue.first = value.substring(0, 4);
      formattedValue.second = value.substring(4, 8);
      formattedValue.third = value.substring(8, 12);
      formattedValue.last = value.substring(12);
    }
    return Object.values(formattedValue).join(" ");
  };

  const getCardNumbersErrorMessage = (): string | null => {
    return cardNumberError
      ? MAX_LENGTH_ERROR_MESSAGE(cardNumberMaxLength)
      : null;
  };

  return {
    cardNumbers,
    formattedCardNumbers,
    cardNumberMaxLength,
    cardBrand,
    cardNumberError,
    getCardNumbersErrorMessage,
    handleCardNumbersChange,
  };
}

export default useCardNumbers;
