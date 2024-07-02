import { html } from "htm/preact";
import { hydrate } from "preact";
import { App } from "./app.js";
hydrate(html`<${App} />`, document.getElementById("root"));
