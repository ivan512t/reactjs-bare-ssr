import { html } from "htm/preact";
import { useReducer } from "preact/hooks";

export function App() {
    const [count, add] = useReducer((a, b) => a + b, 0);

    return html`
      <button onClick=${() => add(-1)}>Decrement</button>
      <input readonly size="4" value=${count} />
      <button onClick=${() => add(1)}>Increment</button>
    `;
}
