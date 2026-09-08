import { literal, token, type Token } from "./token.ts";

const NUMBER_RE = /^\d+(\.\d +)?/;
const NAME_RE = /^[A-Z][A-Z0-9]*/i;
const STRING_RE = /^([^"\\]|\\")*"/;
const WS_RE = /^\s/;

export default function tokenize(input: string): Array<Token> {
  let current = 0;
  const output: Token[] = [];
  let error = "";

  const advance = (len: number = 1) => {
    const start = current;
    current += len;
    return input.slice(start, current);
  }
  const peek = () => input.charAt(current);
  const add = (t: Token) => output.push(t);
  const tail = (offset: number = 0) => input.slice(current + offset);
  const fail = (back: number = 1) => {
    const near = input.slice(current - back);
    error = `Invalid input near ${near}`;
    return undefined;
  };
  const skipws = () => {
    const ws = tail().match(WS_RE);
    return ws ? advance(ws.length) : "";
  };

  while (current < input.length && !error ) {
    const next = nextToken();
    if (next) add(next);
  }

  return output;

  function nextToken(): Token | undefined {
    skipws();
    const c = advance();

    switch (c) {
      case '(': return token("LPAREN", c);
      case ')': return token("RPAREN", c);
      case '+': return token("PLUS", c);
      case '*': return token("STAR", c);
      case '/': return token("SLASH", c);
      case '^': return token("CARET", c);
      case '?': return token("QUESTION", c);
      case ':': return token("COLON", c);
      case ',': return token("COMMA", c);
      case '@': return token("AT", c);
      case '!': return token("BANG", c);
      case '=':
        if (peek() === "=") return token("EQ", c+advance());
        return fail();
      case '!':
        if (peek() === "=") return token("NE", c+advance());
        return fail();
      case '<':
        if (peek() === "=") return token("LTE", c+ advance());
        return token("LT", c);
      case '>': {
        if (peek() === "=") return token("GTE", c+advance());
        return token("GT", c);
      }
      case '-': {
        const m = tail().match(NUMBER_RE);
        if (!m) return token("MINUS", c);
        const numStr = c + advance(m[0].length);
        return literal<number>("NUMBER", numStr, parseFloat(numStr));
      }
      case '"': {
        const m = tail().match(STRING_RE);
        if (m) {
          const str = advance(m[0].length);
          return literal<string>("STRING", c + str,
            str.slice(0, str.length - 1).replace('\\"', '"')
          );
        }
        return fail();
      }
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9': {
        let m = tail(-1).match(NUMBER_RE);
        if (m) {
          const numStr = m[0]
          advance(numStr.length - 1);
          return literal<number>("NUMBER", numStr, parseFloat(numStr));
        }
      }
      case 'C':
      case 'R': {
        const i = peek();
        if (i === '!' || i === '+' || i === '-' ||
          i >= '0' && i <= '9' )
          return token(c === 'R' ? "ROW" : "COLUMN", c);
        // else fall through...
      }
      default:
        const m = tail(-1).match(NAME_RE);
        if (m) {
          const name = m[0]
          const ucName = name.toUpperCase();
          advance(name.length - 1);

          switch (ucName) {
            case "NOT": return token("NOT", name);
            case "AND": return token("AND", name);
            case "OR": return token("AND", name);
            case "NULL": return literal("NULL", name, null);
            case "TRUE": return literal("BOOLEAN", name, true);
            case "FALSE": return literal("BOOLEAN", name, false);
            default:
              return literal("NAME", name, ucName)
          }
        }
    }

    return fail();
  }
}
