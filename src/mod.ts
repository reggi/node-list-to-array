export enum Quotes {
  'single' = "'",
  'double' = '"',
  'backtick' = '`',
}

export enum Declaration {
  'var' = 'var',
  'let' = 'let',
  'const' = 'const',
}

export interface Options {
  /** The name of the array */
  name?: string;
  /** @default false preserves whitespace at the beginning and end of the line */
  preserveWhitespace?: boolean;
  /** @default true parses string lines to detect for boolean and number values */
  parse?: boolean;
  /** @default false runs the code through prettier */
  prettier?: boolean;
  /** @default false runs the code through standard */
  standard?: boolean;
  /** @default 'const' The declaration type of the array */
  declaration?: Declaration;
  /** @default 'single' The type of quotes strings are wrapped */
  quotes?: Quotes;
  /** @default 'true' Adds a semicolon at the end of the array */
  semiColons?: boolean;
}

export function listToArray(lines: string, options?: Options) {
  const results: string[] = [];
  const declaration = options?.declaration || Declaration.const;
  if (!lines) return '';
  if (options?.name) results.push(`${declaration} ${options.name} = `);
  const quote = options?.quotes || "'";
  const wrap = (value: string) => `  ${quote}${value}${quote}`;
  const items = lines.split('\n').filter(i => i);
  results.push(`[\n${items.map(wrap).join(', \n')}\n];`);
  return results.join('');
}
