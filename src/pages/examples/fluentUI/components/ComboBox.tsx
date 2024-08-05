import { useContext, useEffect, useRef, useState } from 'react';
import {
    Combobox,
    makeStyles,
    Option,
    useId,
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";
import { IOptionsComboBox } from '../interfaces/IOptionsComboBox';
import { ComboBox } from '../../../../interfaces/ComboBox';

const ComboBoxComponent = ({ data }: IOptionsComboBox) => {

    const comboId = useId("com dbo-default");
    const [options, setOptions] = useState<ComboBox[]>([]);

    const getData = async (value: string) => {
        try {
            const items = await data(value);
            setMatchingOptions(items);
        } catch (error) {
            console.error("Error fetching filtered data:", error);
        }
    };


    const [matchingOptions, setMatchingOptions] = useState<ComboBox[]>([]);
    const [customSearch, setCustomSearch] = useState<ComboBox>({ text: "", value: "" });

    const onChange: ComboboxProps["onChange"] = (event) => {
        const value = event.target.value.trim();
        getData(value);
        setMatchingOptions(options);
        if (value.length && options.length < 1) {
            setCustomSearch(options[0]);
        } else {
            setCustomSearch({ text: value, value: "" });
        }
    };

    const onOptionSelect: ComboboxProps["onOptionSelect"] = (event, data) => {
        const matchingOption = data.optionText && options.some(item => item.text === data.optionText);
        if (matchingOption) {
            setCustomSearch({ text: "", value: "" });
        } else {
            setCustomSearch({ text: data.optionText!, value: data.optionValue! });
        }

        console.log(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const initialData = await data("");
                setOptions(initialData);
                setMatchingOptions(initialData);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        fetchData();
    }, [data]);


    return (
        <div>
            <Combobox
                aria-labelledby={comboId}
                freeform
                placeholder="Select an animal"
                onChange={onChange}
                style={{ width: '100%' }}
                onOptionSelect={onOptionSelect}
            >
                {customSearch && !matchingOptions.length ? (
                    <Option key={crypto.randomUUID()} text={customSearch.text} value={customSearch.value}>
                        Search for "{customSearch.text}"
                    </Option>
                ) : null}
                {matchingOptions.map((option) => (
                    <Option key={crypto.randomUUID()} text={option.text} value={option.value}>{option.text}</Option>
                ))}
            </Combobox>
        </div>
    );
}

export {
    ComboBoxComponent
};