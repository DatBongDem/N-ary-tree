import { buildDecisionTree } from "../utils/treeHelper";
import { Node } from "../models/Node";

type PositionedNode = {
    node: Node;
    x: number;
    y: number;
};

let currentX = 0;

/* ===== Layout DFS ===== */
function layoutTree(
    node: Node,
    depth: number,
    nodes: PositionedNode[]
): number {
    const childXs: number[] = [];

    node.children.forEach((child) => {
        const x = layoutTree(child, depth + 1, nodes);
        childXs.push(x);
    });

    let x: number;

    if (childXs.length === 0) {
        x = currentX;
        currentX += 180;
    } else {
        x = childXs.reduce((a, b) => a + b, 0) / childXs.length;
    }

    nodes.push({
        node,
        x,
        y: depth * 140,
    });

    return x;
}

export default function BinaryTree() {
    const root = buildDecisionTree();

    currentX = 50;
    const nodes: PositionedNode[] = [];
    layoutTree(root, 0, nodes);

    const width = currentX + 200;
    const height = Math.max(...nodes.map((n) => n.y)) + 200;

    return (
        <svg
            width={width}
            height={height}
            style={{
                display: "block",
                margin: "0 auto",
                background: "#f5f5f5",
            }}
        >
            {/* ===== LINE ===== */}
            {nodes.map((p) =>
                p.node.children.map((child) => {
                    const target = nodes.find(
                        (n) => n.node.value === child.value
                    );

                    if (!target) return null;

                    return (
                        <line
                            key={p.node.value + child.value}
                            x1={p.x}
                            y1={p.y + 40}
                            x2={target.x}
                            y2={target.y}
                            stroke="#999"
                            strokeWidth={2}
                        />
                    );
                })
            )}

            {/* ===== NODE ===== */}
            {nodes.map((p) => (
                <g key={p.node.value}>
                    <rect
                        x={p.x - 60}
                        y={p.y}
                        width="120"
                        height="40"
                        rx="10"
                        fill="#4CAF50"
                    />
                    <text
                        x={p.x}
                        y={p.y + 25}
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                    >
                        {p.node.value}
                    </text>
                </g>
            ))}
        </svg>
    );
}