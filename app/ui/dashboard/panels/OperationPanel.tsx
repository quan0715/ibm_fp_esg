import { OperationDataTreeViewTable } from "@/app/ui/dashboard/tables/TreeViewTable";
import { getOperationData, getMonitoringGroupData } from "@/actions/dataActions";
import {
    AssetOperationDataSchemaModel,
    GroupAssetOperationDataSchemaModel,
    GroupAssetOperationDataNodeModel
 } from "@/models/AssetOperationDataModel";



export async function OperationPanel() {

    const assetsData = (await getOperationData()).data
    const dataList = await getMonitoringGroupData()
    
    const tree = GroupAssetOperationDataNodeModel.createRootNode()
    tree.buildTree(dataList, assetsData)
    // tree.log()

    const treeList = tree.toList(assetsData).filter(
        (item) => item.index !== -1
    )


    console.log(treeList)
    return (
        <div className="flex flex-row flex-grow gap-x-4">
            <OperationDataTreeViewTable data={treeList}/>
        </div>
    );
}
