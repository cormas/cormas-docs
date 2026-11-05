// Mermaid's flowchart tooltips call selection.transition(), which exists only once
// d3-transition has been loaded. Mermaid imports d3 with sideEffects: false, so the
// bundler drops that loading step. Importing it here restores it.
import 'd3-transition';
