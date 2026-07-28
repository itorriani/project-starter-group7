import { ServerRenderedTemplate, renderThunked } from "@lit-labs/ssr";
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';

export function renderToString(
  template: ServerRenderedTemplate
): Promise<string> {
  const ssrResult = renderThunked(template);
  return collectResult(ssrResult)
}
