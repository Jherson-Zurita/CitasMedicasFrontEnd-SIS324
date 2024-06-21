class Doctor {
    constructor(id, nombre, apellido, especialidad, telefono, email) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.especialidad = especialidad;
      this.telefono = telefono;
      this.email = email;
    }

    static fromApiData(data) {
        return new Doctor(
          data.id,
          data.nombre,
          data.apellido,
          data.especialidad,
          data.telefono,
          data.email,
        );
      }
  }
  
  export default Doctor;
  