import { useState } from "react";
import { buildDecisionTree } from "./utils/treeHelper";
import { Node } from "./models/Node";
import BinaryTree from "./components/BinaryTree";
import ChatWizard from "./components/ChatWizard";

const LEVEL_LABELS = [
  { value: "wizard", label: "Tư vấn từng bước" },
  { value: "full", label: "Xem toàn bộ cây" },
  { value: "2", label: "Tất cả danh mục" },
  { value: "3", label: "Tất cả sản phẩm" },
  { value: "4", "label": "Tất cả brand" },
  { value: "5", "label": "Tất cả model" },
];

function App() {
  const root = buildDecisionTree();
  const [mode, setMode] = useState("wizard");

  // Toolbar
  const Toolbar = (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "32px 0 24px 0" }}>
      {LEVEL_LABELS.map(opt => (
        <button
          key={opt.value}
          onClick={() => setMode(opt.value)}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: mode === opt.value ? "2px solid #4CAF50" : "1px solid #bbb",
            background: mode === opt.value ? "#e8f5e9" : "#fff",
            color: mode === opt.value ? "#388e3c" : "#222",
            fontWeight: mode === opt.value ? 600 : 400,
            cursor: "pointer"
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      {Toolbar}
      {mode === "wizard" && (
        <ChatWizard root={root} />
      )}

      {mode === "full" && (
        <BinaryTree selectedLevel="all" />
      )}
      {["2", "3", "4", "5"].includes(mode) && (
        <LevelList level={parseInt(mode, 10)} root={root} />
      )}
    </div>
  );
}

function getNodesAtLevel(root: Node, level: number): Node[] {
  const result: Node[] = [];
  function dfs(node: Node, currLevel: number) {
    if (currLevel === level) {
      result.push(node);
      return;
    }
    node.children.forEach((child: Node) => dfs(child, currLevel + 1));
  }
  dfs(root, 1);
  return result;
}

function LevelList({ level, root }: { level: number; root: Node }) {
  const nodes = getNodesAtLevel(root, level);
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", textAlign: "center" }}>
      <h2 style={{ marginBottom: 24 }}>Tất cả ở level {level}</h2>
      <ul style={{ listStyle: "none", padding: 0, fontSize: 18 }}>
        {nodes.map((n, i) => (
          <li key={n.value + i} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>{n.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;