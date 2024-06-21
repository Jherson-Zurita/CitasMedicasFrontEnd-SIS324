class Assistant {
    constructor(id, nombre, apellido, especialidad, telefono, email) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.telefono = telefono;
      this.email = email;
    }

    static fromApiData(data) {
        return new Assistant(
          data.id,
          data.nombre,
          data.apellido,
          data.telefono,
          data.email,
        );
      }
  }
  
  export default Assistant;