import { Person } from "../../../../interfaces/Person";

export const personsInitializers = (): Person => {
    return {
        name: "",
        lastName: "",
        yearsOld: 0, sex: "",
        skills: "", email: "",
        urlLinkedin: "",
        foto: new Blob(),
        cv: new Blob(),
        profile: new Blob(),
        birthdate: null,
        dateOfGraduation: ""
    };
}