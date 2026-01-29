function snakeToCamel(str: string) {
  return str.replace(/_([a-z])/g, (_, char) =>
    char.toUpperCase()
  );
}

export function mapKeysToCamel<T>(data: any): T {
  if (Array.isArray(data)) {
    return data.map(mapKeysToCamel) as T;
  }

  if (data !== null && typeof data === "object") {
    const mapped: any = {};

    for (const key in data) {
      mapped[snakeToCamel(key)] = mapKeysToCamel(
        data[key]
      );
    }

    return mapped;
  }

  return data;
}
