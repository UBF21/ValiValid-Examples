import { TabValue } from "@fluentui/react-components";
import { IItemTabList } from "./IItemTabList";

export interface ITabList {
    tabs: IItemTabList[];
    getSelectedValue: (value: TabValue) => void;
}