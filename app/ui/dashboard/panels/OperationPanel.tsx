import { OperationDataTreeViewTable } from "@/app/ui/dashboard/tables/TreeViewTable";
import { getOperationData } from "@/actions/dataActions";
import { AssetOperationDataModel, AssetOperationDataTreeNodeModel} from "@/models/AssetOperationDataModel";


// export const OperationalDataContext = createContext({})

function buildDataTree(node: AssetOperationDataTreeNodeModel){
    
}

export async function OperationPanel() {
    const fetchOperationData = (await getOperationData()).data
    // console.log(fetchOperationData)
    return (
        <div className="flex flex-row flex-grow gap-x-4">
            <OperationDataTreeViewTable data={fetchOperationData}/>
        </div>
    );
}
