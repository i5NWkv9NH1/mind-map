// #  监听数据修改
export const ON_DATA_CHANGE = 'data_change' as const
// # 监听当前节点 - 单个、多个
export const ON_NODE_ACTIVE = 'node_active' as const
// # 监听修改栈堆
export const ON_BAKC_FORWARD = 'back_forward' as const
// # 监听节点树结束渲染
export const ON_NODE_TREE_RENDER_END = 'node_tree_render_end' as const

// #region 节点相关
// # 插入子节点
export const COMMAND_INSERT_CHILD_NODE = 'INSERT_CHILD_NODE' as const
// # 插入多个子节点
export const COMMAND_INSERT_MULTIPLE_NODES = 'INSERT_MULTI_CHILD_NODE' as const
// # 插入同级节点
export const COMMAND_INSERT_NODE = 'INSERT_NODE' as const
// # 插入多个同级节点
export const COMMAND_INSERT_MUTIPLE_NODE = 'INSERT_MULTI_NODE' as const
// # 插入父节点
export const COMMAND_INSERT_PARENT_NODE = 'INSERT_PARENT_NODE' as const
// # 删除
export const COMMAND_REMOVE_NODE = 'REMOVE_NODE' as const
// # 删除当前节点
export const COMMAND_REMOVE_CURRENT_NODE = 'REMOVE_CURRENT_NODE' as const
// # 插入多个子节点
export const COMMAND_INSERT_MULTI_CHILD_NODE = 'INSERT_MULTI_CHILD_NODE' as const
// #endregion

// #region 节点内容
// # 添加概要
export const COMMAND_ADD_GENERALIZATION = 'ADD_GENERALIZATION' as const
// #endregion
// #region 修改栈堆
// # 撤销
export const COMMAND_BACK = 'BACK' as const
// # 重做
export const COMMAND_FORWARD = 'FORWARD' as const
// #endregion
