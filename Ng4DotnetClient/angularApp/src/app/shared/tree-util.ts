import { TreeNode } from 'primeng/primeng';

export class TreeHandler {

    /**
     * 列表数据转换为树结构数据
     *
     * @static
     * @template TSource 列表数据类型
     * @template TTreeNode 树节点类型
     * @param {TSource[]} data 列表数据
     * @param {{ new(): TTreeNode }} treeNodeType 树节点类型
     * @returns {TTreeNode[]} 根节点列表
     * @memberof TreeHandler
     * @example
     *      const roots = TreeHandler.listToTree<TreeModel, TreeNode>(list, TreeNodeType);
     */
    public static listToTree<TSource extends TreeModel, TTreeNode extends TreeNode>(
        data: TSource[],
        treeNodeType: { new(): TTreeNode },
        settingTreeNode: (nodes: TTreeNode[]) => void = this.settingTreeNode): TTreeNode[] {

        const map = new Map<string | number, number>();
        const roots: TTreeNode[] = [];

        const treeData = data.map((item, index) => {
            map.set(item.id, index); // initialize the map

            return Object.assign(new treeNodeType(), {
                label: item.name,
                data: item,
                // expandedIcon: 'fa-folder-open',
                // collapsedIcon: 'fa-folder',
            });
        });

        treeData.forEach(node => {
            if (node.data.parentId) {
                treeData[map.get(node.data.parentId)].children.push(node);
            } else {
                roots.push(node);
            }
        });

        settingTreeNode(treeData);

        return roots;
    }

    /**
     * 树节点转换为节点列表
     *
     * @static
     * @template TTreeNode 树节点类型
     * @param {TTreeNode} root 根节点
     * @returns {TTreeNode[]} 树节点列表
     * @memberof TreeHandler
     */
    public static treeToList<TTreeNode extends TreeNode>(root: TTreeNode): TTreeNode[] {
        const stack: TTreeNode[] = [];
        const result: TTreeNode[] = [];

        stack.push(root);
        while (stack.length !== 0) {
            const node = stack.pop();
            result.push(node);
            node.children.forEach(children => {
                stack.push(<TTreeNode>children);
            });
        }

        return result;
    }

    /**
     * 获取叶子结点
     *
     * @static
     * @template TTreeNode 树节点类型
     * @param {TTreeNode} root 根节点
     * @returns {TTreeNode[]} 叶子结点列表
     * @memberof TreeHandler
     */
    public static getLeafNodes<TTreeNode extends TreeNode>(root: TTreeNode): TTreeNode[] {
        const stack: TTreeNode[] = [];
        const result: TTreeNode[] = [];

        stack.push(root);
        while (stack.length !== 0) {
            const node = stack.pop();

            if (node.children.length === 0) {
                result.push(node);
            } else {
                node.children.forEach(children => {
                    stack.push(<TTreeNode>children);
                });
            }
        }

        return result;
    }

    /**
     * 获取所给条件的节点
     *
     * @static
     * @template TTreeNode 树节点类型
     * @param {TTreeNode[]} roots 根节点
     * @param {(node: TTreeNode) => boolean} conditionFn 过虑节点的条件方法
     * @returns {TTreeNode[]} 符合条件的树节点列表
     * @memberof TreeHandler
     * @example
     *      const condition = (node: TreeNode) => this.selectedFiles.findIndex(x => x.data === node.data) > -1 ;
     *      this.selectedNodes = TreeHandler.getNodesBy(roots, condition);
     */
    public static getNodesBy<TTreeNode extends TreeNode>(roots: TTreeNode[], conditionFn: (node: TTreeNode) => boolean): TTreeNode[] {
        const stack: TTreeNode[] = [];
        const result: TTreeNode[] = [];
        let node: TTreeNode;

        roots.forEach(root => {
            stack.push(root);
            while (stack.length !== 0) {
                node = stack.pop();

                if (conditionFn(node)) {
                    result.push(node);
                }

                node.children.forEach(children => {
                    stack.push(<TTreeNode>children);
                });
            }
        });

        return result;
    }

    /**
     * 复制符合条件的树结构
     *
     * @static
     * @template TTreeNode 树节点类型
     * @param {TTreeNode} root 根结点
     * @param {(node: TTreeNode) => boolean} conditionFn 条件方法
     * @returns {TTreeNode} 符合条件的树结构
     * @memberof TreeHandler
     * @example
     *      const conditionFn = (node: TypedTreeNode<GetInformationOutput>) => node.data.fileId;
     *      const tempNode = TreeHandler.clone(root, conditionFn);
     */
    public static clone<TTreeNode extends TreeNode>(root: TTreeNode, conditionFn: (node: TTreeNode) => boolean): TTreeNode {

        const copy = (node: TTreeNode) => { return Object.assign({}, node, { parent: null, children: [] }); };

        const recursiveNodes = (node: TTreeNode) => {
            if (node.children.length === 0) {
                if (conditionFn(node)) {
                    return copy(node);
                } else {
                    return null;
                }
            }

            const output = copy(node);

            node.children.forEach(function (item) {
                const child = recursiveNodes(<TTreeNode>item);

                if (child) {
                    child.label = child.children.length ?
                        `${child.data.name}(${child.children.length})`
                        : child.data.name;
                    output.children.push(child);
                }
            });

            return output;
        };

        return recursiveNodes(root);
    }

    /**
     * 节点的路径
     *
     * @static
     * @template TTreeNode 树节点类型
     * @param {TTreeNode} node 节点
     * @returns {TTreeNode[]} 节点路径所经过的节点列表
     * @memberof TreeHandler
     */
    public static treePath<TTreeNode extends TreeNode>(node: TTreeNode): TTreeNode[] {
        const result: TTreeNode[] = [];

        const recursiveNodes = (treeNode: TTreeNode) => {
            if (!treeNode.parent) {
                result.push(treeNode);
                return;
            }

            recursiveNodes(<TTreeNode>treeNode.parent);
            result.push(treeNode);
        };

        recursiveNodes(node);

        return result;
    }

