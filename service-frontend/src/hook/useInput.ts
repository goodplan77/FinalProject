import { ChangeEvent, useState } from "react";

const useInput = <T>(init:any) => {
<<<<<<< HEAD

=======
>>>>>>> jayhp
    let [obj, setObj] = useState<T>(init);

    const onInputChange = (e:ChangeEvent) => {
        let {name, value} = e.target as HTMLInputElement;
<<<<<<< HEAD
        setObj({
            ...obj,
            [name]:value
        });
    }
    return [obj, onInputChange] as const;

=======

        setObj({
            ...obj,
            [name] : value
        });
    }

    return [obj, onInputChange] as const;
>>>>>>> jayhp
}

export default useInput;