class Patient {
    constructor(id, name, apellido, fechanacimiento, direccion, telefono, email, idHistoryMedic) {
      this.id = id;
      this.name = name;
      this.apellido = apellido;
      this.fechanacimiento = fechanacimiento;
      this.direccion = direccion;
      this.telefono = telefono;
      this.email = email;
      this.idHistoryMedic = idHistoryMedic;
    }

    static fromApiData(data) {
        return new Patient(
            data.id,
            data.name,
            data.apellido,
            data.fechanacimiento,
            data.direccion,
            data.telefono,
            data.email,
            data.idHistoryMedic
        );
      }
}

export default Patient;