    /**
     * 设置结点选中状态
     *
     * @static
     * @template TTreeNode 树节点类型
     * @param {('single' | 'multiple' | 'checkbox')} [selectionMode='multiple'] 节点选择类型
     * @param {TTreeNode[]} roots 根节点列表
     * @param {TTreeNode[]} selectedNodes 选中节点列表
     * @param {(selectedNodes: TTreeNode[], node: TTreeNode) => boolean} nodeSelectedFn 判断节点选中的方法
     * @returns {TTreeNode[]} 选中状态的结点列表
     * @memberof TreeHandler
     * @example
     *     const containsNode = (selectItems: TreeNode[], node: TreeNode) => {
     *       return !!selectItems.find(x => isEqual(x.data, node.data);
     *      };
     *
     *      this.selectedNodes = TreeHandler.settingSelectedItems('multiple', roots, this.selectedNodes, containsNode);
     */
    public static settingSelectedItems<TTreeNode extends TreeNode>(
        selectionMode: 'single' | 'multiple' | 'checkbox' = 'multiple',
        roots: TTreeNode[],
        selectedNodes: TTreeNode[],
        nodeSelectedFn: (selectedNodes: TTreeNode[], node: TTreeNode) => boolean
    ): TTreeNode[] {
        return selectionMode === 'single'
            ? this.settingSingleSelectionMode(roots, selectedNodes, nodeSelectedFn)
            : this.settingMultipleSelectionMode(roots, selectedNodes, nodeSelectedFn);
    }

    /**
     * 设置单选状态下的结点选中状态
     *
     * @private
     * @static
     * @template TTreeNode 树节点类型
     * @param {TTreeNode[]} roots 根节点列表
     * @param {TTreeNode[]} selectedNodes 选中节点列表
     * @param {(selectedNodes: TTreeNode[], node: TTreeNode) => boolean} nodeSelectedFn 判断节点选中的方法
     * @returns {TTreeNode[]} 选中状态的结点列表
     * @memberof TreeHandler
     */
    private static settingSingleSelectionMode<TTreeNode extends TreeNode>(
        roots: TTreeNode[],
        selectedNodes: TTreeNode[],
        nodeSelectedFn: (selectedNodes: TTreeNode[], node: TTreeNode) => boolean): TTreeNode[] {

        const temp = [].concat(selectedNodes);
        const selected: TTreeNode[] = [];

        const recursiveNodes = (node: TTreeNode) => {
            if (selected.length) {
                return;
            }

            if (nodeSelectedFn(temp, node)) {
                selected.push(node);
                return;
            }

            node.children.forEach(item => {
                recursiveNodes(<TTreeNode>item);
            });
        };

        roots.forEach(item => {
            recursiveNodes(item);
        });

        return selected;
    }

    /**
     * 设置多选状态下的结点选中状态
     *
     * @private
     * @static
     * @template TTreeNode 树节点类型
     * @param {TTreeNode[]} roots 根节点列表
     * @param {TTreeNode[]} selectedNodes 选中节点列表
     * @param {(selectedNodes: TTreeNode[], node: TTreeNode) => boolean} nodeSelectedFn 判断节点选中的方法
     * @returns {TTreeNode[]} 选中状态的结点列表
     * @memberof TreeHandler
     */
    private static settingMultipleSelectionMode<TTreeNode extends TreeNode>(
        roots: TTreeNode[],
        selectedNodes: TTreeNode[],
        nodeSelectedFn: (selectedNodes: TTreeNode[], node: TTreeNode) => boolean): TTreeNode[] {

        const temp = [].concat(selectedNodes);
        const selected: TTreeNode[] = [];

        const difference = function (arr1: TreeNode[], arr2: TreeNode[]) {
            return arr1.filter(function (i) { return arr2.indexOf(i) < 0; });
        };

        const recursiveNodes = (node: TTreeNode) => {
            if (nodeSelectedFn(temp, node)) {
                selected.push(node);
            }

            if (node.children.length === 0) {
                return;
            }

            node.children.forEach(item => {
                recursiveNodes(<TTreeNode>item);
            });

            if (node.children.length) {
                const count = difference(node.children, selected).length;
                if (count === 0) {
                    selected.push(node);
                }

                node.partialSelected = count > 0;
            }
        };

        roots.forEach(item => {
            recursiveNodes(item);
        });

        return selected;
    }

    /**
     * 设置树节点属性
     *
     * @private
     * @template TTreeNode：树节点类型
     * @param {TTreeNode[]} nodes：树节点列表
     * @memberof TreeHandler
     */
    private static settingTreeNode<TTreeNode extends TreeNode>(nodes: TTreeNode[]) {
        nodes.forEach(node => {
            if (node.children && node.children.length) {
                node.label = `${node.data.name}(${node.children.length})`;
            }
        });
    }
}

export interface TreeModel {
    id: number | string;
    parentId?: number | string;
    code: string;
    name: string;
}

export class TreeNodeType implements TreeNode {
    public label?: string;
    public data?: any;
    public icon?: any;
    public expandedIcon?: any;
    public collapsedIcon?: any;
    public children?: TreeNode[];
    public leaf?: boolean;
    public expanded?: boolean;
    public type?: string;
    public parent?: TreeNode;
    public partialSelected?: boolean;
    public styleClass?: string;
    public draggable?: boolean;
    public droppable?: boolean;
    public selectable?: boolean;

    public constructor() {
        this.children = [];
    }
}

