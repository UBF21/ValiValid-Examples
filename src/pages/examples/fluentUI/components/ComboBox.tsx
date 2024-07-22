import { useContext, useEffect, useRef, useState } from 'react';
import {
    Combobox,
    makeStyles,
    Option,
    useId,
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";
import { text } from 'stream/consumers';


interface ComboBox {
    text: string;
    value: string;
}

const ComboBoxComponent = () => {

    const comboId = useId("com dbo-default");
    const options: ComboBox[] = [
        { text: "Cat", value: crypto.randomUUID() },
        { text: "Dog", value: crypto.randomUUID() },
        { text: "Chicken", value: crypto.randomUUID() },
        { text: "Cow", value: crypto.randomUUID() },
        { text: "Fish", value: crypto.randomUUID() }
    ];
    const [matchingOptions, setMatchingOptions] = useState(options);
    const [customSearch, setCustomSearch] = useState<ComboBox>({ text: "", value: "" });

    const onChange: ComboboxProps["onChange"] = (event) => {
        const value = event.target.value.trim();
        const matches = options.filter(
            (option) => option.text.toLowerCase().indexOf(value.toLowerCase()) === 0
        );
        console.log("Matches:", matches);
        setMatchingOptions(matches);
        if (value.length && matches.length < 1) {
            setCustomSearch(matches[0]);
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
    };


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
                {customSearch ? (
                    <Option key={crypto.randomUUID()} text={customSearch.text} value={customSearch.value}>
                        Search for "{customSearch.text}"
                    </Option>
                ) : null}
                {matchingOptions.map((option) => (
                    <Option key={option.value} text={option.text} value={option.value}>{option.text}</Option>
                ))}
            </Combobox>
        </div>
    );
}

export {
    ComboBoxComponent
};