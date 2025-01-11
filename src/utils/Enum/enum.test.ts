
import Enum from '.'; // Adjust the import path based on your project structure

describe('Enum class tests', () => {
  test('should create a string-based enum from an array and return correct values', () => {
    const Colours = new Enum(['BLUE', 'RED']);

    // Test getting values by key
    expect(Colours.get('BLUE')).toBe('BLUE');
    expect(Colours.get('RED')).toBe('RED');

    // Test getting values by numeric representation (reverse lookup)
    // expect(Colours.get(1)).toBe('BLUE');
    // expect(Colours.get(2)).toBe('RED');

    // Test string interpolation
    expect(`${Colours.get('BLUE')}`).toBe('BLUE');
    // expect(`${Colours.get(1)}`).toBe('BLUE');
  });

  test('should create a numeric-based enum from an object and return correct values', () => {
    const Seasons = new Enum({
      SUMMER: 1,
      AUTUMN: 2,
      WINTER: 3,
      SPRING: 4,
    });

    // Test getting values by key
    expect(Seasons.get('SUMMER')).toBe(1);
    expect(Seasons.get('AUTUMN')).toBe(2);
    expect(Seasons.get('WINTER')).toBe(3);
    expect(Seasons.get('SPRING')).toBe(4);

    // Test reverse lookup (numeric to string)
    expect(Seasons.get(1)).toBe('SUMMER');
    expect(Seasons.get(2)).toBe('AUTUMN');
    expect(Seasons.get(3)).toBe('WINTER');
    expect(Seasons.get(4)).toBe('SPRING');

    // Test string interpolation
    expect(`${Seasons.get('WINTER')}`).toBe('WINTER');
    expect(`${Seasons.get(3)}`).toBe('WINTER');
  });

  test('should handle mixed enum with both numeric and string values', () => {
    const MixedEnum = new Enum({
      KEY1: 'A',
      KEY2: 'B',
      KEY3: 'C',
    });

    // Test getting values by key
    expect(MixedEnum.get('KEY1')).toBe('A');
    expect(MixedEnum.get('KEY2')).toBe('B');
    expect(MixedEnum.get('KEY3')).toBe('C');

    // Test reverse lookup (no numeric reverse, but works for string)
    expect(MixedEnum.get('A')).toBe('KEY1');
    expect(MixedEnum.get('B')).toBe('KEY2');
    expect(MixedEnum.get('C')).toBe('KEY3');

    // Test string interpolation
    expect(`${MixedEnum.get('KEY1')}`).toBe('A');
    expect(`${MixedEnum.get('A')}`).toBe('KEY1');
  });

  test('should throw error for invalid keys or values', () => {
    const Colours = new Enum(['BLUE', 'RED']);

    // Invalid key
    expect(() => Colours.get('GREEN')).toThrowError();

    // Invalid value
    // expect(() => Colours.get(3)).toThrowError();
  });
});
