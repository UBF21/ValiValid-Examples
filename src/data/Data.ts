import { ComboBox } from "../interfaces/ComboBox";

export class Data {

    public static getMascotas(value: string): Promise<ComboBox[]> {
        const mascotas: ComboBox[] = [
            { text: "Cat", value: crypto.randomUUID() },
            { text: "Dog", value: crypto.randomUUID() },
            { text: "Chicken", value: crypto.randomUUID() },
            { text: "Cow", value: crypto.randomUUID() },
            { text: "Fish", value: crypto.randomUUID() }
        ];

        return new Promise<ComboBox[]>((resolve, reject) => {
            try {
                let result = value ?
                    mascotas.filter(mascota =>
                        mascota.text.toLowerCase().includes(value.toLowerCase())
                    ) :
                    mascotas;

                resolve(result);

            } catch (error) {
                reject(error);
            }

        });
    }
}