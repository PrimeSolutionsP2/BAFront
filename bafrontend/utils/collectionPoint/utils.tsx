export function chooseColor(estado: any): string {
    switch (estado) {
        case "ACTIVO":
            return "green";
            break;
        case "PENDIENTE":
            return "gray";
            break;
        default:
            return "red"
        break;
    }
}

