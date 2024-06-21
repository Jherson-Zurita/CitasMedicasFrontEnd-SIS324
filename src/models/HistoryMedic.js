class HistoryMedic {
    constructor(id, idPatient, notas, fecha) {
      this.id = id;
      this.idPatient = idPatient;
      this.notas = notas;
      this.fecha = fecha;
    }

    static fromApiData(data) {
        return new HistoryMedic(
            data.id,
            data.idPatient,
            data.notas,
            data.fecha
        );
    }
}

export default HistoryMedic;