export default class Enum<T extends string | number, U extends Record<string, T>> {
    private values: Readonly<U>;
    private reverseValues: Readonly<Record<T, string>>;
  
    constructor(values: T[] | U) {
      if (Array.isArray(values)) {
        // Handle array-based enum (for string-based enum like Colours)
        this.values = Object.freeze(
          values.reduce((acc, value) => {
            acc[value as any] = value;
            return acc;
          }, {} as Record<string, T>) // Ensure it's a Record<string, T>
        ) as Readonly<U>;
  
        // Reverse mapping for string-based enums
        this.reverseValues = Object.freeze(
          values.reduce((acc, value) => {
            acc[value as any] = value;
            return acc;
          }, {} as any & Record<T, string>)
        );
      } else {
        // Handle object-based enum (for mixed-type enum like Seasons)
        this.values = Object.freeze(values);
  
        // Reverse mapping for mixed enums
        this.reverseValues = Object.freeze(
          Object.entries(values).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
          }, {} as Record<T, string>)
        );
      }
    }
  
    // Accessor for both string and numeric values
    public get(value: T | string): T | string {
      if (typeof value === 'string') {
        return this.values[value as keyof U];
      } else {
        return this.reverseValues[value as T];
      }
    }
  
    // Prevent modification of enum values
    public getValues(): Readonly<U> {
      return this.values;
    }
  
    public getKeys(): Readonly<string[]> {
      return Object.keys(this.values);
    }
}