
export const normalizeOptions = (options: any[]): string[] => {
  return options.map(option => {
    if (typeof option === 'string') {
      return option;
    } else if (typeof option === 'object' && option !== null) {
      return option.texto || JSON.stringify(option);
    }
    return String(option);
  });
};

export const API_URL = "http://localhost:8080";
