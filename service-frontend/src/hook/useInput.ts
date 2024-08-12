import { ChangeEvent, useState } from "react";

const useInput = <T>(init:any) => {

    let [obj, setObj] = useState<T>(init);

    const onInputChange = (e:ChangeEvent) => {
        let {name, value} = e.target as HTMLInputElement;
        setObj({
            ...obj,
            [name]:value
        });
    }
    return [obj, onInputChange] as const;

}

export default useInput;