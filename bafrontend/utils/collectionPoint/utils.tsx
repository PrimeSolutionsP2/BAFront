export function chooseColor(estado: any): string {
    switch (estado) {
        case "Activo":
            return "green"
            break;
        case "Inactivo":
            return "red"
        default:
            return "gray"
        break;
    }
}