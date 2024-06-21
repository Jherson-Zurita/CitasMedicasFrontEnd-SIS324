class Appointment {
  constructor(id, date, time, clientId, doctorId, status, medicalInfo) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.clientId = clientId;
    this.doctorId = doctorId;
    this.status = status;
    this.medicalInfo = medicalInfo;
  }

  static fromApiData(data) {
    return new Appointment(
      data.id,
      data.date,
      data.time,
      data.clientId,
      data.doctorId,
      data.status,
      data.medicalInfo
    );
  }
}

export default Appointment;


  