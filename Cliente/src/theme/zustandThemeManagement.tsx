import { create } from 'zustand';
import { z } from 'zod';

const zodThemeSchema = z.object({
    backgroundMain: z.string(),
    backgroundSecondary: z.string(),
    FSHMain: z.string(),
    primaryMain: z.string(),
    secondaryMain: z.string(),
    tertiaryMain: z.string(),
    tableMain: z.string(),
    fontPrimaryMain: z.string(),
});

type themeSchemaValues = z.infer<typeof zodThemeSchema>;

export type themeSchemaActions = {
    setThemeData: (name: string, value: themeSchemaValues[keyof themeSchemaValues]) => void;
    setAllThemeData: (value: Partial<themeSchemaValues>) => void;
}

const useThemeStore = create<themeSchemaValues & themeSchemaActions>((set) => {
    // Intentamos obtener los datos del tema del localStorage
    const storedThemeData = localStorage.getItem('themeData');
    // Definimos los datos iniciales del tema
    const initialThemeData: themeSchemaValues = storedThemeData ? JSON.parse(storedThemeData) : {
        backgroundMain: "#e9ecef",
        backgroundSecondary: "#fff",
        FSHMain: "#184e77",
        primaryMain: '#52b69a',
        secondaryMain: '#168aad',
        tertiaryMain: "red",
        tableMain: "#aaa",
        fontPrimaryMain: "#",
    };

    // Definimos las acciones del tema
    return {
        ...initialThemeData,
        setAllThemeData: (newThemeData: Partial<themeSchemaValues>) => {
            try {
                // Actualizamos el estado con los nuevos datos del tema
                set((state) => ({
                    ...state,
                    ...newThemeData,
                }));
                // Actualizamos el localStorage con los datos actualizados del tema
                localStorage.setItem('themeData', JSON.stringify({ ...initialThemeData, ...newThemeData }));
            } catch (error) {
                console.error('Error al establecer todos los datos del tema:', error);
            }
        },
        setThemeData: (name, value) => {
            try {
                const updatedData = { [name]: value };
                const validatedData = zodThemeSchema.partial().parse(updatedData);
                set((state) => ({
                    ...state,
                    ...validatedData,
                }));
                localStorage.setItem('themeData', JSON.stringify({ ...initialThemeData, ...validatedData }));
            } catch (error) {
                //console.error('Error de validación:', error);
            }
        },
       /* getThemeData: (name) => {
            return initialThemeData[name] ;
        },*/
    };
});

export default useThemeStore;
