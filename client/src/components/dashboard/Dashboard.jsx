import DataDashboard from "./dataDashboard";
import styles from "./dashboard.module.css";

const membrecia = [
  {
    id: 118836,
    nombre: "Clark",
    fNac: "01-01-1998",
    estado: "activo",
    cedula: "999-999999-9999X",
    eCivil: "soltero/a",
    familiaCristiana: false,
    telf: "22892927",
    email: "xyz@gmail.com",
    barrio: "La Nicarao",
    distrito: "5",
    direccion: "mango solo",
  },
  {
    id: 118836,
    nombre: "Jane",
    fNac: "01-01-1998",
    estado: "fallecido",
    cedula: "999-999999-9999X",
    eCivil: "soltero/a",
    familiaCristiana: false,
    telf: "22892927",
    email: "xyz@gmail.com",
    barrio: "La Nicarao",
    distrito: "5",
    direccion: "mango solo",
  },
  {
    id: 1180936,
    nombre: "Celina",
    fNac: "01-01-1998",
    estado: "activo",
    cedula: "999-999999-9999X",
    eCivil: "soltero/a",
    familiaCristiana: false,
    telf: "22892927",
    email: "xyz@gmail.com",
    barrio: "La Nicarao",
    distrito: "5",
    direccion: "mango solo",
  },
  {
    id: 1836,
    nombre: "Jane",
    fNac: "01-01-1998",
    estado: "activo",
    cedula: "999-999999-9999X",
    eCivil: "soltero/a",
    familiaCristiana: false,
    telf: "22892927",
    email: "xyz@gmail.com",
    barrio: "La Nicarao",
    distrito: "5",
    direccion: "mango solo",
  },
  {
    id: 118836,
    nombre: "Jonas",
    fNac: "12-01-1978",
    estado: "descarriado",
    cedula: "999-999999-9999X",
    eCivil: "casado/a",
    familiaCristiana: false,
    telf: "22497920",
    email: "abc@gmail.com",
    barrio: "Las Brisas",
    distrito: "1",
    direccion: "mango solo",
  },
];

const Dashboard = () => {
  const allMember = membrecia.length;

  const sumaActivos = membrecia.filter(
    (miembro) => miembro.estado === "activo"
  ).length;

  const sumaDecesos = membrecia.filter(
    (miembro) => miembro.estado === "fallecido"
  ).length;

  const sumaDescarriados = membrecia.filter(
    (miembro) => miembro.estado === "descarriado"
  ).length;

  const summary = [
    { desc: "Total de Tickets", cantidad: allMember },
    { desc: "Tickets Entregadas", cantidad: sumaActivos },
    { desc: "Personas Inscritas", cantidad: sumaDecesos },
    { desc: "Nro. de Asistentes", cantidad: sumaDescarriados },
    { desc: "Congregaciones Representadas", cantidad: sumaDescarriados },
  ];
  return (
    <main className={styles.dashboardBox}>
      <div className={styles.boxTitle}>
        <h2 className={styles.subtitle}>Dashboard</h2>
      </div>
      <div className={styles.boxDashboard}>
        <h3>Datos generales</h3>
        <div className={styles.cardContainer}>
          {summary.map((elemento, index) => (
            <DataDashboard key={index} elemento={elemento} />
          ))}
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
