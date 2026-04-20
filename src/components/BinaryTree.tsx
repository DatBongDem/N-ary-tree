import TreeNode from "./TreeNode";
import { buildDecisionTree } from "../utils/treeHelper";

export default function BinaryTree() {
    const root = buildDecisionTree();

    return (
        <div className="tree-container">
            <TreeNode node={root} />
        </div>
    );
}