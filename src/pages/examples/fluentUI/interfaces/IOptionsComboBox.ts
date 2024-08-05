import { ComboBox } from "../../../../interfaces/ComboBox";

export interface IOptionsComboBox {
    data: (value: string) => Promise<ComboBox[]>;
}